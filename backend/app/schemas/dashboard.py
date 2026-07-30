"""Pydantic response models for the dashboard overview."""

from typing import Literal

from pydantic import BaseModel, Field


class KpiResponse(BaseModel):
    """A high-level dashboard metric."""

    key: str
    label: str
    value: str
    delta: str
    trend: Literal["up", "down", "flat"]
    tone: Literal["primary", "ai", "warning", "critical", "muted"]


class WeatherReadingResponse(BaseModel):
    """Regional weather conditions relevant to harvest operations."""

    region: str
    temp: float = Field(..., ge=-50, le=70)
    humidity: float = Field(..., ge=0, le=100)
    rain: float = Field(..., ge=0, le=100)
    risk: Literal["low", "moderate", "high"]


class StorageFacilityResponse(BaseModel):
    """Cold-storage capacity and temperature for a facility."""

    facility: str
    capacity: int = Field(..., gt=0)
    used: int = Field(..., ge=0)
    temp: float


class TransportLegResponse(BaseModel):
    """Operational status of a refrigerated transport leg."""

    id: str
    route: str
    status: Literal["in-transit", "loading", "delayed"]
    eta: str
    load: str


class MarketSignalResponse(BaseModel):
    """Demand and price signal for a target market."""

    market: str
    demand: int = Field(..., ge=0, le=100)
    price: str
    trend: Literal["up", "down", "flat"]


class RecentDirectiveResponse(BaseModel):
    """A recent AI-generated operational directive."""

    id: str
    crop: str
    action: str
    region: str
    confidence: int = Field(..., ge=0, le=100)
    impact: str
    status: Literal["active", "pending", "completed"]
    time: str


class SupplyHealthPointResponse(BaseModel):
    """A daily supply-chain health score."""

    name: str
    health: int = Field(..., ge=0, le=100)


class DashboardOverviewResponse(BaseModel):
    """Complete deterministic dashboard overview for the HarvestFlow MVP."""

    kpis: list[KpiResponse]
    weather: list[WeatherReadingResponse]
    storage: list[StorageFacilityResponse]
    transport: list[TransportLegResponse]
    markets: list[MarketSignalResponse]
    directives: list[RecentDirectiveResponse]
    supplyHealth: list[SupplyHealthPointResponse]
