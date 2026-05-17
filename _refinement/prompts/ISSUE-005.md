# ISSUE-005 · Pattern data contract — GET /api/patterns

**Priority** P0 · **Owner** Lachlan + Venkat · **Tool** Claude Code (backend) + v0 (frontend) · **BLOCKED on backend**

---

## Backend prompt — Claude Code (Venkat)

```
Create pages/api/patterns.js (Next.js Pages Router API route).

Contract:

  GET /api/patterns
  Headers required: x-invite-code: <INVITE_CODE>
  Query parameters:
    window     '7d' | '28d' | '90d' | '12mo' (default '28d')
    metrics    comma-separated, e.g. 'sleep,hrv,rhr,time_on_feet,mood,
               focus,barometric' (default 'sleep,hrv,rhr')
    persona_id 'kezia' | 'simone' | 'renee' (required)

  Response 200:
  {
    "window": "28d",
    "generated_at": "ISO8601",
    "patterns": [
      {
        "metric": "sleep",
        "unit":   "score 0..1",
        "weight": "high" | "mid" | "baseline",
        "points": [{ "t": "ISO8601", "v": 0.72, "confidence": 0.91 }]
      }
    ],
    "correlations": [
      { "a": "barometric_drop", "b": "flare_72h", "r": 0.74, "n": 14 }
    ]
  }

  Response 204: no patterns yet — frontend renders empty state.
  Response 401: invalid invite code.
  Response 400: missing/invalid query.

Implementation notes:
  · Validate x-invite-code header (same logic as ISSUE-004).
  · Synthesise placeholder data per persona until the data warehouse
    ships — Grayson gets dense correlations (r > 0.6 for 6 pairs),
    Bella gets mid (r > 0.4 for 3 pairs), Harlow gets sparse (no
    correlations yet, just raw points).
  · Cache headers: Cache-Control: private, max-age=60.
  · Add a smoke endpoint /api/patterns/health returning { ok: true,
    contract_version: "2026-05-17" }.

Once implemented, paste the curl output for:
  curl -H "x-invite-code: $INVITE_CODE" \
    'http://localhost:3000/api/patterns?window=28d&metrics=sleep,hrv,rhr&persona_id=renee'
```

---

## Frontend prompt — v0 (Lachlan, run after ISSUE-001 system prime)

```
Wire SWR-based data fetching into pages/index.tsx and pages/patterns.tsx
to consume GET /api/patterns. Implementation:

  · Install swr if not present.
  · Create lib/usePatterns.ts hook:
      useSwr(`/api/patterns?window=${window}&metrics=${metrics.join(',')}&
              persona_id=${personaId}`, fetcher)
  · Fetcher must include x-invite-code header from localStorage
    (set by ISSUE-009 InviteGate).
  · On pending: render skeleton threads (use the Skeleton component
    from ISSUE-016 — hairline-only shimmer).
  · On 204: render empty state component with eyebrow "Awaiting signal"
    and copy "Your record will populate as your sources sync. This
    usually takes 24 hours."
  · On 5xx: render error state with copy "We couldn't reach your record
    just now. Trying again in a moment." + manual Retry button.
  · On 200: hydrate the existing placeholder series with real points.

Do not introduce a charting library. The existing PatternThread SVG
component handles longitudinal series — feed it data.points.map(p => p.v).
```

---

## Acceptance

- `GET /api/patterns?window=7d&metrics=hrv,rhr,sleep&persona_id=renee` returns the documented shape
- Today and Patterns surfaces fetch via SWR
- Skeleton during load, empty state on 204, error state on 5xx
- No raw JSON ever rendered to the user
- Switching persona in localStorage (or via the Tweaks panel once ported) re-fetches

## Already scaffolded in this pass

`pages/index.tsx` and `pages/patterns.tsx` render placeholder series with `BLOCKED_ON_DATA_CONTRACT` badges. Frontend stub is graceful — backend can ship and frontend swaps in without UI regressions.
