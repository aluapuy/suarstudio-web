# Suar Studio Web — Agent Rules

## Behavioral baseline (Karpathy guidelines, MIT — forrestchang/andrej-karpathy-skills)
1. **Think before coding.** State assumptions. If multiple interpretations exist, present them; if unclear, ask.
2. **Simplicity first.** Minimum code that solves the problem. No speculative features, single-use abstractions, or unrequested configurability.
3. **Surgical changes.** Touch only what the task requires. Match existing style. Remove only orphans you created.
4. **Goal-driven execution.** Turn tasks into verifiable checks (build, typecheck, i18n key parity, screenshots) and loop until they pass.

## Project rules
- Brand name is **Suar Studio** (`@suarstudio.co`). Never use the old working name "Keryx".
- Stack: Vite + React + TypeScript + Tailwind CSS + Framer Motion. No SSR framework.
- Always load `DESIGN.md` for direction (`Dial: ENERGY 2 / RHYTHM 3 / MOTION 2`) and `suarstudio-frontend` before touching UI or copy.
- All copy goes through `src/i18n/dictionary.ts` (ID + EN). Never hard-code user-visible strings.
- Use only the brand tokens defined in `DESIGN.md` and `src/index.css`; no ad-hoc hex colors that violate WCAG AA (`4.5:1`).
- Visual QA uses a real rendering browser.
- Before declaring work done: `npm run build` passes, both languages render, and mobile (`390px`) layout is checked.
