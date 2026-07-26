import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import type { SimulationScenario } from "@/types";

interface ControlSpec {
  key: keyof SimulationScenario;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const controls: readonly ControlSpec[] = [
  { key: "temperature", label: "Temperature", min: 10, max: 40, step: 1, unit: "°C" },
  { key: "humidity", label: "Humidity", min: 20, max: 95, step: 1, unit: "%" },
  { key: "rain", label: "Rain Probability", min: 0, max: 100, step: 1, unit: "%" },
  { key: "truckDelay", label: "Truck Delay", min: 0, max: 240, step: 5, unit: " min" },
  { key: "storageAvail", label: "Storage Availability", min: 0, max: 100, step: 1, unit: "%" },
  { key: "marketDemand", label: "Market Demand", min: 0, max: 100, step: 1, unit: "%" },
];

export function ScenarioControls({
  scenario,
  onChange,
  onRun,
  onReset,
}: {
  scenario: SimulationScenario;
  onChange: (s: SimulationScenario) => void;
  onRun: () => void;
  onReset: () => void;
}) {
  return (
    <Card className="p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold">Scenario Controls</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Adjust variables to stress-test the AI directive.
        </p>
      </div>

      {controls.map((c) => (
        <Row key={c.key} label={c.label} value={`${scenario[c.key]}${c.unit}`}>
          <Slider
            min={c.min}
            max={c.max}
            step={c.step}
            value={[scenario[c.key]]}
            onValueChange={(v) => onChange({ ...scenario, [c.key]: v[0] })}
          />
        </Row>
      ))}

      <div className="flex gap-2 pt-2">
        <Button onClick={onRun} className="flex-1 gap-2">
          <Play className="h-4 w-4" />
          Run Simulation
        </Button>
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </Card>
  );
}

function Row({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}</span>
      </div>
      {children}
    </div>
  );
}
