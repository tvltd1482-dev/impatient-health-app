# iMpatient — Project Constitution

This file is auto-loaded into every Claude Code session for this project.
It is the operating system. Read it once at the start of every chat.

---

## What iMpatient is

A "co-doctor" for people living with chronic, hard-to-diagnose conditions —
dysautonomia, MS, autoimmune flares, POTS, ME/CFS, long COVID. The product
reads continuous signals (wearables, calendars, communication patterns,
weather, travel) and turns them into something the patient can _act on_
and the doctor can _trust_.

The promise:

> Your body has been keeping a notebook. We read it back to you in plain
> language, and we hold the visit for both of you — patient and doctor —
> so the appointment is calm, informed, and followed-through.

It is **not** a wellness app. It is **not** a tracker. It is a clinical
partner. The voice and the chrome both reflect that.

---

## Three personas — same engine, three lives

These are sacred. Do not rename them. Do not collapse them. The tier
ladder is the product narrative.

### Harlow · Free · "The Observer"
- 31, secondary-school art teacher in Birmingham, UK
- Newly diagnosed RRMS (8 months in)
- Apple Watch only. No calendar yet.
- 7-day rolling view. Sees what her watch has noticed. Cannot see _why_
  yet — that's locked behind Essential.
- **Voice to her:** gentle, curious, never pushy. "Your watch has been
  keeping a notebook for you. Here is the first read."

### Bella · Essential · "The Pattern-Seeker"
- 35, freelance designer in Austin
- POTS + suspected MCAS, 3 years searching
- Oura + Apple Health + 2 calendars + cycle tracker
- 30-day view. Pattern detection on. The "aha" tier.
- **Voice to her:** specific, precise, validating. "You weren't imagining
  it. Your body has been telling you this for 14 nights."

### Grayson · Pro · "The Executive Patient"
- 47, COO, frequent flyer, dual-citizen
- Established dysautonomia + autoimmune overlap, 12 years in
- Full stack: 2 wearables, 4 calendars, comms volume, travel apps,
  weather, FHIR records, lab integrations, agentic concierge
- Predictive (72h-out flare windows), agentic (the system _acts_:
  reschedules calls, books labs, drafts the doctor brief)
- **Voice to him:** brisk, executive-grade, no hand-holding. "Thursday's
  flight + Friday's board meeting + standing forecast = 78% probability
  of a Sunday-evening flare. Two protocols are queued."

The personas are defined in `components/personas.jsx`. Every page reads
from there. Switch personas via the Tweaks panel — same engine, three
fully different surfaces. **This is the demo's most important moment.**

---

## Voice rules (non-negotiable)

These are how iMpatient _sounds_. They are not optional.

1. **Calm, specific, literary.** Not pitchy. Not breezy. Not slop.
   - Bad: "Get insights into your wellness journey ✨"
   - Good: "Your resting heart rate has been climbing six beats every
     Sunday evening. The same time, every week."

2. **Em-clauses for rhythm.** Headlines often use a comma + em-clause to
   create the iMpatient cadence: subject, then a softer italic clause.
   - "Talk through your signals, _like a person._"
   - "Before · during · after. _The visit, held for both of you._"
   - "{First}, _this is your record._"

3. **Plain language for clinical concepts.** "Borrowed legs" not
   "post-exertional fatigue index." "Splintered nights" not "fragmented
   sleep architecture." We earn the right to use clinical terms by
   first proving we understand the lived experience.

4. **Specific numbers > vague quality words.** Never "you slept poorly."
   Always "you got 4h 48m, broken five times after 2am."

5. **Honor the body's authority.** The body knew first. We are reading
   what it has been telling them all along. We are not _diagnosing_;
   we are _translating_.

6. **No emoji. Ever.** The brand is not Slack. It is not Notion.

