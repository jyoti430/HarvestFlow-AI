import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/types";
import { toneSurface } from "@/utils/tones";

export function MetricTile({
  icon: Icon,
  label,
  value,
  sub,
  tone = "primary",
  className = "",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Card className={"p-5 shadow-sm " + className}>
      <div className={"h-9 w-9 rounded-md flex items-center justify-center mb-4 " + toneSurface[tone]}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold tracking-tight mt-1 tabular-nums">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </Card>
  );
}
