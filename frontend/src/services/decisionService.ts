import { apiClient, USE_MOCK_DATA } from "./apiClient";
import { defaultDirective, decisionTimeline } from "@/data";
import type { DecisionDirective, DecisionInputs, TimelineStep } from "@/types";

export interface OptimizeResponse {
  directive: DecisionDirective;
  timeline: TimelineStep[];
}

export const decisionService = {
  /** GET /decision/default */
  getDefault(): Promise<OptimizeResponse> {
    if (USE_MOCK_DATA) {
      return apiClient.mock({ directive: defaultDirective, timeline: decisionTimeline });
    }
    return apiClient.get<OptimizeResponse>("/decision/default");
  },

  /** POST /decision/optimize */
  optimize(inputs: DecisionInputs): Promise<OptimizeResponse> {
    if (USE_MOCK_DATA) {
      // Mock: echo the inputs back with the default directive.
      return apiClient.mock({
        directive: { ...defaultDirective, action: `${defaultDirective.action} (${inputs.crop})` },
        timeline: decisionTimeline,
      });
    }
    return apiClient.post<OptimizeResponse, DecisionInputs>("/decision/optimize", inputs);
  },
};
