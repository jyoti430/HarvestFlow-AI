import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function DirectiveHeader({
  action,
  priority = "High",
}: {
  action: string;
  priority?: "Critical" | "High" | "Medium" | "Low";
}) {
  return (
    <div className="bg-ai text-ai-foreground px-6 py-4 flex items-center gap-3">
      <div className="h-9 w-9 rounded-md bg-white/15 flex items-center justify-center">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider opacity-80">AI Directive</div>
        <div className="text-base font-semibold leading-tight">{action}</div>
      </div>
      <Badge className="bg-white/15 hover:bg-white/15 text-ai-foreground border-0 shrink-0">
        Priority · {priority}
      </Badge>
    </div>
  );
}