7. **No AI-slop tropes:**
   - No "✨ AI-powered insights"
   - No gradient backgrounds for the sake of it
   - No "your wellness journey"
   - No left-border-accent rounded containers as decoration
   - No SVG illustrations of bodies, brains, charts. Use placeholders.
   - No drawn imagery — ask for real materials or use a placeholder

8. **Privacy is voice, not legalese.** Say it in plain language:
   "We never read the content of your messages. We read the volume and
   timing — never the text."

---

## The aura design system

iMpatient's hero motif is a **luminous bright-blue aura on deep navy**.
It evokes knowledge meeting calm — the visual equivalent of "your
body's been keeping a notebook."

### Tokens (`styles/tokens.css`)
- `--aura-bg-0: #060920` — deepest, page background
- `--aura-bg-1: #0A1230` — primary surface
- `--brand-glow: #B8D4FF` — luminous core
- `--brand-soft: #7AB8FF` — primary brand blue
- `--brand-royal: #2D5FE0` — mid
- `--brand-deep: #1E40AF` — depth
- Ink scale (`--ink-0` … `--ink-9`) is bluer-tinted, not neutral grey
- Type scale multiplies through `--text-scale` (0.92 / 1.00 / 1.15 / 1.30)
  driven by Tweaks. **Always use the scale tokens; never hardcode px.**

### Components (`components/aura.jsx`)
- `<AuraHalo />` — drop into any positioned container as a backdrop.
  Two layered radial gradients with offset breathing. Auto time-of-day
  hue shift via `useAuraTone()`.
- `<AuraBackdrop />` — page-level halo, mounted once in App, fixed
  behind everything.
- `<AuraLoader message submessage durationMs onDone />` — fullscreen
  "take a breath" moment for heavy transitions. Wired into Concierge
  doctor-brief generation. Use it for any moment that should feel earned.

### When to use each
- Every page hero gets an `aura-hero` zone with `<AuraHalo />` behind
  the headline. This is the brand's first impression on every screen.
- Reduced motion is honored throughout (`@media (prefers-reduced-motion)`).

---

## Form chrome (`styles/forms.css`)

Inspired by the Withings reference set. Forms here are calm and
dignified. The user is asked for very little, and each field is given
room.

- **Mono-caps eyebrow labels** above every field (Geist Mono, 10px,
  0.16em letter-spacing, uppercase, ink-7)
- **Soft 1.5px outlined inputs** on translucent navy. No fills.
  Focus state: brand-soft border + 3px brand-soft glow
- **Segmented controls** for short option groups (units, theme)
- **Toggle rows** with iOS-style switches for binary preferences
- **List-rows** for non-input rows (avatar pickers, navigation links)

Use these for any data-entry surface (Profile, Settings, Integrations,
Onboarding). Do not invent new form chrome.

---

## File conventions

```
components/         — JSX files, one per surface
  personas.jsx      — the three personas (source of truth for all data)
  shell.jsx         — Sidebar + Topbar
  aura.jsx          — AuraHalo + AuraLoader + AuraBackdrop
  cards.jsx         — small reusable card primitives
  source-logos.jsx  — integration glyph library
  weather-hero.jsx  — Today's weather/location hero
  today.jsx         — Today / dashboard
  coach.jsx         — AI Coach (Claude-powered)
  patterns-data.jsx + patterns.jsx       — Patterns
  concierge-data.jsx + concierge.jsx     — Appointment Concierge
  profile.jsx       — Patient profile
  integrations.jsx  — Sources directory

styles/             — split by surface
  tokens.css        — design tokens (THE source of truth)
  aura.css          — aura system
  app.css           — shell + base
  pages.css         — page heroes, ledes, eyebrows
  forms.css         — form chrome
  coach.css
  patterns-concierge.css
  weather.css
  integrations.css

BRIEF.md            — product spec (long-form, original brief)
CLAUDE.md           — this file
HANDOFF.md          — state of the world, what's built, what's next
index.html          — single entry point, all routes wired here
```

