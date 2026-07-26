import { PageHeader } from "@/components/common/PageHeader";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";
import { DecisionForm } from "@/components/decision/DecisionForm";
import { DirectiveCard } from "@/components/decision/DirectiveCard";
import { DecisionTimeline } from "@/components/decision/DecisionTimeline";
import { useDefaultDirective } from "@/hooks/useHarvestFlow";
import type { DecisionInputs } from "@/types";
import { decisionService } from "@/services";
import { useQueryClient } from "@tanstack/react-query";

export function DecisionEngine() {
  const { data, isLoading } = useDefaultDirective();
  const queryClient = useQueryClient();

  const handleOptimize = async (inputs: DecisionInputs) => {
    const result = await decisionService.optimize(inputs);
    queryClient.setQueryData(["decision", "default"], result);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Decision Engine"
        subtitle="Provide operational inputs. HarvestFlow AI computes the optimal end-to-end directive."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <DecisionForm onOptimize={handleOptimize} />
        </div>
        <div className="lg:col-span-3 space-y-6">
          {isLoading || !data ? (
            <>
              <SectionSkeleton rows={6} />
              <SectionSkeleton rows={5} />
            </>
          ) : (
            <>
              <DirectiveCard directive={data.directive} />
              <DecisionTimeline steps={data.timeline} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
