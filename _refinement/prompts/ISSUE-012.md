# ISSUE-012 · Concierge surface — appointment loop + doctor-side soul moment

**Priority** P1 · **Owner** Lachlan + Cameron · **Tool** v0 by Vercel · **Run after** ISSUE-001 + ISSUE-008

---

## Paste-ready prompt — v0

```
Build pages/concierge.tsx — the Appointment Concierge surface. This is
the product's unique move: before, during, after, the visit, held for
both patient and doctor.

PageShell with current="/concierge" and crumb="Concierge".

Hero:
  Eyebrow:    Concierge · the appointment loop
  Headline:   Before · during · after.
  Em-clause:  The visit, held for both of you.
  Body:       Coach reads the record before you arrive. The doctor sees
              a different view of the same data. Nothing is dumped on
              their twelve minutes.

Library strip — five appointment-protocol cards in a row:
  · Bloodwork
  · Specialist visit
  · Imaging
  · Infusion
  · Emergency

Each card: eyebrow ("Protocol"), title, count of patient-side prep
steps, doctor-side brief lines, click to open.

The Bloodwork showcase end-to-end (default open):
  Four phase tabs — Before · 36h | During | After | Doctor's side.

  · BEFORE · 36h:
      - "Hydration target: 80oz by 6pm tomorrow"
      - "Fasting window starts 12 hours prior"
      - "Hold creatine 48 hours prior"
      - "Wear loose sleeves, prefer right arm (left is your infusion arm)"

  · DURING:
      - "Bring your iCloud calendar — the phlebotomist will ask about
        flare days for the past month"
      - "Ask for the metabolic panel + ferritin + CRP"

  · AFTER:
      - "72h recovery protocol: extra hydration, no high-intensity exercise"
      - "Watch for: dizziness on standing (POTS), histamine response (MCAS)"

  · DOCTOR'S SIDE:
      THIS IS THE SOUL MOMENT.
      When the user clicks this tab, trigger the AuraLoader for 2.6s
      with message "Composing the brief for Dr. Marsh" and submessage
      "Reading fourteen weeks of your record." THEN reveal the doctor
      view.

      The doctor view: a 4-line brief in CLINICIAN voice (terse,
      factual, no marketing). Mono-caps eyebrow "Brief · Dr. Marsh ·
      consultation 14 May 2026 · 10:30":

        · "Patient: 47F. RRMS (8y), MCAS (3y), ADHD, hypothyroidism."
        · "Last 14d: HRV 38ms ± 7, RHR 64bpm (+6 baseline). Sleep
           6h12m, splintered 4× nights post-2am."
        · "Pattern: barometric drop → 48h prodrome, r=0.74. Geneva
           flight Tue, 18mb delta."
        · "Recommend pre-flight: hydration protocol, MCAS rescue dose
           confirmed in carry-on, infusion rescheduled to post-return."

      Format: each line a separate paragraph in --ink-0, with the line
      number as a small --ink-7 mono prefix. No chart-dump. No bullet
      ornaments. Clinician's eye-glide cadence.

Emergency mode toggle (top-right of the library strip):
  · Switches the whole protocol palette to a deeper red accent for
    --brand-soft replacements (oklch 0.55 0.18 25 — restrained, not
    alarming). NO red text everywhere — only the chrome accents shift.
  · Re-orders the library to put Emergency first.
  · Adds a "Notify Dr. Marsh now" header CTA.

Voice rules: clinician voice on doctor-side, founder voice on
patient-side. NEVER mix.

Output ready for pages/concierge.tsx + a new components/ConciergePhases.tsx
+ the AuraLoader trigger wiring. Use the AuraLoader component from
ISSUE-008.
```

---

## Acceptance

- 4-phase tabs render
- Clicking "Doctor's side" plays AuraLoader for 2.6s with the exact copy
- Doctor view is 4 lines, clinician voice, no marketing
- Emergency mode toggle re-palettes to deeper red and re-orders library
- All voice transitions feel intentional (no "wellness" leaking into clinician voice)
