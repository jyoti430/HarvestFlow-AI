// Domain types shared across pages, components, services and mock data.

export type Trend = "up" | "down" | "flat";
export type Risk = "low" | "moderate" | "high";
export type Tone = "primary" | "ai" | "warning" | "critical" | "muted";
export type DirectiveStatus = "active" | "pending" | "completed";
export type TransportStatus = "in-transit" | "loading" | "delayed";

export interface Kpi {
  key: string;
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  tone: Tone;
}

export interface WeatherReading {
  region: string;
  temp: number;
  humidity: number;
  rain: number;
  risk: Risk;
}

export interface StorageFacility {
  facility: string;
  capacity: number;
  used: number;
  temp: number;
}

export interface TransportLeg {
  id: string;
  route: string;
  status: TransportStatus;
  eta: string;
  load: string;
}

export interface MarketSignal {
  market: string;
  demand: number;
  price: string;
  trend: Trend;
}

export interface Directive {
  id: string;
  crop: string;
  action: string;
  region: string;
  confidence: number;
  impact: string;
  status: DirectiveStatus;
  time: string;
}

export interface HealthPoint {
  name: string;
  health: number;
}

export interface DecisionInputs {
  crop: string;
  quantity: number;
  origin: string;
  destination: string;
  harvestDate: string;
  storagePreference: string;
}

export interface DecisionDirective {
  action: string;
  priority?: "Critical" | "High" | "Medium" | "Low";
  harvestTime: string;
  truck: string;
  storage: string;
  market: string;
  confidence: number;
  revenue: string;
  spoilage: string;
  carbon: string;
  reasoning: string;
}

export interface SimulationScenario {
  temperature: number;
  humidity: number;
  rain: number;
  truckDelay: number;
  storageAvail: number;
  marketDemand: number;
}

export interface SimulationResult extends DecisionDirective {
  expectedRevenue: number;
  spoilageRisk: number;
  carbonImpact: number;
}

export interface TimelineStep {
  key: string;
  title: string;
  detail: string;
  tone: Extract<Tone, "primary" | "ai" | "warning">;
  icon: "weather" | "clock" | "storage" | "market" | "check";
}

export interface ImpactMetric {
  key: string;
  label: string;
  value: string;
  sub: string;
  tone: Extract<Tone, "primary" | "ai" | "warning">;
  icon: "food" | "revenue" | "carbon" | "efficiency" | "export";
}

export interface SeriesPoint {
  month: string;
  [key: string]: string | number;
}
