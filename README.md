# iMpatient

A co-doctor for chronic, hard-to-diagnose conditions. The prototype
designed in Claude Design is now hosted from this Next.js app.

## Layout

```
pages/                   Next.js routes + API
  api/generate.js        Backend proxy (BACKEND_URL or OPENAI_API_KEY)
  healthz.js             Health check
public/prototype/        The HTML/CSS/JSX prototype, served at /
  index.html             Entry — wires routes, mounts <App />
  components/*.jsx       Today, Coach, Patterns, Concierge, Profile, etc.
  styles/*.css           Aura tokens, forms, pages, surface chrome
  assets/*               Logos
design-docs/             BRIEF / CLAUDE / HANDOFF + chat transcripts
next.config.js           Rewrites / → /prototype/index.html
```

## Run

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. The root rewrites to the prototype.

## Env

- `INVITE_CODE` — your secret code
- `ANTHROPIC_API_KEY` — used by `/api/generate` (Anthropic SDK)

The Coach surface calls `window.claude.complete({messages})`; a small
shim in `public/prototype/index.html` POSTs the message list to
`/api/generate`, which calls `claude-haiku-4-5` via the Anthropic SDK
(per `design-docs/HANDOFF.md`, Coach is Haiku-powered).

## Endpoints

- `/` — the iMpatient prototype (Today / Coach / Patterns / Concierge /
  Profile / Integrations, persona-switchable via the Tweaks panel)
- `/api/generate` — chat/generate proxy
- `/healthz` — health check

## Next steps

Per `design-docs/HANDOFF.md`, the queued surfaces are Patterns polish,
Flare Prediction detail, 30-Day Summary, Onboarding, Conditions library,
Care directory, Settings, Travel Card, Cost of Care, Foresight, Admin
queue. Pick one and migrate it from the prototype JSX into proper
Next.js components when production-readiness is needed.
