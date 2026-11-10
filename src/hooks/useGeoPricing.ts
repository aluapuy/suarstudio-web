import { useState, useEffect } from "react";
import {
  GEO_PRICING,
  getGeoRegion,
  type GeoRegion,
  type TierPrice,
  type TierKey,
} from "../config";

const MANUAL_STORAGE_KEY = "suar_manual_currency";

export interface GeoPricingState {
  region: GeoRegion;
  isDomestic: boolean;
  hasAdminOverride: boolean;
  allowedRegions: GeoRegion[];
  setRegion: (newRegion: GeoRegion) => void;
  pricing: Record<TierKey, TierPrice>;
}

export function useGeoPricing(): GeoPricingState {
  const [hasAdminOverride, setHasAdminOverride] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return Boolean(params.get("geo") || params.get("country"));
    }
    return false;
  });

  const [isDomestic, setIsDomestic] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryOverride = params.get("geo") || params.get("country");
      if (queryOverride) {
        return queryOverride.toUpperCase() === "ID";
      }
    }
    return true;
  });

  const [region, setRegionState] = useState<GeoRegion>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryOverride = params.get("geo") || params.get("country");
      if (queryOverride) {
        return getGeoRegion(queryOverride);
      }
    }
    return "ID";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const queryOverride = params.get("geo") || params.get("country");
    if (queryOverride) {
      const resolved = getGeoRegion(queryOverride);
      setRegionState(resolved);
      setIsDomestic(resolved === "ID");
      setHasAdminOverride(true);
      return;
    }

    // Always fetch fresh geo location without browser cache
    fetch("/api/geo", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Geo API error");
        return res.json();
      })
      .then((data) => {
        const detectedCountry = data?.country || "ID";
        const domestic = Boolean(data?.isDomestic ?? (detectedCountry === "ID"));
        setIsDomestic(domestic);

        if (domestic) {
          // Inside Indonesia: lock to IDR, clear foreign manual preference
          setRegionState("ID");
          try {
            localStorage.removeItem(MANUAL_STORAGE_KEY);
          } catch {
            // ignore
          }
        } else {
          // Outside Indonesia (AU, CA, US, Global diaspora):
          // Foreign visitors are NEVER allowed to access "ID"
          const naturalRegion = getGeoRegion(detectedCountry);

          // Check if they previously switched to another international currency (e.g. CAD or USD)
          let storedChoice: GeoRegion | null = null;
          try {
            const stored = localStorage.getItem(MANUAL_STORAGE_KEY) as GeoRegion | null;
            if (stored && (stored === "AU" || stored === "CA" || stored === "GLOBAL")) {
              storedChoice = stored;
            } else if (stored === "ID") {
              // Purge old "ID" from previous visits on this browser
              localStorage.removeItem(MANUAL_STORAGE_KEY);
            }
          } catch {
            // ignore
          }

          setRegionState(storedChoice || naturalRegion);
        }
      })
      .catch(() => {
        // Fallback default
        setIsDomestic(true);
        setRegionState("ID");
      });
  }, []);

  const allowedRegions: GeoRegion[] = hasAdminOverride
    ? ["ID", "AU", "GLOBAL", "CA"]
    : isDomestic
    ? ["ID"]
    : ["AU", "GLOBAL", "CA"];

  const setRegion = (newRegion: GeoRegion) => {
    // Prevent non-domestic users from switching to "ID" unless admin override is present
    if (!hasAdminOverride && !isDomestic && newRegion === "ID") {
      return;
    }

    setRegionState(newRegion);
    try {
      localStorage.setItem(MANUAL_STORAGE_KEY, newRegion);
    } catch {
      // ignore
    }
  };

  return {
    region,
    isDomestic,
    hasAdminOverride,
    allowedRegions,
    setRegion,
    pricing: GEO_PRICING[region] as Record<TierKey, TierPrice>,
  };
}
