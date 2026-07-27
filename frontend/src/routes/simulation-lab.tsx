import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { SimulationLab } from "@/pages/SimulationLab";

export const Route = createFileRoute("/simulation-lab")({
  head: () => ({
    meta: [
      { title: "Simulation Lab — HarvestFlow AI" },
      { name: "description", content: "Interactive scenario testing for perishable supply chain decisions." },
      { property: "og:title", content: "HarvestFlow AI — Simulation Lab" },
      { property: "og:description", content: "Stress-test directives against operational variables." },
    ],
  }),
  component: () => (
    <AppLayout>
      <SimulationLab />
    </AppLayout>
  ),
});
