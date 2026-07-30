import { PageHeader } from "@/components/common/PageHeader";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";
import { DecisionForm } from "@/components/decision/DecisionForm";
import { DirectiveCard } from "@/components/decision/DirectiveCard";
import { DecisionTimeline } from "@/components/decision/DecisionTimeline";
import { BackendErrorCard } from "@/components/common/BackendErrorCard";
import { Card } from "@/components/ui/card";
import type { DecisionInputs } from "@/types";
import { decisionService } from "@/services";
import type { OptimizeResponse } from "@/services/decisionService";
import { useState } from "react";

export function DecisionEngine() {
  const [data, setData] = useState<OptimizeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastInputs, setLastInputs] = useState<DecisionInputs | null>(null);

  const handleOptimize = async (inputs: DecisionInputs) => {
    setIsLoading(true);
    setHasError(false);
    setLastInputs(inputs);
    try {
      setData(await decisionService.optimize(inputs));
    } catch {
      setData(null);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Decision Engine"
        subtitle="Provide operational inputs. HarvestFlow AI computes the optimal end-to-end directive."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <DecisionForm onOptimize={handleOptimize} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-3 space-y-6">
          {isLoading ? (
            <>
              <SectionSkeleton rows={6} />
              <SectionSkeleton rows={5} />
            </>
          ) : hasError && lastInputs ? (
            <BackendErrorCard onRetry={() => void handleOptimize(lastInputs)} />
          ) : data ? (
            <>
              <DirectiveCard directive={data.directive} />
              <DecisionTimeline steps={data.timeline} />
            </>
          ) : (
            <Card className="flex min-h-64 items-center justify-center p-6 text-center shadow-sm">
              <div className="max-w-md space-y-2">
                <p className="text-sm font-semibold">No AI directive generated yet.</p>
                <p className="text-sm text-muted-foreground">
                  Fill the form and click &apos;Generate AI Directive&apos; to receive an operational
                  recommendation.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
