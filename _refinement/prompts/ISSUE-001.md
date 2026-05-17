# ISSUE-001 · Port aura design tokens into the Next.js repo

**Priority** P0 · **Owner** Lachlan · **Tool** v0 by Vercel (then commit the result)

This is the **system prime** prompt. Paste it once at the start of a fresh v0 thread, wait for v0 to confirm it understands, then run subsequent prompts (ISSUE-002, 003, etc.) in the same thread so context carries.

---

## Paste-ready prompt — v0

```
You are designing a behavioral intelligence app called iMpatient — a co-doctor
for chronic, hard-to-diagnose conditions (POTS, MS, MCAS, ME/CFS,
dysautonomia, autoimmune flares). It is not a wellness app. It is not a tracker.
It is a clinical partner.

Aesthetic — navy aura. Deep blue surfaces. Single luminous brand-blue accent.
Hairline borders, no shadows. One warm exception (peach) reserved for
high-signal-weight states only — never as decoration.

Tokens — paste verbatim into your output's CSS:

  /* surface */
  --aura-bg-0: #060920;   /* page background */
  --aura-bg-1: #0A1230;   /* primary surface */
  --aura-bg-2: #0E1740;
  --aura-bg-3: #16225A;

  /* brand blue */
  --brand-glow:  #B8D4FF; /* luminous, "active right now" */
  --brand-soft:  #7AB8FF; /* primary accent */
  --brand-royal: #2D5FE0;
  --brand-deep:  #1E40AF;

  /* ink — bluer-tinted, NEVER neutral grey */
  --ink-0: #E6EEFF;
  --ink-3: #C9D5F0;
  --ink-5: #8C9BC4;
  --ink-7: #5F6E94;
  --ink-9: #1A2752;

  /* card chrome */
  --card-bg:     rgba(10, 18, 48, 0.32);
  --card-border: rgba(124, 153, 220, 0.18);

Type — Gilroy display (Fontshare) + Geist Mono (Google Fonts).
NEVER Inter. NEVER Roboto. NEVER system fonts. NEVER Helvetica.

Type scale via --text-scale custom property (Tweaks-driven):
  --t-xs: calc(11px * var(--text-scale));
  --t-sm: calc(13px * var(--text-scale));
  --t-base: calc(15px * var(--text-scale));
  --t-md: calc(17px * var(--text-scale));
  --t-lg: calc(20px * var(--text-scale));
  --t-xl: calc(28px * var(--text-scale));
  --t-2xl: calc(40px * var(--text-scale));
  --t-3xl: calc(56px * var(--text-scale));
  --t-4xl: calc(80px * var(--text-scale));

Never hardcode px in components. Always read from the scale tokens.

Spacing — 4pt grid (--space-1 through --space-10 = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128).

Radii — 4 / 8 / 14 / 20 / 999 pill.

Motion — --ease-aura: cubic-bezier(0.22, 0.61, 0.36, 1).
Durations: --dur-fast 140ms / --dur-med 240ms / --dur-slow 380ms /
--dur-breath 8000ms for halo.

Voice rules — non-negotiable:
  · Calm, specific, literary. Not pitchy. Not breezy. Not slop.
  · Em-clauses for rhythm — "Talk through your signals, like a person."
  · Plain language for clinical concepts — "splintered nights" not
    "fragmented sleep architecture."
  · Specific numbers, never vague quality words.
  · Honor the body's authority — the engine is translating, not diagnosing.
  · NO emoji. Ever.
  · NO "wellness journey", "AI-powered insights", "optimal health".
  · NO gradient backgrounds for the sake of it. The aura halo earns its
    gradient by being functional (time-of-day hue, breathing rhythm).
  · NO drawn imagery of bodies, brains, anatomical SVGs. Use placeholders.

Headlines use the em-clause cadence: subject, then a softer italic em-tag
clause that completes the sentence. Example structure:

  <h1>
    Grayson — Sunday evening read.
    <em>Thursday is asking for a decision.</em>
  </h1>

Eyebrows: mono-caps Geist Mono, 11px, 0.16em letter-spacing, color --ink-7
(or --brand-glow for "live now" emphasis).

Cards: translucent navy --card-bg with 1.5px solid --card-border, radius 14px,
hover transitions border-color to --card-border-strong (0.32 alpha). No
drop-shadow boxes — hairlines do the work.

Every page hero gets an AuraHalo backdrop — a positioned absolute element
behind the headline with a two-layer radial gradient in HSL around 220deg
+- 12deg, blurred 20px, breathing 8s ease-in-out infinite, scale 1.00→1.04
with opacity drift. Honors prefers-reduced-motion (animation disabled).

All output must be a Next.js Pages Router page or component (no App Router,
no server actions). Import the CSS-variable tokens directly — they are in
styles/tokens.css and globals.css in the existing repo. Use inline style
objects with var() references, or named CSS classes — your call.

Acknowledge you understand by repeating the four hardest rules back to me.
Do NOT output code yet. Wait for the surface spec in the next message.
```

---

## Acceptance

- v0 acknowledges the four hardest rules (no emoji, no Inter, no light theme, no AI-slop) before generating any code
- Subsequent v0 outputs reference the token variables directly (no hardcoded `#0066FF`, no `font-family: Inter`)
- Grep across the repo for `Inter` or `Roboto` returns zero results

## Already scaffolded in this pass

- `styles/tokens.css` (the canonical token source — v0 reads from here)
- `styles/globals.css`
- `pages/_app.js`
- `pages/_document.js`
