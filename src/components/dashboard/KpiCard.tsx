import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: LucideIcon;
  tone?: "default" | "ai" | "warning" | "critical";
}) {
  const toneMap = {
    default: "bg-primary/10 text-primary",
    ai: "bg-ai/10 text-ai",
    warning: "bg-warning/15 text-warning",
    critical: "bg-critical/10 text-critical",
  };
  const positive = trend === "up";
  return (
    <Card className="p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <div className={"h-8 w-8 rounded-md flex items-center justify-center " + toneMap[tone]}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div
        className={
          "inline-flex items-center gap-1 text-xs font-medium " +
          (positive ? "text-primary" : "text-critical")
        }
      >
        {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
        <span>{delta}</span>
        <span className="text-muted-foreground font-normal">vs last week</span>
      </div>
    </Card>
  );
}
