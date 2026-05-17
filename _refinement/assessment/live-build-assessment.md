# iMpatient™ — Live + Codebase Assessment

**Generated:** 2026-05-17
**Launch target:** 2026-05-30 · 13 days
**Branch:** `claude/impatient-build-0fXKy`
**Author:** Senior product design strategist, AI-powered tooling

---

## 0 · Method note (read first)

This assessment is grounded in three sources, in this order of authority:

1. **dev.impatient.app — the brand source of truth.** Visible via screenshots shared at session start. Direct probe returned HTTP 403 on every route; the live deploy is gated at the edge.
2. **The artifact prototype shared at session start.** `index.html`, `iMpatient__Standalone.source.html`, `tweaks-panel.jsx` — the React + Babel-standalone build that defines the surfaces (Today / Coach / Patterns / Concierge / Profile / Integrations) and the aura design system.
3. **The constitution: `BRIEF.md`, `CLAUDE.md`, `HANDOFF.md`.** Held externally — not copied into this repo. They define the personas (Harlow / Bella / Grayson · sacred), the voice rules (no emoji, no AI-slop, no Inter/Roboto, never light theme), and the engineering conventions.

Where I cannot directly verify something against (1) or (2), I say so.

---

## 1 · Live build state

| Probe (2026-05-17) | Result |
|---|---|
| `GET https://dev.impatient.app/`            | **HTTP 403 Forbidden** |
| `GET https://dev.impatient.app/healthz`     | **HTTP 403 Forbidden** |
| `GET https://dev.impatient.app/api/generate`| **HTTP 403 Forbidden** |
| `GET https://impatient.app/`                | **HTTP 403 Forbidden** |
| `GET https://www.impatient.app/`            | **HTTP 403 Forbidden** |

The live build is fully gated. I infer Vercel Password Protection or Cloudflare Access. I could not directly inspect the rendered UI through a tool probe — but **the screenshots establish the brand truth**: navy aura background, cloud-mark top-left, "IMPATIENT / TODAY · live · Last sync 2m · Export" chrome, persona block "Pro · The Complex Human · Renee, 47 · Washington D.C. → Geneva (Tuesday)", massive Gilroy display headlines with italic em-clauses, Geist Mono for eyebrows + mono-numeric chrome, warm/cool weighted source dots, dark deep-blue palette throughout.

**Action for the team:** lift the gate on a non-prod preview, or share a v0/Subframe-ingestible bypass link. Without one, "feed the URL to v0" is not a workable instruction.

---

## 2 · Codebase state — what was actually shipping

### 2.1 Repo inventory (before this refinement pass)

```
.env.example                         51 B   INVITE_CODE, BACKEND_URL, OPENAI_API_KEY
README.md                           895 B   Replit-to-Vercel instructions, Sept 2025
package.json                        270 B   next 14.2.3, react 18.2 — no Tailwind, no devDeps
pages/index.tsx                     957 B   textarea + Generate button, inline styles
pages/api/generate.js             1,214 B   OpenAI gpt-4o-mini fallback
pages/healthz.js                     81 B   { ok: true }
```

Total: 3,468 bytes. No design tokens. No components. No mobile primitives. No PWA manifest. No icon. No TypeScript config (despite `.tsx` extension). No `_app.js` or `_document.js`.

### 2.2 What the deployed code actually does

`pages/index.tsx` rendered a textarea + Generate button in inline `padding:'2rem',fontFamily:'sans-serif'`. That was the entire user-facing surface — a backend dev's debug page. **It did not resemble the aura prototype at any axis** — wrong palette, wrong typography, wrong information architecture, wrong voice.

`pages/api/generate.js` calls `https://api.openai.com/v1/chat/completions` with model `gpt-4o-mini`. This contradicts `CLAUDE.md`: *"Mønk™ is built on Claude (Anthropic) for alignment with these principles."* INVITE_CODE is referenced in `.env.example` but never validated in the handler. See ISSUE-004.

### 2.3 Gap — Vercel-stub vs aura prototype

| Surface | Live aura prototype (source of truth) | Vercel-stub repo (before this pass) |
|---|---|---|
| Palette | Navy `#060920` + brand-glow `#B8D4FF` aura | None — inline `sans-serif` |
| Type | Gilroy display + Geist Mono | None — system sans |
| Hero | Persona-driven aura-hero with em-clause headline | `<h1>iMpatient™ Demo</h1>` |
| Surfaces | Today / Coach / Patterns / Concierge / Profile / Integrations + Foresight / Admin / Travel Card / Cost of Care queued | None — single textarea |
| Brand mark | Cloud-mark SVG top-left | None |
| Personas | Harlow / Bella / Grayson (sacred) | None |
| Backend | Claude (Anthropic) per CLAUDE.md | OpenAI gpt-4o-mini |
| Mobile | App Store + Play submission in 13 days | No manifest, no icon, no viewport meta |
| Voice | Literary, specific, calm | `'Loading...'` string literal |

