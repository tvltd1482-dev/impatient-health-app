# iMpatient — pre-launch marketing site

Pre-launch general-information landing for **iMpatient™**, the behavioral intelligence engine.

> *We're here to give you a little of your time back.*

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript

## Pages
- `/` — Home (hero, what iMpatient is, tagline)
- `/how-it-works` — alph's four minds, scroll-driven sequence
- `/about` — Origin, positioning, tagline
- `/waitlist` — Email capture + readiness tiers

## Local

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build

```bash
npm run build
npm run start
```

## Brand sources

Tokens, copy, and voice rules are derived from the locked design state report
(`uploads/iMpatient__design_state_report.md`) and the section-sign-sweep
handoff (CLAUDE.md, marketing-framework-brief, RAIL_BRIEF). Do not change
locked copy without checking those docs.

## Open items (pending owner)

- **Waitlist backend.** `POST /api/waitlist` currently validates and logs
  to server console. To be wired in Cowork — Mailchimp / Loops / Buttondown
  / SymbAIo-internal not yet chosen.
- **alph lamp SVG.** `components/Lamp.tsx` is a hand-drawn placeholder.
  Swap with the real `brand/alph/alph-icon-master.svg` /
  `alph-lamp-animated.svg` when assets are dropped.
- **Instagram Framer sequence.** The pinned scroll moment from the IG
  reference is not yet implemented — direction is reserved on Home and
  How-it-works for it.
- **Legal pages.** Privacy, Data Security, Conditions are linked in the
  footer but pages aren't built yet. `master/legal/data-security.md`
  has draft copy ready.
- **Real product imagery.** Withings-style card grid uses synthesized
  mock surfaces. Replace with photography + real iMpatient screen mocks
  once available.
