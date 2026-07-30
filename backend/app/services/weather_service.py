"""Weather integrations with resilient fallback behaviour."""

import asyncio
import os
import time
from typing import Any

import httpx
from pydantic import BaseModel, Field, ValidationError

from app.utils.constants import FALLBACK_HUMIDITY, FALLBACK_TEMPERATURE
from app.data.dashboard_data import DASHBOARD_WEATHER_FALLBACK
from app.schemas.dashboard import WeatherReadingResponse


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


class DashboardWeatherService:
    """Fetch and cache dashboard weather from OpenWeather with safe fallbacks."""

    forecast_url = "https://api.openweathermap.org/data/2.5/forecast"
    timeout_seconds = 5.0
    cache_ttl_seconds = 300

    def __init__(self, api_key: str | None = None) -> None:
        """Create the service using the configured OpenWeather API key."""
        self.api_key = api_key if api_key is not None else os.getenv("OPENWEATHER_API_KEY")
        self._cache: dict[str, tuple[float, WeatherReadingResponse]] = {}

    async def get_regional_weather(self) -> list[WeatherReadingResponse]:
        """Return live weather for all dashboard cities, falling back per city."""
        fallback_by_city = {
            item["region"]: WeatherReadingResponse.model_validate(item)
            for item in DASHBOARD_WEATHER_FALLBACK
        }
        return list(
            await asyncio.gather(
                *(self._get_city_weather(city, fallback) for city, fallback in fallback_by_city.items())
            )
        )

    async def _get_city_weather(
        self, city: str, fallback: WeatherReadingResponse
    ) -> WeatherReadingResponse:
        """Fetch one city weather reading or return its deterministic fallback."""
        cached = self._cache.get(city)
        if cached is not None and time.monotonic() - cached[0] < self.cache_ttl_seconds:
            return cached[1]

        if not self.api_key:
            self._cache[city] = (time.monotonic(), fallback)
            return fallback

        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                response = await client.get(
                    self.forecast_url,
                    params={"q": city, "appid": self.api_key, "units": "metric"},
                )
                response.raise_for_status()
                reading = self._parse_dashboard_weather(city, response.json())
        except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError, ValidationError):
            reading = fallback

        self._cache[city] = (time.monotonic(), reading)
        return reading

    @staticmethod
    def _parse_dashboard_weather(city: str, payload: dict[str, Any]) -> WeatherReadingResponse:
        """Map the first OpenWeather forecast interval to the dashboard contract."""
        forecast = payload["list"][0]
        temperature = round(float(forecast["main"]["temp"]), 1)
        humidity = DashboardWeatherService._clamp_percentage(forecast["main"]["humidity"])
        rain_probability = DashboardWeatherService._clamp_percentage(
            float(forecast.get("pop", 0)) * 100
        )
        risk = DashboardWeatherService._risk_for(temperature, humidity, rain_probability)
        return WeatherReadingResponse(
            region=city,
            temp=temperature,
            humidity=humidity,
            rain=rain_probability,
            risk=risk,
        )

    @staticmethod
    def _risk_for(temperature: float, humidity: int, rain_probability: int) -> str:
        """Classify risk by evaluating combined temperature, humidity, and rain signals."""
        high_signals = (
            rain_probability >= 70,
            temperature >= 35,
            humidity >= 85,
        )
        moderate_signals = (
            40 <= rain_probability <= 69,
            28 <= temperature <= 34,
            70 <= humidity <= 84,
        )

        if any(high_signals):
            return "high"
        if any(moderate_signals):
            return "moderate"
        return "low"

    @staticmethod
    def _clamp_percentage(value: float | int) -> int:
        """Round a percentage to a whole number within the dashboard range."""
        return max(0, min(100, round(float(value))))
