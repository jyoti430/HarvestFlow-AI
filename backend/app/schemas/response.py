"""Response models for HarvestFlow AI."""

from enum import Enum

from pydantic import BaseModel, Field


class Priority(str, Enum):
    """Directive urgency levels."""

    CRITICAL = "Critical"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class ServiceResponse(BaseModel):
    """Response returned by the root endpoint."""

    service: str = "HarvestFlow AI Backend"
    status: str = "running"


class HealthResponse(BaseModel):
    """Response returned by the health endpoint."""

    status: str = "healthy"


class DecisionResponse(BaseModel):
    """Structured directive returned for a harvest operation."""

    directive: str
    action: str
    harvest_time: str
    transport: str
    storage: str
    destination: str
    overall_score: float = Field(..., ge=0, le=100)
    scores: "DecisionScores"
    confidence: int = Field(..., ge=0, le=100)
    priority: Priority
    reasoning: list[str] = Field(..., min_length=1)
    estimated_revenue_gain: float = Field(..., ge=0, description="Estimated percentage gain")
    estimated_spoilage_reduction: float = Field(
        ..., ge=0, description="Estimated percentage reduction"
    )
    estimated_carbon_reduction: float = Field(
        ..., ge=0, description="Estimated percentage reduction"
    )


class DecisionScores(BaseModel):
    """Independent score components used to calculate a decision."""

    spoilage_risk: float = Field(..., ge=0, le=100)
    storage: float = Field(..., ge=0, le=100)
    market: float = Field(..., ge=0, le=100)
    transport: float = Field(..., ge=0, le=100)
