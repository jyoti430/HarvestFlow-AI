import type { TransportLeg } from "@/types";

export const transport: TransportLeg[] = [
  { id: "TR-118", route: "Nakuru → Nairobi", status: "in-transit", eta: "2h 10m", load: "Tomatoes 12t" },
  { id: "TR-119", route: "Muranga → Mombasa", status: "loading", eta: "8h 40m", load: "Avocados 18t" },
  { id: "TR-120", route: "Kirinyaga → JKIA", status: "delayed", eta: "3h 55m", load: "French Beans 6t" },
  { id: "TR-121", route: "Machakos → Nairobi", status: "in-transit", eta: "1h 20m", load: "Mangoes 9t" },
];
