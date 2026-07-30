"""Pydantic response models for the impact overview."""

from typing import Literal

from pydantic import BaseModel, Field


class ImpactMetricResponse(BaseModel):
    """A headline impact metric for HarvestFlow operations."""

    key: str
    icon: Literal["food", "revenue", "carbon", "efficiency", "export"]
    label: str
    value: str
    sub: str
    tone: Literal["primary", "ai", "warning"]


class SpoilageReductionPointResponse(BaseModel):
    """Monthly spoilage percentage before and after HarvestFlow."""

    month: str
    before: float = Field(..., ge=0, le=100)
    after: float = Field(..., ge=0, le=100)


class RevenueProtectedPointResponse(BaseModel):
    """Monthly export revenue protected, in thousands of US dollars."""

    month: str
    value: float = Field(..., ge=0)


class StorageUtilizationPointResponse(BaseModel):
    """Monthly average cold-storage utilization percentage."""

    month: str
    util: float = Field(..., ge=0, le=100)


class CarbonReductionPointResponse(BaseModel):
    """Monthly carbon reduction in tonnes of CO2 equivalent."""

    month: str
    tons: float = Field(..., ge=0)


class ImpactOverviewResponse(BaseModel):
    """Complete deterministic impact overview for the HarvestFlow MVP."""

    metrics: list[ImpactMetricResponse]
    spoilage: list[SpoilageReductionPointResponse]
    revenue: list[RevenueProtectedPointResponse]
    storage: list[StorageUtilizationPointResponse]
    carbon: list[CarbonReductionPointResponse]