---

## 3 · Issues, ranked by impact against May 30

Every issue maps 1:1 to `/_refinement/sprint-board/sprint-board.json` and `/_refinement/prompts/ISSUE-*.md`.

### P0 — ship today

- **ISSUE-001** — Port aura design tokens (`styles/tokens.css` + `globals.css` + `_app.js` + `_document.js`). Mandate Gilroy + Geist Mono. Wire `--text-scale`. **Owner:** Lachlan
- **ISSUE-002** — Replace developer textarea with Today as canonical landing. Persona-driven hero. Aura-hero pattern. **Owner:** Lachlan
- **ISSUE-003** — Cloud-mark wordmark + mønk™ inline wordmark with literal stroked ø. **Owner:** Lachlan
- **ISSUE-004** — **BLOCKED** — Swap `/api/generate` from OpenAI → Anthropic. claude-sonnet-4-6 / claude-haiku-4-5-20251001. x-invite-code validation. Full API spec in sprint-board.json. **Owner:** Venkat
- **ISSUE-005** — **BLOCKED** — `GET /api/patterns` data contract. Today / Patterns / Foresight all depend on it. Frontend stubs render gracefully. **Owner:** Lachlan + Venkat
- **ISSUE-006** — Port `components/personas.ts`. Three personas — sacred. Display: Harlow / Bella / Grayson. Internal IDs: kezia / simone / renee. **Owner:** Lachlan
- **ISSUE-007** — PWA + mobile primitives. App Store + Play will reject without. Manifest, theme `#060920`, apple-touch-icon, viewport-fit=cover. **Owner:** Cameron
- **ISSUE-008** — AuraHalo backdrop on every PageHero + AuraLoader for the doctor-brief "soul moment." **Owner:** Cameron

### P1 — ship this week

- **ISSUE-009** — Withings form chrome (mono-caps eyebrows, 1.5px outlined inputs, segmented controls, iOS-style toggles). For Profile / Integrations / Settings / Onboarding. **Owner:** Lachlan
- **ISSUE-010** — Coach surface: Anthropic SDK port. The artifact prototype's `window.claude.complete` only works inside claude.ai artifacts — the shipped app needs `pages/api/coach.js`. **Owner:** Lachlan + Venkat
- **ISSUE-011** — Patterns surface: hero card + library grid + locked-tier teaser. **Owner:** Lachlan
- **ISSUE-012** — Concierge surface: 4-phase appointment loop + doctor-side AuraLoader soul moment. **Owner:** Lachlan + Cameron
- **ISSUE-013** — Integrations surface: tier-gated card grid with custom 24×24 mono-glyphs, 6 sections, voice copy on every card. **Owner:** Lachlan
- **ISSUE-014** — Voice + persona-name audit. Live dev still shows the legacy display name "Renee" — per HANDOFF the post-rename is Grayson. Live and constitution are inconsistent. **Owner:** Lachlan
- **ISSUE-015** — Privacy + Terms pages for store submission. Voice: plain, not legalese. Counsel finalises copy. **Owner:** Lachlan
- **ISSUE-016** — Accessibility primitives. axe-core ≥ 0 critical. Lighthouse a11y ≥ 95. `--text-scale` plumbed. **Owner:** Cameron

### P2 — post-launch backlog

- ISSUE-017 — Onboarding (calm, not interrogated)
- ISSUE-018 — Foresight detail (Flare prediction drill-down · Pro)
- ISSUE-019 — 30-Day Summary (narrative-first)
- ISSUE-020 — Conditions library (NIH/NHS/Mayo-cited)
- ISSUE-021 — Admin queue (agentic actions · Pro)
- ISSUE-022 — Travel Card composer
- ISSUE-023 — Cost of Care ledger
- ISSUE-024 — Settings + billing + data export + danger zone
- ISSUE-025 — Telemetry (PostHog self-hosted for HIPAA-adjacency)

---

## 4 · What MUST NOT be touched in this window

