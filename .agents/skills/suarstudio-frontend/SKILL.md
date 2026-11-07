---
name: suarstudio-frontend
description: Suar Studio brand system ("Sacred Editorial"), bilingual ID/EN copy rules, and component conventions. Use whenever building, editing, or reviewing any Suar Studio web UI or copy.
---

# Suar Studio Frontend Conventions

Brand name: **Suar Studio** (handle `@suarstudio`). "Suar" = torch/beacon in Indonesian — the message carried beyond Sunday.

## Brand intent
Balance **theological reverence & pastoral trust** (Senior Pastors must feel the AI never changes their words) with **modern broadcast efficiency** (Youth/Multimedia leads feel excited). Editorial and calm, not "techy SaaS". Avoid neon, gradients-everywhere, and generic AI glow.

## Design tokens (single source: `src/styles/index.css` `@theme`)
| Token | Hex | Use |
|---|---|---|
| `alabaster` | `#F6F4EE` | page background |
| `sand` | `#EAE6DF` | cards / secondary surfaces |
| `sand-border` | `#DCD6CC` | 1px card borders |
| `obsidian` | `#161615` | dark showcase section + footer |
| `charcoal` | `#1C1B19` | primary text |
| `slate` | `#5C5852` | muted text |
| `brass` | `#C59B27` | brand gold accent (not for small body text on light bg — contrast) |
| `terracotta` | `#B85D3B` / hover `#9E4D2F` | CTA buttons only |
| `cypress` | `#2E5A44` on `#E3EFE8` | trust / verification badges |

## Typography
- Headings: `Instrument Serif` (fallback `Newsreader`, serif). Italic for emphasized keywords.
- Body/UI: `Plus Jakarta Sans`.
- Mono: `JetBrains Mono` — ONLY for timecodes (`[24:18 - 25:04]`), SOP/verification tags, and the hero eyebrow pill.

## Bilingual rules
- `lang: 'id' | 'en'`, default `'id'`; persisted to `localStorage`; overridable via `?lang=en`.
- All user-visible strings live in `src/i18n/dictionary.ts`. No hard-coded copy in components.
- The `en` dictionary is typed against the `id` one so a missing key is a compile error.
- On switch, update `document.documentElement.lang`.
- Use the client's brief copy verbatim; never invent theological claims, testimonials, statistics, or church names. No lorem ipsum.
- Indonesian number format for Rupiah: `Rp 2.000.000`.

## Configurable values (`src/config.ts`)
- `CTA_URL` — empty for now; buttons render and are clickable but link is filled later.
- Pricing amounts (IDR + AUD/USD reference) live in config, not in copy, so currency can change later without touching components.
- `INSTAGRAM_HANDLE = "@suarstudio"`.

## Trust-language guardrails
- Core promise: AI extracts, humans approve; verbatim quotes with timecodes; nothing renders before Monday 09:00 pastor approval.
- Never imply the AI writes sermons, paraphrases the pastor, or generates theology.
- Roadmap AI features (RAG archive, voice announcements, WA follow-up) are always labeled "Segera Hadir / Early Access".

## Component conventions
- One component per section in `src/components/`; section `id`s match nav anchors.
- Mobile-first Tailwind; test at 390 / 768 / 1440 px.
- Framer Motion for tab/lang transitions; respect `prefers-reduced-motion`.
- Mockups (hero UI, WhatsApp card, PDF) are built in HTML/Tailwind, not images.
