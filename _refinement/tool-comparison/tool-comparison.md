# AI Design Tools — Ranked for iMpatient™

**Generated:** 2026-05-17
**Constraint:** Usable within the hour. Output drops directly into the existing Next.js Pages Router repo. Honors the navy aura aesthetic, Gilroy + Geist Mono, the voice rules in `CLAUDE.md`, and the persona contract.

---

## TL;DR

- **Recommended right now: v0 by Vercel.** Same vendor as the stack. Clean Next.js + Tailwind / shadcn export. Zero procurement. Three to five minutes per surface. Aesthetic ceiling reaches senior when carefully prompted.
- **Recommended ongoing post-launch: Subframe.** Component-system-aware. Build a Gilroy + aura kit; AI generates against it. Highest design ceiling of any AI-adjacent tool. Slower per first draft, but compounds as the library grows.

---

## Evaluation criteria (anchored to brief)

| Criterion | Why it matters here |
|---|---|
| Ingests a live URL + existing repo | dev.impatient.app + this repo are the source of truth |
| Minutes prompt → shippable output | 13 days to launch, no time for slow tools |
| Design ceiling — senior vs generic-AI | Aura system is premium-SaaS; cannot tolerate generic AI slop |
| Fluency with behavioral data + longitudinal charts | Patterns is half the product |
| Renders the mønk™ aesthetic — restrained, signal-not-noise, premium-not-clinical | Navy aura, hairline borders, breathing halo, em-clause typography |
| iOS HIG + Material 3 fidelity | App Store + Play launch on May 30 |
| Export quality — drops into Next.js Pages Router cleanly | Existing repo + 13-day window |
| Zero onboarding friction — usable today | No procurement, no sales call |

---

## Ranked shortlist

### 1 · v0 by Vercel — **start using right now**

**Rationale.** Same vendor as the deployment target. Exports clean React + Tailwind (+ optional shadcn) with framework-aware Next.js scaffolding. Ingests URLs and screenshots. Iterative chat refinement preserves context. Time-to-screen: 3–5 minutes per surface. Design ceiling is genuinely premium when prompts include the aura tokens + voice rules — the model respects them. Zero procurement: any Vercel account. No agencies, no sales calls.

The risk: v0 has a default aesthetic (light-mode, shadcn, generic Tailwind) it falls into without strong prompting. **Always paste the aura token block + voice rules into every prompt.** The prompts in `/_refinement/prompts/` do this automatically.

**Best for:** the next 13 days. Today / Patterns / Concierge / Integrations / Profile surface ports. Mobile chrome tuning.

---

### 2 · Subframe — **ongoing iteration post-launch**

**Rationale.** Highest design ceiling of any AI-adjacent tool in 2026. Component-system-aware: you build a kit, AI generates against it. Exports React + Tailwind that reads like a senior frontend dev wrote it — not "AI-generated" in any obvious tell. Subframe-built components reuse cleanly; v0-built ones tend to re-paint each time.

The cost: heavier setup. You need to port the aura tokens + Withings form chrome + AuraHalo / AuraLoader / IntegrationCard / SourceGlyph into a Subframe component library before AI can generate against them. ~2 days of upfront work, then it compounds.

**Best for:** post-launch — when the product library is ~30+ components and the team is iterating individual screens against analytics and user feedback. Subframe stays useful for years; v0 plateaus after the initial port.

---

### 3 · Lovable — **whole-feature iteration**

**Rationale.** Full-project agent, GitHub-connected, can iterate on whole flows in a single thread. Strong for "build me onboarding end-to-end" or "build the Travel Card composer surface" — heavier than v0, owns the project state. Less surgical than v0 for component-level work.

**Best for:** ISSUE-017 (Onboarding flow), ISSUE-022 (Travel Card composer), ISSUE-024 (Settings tree). Anything end-to-end.

**Watch:** project-level commits can land big diffs. Always review before merging into main.

---

### 4 · Magic Patterns — **fast first drafts, parallel ideation**

**Rationale.** Generative UI tool with strong Tailwind output. Faster than Subframe for initial drafts. Weaker design ceiling than v0 once the prompt context grows.

**Best for:** parallel ideation when you need three different takes on a single surface in 10 minutes. Pick one, paste it into v0 for refinement.

---

### 5 · Galileo AI — **skip unless team is Figma-first**

**Rationale.** Figma-mediated. Generates a Figma file, then the team has to export to code. Adds a designer step. Output is uneven — sometimes brilliant, often generic-SaaS.

This team is dev-first (Lachlan + Venkat + Cameron, no designer named in the brief). Figma adds friction without payoff.

---

### 6 · Google Stitch — **reserve for Material 3 polish**

**Rationale.** Solid for Material 3 specifically. iOS HIG fluency is weaker. The app launches simultaneously on iOS and Android — if Android post-launch needs Material 3 polish that v0 isn't nailing, Stitch is a reasonable second pass.

**Best for:** ISSUE-007 Android-side polish, post-launch.

---

### 7 · Framer AI — **skip for this stack**

**Rationale.** Locked into Framer's runtime. Export path to Next.js is poor. Cannot use without a parallel codebase. Not the right fit.

---

### 8 · Relume — **skip for app UX**

**Rationale.** Marketing-site sitemap + wireframe generator. iMpatient is an app, not a marketing site. Not the right fit until / unless a separate marketing site is planned.

---

### 9 · Uizard — **skip**

