import { SectionCard } from "./SectionCard";
import { transport } from "@/data/mock";
import { Truck } from "lucide-react";

const statusTone: Record<string, string> = {
  "in-transit": "bg-ai/10 text-ai",
  loading: "bg-primary/10 text-primary",
  delayed: "bg-critical/10 text-critical",
};

export function TransportCard() {
  return (
    <SectionCard title="Transport Status" subtitle="Active reefer & dispatch fleet">
      <div className="space-y-3">
        {transport.map((t) => (
          <div key={t.id} className="flex items-center gap-3 text-sm">
            <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
              <Truck className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{t.route}</div>
              <div className="text-xs text-muted-foreground truncate">{t.id} · {t.load}</div>
            </div>
            <div className="text-right">
              <span className={"inline-block px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold " + statusTone[t.status]}>
                {t.status}
              </span>
              <div className="text-xs text-muted-foreground mt-0.5">ETA {t.eta}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
