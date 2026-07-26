import { SectionCard } from "./SectionCard";
import { weather } from "@/data/mock";
import { CloudRain, Droplets, Thermometer } from "lucide-react";

const riskTone: Record<string, string> = {
  low: "bg-primary/10 text-primary",
  moderate: "bg-warning/15 text-warning",
  high: "bg-critical/10 text-critical",
};

export function WeatherCard() {
  return (
    <SectionCard title="Regional Weather" subtitle="24-hour outlook by source region">
      <div className="space-y-3">
        {weather.map((w) => (
          <div key={w.region} className="flex items-center justify-between text-sm">
            <div className="font-medium">{w.region}</div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Thermometer className="h-3 w-3" />{w.temp}°</span>
              <span className="inline-flex items-center gap-1"><Droplets className="h-3 w-3" />{w.humidity}%</span>
              <span className="inline-flex items-center gap-1"><CloudRain className="h-3 w-3" />{w.rain}%</span>
              <span className={"px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold " + riskTone[w.risk]}>
                {w.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
