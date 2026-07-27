import { Clock, Store, Truck, Warehouse, type LucideIcon } from "lucide-react";
import type { DecisionDirective } from "@/types";

interface Row {
  key: keyof Pick<DecisionDirective, "harvestTime" | "truck" | "storage" | "market">;
  label: string;
  icon: LucideIcon;
}

const rows: readonly Row[] = [
  { key: "harvestTime", label: "Recommended Harvest Time", icon: Clock },
  { key: "truck", label: "Assigned Truck", icon: Truck },
  { key: "storage", label: "Assigned Cold Storage", icon: Warehouse },
  { key: "market", label: "Recommended Market", icon: Store },
];

export function DirectiveActions({ directive }: { directive: DecisionDirective }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rows.map(({ key, label, icon: Icon }) => (
        <div key={key} className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
            <div className="text-sm font-medium mt-0.5 break-words">{directive[key]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
