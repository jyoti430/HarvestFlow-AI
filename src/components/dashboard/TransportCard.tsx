import { Truck } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Tone, TransportLeg, TransportStatus } from "@/types";

const statusTone: Record<TransportStatus, Tone> = {
  "in-transit": "ai",
  loading: "primary",
  delayed: "critical",
};

export function TransportCard({ items }: { items: TransportLeg[] }) {
  return (
    <SectionCard title="Transport Status" subtitle="Active reefer & dispatch fleet">
      <div className="space-y-3">
        {items.map((t) => (
          <TransportRow key={t.id} leg={t} />
        ))}
      </div>
    </SectionCard>
  );
}

function TransportRow({ leg }: { leg: TransportLeg }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center shrink-0">
        <Truck className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{leg.route}</div>
        <div className="text-xs text-muted-foreground truncate">
          {leg.id} · {leg.load}
        </div>
      </div>
      <div className="text-right">
        <StatusBadge label={leg.status} tone={statusTone[leg.status]} />
        <div className="text-xs text-muted-foreground mt-0.5">ETA {leg.eta}</div>
      </div>
    </div>
  );
}
