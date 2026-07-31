import { Warehouse } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { ProgressBar } from "@/components/common/ProgressBar";
import { capacityTone } from "@/utils/tones";
import type { StorageFacility } from "@/types";

export function StorageCard({ items }: { items: StorageFacility[] }) {
  return (
    <SectionCard title="Cold Storage Utilization" subtitle="Live capacity across regional facilities">
      {items.length === 0 ? (
        <div className="flex min-h-24 items-center justify-center gap-2 rounded-md border border-dashed px-3 py-6 text-sm text-muted-foreground">
          <Warehouse className="h-4 w-4" />
          <span>No cold storage available</span>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((s) => (
            <StorageRow key={s.facility} facility={s} />
          ))}
        </div>
      )}
    </SectionCard>
  );
}

function StorageRow({ facility }: { facility: StorageFacility }) {
  const pct = Math.round((facility.used / facility.capacity) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="font-medium text-foreground">{facility.facility}</span>
        <span className="text-muted-foreground tabular-nums">
          {facility.used} / {facility.capacity} t · {facility.temp}°C
        </span>
      </div>
      <ProgressBar value={pct} tone={capacityTone(pct)} />
    </div>
  );
}
