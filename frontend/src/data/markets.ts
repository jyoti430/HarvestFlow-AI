import type { MarketSignal } from "@/types";

export const markets: MarketSignal[] = [
  { market: "Nairobi Wholesale", demand: 92, price: "$1.24/kg", trend: "up" },
  { market: "Mombasa Export", demand: 78, price: "$1.68/kg", trend: "up" },
  { market: "Rotterdam EU", demand: 85, price: "$2.90/kg", trend: "flat" },
  { market: "Dubai Reefer", demand: 71, price: "$2.40/kg", trend: "down" },
];
