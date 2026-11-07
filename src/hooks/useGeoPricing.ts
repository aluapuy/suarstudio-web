import { useState, useEffect } from "react";
import {
  GEO_PRICING,
  getGeoRegion,
  type GeoRegion,
  type TierPrice,
  type TierKey,
} from "../config";

const CACHE_KEY = "suar_geo_region";

export function useGeoPricing() {
  const [region, setRegion] = useState<GeoRegion>(() => {
    if (typeof window !== "undefined") {
      // 1. URL parameter override for instant testing (?geo=AU or ?country=CA)
      const params = new URLSearchParams(window.location.search);
      const queryOverride = params.get("geo") || params.get("country");
      if (queryOverride) {
        return getGeoRegion(queryOverride);
      }

      // 2. Session cache so we don't spam /api/geo on page navigation
      try {
        const cached = sessionStorage.getItem(CACHE_KEY) as GeoRegion | null;
        if (
          cached === "ID" ||
          cached === "AU" ||
          cached === "CA" ||
          cached === "GLOBAL"
        ) {
          return cached;
        }
      } catch {
        // Ignore session storage errors (e.g. private browsing restrictions)
      }
    }
    return "ID";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip network request if manual override is present in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get("geo") || params.get("country")) return;

    // Skip network request if region is already cached in current session
    try {
      if (sessionStorage.getItem(CACHE_KEY)) return;
    } catch {
      // continue
    }

    fetch("/api/geo")
      .then((res) => {
        if (!res.ok) throw new Error("Geo API error");
        return res.json();
      })
      .then((data) => {
        if (data?.country) {
          const resolved = getGeoRegion(data.country);
          setRegion(resolved);
          try {
            sessionStorage.setItem(CACHE_KEY, resolved);
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {
        // Graceful fallback to ID default on offline or network block
        setRegion("ID");
      });
  }, []);

  return {
    region,
    pricing: GEO_PRICING[region] as Record<TierKey, TierPrice>,
  };
}
