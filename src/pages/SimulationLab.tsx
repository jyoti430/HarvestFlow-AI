import { useMemo, useState } from "react";
import { ScenarioControls, defaultScenario, type Scenario } from "@/components/simulation/ScenarioControls";
import { DirectiveCard } from "@/components/decision/DirectiveCard";
import { Card } from "@/components/ui/card";
import { DollarSign, ShieldCheck, Leaf, Gauge } from "lucide-react";

function computeDirective(s: Scenario) {
  const stress =
    (s.temperature - 20) * 0.6 +
    (s.humidity - 60) * 0.2 +
    s.rain * 0.15 +
    s.truckDelay * 0.1 -
    s.storageAvail * 0.15 -
    s.marketDemand * 0.2;

  const confidence = Math.max(52, Math.min(98, Math.round(94 - stress * 0.6)));
  const revenue = Math.max(2, Math.round(24 - stress * 0.25));
  const spoilage = Math.max(6, Math.min(48, Math.round(18 + stress * 0.5)));
  const carbon = Math.max(0.3, +(2.1 - stress * 0.02).toFixed(1));

  const action =
    stress > 30
      ? "Delay harvest 24h, pre-cool at packhouse, hold market entry"
      : stress > 10
      ? "Split shipment, dispatch reefer TR-118, prioritize domestic channel"
      : "Harvest at dawn, dispatch reefer TR-118, route to premium export lane";

  const market =
    s.marketDemand > 75 ? "Nairobi Wholesale · Grade A" : s.marketDemand > 50 ? "Mombasa Export · Reefer" : "Regional Processor · Volume";

  return {
    action,
    harvestTime: s.temperature > 28 ? "Tomorrow 04:30 – 06:00" : "Tomorrow 05:30 – 07:00",
    truck: s.truckDelay > 90 ? "TR-121 · Reefer 14t · 2°C (rerouted)" : "TR-118 · Reefer 14t · 2°C",
    storage: s.storageAvail > 40 ? "Nairobi Cold Hub A · Bay 04" : "Nakuru Packhouse · Bay 02",
    market,
    confidence,
    revenue: `+$${(revenue * 1000).toLocaleString()}`,
    spoilage: `−${100 - spoilage}%`,
    carbon: `−${carbon} t CO₂e`,
    reasoning:
      "Simulation adjusts weather stress, transport reliability, storage headroom and market demand against the shelf-life model. Recommendations rebalance in real time as constraints change.",
    _revenue: revenue,
    _spoilage: spoilage,
    _carbon: carbon,
  };
}

export function SimulationLab() {
  const [scenario, setScenario] = useState<Scenario>(defaultScenario);
  const [runs, setRuns] = useState(0);
  const directive = useMemo(() => computeDirective(scenario), [scenario, runs]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Simulation Lab</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Test operational scenarios. The AI directive rebalances against your constraints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <ScenarioControls
            scenario={scenario}
            onChange={setScenario}
            onRun={() => setRuns((r) => r + 1)}
            onReset={() => setScenario(defaultScenario)}
          />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <DirectiveCard directive={directive} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Metric icon={DollarSign} label="Expected Revenue" value={`$${(directive._revenue * 1000).toLocaleString()}`} tone="primary" />
            <Metric icon={ShieldCheck} label="Spoilage Risk" value={`${directive._spoilage}%`} tone="critical" />
            <Metric icon={Leaf} label="Carbon Impact" value={`−${directive._carbon} t`} tone="primary" />
            <Metric icon={Gauge} label="Confidence" value={`${directive.confidence}%`} tone="ai" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, tone }: { icon: typeof DollarSign; label: string; value: string; tone: "primary" | "ai" | "critical" }) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    ai: "bg-ai/10 text-ai",
    critical: "bg-critical/10 text-critical",
  };
  return (
    <Card className="p-4 shadow-sm">
      <div className={"h-8 w-8 rounded-md flex items-center justify-center mb-3 " + toneMap[tone]}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold mt-0.5 tabular-nums">{value}</div>
    </Card>
  );
}
