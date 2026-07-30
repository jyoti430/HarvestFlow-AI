import { Cloud, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const REGIONS = ["All Regions", "Nashik", "Pune", "Bengaluru", "Hyderabad"] as const;

export function TopBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="h-16 border-b bg-card px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <h1 className="text-base font-semibold tracking-tight truncate">HarvestFlow AI</h1>
        <span className="hidden lg:inline text-xs text-muted-foreground truncate">
          Decision Intelligence for Perishable Supply Chains
        </span>
      </div>
      <div className="flex items-center gap-3 md:gap-5 text-xs">
        <div className="hidden md:flex items-center gap-1.5 text-muted-foreground">
          <span>
            {now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
          </span>
          <span className="opacity-40">·</span>
          <span>{now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
          <Cloud className="h-3.5 w-3.5" />
          <span>24°C · Partly cloudy</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <select className="bg-transparent text-xs outline-none" defaultValue="All Regions">
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
