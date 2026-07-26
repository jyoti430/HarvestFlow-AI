import { SectionCard } from "./SectionCard";
import { directives } from "@/data/mock";
import { Sparkles } from "lucide-react";

const statusTone: Record<string, string> = {
  active: "bg-ai/10 text-ai",
  pending: "bg-warning/15 text-warning",
  completed: "bg-primary/10 text-primary",
};

export function DirectivesFeed() {
  return (
    <SectionCard
      title="Recent AI Directives"
      subtitle="Auto-generated operational recommendations"
      action={
        <span className="inline-flex items-center gap-1.5 text-[11px] text-ai font-medium">
          <Sparkles className="h-3 w-3" /> AI live
        </span>
      }
    >
      <div className="divide-y">
        {directives.map((d) => (
          <div key={d.id} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
            <div className="h-8 w-8 shrink-0 rounded-md bg-ai/10 text-ai flex items-center justify-center text-[10px] font-semibold">
              {d.id.slice(-3)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{d.crop}</span>
                <span className="text-[11px] text-muted-foreground">· {d.region}</span>
                <span className={"ml-auto px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold " + statusTone[d.status]}>
                  {d.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{d.action}</p>
              <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                <span>Confidence <span className="text-foreground font-medium">{d.confidence}%</span></span>
                <span>Impact <span className="text-primary font-medium">{d.impact}</span></span>
                <span className="ml-auto">{d.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
