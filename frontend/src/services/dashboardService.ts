import { apiClient } from "./apiClient";
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
  /** GET /api/v1/dashboard/overview */
  getOverview(): Promise<DashboardOverview> {
    return apiClient.get<DashboardOverview>("/api/v1/dashboard/overview");
  },
};