### Component conventions
- Every component file starts with a **block comment explaining the why
  of the design**, not just the what. New agents read these to
  understand the thinking, not just the structure.
- Each component exports to `window` at the end:
  `Object.assign(window, { ComponentName, helperFn });`
- All page components read persona via `window.__activePersona` and
  `window.PERSONAS[id]`. Never hardcode persona data into a component.
- Style objects must have unique names if defined globally (collision
  risk across Babel scripts). Prefer inline styles or CSS classes.

### Style conventions
- Cache-bust stylesheets via `?v=N` query in `index.html` after edits
- Always use scale tokens (`--t-base`, `--t-lg`, etc.) — never hardcode px
- Class naming: kebab-case, surface-prefixed (`integration-card`,
  `coach-shell`, `phase-tab`)

---

## The Tweaks contract

Tweaks panel is the demo's control surface. It must persist.

```js
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "persona": "renee",
  "textScale": 1
}/*EDITMODE-END*/;
```

The block between `EDITMODE-BEGIN` and `EDITMODE-END` is **valid JSON**.
The host parses it, merges edits, and writes the file back so changes
survive reload. Do not break this format.

Currently exposed:
- **Persona** — Harlow / Bella / Grayson
- **Text size** — Compact (0.92×) / Default (1.00×) / Larger (1.15×) /
  Largest (1.30×). Drives `--text-scale` on `:root`. The whole UI
  scales without per-component edits.

When adding new tweaks:
- Add the default to `TWEAK_DEFAULTS`
- Read via `tweaks.keyName`
- Write via `setTweak('keyName', value)`
- Persist via the existing `useTweaks` hook in `tweaks-panel.jsx`

---

## The "never do" list

A bright line of decisions already made. **Do not re-propose these.**

- ❌ Never rename the personas. Harlow / Bella / Grayson are final.
- ❌ Never bring back the "Ambient" pill / mode (we removed it).
- ❌ Never use a light theme. The aura system is navy-first by design.
- ❌ Never invent new colors. Use the token palette. Extend it via
  oklch only if the user explicitly asks.
- ❌ Never read message _content_. The privacy promise is foundational —
  iMpatient reads volume, timing, rate, never text/notes/bodies.
- ❌ Never use emoji.
- ❌ Never use Inter, Roboto, system fonts. Brand is Gilroy + Geist Mono.
- ❌ Never draw human bodies, organs, or anatomical SVGs. Use placeholders.
- ❌ Never auto-add filler content. Empty space is a design problem to
  solve with composition, not with dummy text.
- ❌ Never create a new file > 1000 lines. Split.
- ❌ Never break the `EDITMODE-BEGIN/END` JSON block.
- ❌ Never collapse the tier story (Free / Essential / Pro). Each tier
  must feel like a meaningfully different product.

---

## The "always do" list

- ✅ Always start by reading `BRIEF.md`, `CLAUDE.md`, and `HANDOFF.md`
- ✅ Always read the relevant component file _and_ its styles before
  editing — match the visual vocabulary already established
- ✅ Always cache-bust touched stylesheets (`?v=N+1`)
- ✅ Always honor `prefers-reduced-motion` on new animations
- ✅ Always wrap page heroes in an `aura-hero` zone with `<AuraHalo />`
- ✅ Always test with all three personas — switch them via Tweaks
- ✅ Always write a "why" comment block at the top of new component files
- ✅ When adding a new surface, follow the 4-step pattern in HANDOFF.md
- ✅ When in doubt about voice, read the source material in `BRIEF.md`
  and the existing copy on Today / Coach / Concierge

---

## Source of truth — read these in order

1. `BRIEF.md` — product spec, voice, personas, tier ladder
2. `CLAUDE.md` — this file (operating system)
3. `HANDOFF.md` — state of the world, what's built, what's next
4. `components/personas.jsx` — the three personas (data)
5. `index.html` — how routes are wired

If anything in this file conflicts with a casual instruction in chat,
ask the user before deviating. The constitution wins by default.
