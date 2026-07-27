import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { DecisionEngine } from "@/pages/DecisionEngine";

export const Route = createFileRoute("/decision-engine")({
  head: () => ({
    meta: [
      { title: "Decision Engine — HarvestFlow AI" },
      { name: "description", content: "AI-generated end-to-end directives for perishable supply chain operations." },
      { property: "og:title", content: "HarvestFlow AI — Decision Engine" },
      { property: "og:description", content: "AI directives from harvest to market." },
    ],
  }),
  component: () => (
    <AppLayout>
      <DecisionEngine />
    </AppLayout>
  ),
});
