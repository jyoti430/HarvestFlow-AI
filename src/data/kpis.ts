import type { Kpi } from "@/types";

export const kpis: Kpi[] = [
  { key: "risk", label: "Produce at Risk", value: "1,284 t", delta: "-8.2%", trend: "down", tone: "warning" },
  { key: "directives", label: "Active AI Directives", value: "37", delta: "+4", trend: "up", tone: "ai" },
  { key: "storage", label: "Cold Storage Capacity", value: "72%", delta: "+3.1%", trend: "up", tone: "primary" },
  { key: "revenue", label: "Revenue Protected", value: "$412K", delta: "+12.4%", trend: "up", tone: "primary" },
];
