import { apiClient } from "./apiClient";
import type { SimulationResult, SimulationScenario } from "@/types";

export const simulationService = {
  /** POST /api/v1/simulation/run */
  run(scenario: SimulationScenario): Promise<SimulationResult> {
    return apiClient.post<SimulationResult, SimulationScenario>("/api/v1/simulation/run", scenario);
  },
};