**Rationale.** Older, lower design ceiling than v0 / Subframe. No reason to use.

---

### 10 · Mobbin + AI workflows — **inspiration only**

**Rationale.** Mobbin is a reference library, not a generator. Pair with Claude Code or Cursor for "find a great X pattern, then build it." Useful for the team's design vocabulary, not for output. The screenshots dropped in this session include period-tracker references (Flo / similar) — that's the right use of Mobbin.

**Best for:** Cameron's reference library when porting iOS HIG affordances.

---

### 11 · Claude + Figma MCP — **highest ceiling, slowest**

**Rationale.** Highest design ceiling of any approach. Real designer-with-Claude workflow. Slowest per screen — typically 30+ minutes vs v0's 5.

**Best for:** v2, when the team hires a designer. Reserve for now.

---

## Why v0 over Subframe right now (despite Subframe's higher ceiling)

The team has 13 days. v0 ships in three to five minutes per surface. Subframe ships in 30 minutes per surface but only after you've ported the aura system into Subframe (~2 days of upfront work). v0 wins the launch window. Subframe wins everything after.

**Plan:** ship the launch with v0. In the first week post-launch, port the live component library into Subframe in parallel. From that point on, all iteration runs through Subframe.

---

## Why NOT Galileo / Framer / Uizard / Relume

- Galileo — Figma-mediated, no designer on team
- Framer — runtime lock-in
- Uizard — ceiling too low
- Relume — wrong product type

---

## The exact first three prompts to run in v0 right now

These are duplicated, ready-to-paste, in `/_refinement/prompts/ISSUE-001.md`, `ISSUE-002.md`, and `ISSUE-005.md` — but here in summary:

### Prompt 1 — System prime (paste once, then run before every other prompt)

> You are designing a behavioral intelligence app called iMpatient — a co-doctor for chronic, hard-to-diagnose conditions (POTS, MS, MCAS, ME/CFS, dysautonomia). Aesthetic: navy aura, deep blue surfaces, single luminous brand-blue accent. Tokens: `--aura-bg-0:#060920; --aura-bg-1:#0A1230; --brand-glow:#B8D4FF; --brand-soft:#7AB8FF; --ink-0:#E6EEFF; --ink-7:#5F6E94`. Type: Gilroy display + Geist Mono. Spacing 4pt grid. Voice: literary, calm, specific — "Your watch has been keeping a notebook for you." Hard rules — never use emoji, never use Inter or system fonts, never light theme, never AI-marketing tropes. Headlines use em-clauses: a subject, then a softer italic em-tag clause. Eyebrows are mono-caps Geist Mono. Cards are translucent navy with 1.5px hairline borders. Every page hero includes an aura halo behind the headline (radial gradient, brand-blue, breathing animation, prefers-reduced-motion honored). All output must be a Next.js Pages Router page or component that imports the existing token CSS variables. Confirm you understand. Do not output code yet — wait for the surface spec.

### Prompt 2 — Today surface (ISSUE-002)

> Build the Today surface for the Pro persona Grayson (47, nonprofit CEO, Washington D.C. → Geneva on Tuesday, RRMS + MCAS + ADHD + hypothyroidism). Layout — left sidebar (NOW / LIFE ADMIN / EVIDENCE sections), top breadcrumb chrome ("iMpatient / Today · live · Last sync 2m · Export"), main column. Hero — eyebrow "Pro · The Complex Human", headline "Grayson — Sunday evening read.", italic em-clause "Thursday is asking for a decision.", body "Across the indexed history of your last fourteen comparable weeks, Thursday carries an 81% probability of a significant neurological event if no change is made now." with right-aligned meta showing tier + location string. Sections beneath: persona block (identity + condition tags + the founder's narrative line "Has crashed four times in two years. Each time she said: I could see this coming. Now she actually can."), weather strip (D.C. → Geneva, pressure delta foregrounded as the leading signal — pressure is the strongest non-self predictor we have), biometric strip (4 tiles: HRV / RHR / Sleep / Time on feet, each with a sparkline), sources strip (chip strip with warm dots for high-signal-weight sources, cool dots for baseline). End with a seven-day pattern preview card. No marketing language. No emoji. Output as `pages/index.tsx` ready to drop into the existing repo at `/home/user/impatient-health-app/pages/index.tsx`.

### Prompt 3 — Pattern dashboard (ISSUE-005 frontend)

> Build the Patterns surface (`pages/patterns.tsx`). Aura-hero with eyebrow "Patterns · evidence library", headline "The shape your body has been drawing,", italic em-clause "for fourteen weeks.", body "Your own data, organised by the relationships the engine has found and you have confirmed. This is what you show your doctor. This is what wins an insurance appeal." Below the hero: a stats strip (4 mono numbers — pairs scored / passing significance / new this week / driving today's prediction). Then a hero pattern card titled "Barometric drop → 48h prodrome, r = 0.74" with a longitudinal thread chart + n-sample. Then a library grid of 8 cards, each one a different correlation pair with score and confidence. Last section: a locked-tier teaser ("Three more patterns are waiting. Open them at Pro.") rendered in dimmed treatment with a single CTA. Card chrome: translucent navy `rgba(10, 18, 48, 0.32)` with 1.5px hairline `rgba(124, 153, 220, 0.18)` and hover-lift. Type uses the existing token scale — no hardcoded px. Output ready for `pages/patterns.tsx`.
