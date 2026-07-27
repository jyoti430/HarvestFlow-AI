import { PageHeader } from "@/components/common/PageHeader";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";
import { KpiGrid } from "@/components/dashboard/KpiCard";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { TransportCard } from "@/components/dashboard/TransportCard";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { DirectivesFeed } from "@/components/dashboard/DirectivesFeed";
import { SupplyHealthChart } from "@/components/dashboard/SupplyHealthChart";
import { useDashboardOverview } from "@/hooks/useHarvestFlow";

export function Dashboard() {
  const { data, isLoading } = useDashboardOverview();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Regional Operations Overview"
        subtitle="Live view across weather, storage, transport and markets. Directives update every 5 minutes."
      />

      {isLoading || !data ? (
        <DashboardSkeleton />
      ) : (
        <>
          <KpiGrid items={data.kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeatherCard items={data.weather} />
            <StorageCard items={data.storage} />
            <TransportCard items={data.transport} />
            <MarketCard items={data.markets} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DirectivesFeed items={data.directives} />
            </div>
            <SupplyHealthChart data={data.supplyHealth} />
          </div>
        </>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SectionSkeleton key={i} rows={1} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SectionSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
