"""HTTP routes for HarvestFlow AI."""

from fastapi import APIRouter, status

from app.core.decision_engine import generate_directive
from app.schemas.dashboard import DashboardOverviewResponse
from app.schemas.impact import ImpactOverviewResponse
from app.schemas.request import DecisionRequest
from app.schemas.response import DecisionResponse, HealthResponse, ServiceResponse
from app.services.dashboard_service import DashboardService
from app.services.impact_service import ImpactService
from app.services.weather_service import WeatherService

router = APIRouter()
weather_service = WeatherService()
dashboard_service = DashboardService()
impact_service = ImpactService()


@router.get("/", response_model=ServiceResponse, tags=["System"])
def root() -> ServiceResponse:
    """Return the service identity and current status."""
    return ServiceResponse()


@router.get("/health", response_model=HealthResponse, tags=["System"])
def health_check() -> HealthResponse:
    """Confirm that the API process is available."""
    return HealthResponse()


@router.get(
    "/api/v1/dashboard/overview",
    response_model=DashboardOverviewResponse,
    tags=["Dashboard"],
    summary="Get dashboard overview data",
)
def get_dashboard_overview() -> DashboardOverviewResponse:
    """Return deterministic India-Singapore dashboard data for the MVP."""
    return dashboard_service.get_overview()


@router.get(
    "/api/v1/impact/overview",
    response_model=ImpactOverviewResponse,
    tags=["Impact"],
    summary="Get impact overview data",
)
def get_impact_overview() -> ImpactOverviewResponse:
    """Return deterministic India-to-Singapore impact data for the MVP."""
    return impact_service.get_overview()


@router.post(
    "/api/v1/decision",
    response_model=DecisionResponse,
    status_code=status.HTTP_200_OK,
    tags=["Decisions"],
    summary="Generate an operational AI directive",
)
async def create_decision(request: DecisionRequest) -> DecisionResponse:
    """Fetch origin weather and generate a deterministic operational directive."""
    weather = await weather_service.get_current_weather(request.origin)
    enriched_request = request.model_copy(
        update={"temperature": weather.temperature, "humidity": weather.humidity}
    )
    return generate_directive(enriched_request)
