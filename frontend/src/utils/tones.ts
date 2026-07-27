import type { Tone } from "@/types";

/** Solid tone (icon on tinted background). */
export const toneSurface: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  ai: "bg-ai/10 text-ai",
  warning: "bg-warning/15 text-warning",
  critical: "bg-critical/10 text-critical",
  muted: "bg-muted text-muted-foreground",
};

/** Tone with a matching border (used for timeline nodes). */
export const toneOutline: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  ai: "bg-ai/10 text-ai border-ai/20",
  warning: "bg-warning/15 text-warning border-warning/20",
  critical: "bg-critical/10 text-critical border-critical/20",
  muted: "bg-muted text-muted-foreground border-border",
};

/** Solid fill for progress bars. */
export const toneFill: Record<Tone, string> = {
  primary: "bg-primary",
  ai: "bg-ai",
  warning: "bg-warning",
  critical: "bg-critical",
  muted: "bg-muted-foreground/40",
};

export function capacityTone(pct: number): Tone {
  if (pct > 85) return "critical";
  if (pct > 70) return "warning";
  return "primary";
}

export function confidenceTone(value: number): Tone {
  if (value >= 85) return "primary";
  if (value >= 70) return "warning";
  return "critical";
}
