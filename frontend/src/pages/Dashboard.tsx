import { PageHeader } from "@/components/common/PageHeader";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";
import { KpiGrid } from "@/components/dashboard/KpiCard";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { TransportCard } from "@/components/dashboard/TransportCard";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { DirectivesFeed } from "@/components/dashboard/DirectivesFeed";
import { SupplyHealthChart } from "@/components/dashboard/SupplyHealthChart";
import { BackendErrorCard } from "@/components/common/BackendErrorCard";
import { useDashboardOverview } from "@/hooks/useHarvestFlow";
import { useRegion } from "@/contexts/RegionContext";
import { filterDirectives, filterStorage, filterTransport, filterWeather } from "@/utils/regionFilters";

export function Dashboard() {
  const { data, isLoading, isError, refetch } = useDashboardOverview();
  const { selectedRegion } = useRegion();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Export Supply Chain Overview"
        subtitle="Live view across weather, storage, transport and markets. Directives update every 5 minutes."
      />

      {isLoading ? (
        <DashboardSkeleton />
      ) : isError || !data ? (
        <BackendErrorCard onRetry={() => void refetch()} />
      ) : (
        <>
          <KpiGrid items={data.kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeatherCard items={filterWeather(data.weather, selectedRegion)} />
            <StorageCard items={filterStorage(data.storage, selectedRegion)} />
            <TransportCard items={filterTransport(data.transport, selectedRegion)} />
            <MarketCard items={data.markets} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DirectivesFeed items={filterDirectives(data.directives, selectedRegion)} />
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
