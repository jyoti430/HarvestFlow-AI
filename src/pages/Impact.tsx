import { ImpactCard } from "@/components/impact/ImpactCard";
import { ChartCard } from "@/components/impact/ChartCard";
import { Apple, DollarSign, Leaf, Gauge, Plane } from "lucide-react";
import { impactCharts } from "@/data/mock";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Legend,
} from "recharts";

const axis = { fontSize: 11, fill: "oklch(0.52 0.02 260)" } as const;
const grid = "oklch(0.92 0.01 250)";

export function Impact() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Impact Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Executive summary of value delivered across the perishable supply chain.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <ImpactCard icon={Apple} label="Food Saved" value="2,840 t" sub="Year to date" tone="primary" />
        <ImpactCard icon={DollarSign} label="Revenue Protected" value="$4.12M" sub="+38% vs baseline" tone="primary" />
        <ImpactCard icon={Leaf} label="Carbon Prevented" value="1,286 t" sub="CO₂ equivalent" tone="primary" />
        <ImpactCard icon={Gauge} label="Supply Chain Efficiency" value="92%" sub="Composite index" tone="ai" />
        <ImpactCard icon={Plane} label="Export Readiness" value="87%" sub="EU + GCC lanes" tone="ai" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Spoilage Reduction" subtitle="Before vs after HarvestFlow AI (%)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactCharts.spoilage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={grid} />
              <XAxis dataKey="month" tick={axis} tickLine={false} axisLine={false} />
              <YAxis tick={axis} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="before" fill="oklch(0.63 0.23 25)" radius={[4, 4, 0, 0]} name="Before" />
              <Bar dataKey="after" fill="oklch(0.61 0.14 160)" radius={[4, 4, 0, 0]} name="After" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Improvement" subtitle="Monthly revenue protected ($K)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={impactCharts.revenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={grid} />
              <XAxis dataKey="month" tick={axis} tickLine={false} axisLine={false} />
              <YAxis tick={axis} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Line type="monotone" dataKey="value" stroke="oklch(0.58 0.19 264)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Storage Utilization" subtitle="Average % across regional facilities">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={impactCharts.storage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="imp-util" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.58 0.19 264)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.58 0.19 264)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={grid} />
              <XAxis dataKey="month" tick={axis} tickLine={false} axisLine={false} />
              <YAxis tick={axis} tickLine={false} axisLine={false} domain={[40, 90]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="util" stroke="oklch(0.58 0.19 264)" strokeWidth={2} fill="url(#imp-util)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Carbon Savings" subtitle="Cumulative tons CO₂e prevented">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactCharts.carbon} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={grid} />
              <XAxis dataKey="month" tick={axis} tickLine={false} axisLine={false} />
              <YAxis tick={axis} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="tons" fill="oklch(0.61 0.14 160)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
