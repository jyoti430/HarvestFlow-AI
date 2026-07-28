import { apiClient } from "./apiClient";
import type { DecisionDirective, DecisionInputs, TimelineStep } from "@/types";

export interface OptimizeResponse {
  directive: DecisionDirective & {
    priority: "Critical" | "High" | "Medium" | "Low";
  };
  timeline: TimelineStep[];
}

interface BackendDecisionResponse {
  directive: string;
  action: string;
  harvest_time: string;
  transport: string;
  storage: string;
  destination: string;
  overall_score: number;
  confidence: number;
  priority: "Critical" | "High" | "Medium" | "Low";
  reasoning: string[];
  estimated_revenue_gain: number;
  estimated_spoilage_reduction: number;
  estimated_carbon_reduction: number;
}

interface BackendDecisionRequest {
  crop: string;
  quantity: number;
  unit: "tons";
  origin: string;
  target_market: string;
  harvest_date: string;
  storage_available: boolean;
  storage_utilization: number;
  distance_to_storage_km: number;
  truck_delay_hours: number;
  travel_distance_km: number;
  cold_transport_available: boolean;
  export_priority: boolean;
  market_demand: "High" | "Medium" | "Low";
}

/** Convert the unchanged decision form values into the backend API contract. */
function toBackendRequest(inputs: DecisionInputs): BackendDecisionRequest {
  return {
    crop: inputs.crop,
    quantity: inputs.quantity,
    unit: "tons",
    origin: inputs.origin,
    target_market: inputs.destination,
    harvest_date: inputs.harvestDate,
    storage_available: inputs.storageAvailable,
    storage_utilization: inputs.storageUtilization,
    distance_to_storage_km: inputs.distanceToStorageKm,
    truck_delay_hours: inputs.truckDelayHours,
    travel_distance_km: inputs.travelDistanceKm,
    cold_transport_available: inputs.coldTransportAvailable,
    export_priority: inputs.exportPriority,
    market_demand: inputs.marketDemand,
  };
}

function toTimeline(reasoning: string[]): TimelineStep[] {
  return reasoning.map((detail, index) => ({
    key: `decision-${index}`,
    title: index === reasoning.length - 1 ? "Decision Signal" : "Operational Signal",
    detail,
    icon: /storage/i.test(detail) ? "storage" : /demand|market|export/i.test(detail) ? "market" : /delay|time/i.test(detail) ? "clock" : "weather",
    tone: /unavailable|risk|delay/i.test(detail) ? "warning" : "ai",
  }));
}

function toOptimizeResponse(response: BackendDecisionResponse): OptimizeResponse {
  return {
    directive: {
      action: response.action,
      priority: response.priority,
      harvestTime: response.harvest_time,
      truck: response.transport,
      storage: response.storage,
      market: response.destination,
      confidence: response.confidence,
      revenue: `+${response.estimated_revenue_gain}%`,
      spoilage: `-${response.estimated_spoilage_reduction}%`,
      carbon: `-${response.estimated_carbon_reduction}%`,
      reasoning: response.reasoning.join(" "),
    },
    timeline: toTimeline(response.reasoning),
  };
}

export const decisionService = {
  /** POST /api/v1/decision */
  async optimize(inputs: DecisionInputs): Promise<OptimizeResponse> {
    const response = await apiClient.post<BackendDecisionResponse, BackendDecisionRequest>(
      "/api/v1/decision",
      toBackendRequest(inputs),
    );
    return toOptimizeResponse(response);
  },
};
