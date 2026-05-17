# ISSUE-004 · Swap /api/generate from OpenAI to Anthropic

**Priority** P0 · **Owner** Venkat · **Tool** Claude Code (local — NOT v0) · **BLOCKED**

This is backend work. Frontend POST shape stays unchanged — no frontend stub needed.

---

## Paste-ready prompt — Claude Code (run inside the repo)

```
Replace pages/api/generate.js end-to-end with an Anthropic-backed handler.

Requirements:

1. Install @anthropic-ai/sdk in the repo (npm i @anthropic-ai/sdk).
   Pin to ^0.x.x current as of 2026-05-17. Use the official Node SDK,
   not raw fetch.

2. The handler must accept POST with body:
   {
     "prompt": "string (required)",
     "thread_id": "string (optional, Coach mode only)",
     "mode": "'interpret' | 'classify' | 'coach' (default 'interpret')",
     "persona_id": "'kezia' | 'simone' | 'renee' (required for coach mode,
                    optional otherwise)"
   }

3. Validate the x-invite-code request header against process.env.INVITE_CODE.
   Missing or wrong header → 401 { "error": "invite_code_invalid" }.
   Missing prompt → 400 { "error": "missing_prompt" }.
   coach mode without persona_id → 400 { "error": "missing_persona" }.

4. Model routing:
     mode === 'interpret' → claude-sonnet-4-6
     mode === 'coach'     → claude-sonnet-4-6
     mode === 'classify'  → claude-haiku-4-5-20251001

5. Enable prompt caching on system messages where applicable
   (cache_control: { type: 'ephemeral' }) — system prompts for coach mode
   are long and reused. This matters for cost and latency.

6. coach mode: load the persona-specific system prompt from
   components/personas.ts (re-export the persona system prompt strings
   from a server-safe path — do NOT import client React components into
   the api route; create lib/persona-prompts.ts with plain strings instead).

7. Response 200:
   {
     "text": "string",
     "provider": "anthropic",
     "model": "claude-sonnet-4-6" | "claude-haiku-4-5-20251001",
     "thread_id": "string" // echo back or generate new
   }

8. Remove all references to OPENAI_API_KEY, BACKEND_URL, and the OpenAI
   fetch call. Remove from .env.example. Add ANTHROPIC_API_KEY to
   .env.example. Update Vercel project env vars.

9. Add a smoke test: POST with a valid invite code and prompt "ping"
   should return 200 with non-empty text and provider="anthropic".

10. Keep the existing route shape (POST /api/generate). Do not move it
    to a different path. Frontend depends on this contract.

After implementing: run `curl -X POST http://localhost:3000/api/generate
-H 'content-type: application/json' -H "x-invite-code: $INVITE_CODE"
-d '{"prompt":"ping","mode":"classify"}'` and paste the response.
```

---

## Acceptance

- `curl -X POST https://dev.impatient.app/api/generate -H 'x-invite-code: <code>' -H 'content-type: application/json' -d '{"prompt":"hello"}'` returns 200 with `provider: "anthropic"` and `model: "claude-sonnet-4-6"`
- Missing / invalid invite returns 401 `{"error":"invite_code_invalid"}`
- No OPENAI_API_KEY remains in Vercel env or in `.env.example`
- coach mode loads persona-specific system prompts
- Prompt caching applied on coach-mode system messages

## API spec (verbatim from sprint-board.json)

```json
{
  "endpoint": "POST /api/generate",
  "headers_required": ["Content-Type: application/json", "x-invite-code: <INVITE_CODE>"],
  "request_body": {
    "prompt": "string",
    "thread_id": "string (optional, Coach only)",
    "mode": "'interpret' | 'classify' | 'coach' (default 'interpret')",
    "persona_id": "'kezia' | 'simone' | 'renee'"
  },
  "response_200": {
    "text": "string",
    "provider": "'anthropic'",
    "model": "string",
    "thread_id": "string"
  },
  "model_routing": {
    "interpret": "claude-sonnet-4-6",
    "coach":     "claude-sonnet-4-6",
    "classify":  "claude-haiku-4-5-20251001"
  },
  "env_required": ["ANTHROPIC_API_KEY", "INVITE_CODE"]
}
```
