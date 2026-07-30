import { apiClient } from "./apiClient";
import type { ImpactMetric, SeriesPoint } from "@/types";

export interface ImpactOverview {
  metrics: ImpactMetric[];
  spoilage: SeriesPoint[];
  revenue: SeriesPoint[];
  storage: SeriesPoint[];
  carbon: SeriesPoint[];
}

export const impactService = {
  /** GET /api/v1/impact/overview */
  getOverview(): Promise<ImpactOverview> {
    return apiClient.get<ImpactOverview>("/api/v1/impact/overview");
  },
};
