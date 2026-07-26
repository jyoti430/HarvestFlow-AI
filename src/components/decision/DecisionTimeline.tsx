import { SectionCard } from "@/components/dashboard/SectionCard";
import { CloudRain, Clock, Warehouse, Store, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: CloudRain,
    title: "Weather Risk",
    detail: "Muranga corridor shows 45% rain probability over next 24h. Field spoilage risk +12%.",
    tone: "warning" as const,
  },
  {
    icon: Clock,
    title: "Shelf Life Analysis",
    detail: "Tomato shelf life projected at 6.2 days at 4°C. Buffer of 1.8 days after transport.",
    tone: "ai" as const,
  },
  {
    icon: Warehouse,
    title: "Storage Analysis",
    detail: "Nairobi Cold Hub A at 72% capacity. Sufficient allocation for 12t inbound.",
    tone: "primary" as const,
  },
  {
    icon: Store,
    title: "Demand Analysis",
    detail: "Nairobi Wholesale demand index 92, price up 6.3% week-over-week.",
    tone: "ai" as const,
  },
  {
    icon: CheckCircle2,
    title: "Final Directive",
    detail: "Dispatch reefer TR-118, deliver to Nairobi Cold Hub A by 18:00, route to wholesale channel.",
    tone: "primary" as const,
  },
];

const tones = {
  primary: "bg-primary/10 text-primary border-primary/20",
  ai: "bg-ai/10 text-ai border-ai/20",
  warning: "bg-warning/15 text-warning border-warning/20",
};

export function DecisionTimeline() {
  return (
    <SectionCard title="Decision Timeline" subtitle="How the AI reached this recommendation">
      <ol className="relative space-y-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={"h-9 w-9 rounded-md border flex items-center justify-center " + tones[s.tone]}>
                  <Icon className="h-4 w-4" />
                </div>
                {i < steps.length - 1 && <div className="flex-1 w-px bg-border my-1" />}
              </div>
              <div className="flex-1 pb-2">
                <div className="text-sm font-semibold">{s.title}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </SectionCard>
  );
}
