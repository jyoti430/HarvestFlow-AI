import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";
import { crops, destinations, origins, storagePreferences } from "@/data";
import type { DecisionInputs } from "@/types";

const selectClass =
  "w-full h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const defaultInputs: DecisionInputs = {
  crop: crops[0],
  quantity: 12,
  origin: origins[0],
  destination: destinations[0],
  harvestDate: new Date().toISOString().slice(0, 10),
  storagePreference: storagePreferences[0],
  storageAvailable: true,
  storageUtilization: 50,
  distanceToStorageKm: 20,
  truckDelayHours: 0,
  travelDistanceKm: 400,
  coldTransportAvailable: true,
  exportPriority: true,
  marketDemand: "High",
};

export function DecisionForm({
  onOptimize,
  isLoading = false,
}: {
  onOptimize?: (inputs: DecisionInputs) => Promise<void>;
  isLoading?: boolean;
}) {
  const [inputs, setInputs] = useState<DecisionInputs>(defaultInputs);
  const set = <K extends keyof DecisionInputs>(k: K, v: DecisionInputs[K]) =>
    setInputs((s) => ({ ...s, [k]: v }));

  return (
    <Card className="p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold">Decision Inputs</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Provide operational context. The AI will compute the optimal directive.
        </p>
      </div>

      <div className="space-y-4">
        <Field label="Crop">
          <select
            className={selectClass}
            value={inputs.crop}
            onChange={(e) => set("crop", e.target.value)}
          >
            {crops.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Quantity (tonnes)">
            <Input
              type="number"
              min={1}
              value={inputs.quantity}
              onChange={(e) => set("quantity", Number(e.target.value))}
            />
          </Field>
          <Field label="Harvest Date">
            <Input
              type="date"
              value={inputs.harvestDate}
              onChange={(e) => set("harvestDate", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Origin">
          <select
            className={selectClass}
            value={inputs.origin}
            onChange={(e) => set("origin", e.target.value)}
          >
            {origins.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Destination">
          <select
            className={selectClass}
            value={inputs.destination}
            onChange={(e) => set("destination", e.target.value)}
          >
            {destinations.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Storage Preference">
          <select
            className={selectClass}
            value={inputs.storagePreference}
            onChange={(e) => set("storagePreference", e.target.value)}
          >
            {storagePreferences.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Storage Utilization (%)">
            <Input
              type="number"
              min={0}
              max={100}
              value={inputs.storageUtilization}
              onChange={(e) => set("storageUtilization", Number(e.target.value))}
            />
          </Field>
          <Field label="Distance to Storage (km)">
            <Input
              type="number"
              min={0}
              value={inputs.distanceToStorageKm}
              onChange={(e) => set("distanceToStorageKm", Number(e.target.value))}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Truck Delay (hours)">
            <Input
              type="number"
              min={0}
              value={inputs.truckDelayHours}
              onChange={(e) => set("truckDelayHours", Number(e.target.value))}
            />
          </Field>
          <Field label="Travel Distance (km)">
            <Input
              type="number"
              min={0}
              value={inputs.travelDistanceKm}
              onChange={(e) => set("travelDistanceKm", Number(e.target.value))}
            />
          </Field>
        </div>

        <Field label="Market Demand">
          <select
            className={selectClass}
            value={inputs.marketDemand}
            onChange={(e) => set("marketDemand", e.target.value as DecisionInputs["marketDemand"])}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </Field>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Toggle
            label="Cold storage available"
            checked={inputs.storageAvailable}
            onCheckedChange={(checked) => set("storageAvailable", checked)}
          />
          <Toggle
            label="Refrigerated transport available"
            checked={inputs.coldTransportAvailable}
            onCheckedChange={(checked) => set("coldTransportAvailable", checked)}
          />
          <Toggle
            label="Prioritize export shipment"
            checked={inputs.exportPriority}
            onCheckedChange={(checked) => set("exportPriority", checked)}
          />
        </div>
      </div>

      <Button onClick={() => void onOptimize?.(inputs)} disabled={isLoading} className="w-full h-11 gap-2">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {isLoading ? "Generating AI Directive..." : "Generate AI Directive"}
      </Button>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Label className="flex items-center gap-2 rounded-md border p-3 text-xs font-normal text-foreground cursor-pointer">
      <Checkbox checked={checked} onCheckedChange={(value) => onCheckedChange(value === true)} />
      {label}
    </Label>
  );
}
