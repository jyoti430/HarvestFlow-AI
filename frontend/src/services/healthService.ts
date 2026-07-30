import { apiClient } from "./apiClient";

interface HealthResponse {
  status: string;
}

export const healthService = {
  /** GET /health */
  async check(): Promise<HealthResponse> {
    const response = await apiClient.get<HealthResponse>("/health");
    if (response.status !== "healthy") {
      throw new Error("HarvestFlow backend is unhealthy.");
    }
    return response;
  },
};
