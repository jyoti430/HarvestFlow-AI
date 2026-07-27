import type { Tone } from "@/types";
import { toneFill } from "@/utils/tones";

export function ProgressBar({
  value,
  tone = "primary",
  className = "",
}: {
  /** 0 – 100 */
  value: number;
  tone?: Tone;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={"h-1.5 rounded-full bg-muted overflow-hidden " + className}>
      <div className={"h-full transition-[width] " + toneFill[tone]} style={{ width: pct + "%" }} />
    </div>
  );
}
