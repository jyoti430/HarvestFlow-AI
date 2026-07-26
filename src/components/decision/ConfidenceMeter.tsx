export function ConfidenceMeter({ value }: { value: number }) {
  const tone = value >= 85 ? "bg-primary" : value >= 70 ? "bg-warning" : "bg-critical";
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Model confidence</span>
        <span className="text-sm font-semibold">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className={"h-full " + tone} style={{ width: value + "%" }} />
      </div>
    </div>
  );
}
