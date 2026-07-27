import { DollarSign, Gauge, Leaf, ShieldCheck } from "lucide-react";
import { MetricTile } from "@/components/common/MetricTile";
import type { SimulationResult } from "@/types";

export function SimulationMetrics({ result }: { result: SimulationResult }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricTile
        icon={DollarSign}
        label="Expected Revenue"
        value={`$${(result.expectedRevenue * 1000).toLocaleString()}`}
        tone="primary"
      />
      <MetricTile
        icon={ShieldCheck}
        label="Spoilage Risk"
        value={`${result.spoilageRisk}%`}
        tone="critical"
      />
      <MetricTile
        icon={Leaf}
        label="Carbon Impact"
        value={`−${result.carbonImpact} t`}
        tone="primary"
      />
      <MetricTile
        icon={Gauge}
        label="Confidence"
        value={`${result.confidence}%`}
        tone="ai"
      />
    </div>
  );
}
