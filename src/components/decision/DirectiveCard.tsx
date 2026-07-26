import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { Sparkles, Truck, Warehouse, Store, Clock, Leaf, DollarSign, ShieldCheck } from "lucide-react";

export type Directive = {
  action: string;
  harvestTime: string;
  truck: string;
  storage: string;
  market: string;
  confidence: number;
  revenue: string;
  spoilage: string;
  carbon: string;
  reasoning: string;
};

const rows = [
  { key: "harvestTime", label: "Recommended Harvest Time", icon: Clock },
  { key: "truck", label: "Assigned Truck", icon: Truck },
  { key: "storage", label: "Assigned Cold Storage", icon: Warehouse },
  { key: "market", label: "Recommended Market", icon: Store },
] as const;

export function DirectiveCard({ directive }: { directive: Directive }) {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="bg-ai text-ai-foreground px-6 py-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-md bg-white/15 flex items-center justify-center">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-wider opacity-80">AI Directive</div>
          <div className="text-base font-semibold leading-tight">{directive.action}</div>
        </div>
        <Badge className="bg-white/15 hover:bg-white/15 text-ai-foreground border-0">Priority · High</Badge>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rows.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
                <div className="text-sm font-medium mt-0.5">{directive[key]}</div>
              </div>
            </div>
          ))}
        </div>

        <ConfidenceMeter value={directive.confidence} />

        <div className="grid grid-cols-3 gap-3">
          <ImpactStat icon={DollarSign} label="Revenue Impact" value={directive.revenue} tone="primary" />
          <ImpactStat icon={ShieldCheck} label="Spoilage Reduction" value={directive.spoilage} tone="ai" />
          <ImpactStat icon={Leaf} label="Carbon Reduction" value={directive.carbon} tone="primary" />
        </div>

        <div className="rounded-md border bg-muted/40 p-4">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1.5">Reasoning</div>
          <p className="text-sm leading-relaxed text-foreground/90">{directive.reasoning}</p>
        </div>
      </div>
    </Card>
  );
}

function ImpactStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
  tone: "primary" | "ai";
}) {
  const t = tone === "primary" ? "text-primary bg-primary/10" : "text-ai bg-ai/10";
  return (
    <div className="rounded-md border p-3">
      <div className={"h-7 w-7 rounded-md flex items-center justify-center mb-2 " + t}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold mt-0.5">{value}</div>
    </div>
  );
}
