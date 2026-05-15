# iMpatient — Handoff

State of the world. Written by the design agent who built the foundation.
Read this once, then start building. Cross-check with `CLAUDE.md` for the
operating rules.

---

## North star, in one paragraph

iMpatient is a co-doctor for chronic, hard-to-diagnose conditions. It
reads continuous signals (wearables, calendars, comms volume, weather,
travel) and turns them into a) a calmly-worded daily read for the
patient, b) a recipient-framed brief for the doctor. The product's
unique move is **the appointment loop** — pre-visit grounding, in-visit
support, post-visit follow-through, with the doctor seeing a different
view of the same data. Three tiers (Free / Essential / Pro) are not a
pricing exercise — they're a ladder of understanding, named Harlow,
Bella, Grayson respectively. Switching personas in Tweaks is the demo's
most important moment.

---

## What's built

### `Today` (`components/today.jsx`, route `today`)
- Page hero with luminous AuraHalo, time-of-day-aware tone shift
- Atmospheric weather/location hero (`components/weather-hero.jsx`) — iOS-Weather feel, dual-pane, pressure delta foregrounded as the leading signal (pressure is the strongest non-self predictor we have)
- Per-persona greeting + lede, with collapsible long-form lede
- Biometric strip (HRV, RHR, sleep, time on feet) with sparklines
- "Inputs" (now "Sources") strip — color-weighted by signal weight: warm peach = high-signal contributor today, cool blue = baseline. Pulsing dots. Mono-line glyphs.
- Per-persona schedule strip ("your last seven days · what your body did")
- Correlations preview, coach suggestions card

### `Coach` (`components/coach.jsx`, route `coach`)
- Real `window.claude.complete` integration — Haiku-powered, system prompt loaded from active persona's signals
- Threaded conversations with left rail
- Context strip above the conversation (HRV, RHR, sleep, flight, predictions)
- Suggested-prompt chips, typing indicator, brand-blue user bubbles
- "Share with Dr. Chen" header action (UI only — natural next step is the doctor brief screen)
- Privacy footer makes the data boundary explicit

