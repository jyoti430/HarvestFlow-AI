import { CheckCircle2, Clock, CloudRain, Store, Warehouse, type LucideIcon } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { toneOutline } from "@/utils/tones";
import type { TimelineStep } from "@/types";

const iconMap: Record<TimelineStep["icon"], LucideIcon> = {
  weather: CloudRain,
  clock: Clock,
  storage: Warehouse,
  market: Store,
  check: CheckCircle2,
};

export function DecisionTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <SectionCard title="Decision Timeline" subtitle="How the AI reached this recommendation">
      <ol className="relative space-y-4">
        {steps.map((step, i) => (
          <TimelineNode key={step.key} step={step} last={i === steps.length - 1} />
        ))}
      </ol>
    </SectionCard>
  );
}

function TimelineNode({ step, last }: { step: TimelineStep; last: boolean }) {
  const Icon = iconMap[step.icon];
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={"h-9 w-9 rounded-md border flex items-center justify-center " + toneOutline[step.tone]}>
          <Icon className="h-4 w-4" />
        </div>
        {!last && <div className="flex-1 w-px bg-border my-1" />}
      </div>
      <div className="flex-1 pb-2">
        <div className="text-sm font-semibold">{step.title}</div>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
      </div>
    </li>
  );
}
