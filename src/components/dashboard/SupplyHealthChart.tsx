import { SectionCard } from "./SectionCard";
import { supplyChainHealth } from "@/data/mock";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SupplyHealthChart() {
  return (
    <SectionCard title="Regional Supply Chain Health" subtitle="Composite index across weather, storage, transport and market signals">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={supplyChainHealth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="hf-health" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.61 0.14 160)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="oklch(0.61 0.14 160)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.01 250)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.52 0.02 260)" tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.52 0.02 260)" tickLine={false} axisLine={false} domain={[50, 100]} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Area type="monotone" dataKey="health" stroke="oklch(0.61 0.14 160)" strokeWidth={2} fill="url(#hf-health)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
