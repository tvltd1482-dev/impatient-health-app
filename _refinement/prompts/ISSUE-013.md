# ISSUE-013 · Integrations surface — tier-gated card grid with mono-glyphs

**Priority** P1 · **Owner** Lachlan · **Tool** v0 by Vercel · **Run after** ISSUE-001 system prime

---

## Paste-ready prompt — v0

```
Expand pages/integrations.tsx beyond the shipped stub.

PageShell with current="/integrations" and crumb="Integrations".

Hero:
  Eyebrow:    Sources · privacy first, controls second
  Headline:   Volume only. Timing only.
  Em-clause:  Never the text.
  Body:       iMpatient reads when the world is asking a lot of you, not
              what it is asking. Toggle off any source at any time. The
              user owns every byte.

Privacy promise card directly under the hero:
  · Eyebrow "Privacy promise"
  · 3 bullet lines:
      · "We never read the content of your messages."
      · "We never sell your data."
      · "Toggle off; we forget."
  · Link to /privacy in --brand-soft.

Then SIX grouped sections, each with mono-caps eyebrow heading:
  · Wearables    — Oura Ring, Apple Watch Ultra, Withings BP + Body+,
                   Garmin, Whoop, Fitbit, Dexcom
  · Health records — Apple Health, FHIR (Epic), specialist EHRs ×6
  · Calendars    — Outlook (work), Google Calendar (board), iCloud
                   (family), Care-team calendar
  · Communication — Gmail + Outlook, iMessage / SMS volume, Slack volume
  · Travel & environment — TripIt + United + Lufthansa + UA Club,
                            Climate + barometric (Tomorrow.io)
  · Medical      — Service dog vet portal, infusion centers, pharmacy

Build components/IntegrationCard.tsx with three states:

  · CONNECTED:
      - Card chrome: brand-soft hairline (instead of default), subtle
        brand-glow tint background tinted to brand-soft 0.04 alpha
      - Pulsing 6px brand-glow dot with soft halo
      - Subtitle "Reading since · Mar 14" in --ink-7 mono
      - Voice line below the title, e.g. "Volume only. Tells us when
        the world is asking a lot of you."
      - Toggle (right-aligned): on
  · AVAILABLE:
      - Default card chrome
      - "Connect" button right-aligned in outlined brand-soft
      - Voice line shows what the source contributes
  · TIER-LOCKED:
      - 50% opacity, lock corner glyph top-right
      - Caption "Requires Pro" in --ink-7
      - "Upgrade" link button right-aligned
      - Voice line still readable

Each card has a custom 24×24 mono-line glyph. Build a SourceGlyph
library at components/SourceGlyph.tsx with named exports:
  watch · ring · cuff · heart · moon · doc · cal · stethoscope · msg ·
  envelope · chat · plane · cloud · leaf · vial · pill · scan
Each glyph: single-path SVG, 1.5px stroke, currentColor, rounded line
caps, no fill.

Tier-gating reads from PERSONAS[id].tier:
  · Harlow (Free) — sees most cards LOCKED. Only Wearables/Apple Watch
    is connectable.
  · Bella (Essential) — Wearables + Health records + Calendars
    unlocked. Communication / Travel locked.
  · Grayson (Pro) — almost all unlocked. Service dog vet portal and
    specialist EHRs ×6 connected.

Render with the DEFAULT_PERSONA from components/personas.ts.

Voice on every card — see the live build's source strip for the
cadence. NEVER "syncs message data" — always functional translation:
"Volume only. Tells us when the world is asking a lot of you."
```

---

## Acceptance

- 6 sections render
- 17+ cards across them
- Harlow (Free) persona shows most locked
- Grayson (Pro) shows most connected
- Every card has a single voice line + mono-glyph + state pill
- Toggle persists locally
