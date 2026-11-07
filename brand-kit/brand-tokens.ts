// Suar Studio — Motion Video Brand Tokens (Drop-in for Remotion / React / Canvas)

export const SUAR_COLORS = {
  // Backgrounds & Surfaces
  alabaster: "#F6F4EE",       // Primary light background (warm editorial paper)
  sand: "#EAE6DF",            // Card / secondary surface
  sandBorder: "#DCD6CC",      // Subtle 1px divider / border
  obsidian: "#161615",        // Dark contrast background (video showcase & outro)

  // Typography
  charcoal: "#1C1B19",        // Primary text on light bg
  slate: "#5C5852",           // Muted / secondary text

  // Accents
  brass: "#C59B27",           // Primary brand gold (emblem, waveforms, highlights)
  terracotta: "#B85D3B",      // CTA button accent
  terracottaHover: "#9E4D2F", // CTA hover / active state
  cypress: "#2E5A44",         // Verification / Theological Trust green
  cypressTint: "#E3EFE8",     // Verification badge pill background
} as const;

export const SUAR_FONTS = {
  serif: "'Instrument Serif', 'Newsreader', Georgia, serif",
  sans: "'Plus Jakarta Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const SUAR_BRAND = {
  name: "Suar Studio",
  handle: "@suarstudio",
  taglineId: "Studio Pemuridan Digital & Otomasi Media Gereja",
  taglineEn: "Digital Discipleship & Church Media Automation",
  heroHeadlineId: "Mimbar Hari Minggu Selesai. Biarkan Pesannya Terus Menjangkau Jiwa Sepanjang Minggu.",
  heroHeadlineEn: "Sunday’s Pulpit Concludes. Let Its Message Reach Souls All Week Long.",
  trustBadgeId: "100% Sesuai Kalimat Gembala",
  trustBadgeEn: "100% Pastor's Exact Words",
} as const;
