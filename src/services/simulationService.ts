import { apiClient, USE_MOCK_DATA } from "./apiClient";
import { runSimulation } from "@/utils/simulate";
import type { SimulationResult, SimulationScenario } from "@/types";

export const simulationService = {
  /** POST /simulation/run */
  run(scenario: SimulationScenario): Promise<SimulationResult> {
    if (USE_MOCK_DATA) {
      return apiClient.mock(runSimulation(scenario), 120);
    }
    return apiClient.post<SimulationResult, SimulationScenario>("/simulation/run", scenario);
  },
};
