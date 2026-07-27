import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard } from "@/components/common/SectionCard";
import { chartAxis, chartColors, chartGrid, chartTooltip } from "@/utils/charts";
import type { HealthPoint } from "@/types";

export function SupplyHealthChart({ data }: { data: HealthPoint[] }) {
  return (
    <SectionCard
      title="Regional Supply Chain Health"
      subtitle="Composite index across weather, storage, transport and market signals"
    >
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="hf-health" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.4} />
                <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGrid} />
            <XAxis dataKey="name" tick={chartAxis} tickLine={false} axisLine={false} />
            <YAxis tick={chartAxis} tickLine={false} axisLine={false} domain={[50, 100]} />
            <Tooltip contentStyle={chartTooltip} />
            <Area type="monotone" dataKey="health" stroke={chartColors.primary} strokeWidth={2} fill="url(#hf-health)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
