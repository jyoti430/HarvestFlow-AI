import type { Tone } from "@/types";
import { toneSurface } from "@/utils/tones";

export function StatusBadge({
  label,
  tone,
  className = "",
}: {
  label: string;
  tone: Tone;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-block px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold " +
        toneSurface[tone] +
        (className ? " " + className : "")
      }
    >
      {label}
    </span>
  );
}
