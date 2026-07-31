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

export function Sidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data, isError, isLoading } = useBackendHealth();
  const systemStatus = isLoading
    ? { label: "Checking...", indicatorClass: "bg-muted-foreground/60 animate-pulse" }
    : isError || data?.status !== "healthy"
      ? { label: "Backend Offline", indicatorClass: "bg-red-500" }
      : { label: "Operational", indicatorClass: "bg-emerald-500" };

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-background/60 md:hidden"
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-out md:sticky md:top-0 md:h-screen",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          collapsed ? "md:w-[72px]" : "md:w-[15.5rem]",
          "w-[15.5rem]",
        ].join(" ")}
      >
        <div
          className={[
            "h-16 border-b border-sidebar-border",
            collapsed ? "flex items-center justify-center" : "px-6 flex items-center gap-2",
          ].join(" ")}
        >
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed ? (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">HarvestFlow AI</span>
              <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">
                Decision Intelligence
              </span>
            </div>
          ) : null}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => (
            <SidebarLink key={item.to} item={item} active={pathname === item.to} collapsed={collapsed} />
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4 text-[11px] text-sidebar-foreground/60">
          {collapsed ? (
            <div className="flex justify-center">
              <span
                title={systemStatus.label}
                className={`h-1.5 w-1.5 rounded-full ${systemStatus.indicatorClass}`}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span>System status</span>
              <span className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${systemStatus.indicatorClass}`} />
                {systemStatus.label}
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      title={item.label}
      className={[
        "flex items-center rounded-md py-2 text-sm transition-all duration-300 ease-out",
        collapsed ? "justify-center px-2" : "gap-3 px-3",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
      ].join(" ")}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed ? <span>{item.label}</span> : null}
      {!collapsed && active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" /> : null}
    </Link>
  );
}
