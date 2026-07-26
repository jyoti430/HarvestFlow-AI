import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { crops, origins, destinations } from "@/data/mock";
import { Sparkles } from "lucide-react";

export function DecisionForm({ onOptimize }: { onOptimize?: () => void }) {
  return (
    <Card className="p-6 shadow-sm space-y-5">
      <div>
        <h3 className="text-sm font-semibold">Decision Inputs</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Provide operational context. The AI will compute the optimal directive.
        </p>
      </div>

      <div className="space-y-4">
        <Field label="Crop">
          <select className="hf-select">
            {crops.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Quantity (tonnes)">
            <Input type="number" defaultValue={12} />
          </Field>
          <Field label="Harvest Date">
            <Input type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
          </Field>
        </div>

        <Field label="Origin">
          <select className="hf-select">
            {origins.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Destination">
          <select className="hf-select">
            {destinations.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Storage Preference">
          <select className="hf-select">
            <option>Auto-assign (recommended)</option>
            <option>Nairobi Cold Hub A</option>
            <option>Mombasa Reefer Yard</option>
            <option>Nakuru Packhouse</option>
          </select>
        </Field>
      </div>

      <Button onClick={onOptimize} className="w-full h-11 gap-2">
        <Sparkles className="h-4 w-4" />
        Run AI Optimization
      </Button>

      <style>{`
        .hf-select {
          width: 100%;
          height: 2.5rem;
          border-radius: 0.5rem;
          border: 1px solid var(--color-input);
          background: var(--color-background);
          padding: 0 0.75rem;
          font-size: 0.875rem;
        }
      `}</style>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
