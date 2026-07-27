import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function ImpactCard({
  icon: Icon,
  label,
  value,
  sub,
  tone = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  tone?: "primary" | "ai" | "warning";
}) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    ai: "bg-ai/10 text-ai",
    warning: "bg-warning/15 text-warning",
  };
  return (
    <Card className="p-5 shadow-sm">
      <div className={"h-9 w-9 rounded-md flex items-center justify-center mb-4 " + toneMap[tone]}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold tracking-tight mt-1">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </Card>
  );
}
