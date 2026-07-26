export type Directive = {
  id: string;
  crop: string;
  action: string;
  region: string;
  confidence: number;
  impact: string;
  status: "active" | "pending" | "completed";
  time: string;
};

export const directives: Directive[] = [
  {
    id: "D-2841",
    crop: "Tomatoes",
    action: "Reroute to Nairobi cold hub, expedite dispatch",
    region: "Nakuru",
    confidence: 94,
    impact: "$18,400 protected",
    status: "active",
    time: "12 min ago",
  },
  {
    id: "D-2840",
    crop: "Mangoes",
    action: "Hold at packhouse, delay harvest 36h",
    region: "Machakos",
    confidence: 88,
    impact: "$9,200 protected",
    status: "active",
    time: "42 min ago",
  },
  {
    id: "D-2839",
    crop: "Avocados",
    action: "Prioritize export lane to Rotterdam",
    region: "Muranga",
    confidence: 91,
    impact: "$34,700 protected",
    status: "pending",
    time: "1 h ago",
  },
  {
    id: "D-2838",
    crop: "French Beans",
    action: "Consolidate two shipments, single reefer",
    region: "Kirinyaga",
    confidence: 82,
    impact: "$6,100 protected",
    status: "completed",
    time: "3 h ago",
  },
  {
    id: "D-2837",
    crop: "Leafy Greens",
    action: "Shift 40% volume to Mombasa domestic market",
    region: "Kajiado",
    confidence: 76,
    impact: "$4,900 protected",
    status: "completed",
    time: "5 h ago",
  },
];

export const kpis = {
  produceAtRisk: { value: "1,284 t", delta: "-8.2%", trend: "down" as const },
  activeDirectives: { value: "37", delta: "+4", trend: "up" as const },
  coldStorage: { value: "72%", delta: "+3.1%", trend: "up" as const },
  revenueProtected: { value: "$412K", delta: "+12.4%", trend: "up" as const },
};

export const weather = [
  { region: "Nakuru", temp: 24, humidity: 62, rain: 15, risk: "low" },
  { region: "Machakos", temp: 29, humidity: 48, rain: 5, risk: "moderate" },
  { region: "Muranga", temp: 22, humidity: 71, rain: 45, risk: "high" },
  { region: "Kirinyaga", temp: 21, humidity: 68, rain: 30, risk: "moderate" },
];

export const storage = [
  { facility: "Nairobi Cold Hub A", capacity: 1200, used: 864, temp: 4 },
  { facility: "Mombasa Reefer Yard", capacity: 800, used: 512, temp: 2 },
  { facility: "Nakuru Packhouse", capacity: 600, used: 498, temp: 6 },
  { facility: "Eldoret Cold Room", capacity: 400, used: 210, temp: 5 },
];

export const transport = [
  { id: "TR-118", route: "Nakuru → Nairobi", status: "in-transit", eta: "2h 10m", load: "Tomatoes 12t" },
  { id: "TR-119", route: "Muranga → Mombasa", status: "loading", eta: "8h 40m", load: "Avocados 18t" },
  { id: "TR-120", route: "Kirinyaga → JKIA", status: "delayed", eta: "3h 55m", load: "French Beans 6t" },
  { id: "TR-121", route: "Machakos → Nairobi", status: "in-transit", eta: "1h 20m", load: "Mangoes 9t" },
];

export const markets = [
  { market: "Nairobi Wholesale", demand: 92, price: "$1.24/kg", trend: "up" },
  { market: "Mombasa Export", demand: 78, price: "$1.68/kg", trend: "up" },
  { market: "Rotterdam EU", demand: 85, price: "$2.90/kg", trend: "flat" },
  { market: "Dubai Reefer", demand: 71, price: "$2.40/kg", trend: "down" },
];

export const supplyChainHealth = [
  { name: "Mon", health: 78 },
  { name: "Tue", health: 82 },
  { name: "Wed", health: 74 },
  { name: "Thu", health: 88 },
  { name: "Fri", health: 91 },
  { name: "Sat", health: 86 },
  { name: "Sun", health: 89 },
];

export const crops = ["Tomatoes", "Mangoes", "Avocados", "French Beans", "Leafy Greens", "Onions", "Bananas"];
export const origins = ["Nakuru", "Machakos", "Muranga", "Kirinyaga", "Kajiado", "Meru"];
export const destinations = ["Nairobi Wholesale", "Mombasa Export", "JKIA Air Freight", "Rotterdam EU", "Dubai Reefer"];

export const impactCharts = {
  spoilage: [
    { month: "Jan", before: 22, after: 14 },
    { month: "Feb", before: 24, after: 13 },
    { month: "Mar", before: 21, after: 11 },
    { month: "Apr", before: 25, after: 12 },
    { month: "May", before: 23, after: 10 },
    { month: "Jun", before: 26, after: 9 },
  ],
  revenue: [
    { month: "Jan", value: 210 },
    { month: "Feb", value: 244 },
    { month: "Mar", value: 268 },
    { month: "Apr", value: 302 },
    { month: "May", value: 355 },
    { month: "Jun", value: 412 },
  ],
  storage: [
    { month: "Jan", util: 58 },
    { month: "Feb", util: 62 },
    { month: "Mar", util: 65 },
    { month: "Apr", util: 68 },
    { month: "May", util: 71 },
    { month: "Jun", util: 72 },
  ],
  carbon: [
    { month: "Jan", tons: 42 },
    { month: "Feb", tons: 51 },
    { month: "Mar", tons: 58 },
    { month: "Apr", tons: 66 },
    { month: "May", tons: 74 },
    { month: "Jun", tons: 82 },
  ],
};
