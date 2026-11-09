import { useState, useEffect } from "react";
import {
  GEO_PRICING,
  getGeoRegion,
  type GeoRegion,
  type TierPrice,
  type TierKey,
} from "../config";

const MANUAL_STORAGE_KEY = "suar_manual_currency";

export function useGeoPricing() {
  const [region, setRegionState] = useState<GeoRegion>(() => {
    if (typeof window !== "undefined") {
      // 1. URL parameter override for instant testing (?geo=AU or ?country=CA)
      const params = new URLSearchParams(window.location.search);
      const queryOverride = params.get("geo") || params.get("country");
      if (queryOverride) {
        return getGeoRegion(queryOverride);
      }

      // 2. User's manual preference if they previously clicked a toggle
      try {
        const stored = localStorage.getItem(MANUAL_STORAGE_KEY) as GeoRegion | null;
        if (
          stored &&
          (stored === "ID" ||
            stored === "AU" ||
            stored === "CA" ||
            stored === "GLOBAL")
        ) {
          return stored;
        }
      } catch {
        // ignore
      }
    }
    return "ID";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip network request if manual override is present in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get("geo") || params.get("country")) return;

    // Skip network request if user already explicitly clicked a currency tab
    try {
      if (localStorage.getItem(MANUAL_STORAGE_KEY)) return;
    } catch {
      // ignore
    }

    // Always fetch fresh geo location without browser cache
    fetch("/api/geo", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Geo API error");
        return res.json();
      })
      .then((data) => {
        if (data?.country) {
          const resolved = getGeoRegion(data.country);
          setRegionState(resolved);
        }
      })
      .catch(() => {
        setRegionState("ID");
      });
  }, []);

  const setRegion = (newRegion: GeoRegion) => {
    setRegionState(newRegion);
    try {
      localStorage.setItem(MANUAL_STORAGE_KEY, newRegion);
    } catch {
      // ignore
    }
  };

  return {
    region,
    setRegion,
    pricing: GEO_PRICING[region] as Record<TierKey, TierPrice>,
  };
}
