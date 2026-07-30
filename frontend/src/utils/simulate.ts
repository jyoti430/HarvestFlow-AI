import type { SimulationResult, SimulationScenario } from "@/types";

/**
 * Deterministic mock model that computes a directive for a scenario.
 * Replaced by FastAPI `/simulation/run` when live data is enabled.
 */
export function runSimulation(s: SimulationScenario): SimulationResult {
  const stress =
    (s.temperature - 20) * 0.6 +
    (s.humidity - 60) * 0.2 +
    s.rain * 0.15 +
    s.truckDelay * 0.1 -
    s.storageAvail * 0.15 -
    s.marketDemand * 0.2;

  const confidence = clamp(Math.round(94 - stress * 0.6), 52, 98);
  const expectedRevenue = Math.max(2, Math.round(24 - stress * 0.25));
  const spoilageRisk = clamp(Math.round(18 + stress * 0.5), 6, 48);
  const carbonImpact = Math.max(0.3, +(2.1 - stress * 0.02).toFixed(1));

  const action =
    stress > 30
      ? "Delay harvest 24h, pre-cool at packhouse, hold market entry"
      : stress > 10
      ? "Split shipment, dispatch reefer Container RF-118, prioritize domestic channel"
      : "Prioritize export shipment through JNPT Port";

  const market =
    s.marketDemand > 75
      ? "Singapore Fresh Produce Hub"
      : s.marketDemand > 50
      ? "Mombasa Export · Reefer"
      : "Regional Processor · Volume";

  let priority: "Critical" | "High" | "Medium" | "Low";

  if (confidence >= 95) {
    priority = "Critical";
  } else if (confidence >= 90) {
    priority = "High";
  } else if (confidence >= 75) {
    priority = "Medium";
  } else {
    priority = "Low";
  }

  return {
    action,
    priority,
    harvestTime: s.temperature > 28 ? "Tomorrow 04:30 – 06:00" : "Tomorrow 05:30 – 07:00",
    truck: s.truckDelay > 90 ? "Container RF-121 · Reefer 14t · 2°C (rerouted)" : "Container RF-118 · Reefer 14t · 2°C",
    storage: s.storageAvail > 40 ? "Nashik Cold Storage Hub · Bay 04" : "Nakuru Packhouse · Bay 02",
    market,
    confidence,
    revenue: `+$${(expectedRevenue * 1000).toLocaleString()}`,
    spoilage: `−${100 - spoilageRisk}%`,
    carbon: `−${carbonImpact} t CO₂e`,
    reasoning:
      "Simulation adjusts weather stress, transport reliability, storage headroom and market demand against the shelf-life model. Recommendations rebalance in real time as constraints change.",
    expectedRevenue,
    spoilageRisk,
    carbonImpact,
  };
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
