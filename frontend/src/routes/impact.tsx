import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { Impact } from "@/pages/Impact";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — HarvestFlow AI" },
      { name: "description", content: "Executive summary of food saved, revenue protected and carbon prevented." },
      { property: "og:title", content: "HarvestFlow AI — Impact" },
      { property: "og:description", content: "Business impact across the supply chain." },
    ],
  }),
  component: () => (
    <AppLayout>
      <Impact />
    </AppLayout>
  ),
});