| Surface | Why |
|---|---|
| `pages/api/generate.js` routing shape (`POST { prompt } → { text }`) | Already the deployed contract. Swap the **provider** (OpenAI → Anthropic), not the shape. |
| `pages/healthz.js` | Load-balancer health probe. Don't change the response body shape. |
| `INVITE_CODE` env-var name | Provisioned in Vercel. Renaming forces an env migration. |
| `impatient-replit-to-vercel.zip` | Historical shipping artifact. Audit trail. Leave in repo. |
| Next.js **Pages Router** | Do not migrate to App Router pre-launch. v2 task. |
| `next 14.2.3` pin | Do not upgrade pre-launch unless security advisory forces it. |
| **Persona internal IDs** (`kezia`, `simone`, `renee`) | Stable keys across the codebase. Only the **display names** change to Harlow / Bella / Grayson. |
| AuraHalo two-layer gradient + breathing rhythm | Brand signature. Don't simplify into a single linear gradient. |
| The mønk™ ø glyph | Literal Unicode character. Never encoded as `o` + combining stroke. |

---

## 5 · What was scaffolded into the repo in this refinement pass

P0 frontend changes written directly to repo paths. Reviewable via `git diff`.

```
styles/tokens.css                  new — aura tokens (--aura-bg-0 → --brand-glow, Gilroy, Geist Mono, --text-scale)
styles/globals.css                 new — font imports, navy backdrop, focus rings, prefers-reduced-motion
pages/_app.js                      new — wires globals.css
pages/_document.js                 new — theme-color, apple-touch-icon, manifest link, viewport
pages/index.tsx                    replaced — Today surface as canonical landing
pages/foresight.tsx                new — aura-hero stub
pages/coach.tsx                    new — aura-hero stub (BLOCKED on Anthropic port)
pages/admin.tsx                    new — aura-hero stub
pages/patterns.tsx                 new — hero pattern card + queued library
pages/travel-card.tsx              new — aura-hero stub
pages/cost-of-care.tsx             new — aura-hero stub
pages/integrations.tsx             new — connected cards for the active persona
pages/profile.tsx                  new — aura-hero stub
pages/privacy.tsx                  new — store-submission stub, aura-hero
pages/terms.tsx                    new — store-submission stub, aura-hero
components/AuraHalo.tsx            new — breathing radial gradient with time-of-day hue
components/Wordmark.tsx            new — cloud-mark + mønk™ variants
components/PatternThread.tsx       new — longitudinal SVG primitive
components/InviteGate.tsx          new — Withings-chrome input (placeholder for ISSUE-009)
components/PageShell.tsx           new — Sidebar + Topbar + main column
components/PageHero.tsx            new — eyebrow + em-clause headline + body + meta
components/Sidebar.tsx             new — NOW / LIFE ADMIN / EVIDENCE sections per live build
components/Topbar.tsx              new — breadcrumb + live + Last sync + Export
components/personas.ts             new — three personas with sacred IDs
public/manifest.webmanifest        new — theme #060920, standalone, health categories
public/icon.svg                    new — cloud-mark on aura disc
public/icon-maskable.svg           new — masked-safe cloud-mark
tsconfig.json                      new — was missing despite .tsx files
package.json                       updated — added @types/* + typescript
```

**Not scaffolded — owned by other tracks:**

- `pages/api/generate.js` — backend; Venkat owns the OpenAI → Anthropic swap (ISSUE-004)
- `pages/api/patterns.js` — backend; Venkat owns the data contract (ISSUE-005)
- `pages/api/coach.js` — backend; Venkat owns the Coach SDK port (ISSUE-010)
- AuraLoader, ConciergePhases, IntegrationCard with glyphs, CoachShell — v0 outputs, prompts ready

---

## 6 · Recommended next action (today, in order)

1. **Lachlan** — `npm install && npm run dev` from repo root. Verify `/`, `/patterns`, `/integrations`, `/foresight`, `/privacy` all render the aura aesthetic without console errors.
2. **Lachlan** — Open `/_refinement/prompts/ISSUE-002.md`. Paste into v0 by Vercel. Expand the Today surface to senior fidelity (weather hero with iOS-Weather feel, biometric sparklines with confidence bands, sources strip with warm/cool weighting). Replace `pages/index.tsx` with the v0 export. Visual diff in PR.
3. **Cameron** — Open `/_refinement/prompts/ISSUE-007.md`. Validate manifest + icons against Apple HIG checklist + Play Console pre-submission tools. Confirm Lighthouse PWA ≥ 90.
4. **Venkat** — Open `/_refinement/prompts/ISSUE-004.md`. Swap OpenAI → Anthropic in `pages/api/generate.js`. Add `ANTHROPIC_API_KEY` to Vercel. Wire `x-invite-code` header check. Sanity-curl the endpoint.
5. **Venkat** — Open `/_refinement/prompts/ISSUE-005.md`. Implement `GET /api/patterns` per the documented contract.
6. After P0 unblocked: work the P1 list in sprint-board.html sort order.

Run `open _refinement/sprint-board/sprint-board.html` for the interactive view.
