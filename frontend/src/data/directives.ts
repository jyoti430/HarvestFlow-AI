import type { Directive } from "@/types";

export const directives: Directive[] = [
  { id: "D-2841", crop: "Tomatoes", action: "Reroute to Nairobi cold hub, expedite dispatch", region: "Nakuru", confidence: 94, impact: "$18,400 protected", status: "active", time: "12 min ago" },
  { id: "D-2840", crop: "Mangoes", action: "Hold at packhouse, delay harvest 36h", region: "Machakos", confidence: 88, impact: "$9,200 protected", status: "active", time: "42 min ago" },
  { id: "D-2839", crop: "Avocados", action: "Prioritize export lane to Rotterdam", region: "Muranga", confidence: 91, impact: "$34,700 protected", status: "pending", time: "1 h ago" },
  { id: "D-2838", crop: "French Beans", action: "Consolidate two shipments, single reefer", region: "Kirinyaga", confidence: 82, impact: "$6,100 protected", status: "completed", time: "3 h ago" },
  { id: "D-2837", crop: "Leafy Greens", action: "Shift 40% volume to Mombasa domestic market", region: "Kajiado", confidence: 76, impact: "$4,900 protected", status: "completed", time: "5 h ago" },
];
