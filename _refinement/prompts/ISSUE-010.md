# ISSUE-010 · Port Coach — Anthropic SDK (not window.claude.complete)

**Priority** P1 · **Owner** Lachlan + Venkat · **Tool** v0 by Vercel (frontend) + Claude Code (backend)

---

## Backend prompt — Claude Code (Venkat)

```
Build pages/api/coach.js. Extends the Anthropic-SDK foundation from
ISSUE-004. Streams responses (Server-Sent Events or chunked transfer)
so the Coach surface can render a typing-indicator → token-by-token.

Contract:

  POST /api/coach
  Headers: x-invite-code, Content-Type: application/json
  Body: {
    "persona_id": "kezia" | "simone" | "renee",
    "thread_id": "string (optional)",
    "messages": [{ "role": "user" | "assistant", "content": "string" }]
  }

  Response: text/event-stream
    data: { "type": "delta", "text": "..." }
    data: { "type": "thread_id", "thread_id": "..." }
    data: { "type": "done" }

Behavior:
  · Load system prompt from lib/persona-prompts.ts based on persona_id.
  · Use claude-sonnet-4-6.
  · Enable prompt caching on the system prompt (cache_control: { type:
    'ephemeral' }) since it's long and reused per persona.
  · Pre-load the persona's last 10 conversation turns from a simple
    K/V store (Vercel KV is fine for v1; Redis later).
  · Always return thread_id so the client can pin subsequent messages.
```

---

## Frontend prompt — v0 (Lachlan, run after ISSUE-001 system prime)

```
Build pages/coach.tsx — the Coach surface using the existing PageShell
and PageHero, plus a new CoachShell:

Layout:
  · Left rail (~260px): list of recent threads, each with title +
    last-message-timestamp. New thread button at top.
  · Main column: top context strip (HRV / RHR / Sleep / latest flare
    prediction — feeds from /api/patterns), then the thread of bubbles,
    then a sticky composer at the bottom.

Bubble styles:
  · User bubble: brand-soft 0.5-alpha background, --ink-0 text,
    right-aligned, max-width 70%, radius 14px, padding 12px 16px.
  · Assistant bubble: translucent navy --card-bg, --ink-0 text,
    left-aligned, 1.5px hairline --card-border, max-width 70%.
  · 240ms slide-in + fade animation on each new bubble.
  · Typing indicator: three dots, --ink-5, phase-offset pulse —
    same style as AuraLoader inner dots.

Composer:
  · Sticky to bottom. Withings form chrome (1.5px outlined, focus glow).
  · Auto-resize textarea up to 8 lines.
  · Send button: --brand-soft filled, disabled until input present.
  · Cmd+Enter to send. Plain Enter inserts newline.
  · Voice: placeholder "What would you like to talk through?"

Suggested-prompt chips (above composer):
  · 3-4 chips per persona, pulled from PERSONAS[id].suggestedPrompts
    (extend the persona type if not present).
  · Click → fills the composer + focuses it.

Header action: "Share with Dr. Chen" — UI-only for v1, opens a modal
that says "Share preview coming with ISSUE-012 (Concierge)."

Wire the streaming Server-Sent Events fetch to /api/coach. Stream
tokens into the latest assistant bubble live. Persist thread_id in
localStorage keyed by persona.

Constitution: this surface is the product's most-used after Today.
Voice in the system prompt is persona-specific — Coach speaks like
Harlow's gentle observer, like Bella's validating pattern-seeker, like
Grayson's brisk executive partner. The UI must let the words breathe —
generous whitespace, no chrome decoration competing with the text.
```

---

## Acceptance

- POST /api/coach returns a stream
- Tokens render live in the latest assistant bubble
- Suggested prompts persona-aware
- Cmd+Enter sends, Enter newlines
- Thread persists per-persona in localStorage
- Switching persona resets the thread context cleanly

## Already scaffolded in this pass

`pages/coach.tsx` ships a queued stub. v0 + Venkat collaborate to fill it.
