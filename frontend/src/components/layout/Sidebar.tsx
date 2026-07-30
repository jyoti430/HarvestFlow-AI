import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, BrainCircuit, FlaskConical, TrendingUp, Sparkles, type LucideIcon } from "lucide-react";
import { useBackendHealth } from "@/hooks/useHarvestFlow";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const nav: readonly NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/decision-engine", label: "Decision Engine", icon: BrainCircuit },
  { to: "/simulation-lab", label: "Simulation Lab", icon: FlaskConical },
  { to: "/impact", label: "Impact", icon: TrendingUp },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data, isError, isLoading } = useBackendHealth();
  const systemStatus = isLoading
    ? { label: "Checking...", indicatorClass: "bg-muted-foreground/60 animate-pulse" }
    : isError || data?.status !== "healthy"
      ? { label: "Backend Offline", indicatorClass: "bg-red-500" }
      : { label: "Operational", indicatorClass: "bg-emerald-500" };

  return (
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
        {nav.map((item) => (
          <SidebarLink key={item.to} item={item} active={pathname === item.to} />
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border text-[11px] text-sidebar-foreground/60">
        <div className="flex items-center justify-between">
          <span>System status</span>
          <span className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${systemStatus.indicatorClass}`} />
            {systemStatus.label}
          </span>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
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
}
