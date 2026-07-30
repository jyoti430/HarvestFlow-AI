import { CloudRain, Droplets, Thermometer } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Risk, Tone, WeatherReading } from "@/types";

const riskTone: Record<Risk, Tone> = { low: "primary", moderate: "warning", high: "critical" };

export function WeatherCard({ items }: { items: WeatherReading[] }) {
  return (
    <SectionCard title="Regional Weather" subtitle="Live weather across major export hubs">
      <div className="space-y-3">
        {items.map((w) => (
          <WeatherRow key={w.region} reading={w} />
        ))}
      </div>
    </SectionCard>
  );
}

function WeatherRow({ reading }: { reading: WeatherReading }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="font-medium">{reading.region}</div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Thermometer className="h-3 w-3" />
          {reading.temp}°
        </span>
        <span className="inline-flex items-center gap-1">
          <Droplets className="h-3 w-3" />
          {reading.humidity}%
        </span>
        <span className="inline-flex items-center gap-1">
          <CloudRain className="h-3 w-3" />
          {reading.rain}%
        </span>
        <StatusBadge label={reading.risk} tone={riskTone[reading.risk]} />
      </div>
    </div>
  );
}
