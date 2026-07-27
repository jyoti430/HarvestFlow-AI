import { apiClient, USE_MOCK_DATA } from "./apiClient";
import {
  kpis,
  weather,
  storage,
  transport,
  markets,
  directives,
  supplyChainHealth,
} from "@/data";
import type {
  Directive,
  HealthPoint,
  Kpi,
  MarketSignal,
  StorageFacility,
  TransportLeg,
  WeatherReading,
} from "@/types";

export interface DashboardOverview {
  kpis: Kpi[];
  weather: WeatherReading[];
  storage: StorageFacility[];
  transport: TransportLeg[];
  markets: MarketSignal[];
  directives: Directive[];
  supplyHealth: HealthPoint[];
}

export const dashboardService = {
  /** GET /dashboard/overview */
  getOverview(): Promise<DashboardOverview> {
    if (USE_MOCK_DATA) {
      return apiClient.mock({
        kpis,
        weather,
        storage,
        transport,
        markets,
        directives,
        supplyHealth: supplyChainHealth,
      });
    }
    return apiClient.get<DashboardOverview>("/dashboard/overview");
  },
};
