import { DecisionForm } from "@/components/decision/DecisionForm";
import { DirectiveCard } from "@/components/decision/DirectiveCard";
import { DecisionTimeline } from "@/components/decision/DecisionTimeline";

const directive = {
  action: "Harvest at dawn, dispatch reefer TR-118, deliver to Nairobi wholesale",
  harvestTime: "Tomorrow 05:30 – 07:00",
  truck: "TR-118 · Reefer 14t · 2°C",
  storage: "Nairobi Cold Hub A · Bay 04",
  market: "Nairobi Wholesale · Grade A channel",
  confidence: 94,
  revenue: "+$18,400",
  spoilage: "−32%",
  carbon: "−1.8 t CO₂e",
  reasoning:
    "Dawn harvest reduces field heat load by 4.6°C, preserving shelf life. Rerouting via TR-118 avoids the delayed Kirinyaga corridor and meets the Nairobi wholesale morning window where price is up 6.3% week-over-week. Cold Hub A has bay capacity and matches the 2–4°C ideal for tomato storage.",
};

export function DecisionEngine() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Decision Engine</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide operational inputs. HarvestFlow AI computes the optimal end-to-end directive.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <DecisionForm />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <DirectiveCard directive={directive} />
          <DecisionTimeline />
        </div>
      </div>
    </div>
  );
}
