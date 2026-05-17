# iMpatient™ UX Refinement Package
**2026-05-17 · launch 2026-05-30 · 13 days**

A self-contained, dev-team-actionable refinement package. Open `sprint-board.html` for the interactive view. Open `assessment/live-build-assessment.html` for the visual report. Open `tool-comparison/tool-comparison.html` for the ranked tool shortlist with rationale and the exact first three prompts.

---

## TL;DR — start here

| Question | Answer |
|---|---|
| Single source of brand truth | **dev.impatient.app** — aura aesthetic, navy `#060920` → brand-glow `#B8D4FF`, Gilroy + Geist Mono, em-clause headlines, cloud-mark, no emoji, no light theme |
| Best AI tool to start using right now | **v0 by Vercel** — same vendor as the Next.js + Vercel stack, 3–5 min per surface, zero procurement |
| Best AI tool for ongoing post-launch iteration | **Subframe** — highest design ceiling, component-system-aware, compounds as the library grows |
| First three prompts to run | See `tool-comparison/tool-comparison.html` and `prompts/ISSUE-001.md`, `prompts/ISSUE-002.md`, `prompts/ISSUE-005.md` |
| Number of issues identified | 25 — eight P0, eight P1, nine P2 |
| Issues already scaffolded into the repo | All P0 frontend fixes (ISSUE-001, 002, 003, 006, 007, 008) plus P1 frontend stubs (009 placeholder, 011, 012 page, 013 stub, 015) — see assessment §5 |
| Issues BLOCKED on backend | ISSUE-004 (OpenAI → Anthropic swap), ISSUE-005 (`GET /api/patterns` contract) — full specs in `sprint-board.json` |

---

## Who actions what

| Owner | Area | Start with |
|---|---|---|
| **Lachlan** · frontend | Aura tokens, Today surface, Patterns surface, voice + persona audit, Withings form chrome | `prompts/ISSUE-002.md` → v0 |
| **Venkat** · data layer / backend | OpenAI → Anthropic swap, `/api/patterns` contract, Coach SDK, telemetry | `prompts/ISSUE-004.md` (Claude Code, local) |
| **Cameron** · motion / interaction / platform | PWA manifest + icons, AuraHalo + AuraLoader, accessibility, mobile chrome | `prompts/ISSUE-007.md` |

---

## Package contents

```
_refinement/
├── README.md                                       ← you are here
├── assessment/
│   ├── live-build-assessment.md                    ← long-form, markdown
│   └── live-build-assessment.html                  ← visual report, openable offline
├── sprint-board/
│   ├── sprint-board.json                           ← single source of truth — 25 issues
│   ├── sprint-board.csv                            ← importable into Linear / Jira / Notion
│   └── sprint-board.html                           ← interactive, sortable, filterable
├── tool-comparison/
│   ├── tool-comparison.md                          ← ranked shortlist + rationale
│   └── tool-comparison.html                        ← visual version
└── prompts/                                        ← one .md per ISSUE, ready to paste
    ├── ISSUE-001.md … ISSUE-025.md
```

The package is also distributed as `2026-05-17_iMpatient_UX_Refinement_Package.zip` at the repo root for sharing standalone with anyone who needs the planning materials without the codebase.

---

## What was already written into the repo in this pass

Per the brief: P0 + P1 frontend fixes are committed directly to repo paths so the dev team can review them via `git diff`. Run `git diff main...claude/impatient-build-0fXKy` to see the full set. Highlights:

- `styles/tokens.css` + `styles/globals.css` — aura tokens, Gilroy + Geist Mono, `--text-scale`
- `pages/index.tsx` — replaced developer textarea with the Today surface
- `pages/{foresight,coach,admin,patterns,travel-card,cost-of-care,integrations,profile,privacy,terms}.tsx` — aura-hero stubs and partial scaffolds
- `pages/_app.js` + `pages/_document.js` — wires globals, declares theme-color + apple-mobile-web-app metas
- `components/{AuraHalo,Wordmark,PatternThread,Sidebar,Topbar,PageShell,PageHero,InviteGate,personas}` — foundation library
- `public/{manifest.webmanifest,icon.svg,icon-maskable.svg}` — PWA + store-submission primitives
- `tsconfig.json`, `package.json` updates

The OpenAI fallback path in `pages/api/generate.js` is **deliberately untouched** — that's ISSUE-004, owned by Venkat. Frontend POST shape is unchanged so the swap is purely backend.

---

## External sources of truth (not in this repo)

The three constitution documents — `BRIEF.md`, `CLAUDE.md`, `HANDOFF.md` — are held externally (in the design-source workspace, not in this Next.js repo). They are the authoritative inputs for this refinement package. Every prompt in `prompts/` already inlines the relevant rules from those documents, so the dev team does not need to cross-reference manually unless they want to.

If a fix lands that contradicts those documents, the constitution wins by default — confirm with the user before deviating.

---

## The exact first three prompts to run in v0 right now

These are paste-ready in `prompts/ISSUE-001.md`, `ISSUE-002.md`, and `ISSUE-005.md`. The summary:

1. **System prime** (paste once at the start of a new v0 thread) — loads the aura tokens, Gilroy + Geist Mono, voice rules, hard prohibitions (no emoji, no light theme, no Inter, no AI-marketing tropes). Wait for confirmation before requesting code.
2. **Today surface** — build the canonical landing for the Pro persona Grayson. Aura-hero with em-clause headline, persona block, weather strip with pressure delta foregrounded, biometric tiles, sources strip with warm/cool weight dots, seven-day pattern preview. Output: `pages/index.tsx`.
3. **Patterns surface** — aura-hero, stats strip, hero correlation card with longitudinal thread, library grid of 8 patterns, locked-tier teaser. Output: `pages/patterns.tsx`.

---

## How to use this package without the codebase

1. Unzip `2026-05-17_iMpatient_UX_Refinement_Package.zip` anywhere.
2. Open `_refinement/sprint-board/sprint-board.html` in a browser — self-contained, no internet required, no server, no install.
3. Sort by priority. Filter by owner. Click "open" on any row for the full Found/Fix/Acceptance/Repo paths.
4. Open the matching `prompts/ISSUE-XXX.md` for the paste-ready prompt.
5. The `live-build-assessment.html` and `tool-comparison.html` are also self-contained.

---

## Backend coordination

Two issues are BLOCKED on backend work owned by Venkat. Both have complete API specs in `sprint-board.json`:

- **ISSUE-004** — `pages/api/generate.js` swap from OpenAI gpt-4o-mini to Anthropic `claude-sonnet-4-6` (interpret/coach) + `claude-haiku-4-5-20251001` (classify). Add `x-invite-code` header validation.
- **ISSUE-005** — `pages/api/patterns.js` new endpoint with window + metrics + persona_id query and the documented response shape.

Both have frontend stubs that render gracefully today (BLOCKED badges on Today and Patterns) so frontend work continues in parallel.

---

## What MUST NOT be touched (recap from assessment §4)

- `pages/api/generate.js` routing shape — swap provider only
- `pages/healthz.js` — load-balancer probe
- `INVITE_CODE` env name — already in Vercel
- Pages Router — no App Router migration before launch
- `next 14.2.3` pin — no upgrade in 13-day window
- Persona internal IDs (`kezia`, `simone`, `renee`) — stable keys; only display names change to Harlow / Bella / Grayson
- The mønk™ ø glyph — literal Unicode, never encoded

---

*SymbAIo Inc. · A TELLER Ventures company · generated 2026-05-17*
