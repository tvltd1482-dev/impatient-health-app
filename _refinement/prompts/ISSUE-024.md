# ISSUE-024 · Settings — account, billing, data export, danger zone

**Priority** P2 · **Owner** Lachlan · **Tool** v0 by Vercel

---

## Paste-ready prompt — v0

```
Build pages/settings.tsx using Withings form chrome (ISSUE-009).

Hero:
  Eyebrow:    Settings
  Headline:   Your record, your controls.
  Body:       Account, preferences, integrations, accessibility, billing,
              data export. The danger zone is below.

Sections (each FormSection):

1. Account
   · Email, password reset link, 2FA toggle
   · Sign in with Apple connection (required if any third-party auth
     offered, per Apple guidelines)

2. Billing
   · Current tier (Free / Essential / Pro / Enterprise) with $/mo
   · Next charge date
   · Update payment method (Stripe)
   · Cancel any time (no friction)
   · Invoice history

3. Notifications
   · Daily read (Today notification) toggle
   · Foresight alerts (Pro) toggle
   · Coach replies toggle
   · Quiet hours (time-range picker)

4. Accessibility
   · Text size (Tweaks-equivalent — 0.92 / 1.00 / 1.15 / 1.30 segmented)
   · Reduced motion toggle (overrides system preference if user wants)
   · Higher contrast toggle (optional brand-glow boost)

5. Data export
   · "Export everything" — generates raw JSON zip in <2 minutes
   · Email when ready toggle
   · Format: JSON or CSV-bundle radio

6. Aggregate research
   · Off by default
   · Toggle: contribute anonymised signals to NIH-grade research
   · Explainer: "We never share individual records. Aggregate
     anonymised signal only. Toggle off any time."

7. DANGER ZONE
   · Card chrome with 1.5px hairline in deeper red accent
   · "Delete my account" button (outlined red)
   · Two-step confirm: enter the literal phrase "I understand this is
     permanent" before the button activates
   · "We will forget you within 30 days. Your record will be
     permanently destroyed."

Voice: factual, never moralizing. Users in this section are competent
adults making decisions.
```

---

## Acceptance

- 7 sections render
- Export generates a downloadable .zip within 30s
- Delete account is a 2-step confirmation with the literal phrase
- Aggregate research is opt-in (off by default)
- Tier-specific UI: Free users see "Upgrade", Pro users see "Manage"
