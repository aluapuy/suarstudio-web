---
name: accessibility-audit
description: Perform a WCAG 2.1 AA accessibility audit of a web page or component. Use before shipping UI, or when asked to check keyboard navigation, screen-reader support, or color contrast.
source: adapted from harikrishna8121999/antigravity-workflows (workflows/testing/accessibility-audit.md)
---

# Accessibility Audit

## Guardrails
- Detect the stack first; don't assume tools like Axe/Lighthouse unless present.
- Prefer semantic HTML fixes over ARIA.
- Baseline: WCAG 2.1 AA.
- Don't break existing styles/patterns.

## Steps
1. **Scope**: which page/component; specific concerns (keyboard, screen reader, contrast).
2. **Analyze project**: framework, a11y tooling (`eslint-plugin-jsx-a11y`, `axe-core`), styling approach.
3. **Audit**:
   - Run automated scans if available.
   - Semantic review: `header`/`nav`/`main`/`footer`, single `h1`, heading order.
   - Interactive elements: focus order, visible focus, keyboard operation of tabs/toggles (arrow keys for tablists, `aria-selected`, `aria-controls`), labels for icon buttons.
   - `<html lang>` matches the active language when content switches.
   - Contrast of text on every background token; `prefers-reduced-motion` respected.
   - Categorize findings: Critical / Major / Minor.
4. **Verify** fixes follow project style and ARIA roles match behavior.

Reference: https://www.w3.org/WAI/WCAG21/quickref/
