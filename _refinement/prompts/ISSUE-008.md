# ISSUE-008 · AuraHalo backdrop + AuraLoader

**Priority** P0 · **Owner** Cameron · **Tool** v0 by Vercel · **Run after** ISSUE-001 system prime

---

## Paste-ready prompt — v0

```
Two components. Both honor prefers-reduced-motion.

PART 1 — refine components/AuraHalo.tsx (already shipped):

  · Two layered radial gradients with slight offset (one centered at
    50% 45%, one at 52% 48%) so the halo has subtle depth not a flat
    disc.
  · Time-of-day hue shift: dawn (5–7am) warmer 210°, midday 222°,
    evening (5–8pm) cooler 232°, night (10pm–4am) deepest 240°. Hue
    updates every minute via useEffect setInterval.
  · Breathing animation: 8s ease-in-out infinite, scale 1.00 → 1.04,
    opacity 0.95 → 0.85.
  · Outer falloff to transparent. NEVER a hard edge.
  · prefers-reduced-motion disables the animation entirely.

PART 2 — build components/AuraLoader.tsx (new):

  · Fullscreen overlay with the same aura backdrop intensified.
  · Centered: a Geist Mono eyebrow line (the message prop) and below
    it the Gilroy h2 submessage prop in --ink-3.
  · A subtle progress indication — NOT a spinner, NOT a percentage —
    use a slow horizontal bar of three pulsing dots, each phase-offset
    by 800ms, fading 0.3 → 1.0 → 0.3 in --brand-glow.
  · Auto-dismisses after durationMs (default 2600ms) and calls onDone.
  · Locks scroll while visible.
  · Plays exactly once when triggered — must be controlled by parent
    state (visible prop). Do not auto-show.

Usage example:

  const [showLoader, setShowLoader] = useState(false);
  // when user clicks Doctor's side tab:
  setShowLoader(true);

  return (
    <>
      {showLoader && (
        <AuraLoader
          message="Composing the brief for Dr. Marsh"
          submessage="Reading fourteen weeks of your record."
          durationMs={2600}
          onDone={() => { setShowLoader(false); switchToDoctorView(); }}
        />
      )}
      ...
    </>
  );

Constitution: HANDOFF — "AuraLoader is the product's soul moment, made
to feel earned." It is NEVER played on initial page load. It is
triggered only on transitions that genuinely demand a moment of
composure — generating the doctor brief, switching personas, emergency
mode entry.

Output: an updated components/AuraHalo.tsx and a new
components/AuraLoader.tsx.
```

---

## Acceptance

- Every `PageHero` renders an `AuraHalo` behind the headline
- Halo breathes at 8s ease-in-out infinite, scale 1.00 → 1.04
- Hue shifts at the top of every hour (visible by changing system clock)
- `AuraLoader` plays exactly once on doctor-side trigger, 2.6s duration, locks scroll
- `prefers-reduced-motion: reduce` fully disables both animations

## Already scaffolded in this pass

`components/AuraHalo.tsx` ships with the two-layer gradient + breathing. v0 refines the offset, dot indicator, and adds AuraLoader. AuraLoader is queued under ISSUE-012 for the doctor-side moment.
