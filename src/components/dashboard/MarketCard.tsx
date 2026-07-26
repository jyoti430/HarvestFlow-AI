import { SectionCard } from "./SectionCard";
import { markets } from "@/data/mock";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus } as const;
const trendTone = { up: "text-primary", down: "text-critical", flat: "text-muted-foreground" } as const;

export function MarketCard() {
  return (
    <SectionCard title="Market Demand" subtitle="Real-time buyer signals">
      <div className="space-y-3">
        {markets.map((m) => {
          const Icon = trendIcon[m.trend as keyof typeof trendIcon];
          return (
            <div key={m.market} className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">{m.market}</div>
                <div className="text-xs text-muted-foreground">{m.price}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-ai" style={{ width: m.demand + "%" }} />
                </div>
                <span className="text-xs w-8 text-right">{m.demand}</span>
                <Icon className={"h-4 w-4 " + trendTone[m.trend as keyof typeof trendTone]} />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
