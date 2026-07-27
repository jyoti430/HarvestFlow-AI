"""Deterministic multi-factor decision intelligence for HarvestFlow AI."""

from app.schemas.request import DecisionRequest, MarketDemand
from app.schemas.response import DecisionResponse, DecisionScores, Priority

SPOILAGE_WEIGHT = 0.40
STORAGE_WEIGHT = 0.25
MARKET_WEIGHT = 0.20
TRANSPORT_WEIGHT = 0.15

# Mock crop knowledge retained locally for the MVP; unknown crops use 7 days.
CROP_SHELF_LIFE_DAYS: dict[str, int] = {
    "tomato": 7,
    "strawberry": 4,
    "leafy greens": 3,
    "mango": 14,
    "potato": 30,
    "onion": 45,
}


def generate_directive(request: DecisionRequest) -> DecisionResponse:
    """Calculate weighted scores and turn them into an actionable directive."""
    timeline: list[str] = []
    spoilage_score = _spoilage_risk_score(request, timeline)
    storage_score = _storage_score(request, timeline)
    market_score = _market_score(request, timeline)
    transport_score = _transport_score(request, timeline)
    overall_score = round(
        spoilage_score * SPOILAGE_WEIGHT
        + storage_score * STORAGE_WEIGHT
        + market_score * MARKET_WEIGHT
        + transport_score * TRANSPORT_WEIGHT,
        1,
    )
    priority = _priority_for_score(overall_score)
    recommendations = _recommendations(request, priority, spoilage_score, transport_score)
    confidence = min(98, round(65 + (overall_score * 0.32)))
    return DecisionResponse(
        directive=recommendations["directive"],
        action=recommendations["action"],
        harvest_time=recommendations["harvest_time"],
        transport=recommendations["transport"],
        storage=recommendations["storage"],
        destination=recommendations["destination"],
        overall_score=overall_score,
        scores=DecisionScores(
            spoilage_risk=spoilage_score,
            storage=storage_score,
            market=market_score,
            transport=transport_score,
        ),
        confidence=confidence,
        priority=priority,
        reasoning=timeline or ["Conditions are within the configured operating thresholds"],
        estimated_revenue_gain=round(5 + market_score * 0.12, 1),
        estimated_spoilage_reduction=round(spoilage_score * 0.22, 1),
        estimated_carbon_reduction=round(3 + transport_score * 0.08, 1),
    )


def _spoilage_risk_score(request: DecisionRequest, timeline: list[str]) -> float:
    """Score exposure to spoilage from weather, delay, and crop shelf life."""
    score = 0.0
    if request.temperature >= 35:
        score += 40
        timeline.append("Temperature increased spoilage risk")
    elif request.temperature >= 28:
        score += 25
        timeline.append("Warm temperature increased spoilage risk")
    if request.humidity >= 80:
        score += 20
        timeline.append("High humidity increased spoilage risk")
    elif request.humidity >= 65:
        score += 10
    if request.truck_delay_hours > 0:
        score += min(25, request.truck_delay_hours * 5)
        timeline.append("Truck delay increased time-sensitive handling risk")
    shelf_life = CROP_SHELF_LIFE_DAYS.get(request.crop.lower(), 7)
    if shelf_life <= 4:
        score += 20
        timeline.append("Short crop shelf life requires faster handling")
    elif shelf_life <= 7:
        score += 10
    return min(100, round(score, 1))


def _storage_score(request: DecisionRequest, timeline: list[str]) -> float:
    """Score storage constraints; higher scores mean greater storage urgency."""
    score = 0.0
    if not request.storage_available:
        score += 60
        timeline.append("Storage unavailable")
    if request.storage_utilization >= 90:
        score += 25
        timeline.append("Available storage is near capacity")
    elif request.storage_utilization >= 70:
        score += 15
    if request.distance_to_storage_km >= 100:
        score += 15
    elif request.distance_to_storage_km >= 30:
        score += 8
    return min(100, round(score, 1))


def _market_score(request: DecisionRequest, timeline: list[str]) -> float:
    """Score the commercial opportunity of serving the target market."""
    score = {MarketDemand.HIGH: 65, MarketDemand.MEDIUM: 40, MarketDemand.LOW: 15}[request.market_demand]
    target_is_export = _is_export_market(request.target_market)
    if request.market_demand is MarketDemand.HIGH:
        timeline.append(f"{request.target_market} demand is high")
    if target_is_export:
        score += 20
        timeline.append("Target market is an export destination")
    if request.export_priority:
        score += 15
        timeline.append("Export shipment is prioritized")
    return min(100, round(score, 1))


def _transport_score(request: DecisionRequest, timeline: list[str]) -> float:
    """Score transport constraints; higher scores mean greater transport urgency."""
    score = min(35, request.truck_delay_hours * 7)
    if request.travel_distance_km >= 2000:
        score += 30
    elif request.travel_distance_km >= 500:
        score += 15
    if not request.cold_transport_available:
        score += 35
        timeline.append("Refrigerated transport is not currently available")
    return min(100, round(score, 1))


def _priority_for_score(score: float) -> Priority:
    """Map the weighted decision score to the specified urgency levels."""
    if score >= 90:
        return Priority.CRITICAL
    if score >= 75:
        return Priority.HIGH
    if score >= 50:
        return Priority.MEDIUM
    return Priority.LOW


def _recommendations(
    request: DecisionRequest,
    priority: Priority,
    spoilage_score: float,
    transport_score: float,
) -> dict[str, str]:
    """Build deterministic operational recommendations from calculated scores."""
    urgent = priority in {Priority.CRITICAL, Priority.HIGH}
    harvest_time = "Harvest immediately" if spoilage_score >= 50 else "Delay harvest until morning"
    transport = (
        "Use refrigerated transport"
        if transport_score >= 50 or spoilage_score >= 50
        else "Use standard transport and monitor conditions"
    )
    storage = (
        "Move directly to export storage"
        if request.storage_available and _is_export_market(request.target_market)
        else "Arrange nearest available cold storage"
        if not request.storage_available
        else "Use available cold storage"
    )
    destination = (
        f"Export to {request.target_market}"
        if _is_export_market(request.target_market) and request.market_demand is not MarketDemand.LOW
        else "Redirect to domestic market"
    )
    action = "Expedite harvest and dispatch" if urgent else "Follow a monitored dispatch plan"
    directive = f"{action}: {harvest_time.lower()}, then {transport.lower()}."
    return {
        "directive": directive,
        "action": action,
        "harvest_time": harvest_time,
        "transport": transport,
        "storage": storage,
        "destination": destination,
    }


def _is_export_market(target_market: str) -> bool:
    """Identify mock export markets without relying on an external service."""
    export_markers = ("singapore", "export", "international", "dubai", "london")
    return any(marker in target_market.lower() for marker in export_markers)
