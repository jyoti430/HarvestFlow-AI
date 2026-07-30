import type { MarketSignal } from "@/types";

export const markets: MarketSignal[] = [
  { market: "Mumbai APMC", demand: 92, price: "$1.24/kg", trend: "up" },
  { market: "Singapore Fresh Produce Hub", demand: 78, price: "$1.68/kg", trend: "up" },
  { market: "Singapore Retail Chain", demand: 85, price: "$2.90/kg", trend: "flat" },
  { market: "Singapore Wholesale Market", demand: 71, price: "$2.40/kg", trend: "down" },
];
