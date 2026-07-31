import { TrendingDown, TrendingUp, Minus, type LucideIcon } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { ProgressBar } from "@/components/common/ProgressBar";
import type { MarketSignal, Trend } from "@/types";

const trendIcon: Record<Trend, LucideIcon> = { up: TrendingUp, down: TrendingDown, flat: Minus };
const trendTone: Record<Trend, string> = {
  up: "text-primary",
  down: "text-critical",
  flat: "text-muted-foreground",
};

export function MarketCard({ items }: { items: MarketSignal[] }) {
  return (
    <SectionCard title="Market Demand" subtitle="Export destination demand">
      <div className="space-y-3">
        {items.map((m) => (
          <MarketRow key={m.market} signal={m} />
        ))}
      </div>
    </SectionCard>
  );
}

function MarketRow({ signal }: { signal: MarketSignal }) {
  const Icon = trendIcon[signal.trend];
  return (
    <div className="flex items-center justify-between text-sm">
      <div>
        <div className="font-medium">{signal.market}</div>
        <div className="text-xs text-muted-foreground">{signal.price}</div>
      </div>
      <div className="flex items-center gap-3">
        <ProgressBar value={signal.demand} tone="ai" className="w-24" />
        <span className="text-xs w-8 text-right tabular-nums">{signal.demand}</span>
        <Icon className={"h-4 w-4 " + trendTone[signal.trend]} />
      </div>
    </div>
  );
}
