"""Dashboard overview service backed by deterministic in-memory data."""

from app.data.dashboard_data import DASHBOARD_OVERVIEW_DATA
from app.schemas.dashboard import DashboardOverviewResponse


class DashboardService:
    """Build dashboard responses without external services or persistence."""

    def get_overview(self) -> DashboardOverviewResponse:
        """Return the current MVP dashboard overview."""
        return DashboardOverviewResponse.model_validate(DASHBOARD_OVERVIEW_DATA)
