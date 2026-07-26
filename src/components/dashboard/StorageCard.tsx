import { SectionCard } from "./SectionCard";
import { storage } from "@/data/mock";

export function StorageCard() {
  return (
    <SectionCard title="Cold Storage Utilization" subtitle="Live capacity across regional facilities">
      <div className="space-y-4">
        {storage.map((s) => {
          const pct = Math.round((s.used / s.capacity) * 100);
          const tone = pct > 85 ? "bg-critical" : pct > 70 ? "bg-warning" : "bg-primary";
          return (
            <div key={s.facility}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-foreground">{s.facility}</span>
                <span className="text-muted-foreground">
                  {s.used} / {s.capacity} t · {s.temp}°C
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={"h-full " + tone} style={{ width: pct + "%" }} />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
