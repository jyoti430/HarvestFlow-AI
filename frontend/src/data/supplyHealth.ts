import type { Region } from "@/contexts/RegionContext";
import type { HealthPoint } from "@/types";

const supplyChainHealth: HealthPoint[] = [
  { name: "Mon", health: 78 },
  { name: "Tue", health: 82 },
  { name: "Wed", health: 74 },
  { name: "Thu", health: 88 },
  { name: "Fri", health: 91 },
  { name: "Sat", health: 86 },
  { name: "Sun", health: 89 },
];

export const supplyHealthByRegion: Record<Region, HealthPoint[]> = {
  "All Regions": supplyChainHealth,
  Nashik: [
    { name: "Mon", health: 81 },
    { name: "Tue", health: 84 },
    { name: "Wed", health: 79 },
    { name: "Thu", health: 88 },
    { name: "Fri", health: 90 },
    { name: "Sat", health: 85 },
    { name: "Sun", health: 87 },
  ],
  Pune: [
    { name: "Mon", health: 76 },
    { name: "Tue", health: 80 },
    { name: "Wed", health: 73 },
    { name: "Thu", health: 86 },
    { name: "Fri", health: 88 },
    { name: "Sat", health: 84 },
    { name: "Sun", health: 86 },
  ],
  Bengaluru: [
    { name: "Mon", health: 71 },
    { name: "Tue", health: 74 },
    { name: "Wed", health: 69 },
    { name: "Thu", health: 82 },
    { name: "Fri", health: 84 },
    { name: "Sat", health: 80 },
    { name: "Sun", health: 83 },
  ],
  Hyderabad: [
    { name: "Mon", health: 77 },
    { name: "Tue", health: 79 },
    { name: "Wed", health: 72 },
    { name: "Thu", health: 85 },
    { name: "Fri", health: 87 },
    { name: "Sat", health: 82 },
    { name: "Sun", health: 84 },
  ],
};
