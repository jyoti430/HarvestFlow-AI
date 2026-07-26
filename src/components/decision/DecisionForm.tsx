import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
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
};

export function DecisionForm({ onOptimize }: { onOptimize?: (inputs: DecisionInputs) => void }) {
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
      </div>

      <Button onClick={() => onOptimize?.(inputs)} className="w-full h-11 gap-2">
        <Sparkles className="h-4 w-4" />
        Run AI Optimization
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
