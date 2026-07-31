import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScenarioControls } from "@/components/simulation/ScenarioControls";
import { SimulationMetrics } from "@/components/simulation/SimulationMetrics";
import { DirectiveCard } from "@/components/decision/DirectiveCard";
import { BackendErrorCard } from "@/components/common/BackendErrorCard";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";
import { defaultScenario } from "@/data";
import { useRegion, type Region } from "@/contexts/RegionContext";
import { useSimulation } from "@/hooks/useHarvestFlow";
import type { SimulationScenario } from "@/types";

export function SimulationLab() {
  const { selectedRegion } = useRegion();
  const [scenario, setScenario] = useState<SimulationScenario>(() => buildScenarioForRegion(selectedRegion));
  const { data: result, isLoading, isError, refetch } = useSimulation(scenario);

  useEffect(() => {
    setScenario(buildScenarioForRegion(selectedRegion));
  }, [selectedRegion]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Live Scenario Simulation"
        subtitle={`Test operational scenarios for ${selectedRegion}. The AI directive rebalances against your constraints.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <ScenarioControls
            scenario={scenario}
            onChange={setScenario}
            onRun={() => refetch()}
            onReset={() => setScenario(buildScenarioForRegion(selectedRegion))}
          />
        </div>
        <div className="lg:col-span-3 space-y-6">
          {isLoading ? (
            <>
              <SectionSkeleton rows={6} />
              <SectionSkeleton rows={4} />
            </>
          ) : isError || !result ? (
            <BackendErrorCard onRetry={() => void refetch()} />
          ) : (
            <>
              <DirectiveCard directive={result} />
              <SimulationMetrics result={result} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function buildScenarioForRegion(region: Region): SimulationScenario {
  if (region === "All Regions") {
    return defaultScenario;
  }

  const regionPresets: Record<Exclude<Region, "All Regions">, SimulationScenario> = {
    Nashik: {
      temperature: 28,
      humidity: 60,
      rain: 18,
      truckDelay: 24,
      storageAvail: 76,
      marketDemand: 84,
    },
    Pune: {
      temperature: 26,
      humidity: 58,
      rain: 25,
      truckDelay: 32,
      storageAvail: 68,
      marketDemand: 76,
    },
    Bengaluru: {
      temperature: 30,
      humidity: 65,
      rain: 20,
      truckDelay: 18,
      storageAvail: 63,
      marketDemand: 72,
    },
    Hyderabad: {
      temperature: 27,
      humidity: 57,
      rain: 22,
      truckDelay: 20,
      storageAvail: 74,
      marketDemand: 80,
    },
  };

  return regionPresets[region];
}
