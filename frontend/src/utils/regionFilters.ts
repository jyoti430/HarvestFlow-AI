import type { Directive, StorageFacility, TransportLeg, WeatherReading } from "@/types";
import type { Region } from "@/contexts/RegionContext";

const STORAGE_REGIONS: Record<string, Exclude<Region, "All Regions">> = {
  "Nashik Cold Storage Hub": "Nashik",
  "Pune Cold Storage Hub": "Pune",
  "JNPT Reefer Terminal": "Nashik",
  "Chennai Export Packhouse": "Bengaluru",
};

function filterByRegion<T>(
  items: T[],
  selectedRegion: Region,
  getRegion: (item: T) => string | undefined,
): T[] {
  if (selectedRegion === "All Regions") return items;
  return items.filter((item) => getRegion(item) === selectedRegion);
}

export function filterWeather(items: WeatherReading[], selectedRegion: Region): WeatherReading[] {
  return filterByRegion(items, selectedRegion, (item) => item.region);
}

export function filterStorage(items: StorageFacility[], selectedRegion: Region): StorageFacility[] {
  return filterByRegion(items, selectedRegion, (item) => STORAGE_REGIONS[item.facility]);
}

export function filterTransport(items: TransportLeg[], selectedRegion: Region): TransportLeg[] {
  return filterByRegion(items, selectedRegion, (item) => item.route.split(" to ")[0]?.trim());
}

export function filterDirectives(items: Directive[], selectedRegion: Region): Directive[] {
  return filterByRegion(items, selectedRegion, (item) => item.region);
}
