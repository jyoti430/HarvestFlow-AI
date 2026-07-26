import { DollarSign, Leaf, ShieldCheck, type LucideIcon } from "lucide-react";
import type { DecisionDirective, Tone } from "@/types";
import { toneSurface } from "@/utils/tones";

interface Item {
  key: keyof Pick<DecisionDirective, "revenue" | "spoilage" | "carbon">;
  label: string;
  icon: LucideIcon;
  tone: Tone;
}

const items: readonly Item[] = [
  { key: "revenue", label: "Revenue Impact", icon: DollarSign, tone: "primary" },
  { key: "spoilage", label: "Spoilage Reduction", icon: ShieldCheck, tone: "ai" },
  { key: "carbon", label: "Carbon Reduction", icon: Leaf, tone: "primary" },
];

export function DirectiveImpact({ directive }: { directive: DecisionDirective }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ key, label, icon: Icon, tone }) => (
        <div key={key} className="rounded-md border p-3">
          <div className={"h-7 w-7 rounded-md flex items-center justify-center mb-2 " + toneSurface[tone]}>
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="text-sm font-semibold mt-0.5 tabular-nums">{directive[key]}</div>
        </div>
      ))}
    </div>
  );
}
