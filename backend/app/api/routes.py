"""HTTP routes for HarvestFlow AI."""

from fastapi import APIRouter, status

from app.core.decision_engine import generate_directive
from app.schemas.request import DecisionRequest
from app.schemas.response import DecisionResponse, HealthResponse, ServiceResponse
from app.services.weather_service import WeatherService

router = APIRouter()
weather_service = WeatherService()


@router.get("/", response_model=ServiceResponse, tags=["System"])
def root() -> ServiceResponse:
    """Return the service identity and current status."""
    return ServiceResponse()


@router.get("/health", response_model=HealthResponse, tags=["System"])
def health_check() -> HealthResponse:
    """Confirm that the API process is available."""
    return HealthResponse()


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
