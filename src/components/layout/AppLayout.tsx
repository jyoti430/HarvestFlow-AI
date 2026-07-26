import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  BrainCircuit,
  FlaskConical,
  TrendingUp,
  Cloud,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/decision-engine", label: "Decision Engine", icon: BrainCircuit },
  { to: "/simulation-lab", label: "Simulation Lab", icon: FlaskConical },
  { to: "/impact", label: "Impact", icon: TrendingUp },
] as const;

export function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-background text-foreground">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
        <div className="h-16 px-6 flex items-center gap-2 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">HarvestFlow AI</span>
            <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
              Decision Intelligence
            </span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors " +
                  (active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground")
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border text-[11px] text-sidebar-foreground/60">
          <div className="flex items-center justify-between">
            <span>System status</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Operational
            </span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-card px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold tracking-tight">HarvestFlow AI</h1>
            <span className="hidden sm:inline text-xs text-muted-foreground">
              Decision Intelligence for Perishable Supply Chains
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-5 text-xs">
            <div className="hidden md:flex items-center gap-1.5 text-muted-foreground">
              <span>{now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
              <span className="opacity-40">·</span>
              <span>
                {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
              <Cloud className="h-3.5 w-3.5" />
              <span>24°C · Partly cloudy</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <select className="bg-transparent text-xs outline-none">
                <option>All Regions</option>
                <option>Nakuru</option>
                <option>Machakos</option>
                <option>Muranga</option>
                <option>Kirinyaga</option>
              </select>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
