"""Open-Meteo weather integration with resilient fallback behaviour."""

from typing import Any

import httpx
from pydantic import BaseModel, Field, ValidationError

from app.utils.constants import FALLBACK_HUMIDITY, FALLBACK_TEMPERATURE


class WeatherData(BaseModel):
    """Current weather values used by the decision engine."""

    temperature: float = Field(..., ge=-50, le=70)
    humidity: float = Field(..., ge=0, le=100)
    weather_code: int
    is_fallback: bool = False


class WeatherService:
    """Fetch current weather for a city from Open-Meteo without an API key."""

    geocoding_url = "https://geocoding-api.open-meteo.com/v1/search"
    forecast_url = "https://api.open-meteo.com/v1/forecast"
    timeout_seconds = 5.0

    async def get_current_weather(self, city: str) -> WeatherData:
        """Return live weather for a city, or safe values if the request fails."""
        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                latitude, longitude = await self._get_coordinates(client, city)
                response = await client.get(
                    self.forecast_url,
                    params={
                        "latitude": latitude,
                        "longitude": longitude,
                        "current": "temperature_2m,relative_humidity_2m,weather_code",
                    },
                )
                response.raise_for_status()
                return self._parse_weather(response.json())
        except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError, ValidationError):
            return self._fallback_weather()

    async def _get_coordinates(
        self, client: httpx.AsyncClient, city: str
    ) -> tuple[float, float]:
        """Resolve a city name to coordinates through Open-Meteo geocoding."""
        response = await client.get(
            self.geocoding_url,
            params={"name": city, "count": 1, "language": "en", "format": "json"},
        )
        response.raise_for_status()
        result = response.json()["results"][0]
        return float(result["latitude"]), float(result["longitude"])

    @staticmethod
    def _parse_weather(payload: dict[str, Any]) -> WeatherData:
        """Convert the relevant Open-Meteo forecast fields into a typed model."""
        current = payload["current"]
        return WeatherData(
            temperature=current["temperature_2m"],
            humidity=current["relative_humidity_2m"],
            weather_code=current["weather_code"],
        )

    @staticmethod
    def _fallback_weather() -> WeatherData:
        """Return conservative mock weather when Open-Meteo cannot be reached."""
        return WeatherData(
            temperature=FALLBACK_TEMPERATURE,
            humidity=FALLBACK_HUMIDITY,
            weather_code=0,
            is_fallback=True,
        )
