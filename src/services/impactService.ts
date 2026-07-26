import { apiClient, USE_MOCK_DATA } from "./apiClient";
import {
  impactMetrics,
  spoilageSeries,
  revenueSeries,
  storageSeries,
  carbonSeries,
} from "@/data";
import type { ImpactMetric, SeriesPoint } from "@/types";

export interface ImpactOverview {
  metrics: ImpactMetric[];
  spoilage: SeriesPoint[];
  revenue: SeriesPoint[];
  storage: SeriesPoint[];
  carbon: SeriesPoint[];
}

export const impactService = {
  /** GET /impact/overview */
  getOverview(): Promise<ImpactOverview> {
    if (USE_MOCK_DATA) {
      return apiClient.mock({
        metrics: impactMetrics,
        spoilage: spoilageSeries,
        revenue: revenueSeries,
        storage: storageSeries,
        carbon: carbonSeries,
      });
    }
    return apiClient.get<ImpactOverview>("/impact/overview");
  },
};
