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
import { useRegion, type Region } from "@/contexts/RegionContext";
import { filterDirectives, filterStorage, filterTransport, filterWeather } from "@/utils/regionFilters";
import { supplyHealthByRegion } from "@/data";
import type { DashboardOverview } from "@/services/dashboardService";
import type { Kpi } from "@/types";

const PAGE_TITLES: Record<Region, string> = {
  "All Regions": "National Export Supply Chain Overview",
  Nashik: "Nashik Export Supply Chain Overview",
  Pune: "Pune Export Supply Chain Overview",
  Bengaluru: "Bengaluru Export Supply Chain Overview",
  Hyderabad: "Hyderabad Export Supply Chain Overview",
};

const PAGE_SUBTITLES: Record<Region, string> = {
  "All Regions": "National operational overview across weather, storage, transport and export markets.",
  Nashik: "Live operational overview for the selected export region.",
  Pune: "Live operational overview for the selected export region.",
  Bengaluru: "Live operational overview for the selected export region.",
  Hyderabad: "Live operational overview for the selected export region.",
};

export function Dashboard() {
  const { data, isLoading, isError, refetch } = useDashboardOverview();
  const { selectedRegion } = useRegion();

  return (
    <div className="space-y-8">
      <PageHeader title={PAGE_TITLES[selectedRegion]} subtitle={PAGE_SUBTITLES[selectedRegion]} />

      {isLoading ? (
        <DashboardSkeleton />
      ) : isError || !data ? (
        <BackendErrorCard onRetry={() => void refetch()} />
      ) : (
        <>
          <KpiGrid items={getRegionalKpis(data, selectedRegion)} />

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
            <SupplyHealthChart data={supplyHealthByRegion[selectedRegion]} />
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

function getRegionalKpis(data: DashboardOverview, selectedRegion: Region): Kpi[] {
  if (selectedRegion === "All Regions") {
    const nationalKpis = [...data.kpis];
    nationalKpis[0] = {
      ...nationalKpis[0],
      label: "Produce at Risk",
      value: "1,284 t",
      delta: "1,284 t exposed",
      trend: "up",
      tone: "warning",
    };
    return nationalKpis;
  }

  const weather = filterWeather(data.weather, selectedRegion);
  const storage = filterStorage(data.storage, selectedRegion);
  const transport = filterTransport(data.transport, selectedRegion);
  const directives = filterDirectives(data.directives, selectedRegion);

  const produceAtRiskTonnes = computeProduceAtRiskTonnes(weather, storage, directives);
  const avgStorageUtilization = storage.length
    ? Math.round(storage.reduce((sum, item) => sum + Math.round((item.used / item.capacity) * 100), 0) / storage.length)
    : 0;
  const revenueProtected = directives.reduce((sum, directive) => sum + extractImpactValue(directive.impact), 0);

  return [
    {
      key: "risk",
      label: "Produce at Risk",
      value: `${formatTonnes(produceAtRiskTonnes)} t`,
      delta: `${formatTonnes(produceAtRiskTonnes)} t exposed`,
      trend: produceAtRiskTonnes > 0 ? "up" : "down",
      tone: "warning",
    },
    {
      key: "directives",
      label: "Active AI Directives",
      value: String(directives.length),
      delta: `+${directives.length}`,
      trend: "up",
      tone: "ai",
    },
    {
      key: "storage",
      label: "Cold Storage Capacity",
      value: `${avgStorageUtilization}%`,
      delta: `${avgStorageUtilization}% used`,
      trend: avgStorageUtilization >= 70 ? "up" : "flat",
      tone: "primary",
    },
    {
      key: "revenue",
      label: "Export Revenue Protected",
      value: formatImpactCurrency(revenueProtected),
      delta: `+${formatImpactCurrency(revenueProtected)}`,
      trend: revenueProtected > 0 ? "up" : "flat",
      tone: "primary",
    },
  ];
}

function computeProduceAtRiskTonnes(
  weather: ReturnType<typeof filterWeather>,
  storage: ReturnType<typeof filterStorage>,
  directives: ReturnType<typeof filterDirectives>,
): number {
  const weatherRiskTonnage = weather.reduce((sum, item) => {
    switch (item.risk) {
      case "high":
        return sum + 240;
      case "moderate":
        return sum + 120;
      default:
        return sum + 40;
    }
  }, 0);

  const storagePressureTonnage = storage.reduce((sum, item) => {
    const utilization = Math.round((item.used / item.capacity) * 100);
    const pressure = Math.max(0, utilization - 72);
    return sum + pressure * 8;
  }, 0);

  const directivePressureTonnage = directives.reduce((sum, directive) => {
    const impactValue = extractImpactValue(directive.impact);
    return sum + Math.max(0, Math.round(impactValue / 150));
  }, 0);

  return Math.max(120, Math.round(weatherRiskTonnage + storagePressureTonnage + directivePressureTonnage));
}

function formatTonnes(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function extractImpactValue(impact: string): number {
  const match = impact.match(/\$(\d[\d,]*)/);
  if (!match) return 0;
  return Number(match[1].replace(/,/g, ""));
}

function formatImpactCurrency(value: number): string {
  if (value === 0) return "$0";
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}
