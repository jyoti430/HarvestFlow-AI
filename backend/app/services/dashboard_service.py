"""Dashboard overview service backed by deterministic in-memory data."""

from app.data.dashboard_data import DASHBOARD_OVERVIEW_DATA
from app.schemas.dashboard import DashboardOverviewResponse
from app.services.weather_service import DashboardWeatherService


class DashboardService:
    """Build dashboard responses without external services or persistence."""

    def __init__(self, weather_service: DashboardWeatherService | None = None) -> None:
        """Create the dashboard service with an optional weather dependency."""
        self.weather_service = weather_service or DashboardWeatherService()

    async def get_overview(self) -> DashboardOverviewResponse:
        """Return the dashboard overview with resilient live regional weather."""
        overview = DashboardOverviewResponse.model_validate(DASHBOARD_OVERVIEW_DATA)
        weather = await self.weather_service.get_regional_weather()
        return overview.model_copy(update={"weather": weather})
