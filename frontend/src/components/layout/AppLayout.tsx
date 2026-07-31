import { useEffect, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { RegionProvider } from "@/contexts/RegionContext";

const SIDEBAR_COLLAPSE_KEY = "harvestflow-sidebar-collapsed";

export function AppLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(SIDEBAR_COLLAPSE_KEY);
    if (storedValue === "true") {
      setIsCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_COLLAPSE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobileOpen((prev) => !prev);
      return;
    }

    setIsCollapsed((prev) => !prev);
  };

  return (
    <RegionProvider>
      <div className="min-h-screen w-full flex bg-background text-foreground">
        <Sidebar
          collapsed={isCollapsed}
          mobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar collapsed={isCollapsed} onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-auto">
            <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </RegionProvider>
  );
}
