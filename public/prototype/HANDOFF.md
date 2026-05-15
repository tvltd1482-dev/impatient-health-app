# iMpatient prototype — dev handoff

**What this is.** A Babel-in-browser React prototype of every UI surface in the iMpatient app. Free / Essential / Pro tier behavior is real (sidebar routes lock, locked routes show an upgrade pane, the Coach system prompt is built from the active persona). The Onboarding flow handoff (2026-05-15) is fully wired in. Brand-bible v2.3 tokens + logos are adopted.

**Status:** desktop-only layout. **Not yet** responsive for mobile — every page currently assumes a wide viewport with sidebar + main area side by side. The Onboarding flow itself is mobile-fitted (393×852) inside a phone bezel for design review, but the rest of the app is not. Making the shell phone-responsive is the next pass.

## Structure

```
prototype/
  index.html              ← entry. Loads Babel-in-browser, registers <script type="text/babel"> for every component.
  tweaks-panel.jsx        ← Tweaks panel (persona switcher, text scale, onboarding flow/tone pickers).
  components/             ← every UI surface (Today, Coach, Patterns, Concierge, Profile, Integrations, etc.)
    onboarding/           ← the 11-component onboarding bundle from the 2026-05-15 design handoff
  styles/                 ← tokens.css (incl. brand-bible v2.3 layer), forms.css, onboarding.css, etc.
  assets/                 ← brand-bible v2.3 logos (mark / lockup / wordmark · SVG + JPEG)
```

## How to run

**Standalone:** open `index.html` in a modern browser (Chrome/Safari/Firefox). It pulls React + ReactDOM + Babel from unpkg. Coach won't work without an `/api/generate` endpoint, every other surface renders.

**As a bundled single-file preview:** run `node scripts/bundle-preview.js` from the project root. It writes `iMpatient-preview.html` — JSX pre-transformed at build time, React + ReactDOM inlined, everything offline-capable. ~726 KB.

**In production:** these JSX modules are not how to ship. They use `<script type="text/babel">` and `window.X` globals because that's the design-canvas pattern. Port to your real build chain — likely React Native (iOS-first) or Next.js — using these as the canonical spec for copy, layout, animation timing, and tier behavior.

## What's canonical

- **Copy.** Every word in screen JSX is voice-approved. Don't paraphrase. See `BRIEF.md` and `CLAUDE.md` for voice rules.
- **Tier-lock map.** `components/tier-locked.jsx` `ROUTE_TIER` is the source of truth for which surfaces unlock at which tier.
- **Persona data.** `components/personas.jsx` defines Harlow (Free), Bella (Essential), Grayson (Pro). Coach reads live biometrics, conditions, location, scope, voice rules from the active persona — switching personas swaps the entire coach context.
- **Onboarding screen order.** Privacy moment before comms; loading before first-read; name and diagnoses early. Documented in `components/onboarding/`.

## What's not canonical (replace in production)

- The first-read content (Sunday HRV jump, POTS launch-week) is demo data. Production should fetch user-specific first-read after wearable sync.
- "Dr. Marsh" / "Dr. Chen" / "your GP" on entry/coach screens — replace with real names from referral / clinician config.
- "Naya" on the community-entry screen — replace with `{referrer.firstName}`.
- The integration partner lists (Apple Health, Oura, Whoop, Garmin, Withings, Fitbit, Google, iCloud, Outlook, etc.) — keep as canonical lists, but the `approved` flag should come from a feature config service so it can flip without a release.

## Next pass: iPhone layout

The shell needs to collapse the sidebar to a bottom nav (or hamburger), stack the topbar's tier-pill + live indicator + export into a compact mobile header, and reflow every page's card grid to one column at narrow widths. The Onboarding flow is already phone-sized; in production, drop the design-canvas phone bezel wrapper and render fullscreen.
