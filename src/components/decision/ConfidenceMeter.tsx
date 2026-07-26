import type { Tone } from "@/types";
import { toneFill, confidenceTone } from "@/utils/tones";

export function ConfidenceMeter({ value }: { value: number }) {
  const tone: Tone = confidenceTone(value);
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Model confidence</span>
        <span className="text-sm font-semibold tabular-nums">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className={"h-full " + toneFill[tone]} style={{ width: value + "%" }} />
      </div>
    </div>
  );
}
