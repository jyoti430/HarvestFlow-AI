import { AlertTriangle, Sparkles, Warehouse, DollarSign } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { TransportCard } from "@/components/dashboard/TransportCard";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { DirectivesFeed } from "@/components/dashboard/DirectivesFeed";
import { SupplyHealthChart } from "@/components/dashboard/SupplyHealthChart";
import { kpis } from "@/data/mock";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Regional Operations Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Live view across weather, storage, transport and markets. Directives update every 5 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Produce at Risk" value={kpis.produceAtRisk.value} delta={kpis.produceAtRisk.delta} trend="down" icon={AlertTriangle} tone="warning" />
        <KpiCard label="Active AI Directives" value={kpis.activeDirectives.value} delta={kpis.activeDirectives.delta} trend="up" icon={Sparkles} tone="ai" />
        <KpiCard label="Cold Storage Capacity" value={kpis.coldStorage.value} delta={kpis.coldStorage.delta} trend="up" icon={Warehouse} />
        <KpiCard label="Revenue Protected" value={kpis.revenueProtected.value} delta={kpis.revenueProtected.delta} trend="up" icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeatherCard />
        <StorageCard />
        <TransportCard />
        <MarketCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><DirectivesFeed /></div>
        <SupplyHealthChart />
      </div>
    </div>
  );
}
