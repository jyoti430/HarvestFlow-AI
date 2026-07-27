"""Request models for decision generation."""

from datetime import date
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


class MarketDemand(str, Enum):
    """Supported market-demand levels."""

    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class DecisionRequest(BaseModel):
    """Operational information required to generate a directive."""

    model_config = ConfigDict(str_strip_whitespace=True)

    crop: str = Field(..., min_length=1, max_length=100, examples=["Tomato"])
    quantity: float = Field(..., gt=0, examples=[10])
    unit: str = Field(..., min_length=1, max_length=30, examples=["tons"])
    origin: str = Field(..., min_length=1, max_length=150, examples=["Nashik"])
    target_market: str = Field(
        ..., min_length=1, max_length=200, examples=["Singapore Fresh Produce Hub"]
    )
    harvest_date: date = Field(..., examples=["2026-07-30"])
    temperature: float | None = Field(
        default=None,
        ge=-50,
        le=70,
        description="Optional manual override; normally populated from live weather.",
        examples=[36],
    )
    humidity: float | None = Field(
        default=None,
        ge=0,
        le=100,
        description="Optional manual override; normally populated from live weather.",
        examples=[82],
    )
    storage_available: bool = Field(..., examples=[False])
    storage_utilization: float = Field(
        default=0,
        ge=0,
        le=100,
        description="Mock percentage of available storage capacity already in use.",
        examples=[75],
    )
    distance_to_storage_km: float = Field(
        default=10,
        ge=0,
        le=5000,
        description="Mock distance to the nearest suitable cold storage.",
        examples=[25],
    )
    truck_delay_hours: float = Field(..., ge=0, le=720, examples=[4])
    travel_distance_km: float = Field(
        default=500,
        ge=0,
        le=20000,
        description="Mock route distance to the target market.",
        examples=[4500],
    )
    cold_transport_available: bool = Field(
        default=False,
        description="Whether refrigerated transport can be assigned.",
        examples=[True],
    )
    export_priority: bool = Field(
        default=False,
        description="Whether this shipment is prioritized for export.",
        examples=[True],
    )
    market_demand: MarketDemand = Field(..., examples=[MarketDemand.HIGH])
