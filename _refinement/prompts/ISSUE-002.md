# ISSUE-002 · Replace developer textarea with Today as canonical landing

**Priority** P0 · **Owner** Lachlan · **Tool** v0 by Vercel · **Run after** ISSUE-001 system prime

---

## Paste-ready prompt — v0

```
Build the Today surface as the canonical landing at pages/index.tsx for the
Pro persona Grayson — 47, nonprofit CEO, 4 kids, frequent flyer.
Washington D.C. → Geneva (Tuesday). Conditions: RRMS, MCAS, ADHD,
hypothyroidism. The product's most important moment is switching personas in
Tweaks; the layout must scale to Harlow (Free) and Bella (Essential) without
re-design.

Layout:
  · 240px sticky left sidebar with cloud-mark top, then three sections —
    NOW (Today / Foresight badge "Thu" / Coach), LIFE ADMIN (Appointments
    badge "Tue" / Admin queue badge "7" / Travel Card / Cost of Care),
    EVIDENCE (Patterns / Conditions library / Care directory /
    Integrations / Profile).
  · Top breadcrumb chrome — "iMpatient / Today" mono-caps left,
    "live · Last sync 2m · Export" right. live = brand-glow dot with
    a soft 4px halo around it.
  · Main column max-width ~1080px.

Hero (the aura-hero zone with AuraHalo backdrop):
  Eyebrow:    Pro · The Complex Human
  Headline:   Grayson — Sunday evening read.
  Em-clause:  Thursday is asking for a decision.
  Body:       Across the indexed history of your last fourteen comparable
              weeks, Thursday carries an 81% probability of a significant
              neurological event if no change is made now.
  Right meta: tier line "Pro · all three domains" in brand-glow mono-caps,
              location string "Washington D.C. → Geneva (Tuesday)" beneath.

Sections beneath the hero, separated by 1px --card-border lines:

1. Persona block — eyebrow "Pro · The Complex Human", then
   "Grayson, 47 · Washington D.C. → Geneva (Tuesday)" at --t-md,
   then condition tags "Nonprofit CEO · 4 kids · RRMS · MCAS · ADHD ·
   hypothyroidism" at --t-sm in --ink-3, then the founder's narrative
   line "Has crashed four times in two years. Each time she said: <em>I
   could see this coming</em>. Now she actually can."

2. Atmosphere strip — eyebrow "Atmosphere". Line 1: "Washington D.C. ·
   home → Geneva (Tue 06:30)" in --ink-0 at --t-md. Line 2 mono:
   "1014mb · 52°F · clear &nbsp;·&nbsp; Geneva forecast: <span
   class='brand-glow'>996mb</span> · 41°F · rain". Annotation italic
   tiny: "Pressure drops 18mb across the flight — the strongest non-self
   predictor we have." Pressure delta is foregrounded; do not lead with
   temperature.

3. Biometric strip — eyebrow "Yesterday · biometric". Four tile cards
   in a 4-column grid:
     · HRV  38 ms,   trend down,  signal high
     · RHR  64 bpm,  trend up,    signal high
     · Sleep 6h 12m, trend flat,  signal mid
     · Time on feet 4h, trend down, signal baseline
   Each tile: eyebrow with metric name, big Gilroy value, mono unit,
   sparkline thread underneath in --ink-3 stroke. No drop shadows.
   Card chrome: translucent navy + 1.5px hairline.

4. Sources strip — eyebrow "Reading from". Chip strip wrapped, each
   chip a pill of 1px --card-border on translucent navy. Each chip
   has a 6px dot on the left:
     · warm peach (oklch 0.78 0.13 60) for high signal weight today
     · brand-soft for mid
     · ink-7 for baseline
   Sources to include verbatim, in order:
     Oura Ring (high), Apple Watch Ultra (high), Withings BP + Body+ (mid),
     Apple Health (baseline), Outlook (work) (high), Google Calendar
     (board) (mid), iCloud (family) (baseline), Care-team calendar (mid),
     Gmail + Outlook (baseline), TripIt + United + Lufthansa + UA Club
     (high), Climate + barometric (Tomorrow.io) (high), iMessage / SMS
     volume (mid), Specialist EHR (×6) (mid), Service dog vet portal
     (baseline).

5. Seven-day pattern preview — eyebrow "Your last seven days · what your
   body did". One large card with a longitudinal thread chart, --ink-3
   stroke, --card-border baseline, --brand-glow terminus dot with a 6px
   soft halo. Date strip mono beneath: "May 10 ··· May 17".

Footer-level annotation in --ink-7 mono micro: "status:
BLOCKED_ON_DATA_CONTRACT · placeholder series. See ISSUE-011."

Voice — no emoji. No "wellness". No "journey". Em-clauses, plain
language, specific numbers. Output ready to drop into
pages/index.tsx in a Next.js Pages Router repo. Read tokens from
existing styles/tokens.css and styles/globals.css via CSS variables.
Use the existing components I've shipped — import them:

  import PageShell from '../components/PageShell';     // sidebar + topbar + main
  import PageHero  from '../components/PageHero';      // aura-hero zone
  import PatternThread from '../components/PatternThread';
  import { PERSONAS, DEFAULT_PERSONA } from '../components/personas';

Render PageShell with current="/" and crumb="Today". Pull persona content
from PERSONAS[DEFAULT_PERSONA]. Do NOT hardcode persona-specific strings
where the PERSONAS object already has them.
```

---

## Acceptance

- `/` renders the cloud-mark top-left, "iMpatient / Today · live · Last sync 2m · Export" breadcrumb chrome
- Hero shows the eyebrow "Pro · The Complex Human", headline with em-clause "Thursday is asking for a decision." italic
- 4-tile biometric strip with sparklines
- Sources chip strip with warm/cool weight dots
- 7-day pattern preview with brand-glow terminus dot
- Zero console errors at `npm run dev`
- Switching `DEFAULT_PERSONA` in `components/personas.ts` from `'renee'` to `'simone'` or `'kezia'` re-renders the entire surface with that persona's lede + conditions + systems

## Already scaffolded in this pass

`pages/index.tsx` ships a working scaffold with PageShell + PageHero + the section composition above. v0's job is to elevate it to senior fidelity (weather hero polish with iOS-Weather feel, biometric sparkline confidence bands, source chip motion on hover).
