# ISSUE-011 · Patterns surface — hero card + library grid + locked-tier teaser

**Priority** P1 · **Owner** Lachlan · **Tool** v0 by Vercel · **Run after** ISSUE-001 system prime

---

## Paste-ready prompt — v0

```
Build pages/patterns.tsx (replacing the queued stub).

PageShell with current="/patterns" and crumb="Patterns".

Hero:
  Eyebrow:    Patterns · evidence library
  Headline:   The shape your body has been drawing,
  Em-clause:  for fourteen weeks.
  Body:       Your own data, organised by the relationships the engine
              has found and you have confirmed. This is what you show
              your doctor. This is what wins an insurance appeal.
  Meta:       tier · "12 of 23 confirmed"

Stats strip — 4 mono-numeric tiles in a row, hairline-divided:
  · pairs scored      23
  · passing r ≥ 0.6   12
  · new this week      3
  · driving today      1
  Each tile: eyebrow micro-caps label, big Gilroy 600 number at --t-xl,
  tiny annotation in --ink-7.

Hero pattern card — the one driving today's prediction:
  · Card chrome translucent navy with 1.5px hairline
  · Eyebrow "Pattern · driving today's prediction" in --brand-glow
  · Title "Barometric drop → 48h prodrome" Gilroy 28px
  · Inline mono r-value "r = 0.74" with --brand-soft accent
  · Body "Every flight you've taken to a lower-pressure city in the
    last fourteen months has been followed by a flare within
    48 hours. Geneva's forecast is 18mb below D.C."
  · A wide PatternThread at 160px height
  · Footer: "n = 14 paired observations · last validated May 12 · 92% confidence"

Library grid — 8 PatternCard tiles in a 2-column grid:
  Each card:
    · Title (correlation pair, e.g. "Late-night Slack → poor sleep")
    · Mono r-value with sign indication
    · Mini PatternThread at 48px
    · Trailing mini-label "confirmed" or "exploring"
    · Hover-lift: translate Y -2px, border-color stronger

  Pairs to include for Grayson (the demo persona):
    1. Barometric drop → 48h prodrome              r = 0.74
    2. International flight → 72h flare window      r = 0.68
    3. Board meeting day → cortisol elevated        r = 0.61
    4. Late Slack → splintered sleep                r = -0.59
    5. Pre-period day → MCAS flare                  r = 0.71
    6. Heat day > 80°F → fatigue                    r = 0.58
    7. Three-night travel → cognitive slowdown      r = 0.66
    8. Hydration < 60oz → afternoon RHR spike       r = 0.62

Locked-tier teaser at the bottom:
  · Single card, dimmed treatment (50% opacity), --ink-7 text
  · Headline "Three more patterns are waiting."
  · Em-clause "Open them at Pro."
  · CTA button "Upgrade · $49.99/mo" in outlined brand-soft

Voice rules: no emoji, no "wellness", no "journey". Specific numbers
everywhere. Em-clause cadence on the teaser.

Output ready for pages/patterns.tsx. Reuse PatternThread for all
longitudinal renders.
```

---

## Acceptance

- `/patterns` renders aura-hero + stats strip + hero pattern card + 8-card library + locked teaser
- Each library card has r-value + mini-thread + state pill
- Locked teaser uses upgrade-prompt voice ("Open them at Pro")
- Cards translucent navy with hover-lift

## Note

Constitution (HANDOFF): "Patterns styling is partial in the prototype." This v0 prompt finishes the job. Lock the surface against the source-of-truth screenshot before merging.
