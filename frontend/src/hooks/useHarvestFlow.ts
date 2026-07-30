import { useQuery } from "@tanstack/react-query";
import {
  dashboardService,
  decisionService,
  healthService,
  impactService,
  simulationService,
} from "@/services";
import type { DecisionInputs, SimulationScenario } from "@/types";

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: () => dashboardService.getOverview(),
  });
}

export function useBackendHealth() {
  return useQuery({
    queryKey: ["backend", "health"],
    queryFn: () => healthService.check(),
    refetchInterval: 30_000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useOptimizeDirective(inputs: DecisionInputs | null) {
  return useQuery({
    queryKey: ["decision", "optimize", inputs],
    queryFn: () => decisionService.optimize(inputs!),
    enabled: inputs != null,
  });
}

export function useSimulation(scenario: SimulationScenario) {
  return useQuery({
    queryKey: ["simulation", scenario],
    queryFn: () => simulationService.run(scenario),
    // Keep previous result visible while recomputing.
    placeholderData: (prev) => prev,
  });
}

export function useImpactOverview() {
  return useQuery({
    queryKey: ["impact", "overview"],
    queryFn: () => impactService.getOverview(),
  });
}
