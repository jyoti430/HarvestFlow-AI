import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RefreshCw, Play } from "lucide-react";

export type Scenario = {
  temperature: number;
  humidity: number;
  rain: number;
  truckDelay: number;
  storageAvail: number;
  marketDemand: number;
};

export const defaultScenario: Scenario = {
  temperature: 24,
  humidity: 62,
  rain: 20,
  truckDelay: 15,
  storageAvail: 70,
  marketDemand: 80,
};

export function ScenarioControls({
  scenario,
  onChange,
  onRun,
  onReset,
}: {
  scenario: Scenario;
  onChange: (s: Scenario) => void;
  onRun: () => void;
  onReset: () => void;
}) {
  const set = (k: keyof Scenario) => (v: number[]) => onChange({ ...scenario, [k]: v[0] });
  return (
    <Card className="p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold">Scenario Controls</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Adjust variables to stress-test the AI directive.</p>
      </div>

      <Row label="Temperature" value={`${scenario.temperature}°C`}>
        <Slider min={10} max={40} step={1} value={[scenario.temperature]} onValueChange={set("temperature")} />
      </Row>
      <Row label="Humidity" value={`${scenario.humidity}%`}>
        <Slider min={20} max={95} step={1} value={[scenario.humidity]} onValueChange={set("humidity")} />
      </Row>
      <Row label="Rain Probability" value={`${scenario.rain}%`}>
        <Slider min={0} max={100} step={1} value={[scenario.rain]} onValueChange={set("rain")} />
      </Row>
      <Row label="Truck Delay" value={`${scenario.truckDelay} min`}>
        <Slider min={0} max={240} step={5} value={[scenario.truckDelay]} onValueChange={set("truckDelay")} />
      </Row>
      <Row label="Storage Availability" value={`${scenario.storageAvail}%`}>
        <Slider min={0} max={100} step={1} value={[scenario.storageAvail]} onValueChange={set("storageAvail")} />
      </Row>
      <Row label="Market Demand" value={`${scenario.marketDemand}%`}>
        <Slider min={0} max={100} step={1} value={[scenario.marketDemand]} onValueChange={set("marketDemand")} />
      </Row>

      <div className="flex gap-2 pt-2">
        <Button onClick={onRun} className="flex-1 gap-2"><Play className="h-4 w-4" />Run Simulation</Button>
        <Button variant="outline" onClick={onReset} className="gap-2"><RefreshCw className="h-4 w-4" />Reset</Button>
      </div>
    </Card>
  );
}

function Row({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
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
