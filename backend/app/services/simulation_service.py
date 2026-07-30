"""Deterministic scenario simulation service for the HarvestFlow MVP."""

from app.schemas.response import Priority
from app.schemas.simulation import SimulationRequest, SimulationResponse


class SimulationService:
    """Calculate operational directives from frontend simulation controls."""

    def run(self, scenario: SimulationRequest) -> SimulationResponse:
        """Return a deterministic India-to-Singapore operational recommendation."""
        stress = (
            (scenario.temperature - 20) * 0.6
            + (scenario.humidity - 60) * 0.2
            + scenario.rain * 0.15
            + scenario.truckDelay * 0.1
            - scenario.storageAvail * 0.15
            - scenario.marketDemand * 0.2
        )
        confidence = self._clamp(round(94 - stress * 0.6), 52, 98)
        expected_revenue = max(2, round(24 - stress * 0.25))
        spoilage_risk = self._clamp(round(18 + stress * 0.5), 6, 48)
        carbon_impact = max(0.3, round(2.1 - stress * 0.02, 1))

        action, market = self._recommend_route(stress, scenario.marketDemand)
        priority = self._priority_for_confidence(confidence)
        harvest_time = (
            "Tomorrow 04:30 - 06:00" if scenario.temperature > 28 else "Tomorrow 05:30 - 07:00"
        )
        truck = (
            "Container RF-121 - Reefer 14t - 2C (rerouted)"
            if scenario.truckDelay > 90
            else "Container RF-118 - Reefer 14t - 2C"
        )
        storage = (
            "Nashik Cold Storage Hub - Bay 04"
            if scenario.storageAvail > 40
            else "Pune Export Packhouse - Bay 02"
        )

        return SimulationResponse(
            action=action,
            priority=priority,
            harvest_time=harvest_time,
            truck=truck,
            storage=storage,
            market=market,
            confidence=confidence,
            revenue=f"+${expected_revenue * 1000:,}",
            spoilage=f"-{100 - spoilage_risk}%",
            carbon=f"-{carbon_impact} t CO2e",
            reasoning=(
                "Simulation balances weather stress, transport reliability, cold-storage "
                "headroom, and Singapore market demand for the selected export workflow."
            ),
            expected_revenue=expected_revenue,
            spoilage_risk=spoilage_risk,
            carbon_impact=carbon_impact,
        )

    @staticmethod
    def _recommend_route(stress: float, market_demand: float) -> tuple[str, str]:
        """Select an India-to-Singapore route based on stress and demand."""
        if stress > 30:
            return (
                "Delay harvest 24h, pre-cool at packhouse, and hold market entry",
                "Mumbai APMC - domestic contingency channel",
            )
        if stress > 10:
            return (
                "Split shipment, dispatch Container RF-118, and protect cold chain",
                "Changi Cold Logistics - refrigerated intake",
            )
        if market_demand > 75:
            return (
                "Prioritize export shipment through JNPT Port",
                "Singapore Fresh Produce Hub",
            )
        return (
            "Consolidate shipment for the next reefer export window",
            "Jurong Food Hub",
        )

    @staticmethod
    def _priority_for_confidence(confidence: int) -> Priority:
        """Map simulation confidence to the public priority level."""
        if confidence >= 95:
            return Priority.CRITICAL
        if confidence >= 90:
            return Priority.HIGH
        if confidence >= 75:
            return Priority.MEDIUM
        return Priority.LOW

    @staticmethod
    def _clamp(value: int, minimum: int, maximum: int) -> int:
        """Constrain an integer value to a safe inclusive range."""
        return max(minimum, min(value, maximum))
