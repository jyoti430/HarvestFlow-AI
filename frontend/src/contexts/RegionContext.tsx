import { createContext, useContext, useState, type ReactNode } from "react";

export const REGIONS = ["All Regions", "Nashik", "Pune", "Bengaluru", "Hyderabad"] as const;
export type Region = (typeof REGIONS)[number];

interface RegionContextValue {
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [selectedRegion, setSelectedRegion] = useState<Region>("All Regions");
  return (
    <RegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === null) {
    throw new Error("useRegion must be used inside RegionProvider.");
  }
  return context;
}
