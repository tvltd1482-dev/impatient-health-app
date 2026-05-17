# ISSUE-016 · Accessibility primitives

**Priority** P1 · **Owner** Cameron · **Tool** Claude Code (local) + v0 for surface fixes

---

## Paste-ready prompt — Claude Code

```
Audit and remediate accessibility across the repo. Foundation already
shipped:
  · :focus-visible 2px brand-soft outline + 2px offset (globals.css)
  · prefers-reduced-motion disables all animations
  · --text-scale custom property plumbed via tokens.css

Tasks:

1. Install axe-core and @axe-core/react. Wire into npm run dev (only
   in development — never production).

2. Add a skip-to-content link in pages/_app.js:
   <a href="#main" className="sr-only-focusable">Skip to content</a>
   Plus a corresponding CSS class in globals.css that positions it
   off-screen until focused.

3. Add id="main" to every <main> element in PageShell (already
   structured for this — verify).

4. Audit aria-label coverage on every interactive element:
   · Sidebar nav links — label="<route name>"
   · Topbar Export button — already there
   · Cloud-mark Wordmark — label="iMpatient · Today"
   · AuraHalo — aria-hidden="true" (already there)
   · PatternThread — verify aria-label says what the data represents
   · Persona switcher buttons (once Tweaks panel is ported) —
     aria-pressed for active state

5. Color-contrast audit. Run a contrast check on every text/background
   pair:
   --ink-0 on --aura-bg-0  → must be ≥ 4.5:1 (target 7:1)
   --ink-3 on --aura-bg-0  → ≥ 4.5:1
   --ink-5 on --aura-bg-0  → ≥ 4.5:1
   --ink-7 on --aura-bg-0  → ≥ 3:1 minimum (large text only)
   --brand-soft on --aura-bg-0 → ≥ 4.5:1
   --brand-glow on --aura-bg-0 → ≥ 4.5:1

   For any pair that fails, propose a token adjustment. Get sign-off
   before changing tokens.

6. Keyboard navigation audit. Tab through every page. Confirm:
   · First Tab reveals the skip-link
   · Focus order is logical (top to bottom, left to right)
   · Every interactive element is reachable
   · Escape closes any open dialog / sheet
   · Enter / Space activates buttons
   · Arrow keys navigate within segmented controls and persona switcher

7. Plumb --text-scale through end-to-end. Once the Tweaks panel is
   ported (ISSUE-008 / future), document.documentElement.style.setProperty
   '--text-scale' should resize every type element across every page
   without per-component edits.

8. Run Lighthouse Accessibility on every page. Target ≥ 95.

9. Run axe-core. Target zero serious/critical issues.

Output: an axe-core report + Lighthouse summary, plus any code patches
applied. Document remaining a11y debt in /_refinement/accessibility-debt.md.
```

---

## Acceptance

- axe-core: zero serious/critical issues across every page
- Lighthouse Accessibility ≥ 95 on every page
- Skip-link visible on first Tab
- All keyboard paths verified
- Contrast audit passes WCAG AA on every token pair
- `--text-scale` mutation resizes every element across every surface
