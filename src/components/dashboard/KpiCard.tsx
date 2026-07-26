import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, AlertTriangle, Sparkles, Warehouse, DollarSign, type LucideIcon } from "lucide-react";
import type { Kpi } from "@/types";
import { toneSurface } from "@/utils/tones";

const iconMap: Record<string, LucideIcon> = {
  risk: AlertTriangle,
  directives: Sparkles,
  storage: Warehouse,
  revenue: DollarSign,
};

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = iconMap[kpi.key] ?? Sparkles;
  const positive = kpi.trend === "up";
  return (
    <Card className="p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {kpi.label}
        </span>
        <div className={"h-8 w-8 rounded-md flex items-center justify-center " + toneSurface[kpi.tone]}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-2xl font-semibold tracking-tight tabular-nums">{kpi.value}</div>
      <div
        className={
          "inline-flex items-center gap-1 text-xs font-medium " +
          (positive ? "text-primary" : "text-critical")
        }
      >
        {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
        <span>{kpi.delta}</span>
        <span className="text-muted-foreground font-normal">vs last week</span>
      </div>
    </Card>
  );
}

export function KpiGrid({ items }: { items: Kpi[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((k) => (
        <KpiCard key={k.key} kpi={k} />
      ))}
    </div>
  );
}
