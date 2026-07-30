import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ScenarioControls } from "@/components/simulation/ScenarioControls";
import { SimulationMetrics } from "@/components/simulation/SimulationMetrics";
import { DirectiveCard } from "@/components/decision/DirectiveCard";
import { BackendErrorCard } from "@/components/common/BackendErrorCard";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";
import { defaultScenario } from "@/data";
import { useSimulation } from "@/hooks/useHarvestFlow";
import type { SimulationScenario } from "@/types";

export function SimulationLab() {
  const [scenario, setScenario] = useState<SimulationScenario>(defaultScenario);
  const { data: result, isLoading, isError, refetch } = useSimulation(scenario);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Live Scenario Simulation"
        subtitle="Test operational scenarios. The AI directive rebalances against your constraints."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <ScenarioControls
            scenario={scenario}
            onChange={setScenario}
            onRun={() => refetch()}
            onReset={() => setScenario(defaultScenario)}
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
