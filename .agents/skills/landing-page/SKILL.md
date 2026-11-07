---
name: landing-page
description: Build conversion-focused, mobile-first landing pages. Use when planning sections, creating section components, or verifying a marketing page (hero, features, how-it-works, pricing, CTA).
source: adapted from harikrishna8121999/antigravity-workflows (workflows/creative/landing-page.md)
---

# Landing Page Creation

## Guardrails
- Detect the project stack before suggesting implementations (this project: Vite + React + TS + Tailwind + Framer Motion).
- Favor bold, distinctive design over safe, generic choices.
- Mobile-first responsive design.
- Accessibility: contrast ratios, semantic HTML.

## Steps
1. **Understand requirements**: product, audience, primary CTA, sections, brand guide. (For Keryx, read the `keryx-frontend` skill first.)
2. **Analyze stack**: framework, styling, animation libs, existing component conventions.
3. **Plan sections**: hero + primary CTA above the fold; below: social proof/trust, features/benefits, how it works, pricing, FAQ, final CTA.
4. **Create components**: one component per section, consistent styling, entrance animations, semantic HTML.
5. **Assemble page**: logical flow, consistent section spacing, smooth anchor scrolling.
6. **Verify**: mobile/tablet/desktop, WCAG AA contrast, prominent clickable CTAs, load performance.

## Principles
- Large expressive headings; generous body line-height.
- Brand accent reserved for CTAs.
- Section padding ~80-120px desktop, smaller on mobile.
- Optimize images (WebP, lazy-load), keep JS bundle small, preload web fonts.
- Alt text, keyboard navigation, visible focus states.
