"""HTTP routes for HarvestFlow AI."""

from fastapi import APIRouter, status

from app.core.decision_engine import generate_directive
from app.schemas.request import DecisionRequest
from app.schemas.response import DecisionResponse, HealthResponse, ServiceResponse

router = APIRouter()


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
def create_decision(request: DecisionRequest) -> DecisionResponse:
    """Create a rule-based placeholder directive from operational inputs."""
    return generate_directive(request)
