import { Sparkles } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Directive, DirectiveStatus, Tone } from "@/types";

const statusTone: Record<DirectiveStatus, Tone> = {
  active: "ai",
  pending: "warning",
  completed: "primary",
};

export function DirectivesFeed({ items }: { items: Directive[] }) {
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
      {items.length === 0 ? (
        <div className="flex min-h-24 items-center justify-center gap-2 rounded-md border border-dashed px-3 py-6 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <span>No active AI directives</span>
        </div>
      ) : (
        <div className="divide-y">
          {items.map((d) => (
            <DirectiveRow key={d.id} directive={d} />
          ))}
        </div>
      )}
    </SectionCard>
  );
}

function DirectiveRow({ directive }: { directive: Directive }) {
  return (
    <div className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
      <div className="h-8 w-8 shrink-0 rounded-md bg-ai/10 text-ai flex items-center justify-center text-[10px] font-semibold">
        {directive.id.slice(-3)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">{directive.crop}</span>
          <span className="text-[11px] text-muted-foreground">· {directive.region}</span>
          <StatusBadge label={directive.status} tone={statusTone[directive.status]} className="ml-auto" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{directive.action}</p>
        <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground flex-wrap">
          <span>
            Confidence <span className="text-foreground font-medium">{directive.confidence}%</span>
          </span>
          <span>
            Impact <span className="text-primary font-medium">{directive.impact}</span>
          </span>
          <span className="ml-auto">{directive.time}</span>
        </div>
      </div>
    </div>
  );
}
