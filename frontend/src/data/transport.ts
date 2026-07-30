import type { TransportLeg } from "@/types";

export const transport: TransportLeg[] = [
  { id: "Container RF-118", route: "Nashik → JNPT Port", status: "in-transit", eta: "2h 10m", load: "Tomatoes 12t" },
  { id: "Container RF-119", route: "Pune → Mumbai Air Cargo", status: "loading", eta: "8h 40m", load: "Avocados 18t" },
  { id: "Container RF-120", route: "Bengaluru → Chennai Port", status: "delayed", eta: "3h 55m", load: "French Beans 6t" },
  { id: "Container RF-121", route: "Nagpur → Mumbai APMC", status: "in-transit", eta: "1h 20m", load: "Mangoes 9t" },
];
