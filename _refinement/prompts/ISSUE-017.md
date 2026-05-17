# ISSUE-017 · Onboarding flow — calm, not interrogated

**Priority** P2 · **Owner** Lachlan · **Tool** v0 by Vercel

---

## Paste-ready prompt — v0 (run after ISSUE-001 system prime)

```
Build a 4-step onboarding flow at pages/onboarding/. Use the Withings
form chrome from ISSUE-009.

Steps:
  1. /onboarding/intro    — single hero line, founder's voice
  2. /onboarding/privacy  — the promise, second screen by rule
  3. /onboarding/connect  — pick first source
  4. /onboarding/baseline — calibration period explainer

Each step is ONE hero line + ONE input. No progress bar — instead, a
discreet dot strip of 4 dots, current step filled brand-glow, others
hairline.

Hero copy per step:

  intro:    "Your body has been keeping a notebook."
            <em>Let us read it back to you.</em>
            "Three minutes. We ask for very little."

  privacy:  "Volume only. Timing only."
            <em>Never the text.</em>
            [Reads the privacy promise from /privacy. Toggle: I understand]

  connect:  "Where would you like us to start reading?"
            [Withings ListRow picker: Apple Watch / Oura / Apple Health /
             Calendar / Skip for now]

  baseline: "For the next 14 days, we are listening."
            <em>The pattern is the point.</em>
            "By Day 7 you'll see the first read. By Day 14 the patterns
             are real."

Skippable on every step (small text link "Skip for now" → routes to /).

Final step completes → routes to / (Today) with the first source
connected. Tracked: onboarding_step_completed event per step (queue for
ISSUE-025 telemetry).

Constitution: CLAUDE.md — "The user should feel calm by the end of it,
not interrogated."
```

---

## Acceptance

- New users complete the flow in <3 minutes
- Privacy is screen 2 of 4 (not 4 of 4)
- Final lands on /
- Skippable every step
- Tracked via ISSUE-025 events
