// Central place for values that will change after design sign-off.

export const INSTAGRAM_HANDLE = "suarstudio.co";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_HANDLE}`;

/** Trial / CTA destination. Points to Instagram DM @suarstudio.co */
export const CTA_URL = INSTAGRAM_DM_URL;

export type TierKey = "echo" | "nextgen" | "family";
export type GeoRegion = "ID" | "AU" | "CA" | "GLOBAL";

export interface TierPrice {
  formatted: string;
  originalFormatted: string;
  amount: number;
  originalAmount: number;
  currency: string;
}

/**
 * IP-based Geo-Pricing Matrix with Founding Partner Strikethrough Discounts:
 * - ID (Indonesia): Rp 2.400.000 → Rp 2.000.000 | Rp 3.800.000 → Rp 3.200.000 | Rp 5.000.000 → Rp 4.200.000
 * - AU (Australia): $290 AUD → $235 AUD | $440 AUD → $355 AUD | $590 AUD → $475 AUD
 * - CA (Canada): $275 CAD → $220 CAD | $415 CAD → $335 CAD | $550 CAD → $440 CAD
 * - GLOBAL (US, SG, EU, and all others): $199 USD → $159 USD | $299 USD → $239 USD | $399 USD → $319 USD
 */
export const GEO_PRICING: Record<GeoRegion, Record<TierKey, TierPrice>> = {
  ID: {
    echo: {
      formatted: "Rp 2.000.000",
      originalFormatted: "Rp 2.400.000",
      amount: 2_000_000,
      originalAmount: 2_400_000,
      currency: "IDR",
    },
    nextgen: {
      formatted: "Rp 3.200.000",
      originalFormatted: "Rp 3.800.000",
      amount: 3_200_000,
      originalAmount: 3_800_000,
      currency: "IDR",
    },
    family: {
      formatted: "Rp 4.200.000",
      originalFormatted: "Rp 5.000.000",
      amount: 4_200_000,
      originalAmount: 5_000_000,
      currency: "IDR",
    },
  },
  AU: {
    echo: {
      formatted: "$235 AUD",
      originalFormatted: "$290 AUD",
      amount: 235,
      originalAmount: 290,
      currency: "AUD",
    },
    nextgen: {
      formatted: "$355 AUD",
      originalFormatted: "$440 AUD",
      amount: 355,
      originalAmount: 440,
      currency: "AUD",
    },
    family: {
      formatted: "$475 AUD",
      originalFormatted: "$590 AUD",
      amount: 475,
      originalAmount: 590,
      currency: "AUD",
    },
  },
  CA: {
    echo: {
      formatted: "$220 CAD",
      originalFormatted: "$275 CAD",
      amount: 220,
      originalAmount: 275,
      currency: "CAD",
    },
    nextgen: {
      formatted: "$335 CAD",
      originalFormatted: "$415 CAD",
      amount: 335,
      originalAmount: 415,
      currency: "CAD",
    },
    family: {
      formatted: "$440 CAD",
      originalFormatted: "$550 CAD",
      amount: 440,
      originalAmount: 550,
      currency: "CAD",
    },
  },
  GLOBAL: {
    echo: {
      formatted: "$159 USD",
      originalFormatted: "$199 USD",
      amount: 159,
      originalAmount: 199,
      currency: "USD",
    },
    nextgen: {
      formatted: "$239 USD",
      originalFormatted: "$299 USD",
      amount: 239,
      originalAmount: 299,
      currency: "USD",
    },
    family: {
      formatted: "$319 USD",
      originalFormatted: "$399 USD",
      amount: 319,
      originalAmount: 399,
      currency: "USD",
    },
  },
};

/** Normalizes country code from Vercel Edge (x-vercel-ip-country) into a pricing region */
export function getGeoRegion(countryCode?: string | null): GeoRegion {
  if (!countryCode) return "ID";
  const code = countryCode.toUpperCase().trim();
  if (code === "ID") return "ID";
  if (code === "AU") return "AU";
  if (code === "CA") return "CA";
  return "GLOBAL";
}

/** Section anchors, in navbar order. Labels live in the dictionary. */
export const NAV_IDS = [
  "cara-kerja",
  "garansi-teologis",
  "inovasi-ai",
  "investasi",
] as const;
