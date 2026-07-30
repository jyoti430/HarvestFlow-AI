"""Pydantic models for deterministic scenario simulation."""

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.response import Priority


class SimulationRequest(BaseModel):
    """Scenario controls submitted by the frontend simulation lab."""

    model_config = ConfigDict(populate_by_name=True)

    temperature: float = Field(..., ge=-50, le=70)
    humidity: float = Field(..., ge=0, le=100)
    rain: float = Field(..., ge=0, le=100)
    truckDelay: float = Field(..., ge=0, le=720)
    storageAvail: float = Field(..., ge=0, le=100)
    marketDemand: float = Field(..., ge=0, le=100)


class SimulationResponse(BaseModel):
    """Operational recommendation calculated from a simulation scenario."""

    model_config = ConfigDict(populate_by_name=True)

    action: str
    priority: Priority
    harvest_time: str = Field(..., serialization_alias="harvestTime")
    truck: str
    storage: str
    market: str
    confidence: int = Field(..., ge=0, le=100)
    revenue: str
    spoilage: str
    carbon: str
    reasoning: str
    expected_revenue: int = Field(..., serialization_alias="expectedRevenue", ge=0)
    spoilage_risk: int = Field(..., serialization_alias="spoilageRisk", ge=0, le=100)
    carbon_impact: float = Field(..., serialization_alias="carbonImpact", ge=0)
