import { SectionCard } from "@/components/dashboard/SectionCard";
import type { ReactNode } from "react";

export function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="h-64">{children}</div>
    </SectionCard>
  );
}
