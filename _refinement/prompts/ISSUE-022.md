# ISSUE-022 · Travel Card composer

**Priority** P2 · **Owner** Lachlan · **Tool** v0 by Vercel

---

## Paste-ready prompt — v0

```
Build a Travel Card composer at pages/travel-card.tsx.

Hero:
  Eyebrow:    Travel Card · Pro
  Headline:   Your medical file,
  Em-clause:  in your pocket. Never in your luggage.
  Body:       Encrypted, agent-fronted, time-bound. Conditions, meds,
              allergies, infusion schedule, MCAS triggers, emergency
              contacts, specialist protocols. Generated on demand.
              Shareable as a one-page PDF or QR code at an ER intake.

Composer layout (two columns on desktop, stacked on mobile):

LEFT — preview:
  A faithful 1:1.4 (one-page-PDF) preview rendered as a card. Contents
  in clinician format:
    · Patient identity strip (name, DOB, sex, allergies in red micro)
    · Active conditions list with ICD-10 codes
    · Active medications with dosage + last refill
    · Infusion schedule (next 4 weeks)
    · MCAS triggers (food, environmental, medication)
    · Emergency contacts (primary, secondary, care-team)
    · Specialist protocols (one line each — e.g. "Pre-medicate with
      diphenhydramine 25mg + famotidine 20mg before any contrast study")
    · QR code corner — encodes a short-lived agent-fronted URL

RIGHT — controls:
  · TTL selector: 24h / 7 days / 30 days / unlimited
  · Include toggles (Withings form chrome):
      - Active conditions
      - Active meds
      - Infusion schedule
      - MCAS triggers
      - Emergency contacts
      - Specialist protocols
      - Insurance card
  · Generate PDF button (filled --brand-soft)
  · Generate QR code button (outlined)
  · Revoke history list — every previously generated card with
    revoke-now action

Backend (queued for separate work):
  - PDF generation server-side using @react-pdf/renderer or Puppeteer
  - QR signs a short-lived JWT linking to /share/[token]
  - Revocation list persisted

Voice: clinician-respectful. ER staff will read this in 8 seconds.
Density over decoration.
```

---

## Acceptance

- Composer renders a 1:1.4 preview matching real PDF dimensions
- Toggles update preview live
- TTL selector visibly changes the QR + filename
- Revoke list shows previously generated cards
