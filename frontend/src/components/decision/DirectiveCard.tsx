import { Card } from "@/components/ui/card";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { DirectiveHeader } from "./DirectiveHeader";
import { DirectiveActions } from "./DirectiveActions";
import { DirectiveImpact } from "./DirectiveImpact";
import type { DecisionDirective } from "@/types";

type BackendDirective = DecisionDirective & {
  priority: "Critical" | "High" | "Medium" | "Low";
};

export function DirectiveCard({ directive }: { directive: BackendDirective }) {
  return (
    <Card className="overflow-hidden shadow-sm">
      <DirectiveHeader action={directive.action} priority={directive.priority} />
      <div className="p-6 space-y-6">
        <DirectiveActions directive={directive} />
        <ConfidenceMeter value={directive.confidence} />
        <DirectiveImpact directive={directive} />
        <div className="rounded-md border bg-muted/40 p-4">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1.5">Reasoning</div>
          <p className="text-sm leading-relaxed text-foreground/90">{directive.reasoning}</p>
        </div>
      </div>
    </Card>
  );
}
