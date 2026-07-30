"""Impact overview service backed by deterministic in-memory data."""

from app.data.impact_data import IMPACT_OVERVIEW_DATA
from app.schemas.impact import ImpactOverviewResponse


class ImpactService:
    """Build impact responses without persistence or external dependencies."""

    def get_overview(self) -> ImpactOverviewResponse:
        """Return the current India-to-Singapore impact overview."""
        return ImpactOverviewResponse.model_validate(IMPACT_OVERVIEW_DATA)
