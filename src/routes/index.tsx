import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/pages/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — HarvestFlow AI" },
      { name: "description", content: "Regional operations overview across weather, storage, transport and markets." },
      { property: "og:title", content: "HarvestFlow AI — Dashboard" },
      { property: "og:description", content: "Live regional operations overview." },
    ],
  }),
  component: () => (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  ),
});
