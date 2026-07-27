import type { DecisionDirective, TimelineStep } from "@/types";

export const defaultDirective: DecisionDirective = {
  action: "Harvest at dawn, dispatch reefer TR-118, deliver to Nairobi wholesale",
  harvestTime: "Tomorrow 05:30 – 07:00",
  truck: "TR-118 · Reefer 14t · 2°C",
  storage: "Nairobi Cold Hub A · Bay 04",
  market: "Nairobi Wholesale · Grade A channel",
  confidence: 94,
  revenue: "+$18,400",
  spoilage: "−32%",
  carbon: "−1.8 t CO₂e",
  reasoning:
    "Dawn harvest reduces field heat load by 4.6°C, preserving shelf life. Rerouting via TR-118 avoids the delayed Kirinyaga corridor and meets the Nairobi wholesale morning window where price is up 6.3% week-over-week. Cold Hub A has bay capacity and matches the 2–4°C ideal for tomato storage.",
};

export const decisionTimeline: TimelineStep[] = [
  { key: "weather", icon: "weather", title: "Weather Risk", tone: "warning", detail: "Muranga corridor shows 45% rain probability over next 24h. Field spoilage risk +12%." },
  { key: "shelf", icon: "clock", title: "Shelf Life Analysis", tone: "ai", detail: "Tomato shelf life projected at 6.2 days at 4°C. Buffer of 1.8 days after transport." },
  { key: "storage", icon: "storage", title: "Storage Analysis", tone: "primary", detail: "Nairobi Cold Hub A at 72% capacity. Sufficient allocation for 12t inbound." },
  { key: "demand", icon: "market", title: "Demand Analysis", tone: "ai", detail: "Nairobi Wholesale demand index 92, price up 6.3% week-over-week." },
  { key: "final", icon: "check", title: "Final Directive", tone: "primary", detail: "Dispatch reefer TR-118, deliver to Nairobi Cold Hub A by 18:00, route to wholesale channel." },
];