### `Patterns` (`components/patterns.jsx`, route `patterns`)
- Page hero with stats strip (pairs scored / passing significance / new this week / driving today's prediction)
- Hero pattern card — the one driving today's prediction
- Library of all detected pairs, scored r-values, locked patterns hint upgrade
- **Note:** styling is partial — see "Queued" below

### `Concierge` (`components/concierge.jsx`, route `concierge`)
- Library strip — the 5 appointment protocols (bloodwork, specialist, imaging, infusion, emergency)
- Bloodwork end-to-end as the showcase: 4 phases (Before · 36h / During / After / Doctor's side)
- AuraLoader plays for 2.6s when switching to "Doctor's side" — "Composing the brief for Dr. Marsh" — the product's soul moment, made to feel earned
- Doctor-side panel: recipient-framed brief, 4 lines, no chart-dump
- Emergency mode toggle (red protocol)

### `Profile` (`components/profile.jsx`, route `profile`)
- Two-column Withings-inspired form
- Identity: avatar, names, DOB, sex, height (ft/in unit pills), country
- Preferences: imperial/metric segmented, theme segmented, 4 toggle rows
- Connected sources mini-list linking to Integrations / Privacy / Export
- Sticky save bar (Cancel · Save changes)

### `Integrations` (`components/integrations.jsx`, route `integrations`)
- Privacy promise card on top — frames every toggle below
- 6 grouped sections: Wearables · Health records · Calendars · Communication · Travel & environment · Medical
- Auto-grid of integration cards. States: Connected (luminous + pulsing dot + "Reading since X") / Available (Connect button) / Tier-locked (lock corner, dimmed, "Requires Pro" + Upgrade)
- Custom 24×24 mono-line glyphs for each (watch, ring, cuff, heart, moon, doc, cal, stethoscope, msg, envelope, chat, plane, cloud, leaf, vial, pill, scan)
- Voice copy on every card — "Volume only. Tells us when the world is asking a lot of you." not "syncs message data"
- Tier-gating reads from active persona — Harlow sees most cards locked, Grayson sees almost all unlocked

### Foundation
- Aura design system (`styles/aura.css`, `components/aura.jsx`) — navy surfaces, luminous brand-blue gradient, breathing animation, time-of-day hue shift
- Form chrome (`styles/forms.css`) — Withings-inspired, mono-caps eyebrow labels, soft outlined inputs, segmented controls, toggles, list-rows
- Type scale via `--text-scale` custom property — Tweaks-driven 4-level control (0.92 / 1.00 / 1.15 / 1.30)
- Personas (`components/personas.jsx`) — full data for all three, single source of truth
- Tweaks panel — persona switcher + text size + extensible

---

## What's queued (in priority order)

### 1. Wire `Patterns` page properly
Data lives in `components/patterns-data.jsx`, page renders, but styling is partial. The hero pattern card needs polish, the library grid needs the same treatment as Integrations cards, and the locked-pattern teaser needs the upgrade-prompt voice.

### 2. `Flare Prediction detail` (Pro tier · Grayson)
A drill-down from the 72h flare-window prediction on Today. Should show:
- The compound r-value and its top 3 contributing patterns
- A timeline visualization of the predicted window
- Suggested protocols (reschedule, hydrate, prep meds, alert care team)
- Agentic actions queued — "I've held Friday's board meeting, drafted a note to your COO, and sent the lab order to Quest"

### 3. `30-Day Summary`
A monthly read — narrative-first, not chart-first. "This month your body asked you to slow down on Sundays. Here's what we noticed about that." Should pull from the same engine as Patterns but framed as a story arc.

### 4. `Onboarding`
First-run flow. Connect integrations, seed baseline, calibration period. Should use the form chrome from Profile/Integrations. Privacy promise should be the second screen, not the last. Most important rule: **the user should feel calm by the end of it, not interrogated.**

### 5. `Conditions library`
Per-condition pages — POTS, ME/CFS, MS, MCAS, autoimmune overlap. Each is a "what we know about how your body experiences this" read, not a Wikipedia article. Should pull from the persona's own data when applicable.

### 6. `Care directory`
The user's care team — primary, specialists, infusion centers, pharmacy. Each provider has a "what we share with them" line and a "next visit" reminder. Doctor-side: their view of you.

### 7. `Settings`
Beyond the preferences in Profile. Account, billing, data export, notifications, accessibility, danger zone (delete account, export everything).

### 8. `Travel Card` (Pro · Grayson)
A pre-flight protocol — what to pack, when to take meds, hydration plan, time-zone shift management. Cabin pressure + altitude as known stressors.

### 9. `Cost of Care`
The financial side — out-of-pocket spend per condition, insurance interactions, FSA/HSA usage, "the dysautonomia tax."

### 10. `Foresight`
The Pro-tier predictive view. 72h-out flare windows, with confidence intervals and contributing factors. Today's "predictions" card should drill into this.

### 11. `Admin queue` (Pro · Grayson)
Where the agentic actions stack up. "I rescheduled X. I drafted Y. I queued Z. Approve / dismiss / modify." This is where the product becomes _verb_, not noun.

---

## Decisions made (do not re-propose)

- **Persona names final:** Harlow (Free) / Bella (Essential) / Grayson (Pro). Earlier names were Kezia / Simone / Renee — those are still the internal IDs (`p.id`) but the display names are Harlow/Bella/Grayson.
- **Dropped the "Ambient" pill/mode.** It muddied the tier story.
- **Aura over light theme.** Navy is the brand. Don't propose a light variant unless asked.
- **Source chips: warm = high signal weight today, cool = baseline.** Color carries meaning, not decoration.
- **Pressure delta is the leading weather signal.** Not temperature. Not humidity. Pressure is the strongest non-self predictor we have.
- **Withings form chrome** for any data-entry surface.
- **Real Claude integration in Coach.** `window.claude.complete` with persona-specific system prompts.
- **AuraLoader for the doctor-brief generation moment.** The "soul" moment that should feel earned.
- **Type scale via `--text-scale`** — never hardcode px.
- **Privacy framing first**, controls second. Never the reverse.

---

## Open questions (you'll need to ask the user)

1. **Onboarding** — does it happen on web, on mobile, or both? Affects component sizing.
2. **Doctor portal** — separate product? Embedded view? Browser-only? The "Doctor's side" tab in Concierge is a teaser; the real surface is unbuilt.
3. **Pricing display** — when do we show actual $ figures vs. just tier names? Currently we never show prices.
4. **Family accounts** — Bella has kids, Grayson has a spouse. Is iMpatient single-user or multi-user-per-household?
5. **Critical/emergency escalation** — Concierge has an emergency mode toggle but no real escalation flow. What's the protocol when the system detects a true crisis?
6. **The "agentic" actions in Pro** — how much actually executes vs. drafts-for-approval? Currently we suggest a "queue" model but it's unbuilt.
7. **Dark mode → light mode toggle for clinical settings** — should the doctor-side render light by default for in-clinic display? Currently navy-only.
8. **Sharing with research** — toggle exists in Profile but no flow yet. Aggregate-anonymized contribution back to the dysautonomia evidence base. Worth designing the reassurance layer.

---

## How to add a new screen — the 4-step pattern

Every new surface follows this exact pattern. Don't deviate.

### Step 1 — Data file (if needed)
For surfaces with significant content, create `components/<surface>-data.jsx`:
```js
const SURFACE_DATA = {
  renee: { /* Pro data */ },
  simone: { /* Essential data */ },
  kezia: { /* Free data */ },
};
Object.assign(window, { SURFACE_DATA });
```

### Step 2 — Component file
Create `components/<surface>.jsx`. Open with a why-block comment. Read persona via `window.__activePersona` and `window.PERSONAS[id]`. Read content from your data file. Wrap the page hero in:
```jsx
<div className="page surface-name">
  <div className="aura-hero aura-on">
    <AuraHalo />
    <div className="page-head">
      <div>
        <div className="eyebrow">Surface name</div>
        <h1 className="page-title">Headline, <em>with em-clause.</em></h1>
        <p className="page-lede-hero">Subline.</p>
      </div>
      <div className="page-meta">
        <div className="page-meta-label">{p.tier} · {p.name}</div>
        <div className="page-meta-value">contextual mono-line</div>
      </div>
    </div>
  </div>
  {/* page body */}
</div>
```
Export at the bottom: `Object.assign(window, { SurfacePage });`

### Step 3 — Style file (if needed)
Create `styles/<surface>.css` only if the surface has bespoke chrome. Otherwise reuse `forms.css`, `pages.css`, `aura.css`. Cache-bust in `index.html` (`?v=N`).

### Step 4 — Wire into `index.html`
Three additions:
1. Add `<link rel="stylesheet" href="styles/<surface>.css?v=1" />` in `<head>`
2. Add `<script type="text/babel" src="components/<surface>.jsx"></script>` after other components
3. Add the route to the App router:
   ```js
   : page === "surfacename" ? <SurfacePage key={tweaks.persona} />
   ```
4. Add the label to the `labels` map
5. Add the entry to `Sidebar` if it should be navigable

The `key={tweaks.persona}` forces remount when persona changes — important so internal state resets cleanly.

---

## How to keep the voice intact

When you write copy, ask:
- **Would Harlow read this and feel seen, or sold to?** (Free/Essential)
- **Would Grayson read this and feel respected, or condescended to?** (Pro)
- **Does it pass the "is this slop?" test** (no emoji, no AI marketing words, no "your wellness journey")
- **Is there a specific number where there could be one?** (replace adjectives with measurements)
- **Does it earn the right to use clinical language?** (lead with the lived experience)

If unsure, read the existing copy in Today / Coach / Concierge / Integrations. Match that cadence.

---

## How to keep the visuals intact

- Every page hero gets aura-hero + AuraHalo
- Every form uses the chrome in `styles/forms.css`
- Every data card uses `border: 1.5px solid var(--ink-4)` on translucent navy `rgba(10, 18, 48, 0.32)` and the hover-lifts pattern
- Every eyebrow uses Geist Mono, 10–11px, 0.14–0.18em letter-spacing, uppercase, ink-7 or brand-glow
- Every italic em-clause in headlines uses `<em>` and renders in ink-7 with `font-weight: 300`
- Brand-soft (`#7AB8FF`) for primary accents. Brand-glow (`#B8D4FF`) for "active right now" emphasis. Warm peach (oklch 0.78 0.13 60) for high-signal-weight states only.

---

## Last word

The product's job is to make a chronically-ill person feel seen. The
voice is the product. Every chart, every toggle, every loader is in
service of that. When in doubt: be specific, be calm, be true.

Build with care.
