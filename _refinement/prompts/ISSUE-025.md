# ISSUE-025 · Telemetry instrumentation (PostHog self-hosted)

**Priority** P2 · **Owner** Venkat · **Tool** Claude Code (local)

---

## Paste-ready prompt — Claude Code

```
iMpatient cannot read its own behavior at launch. Wire telemetry.

Provider choice: PostHog self-hosted.

Why PostHog self-hosted over alternatives:
  · HIPAA-adjacency — even though we're not a covered entity, the
    population reads as if we are. Hosting analytics in-house keeps
    behavioral signal under our own control.
  · No PII leakage to third parties.
  · Open-source feature flag system folds in cleanly.
  · Cost-controlled (event quota = our infra).
  · NOT Segment (Twilio-owned, sees content). NOT Google Analytics
    (terrible privacy story). NOT Mixpanel (similar concern).

Implementation:

1. Provision a PostHog self-hosted instance — Vercel + Postgres or
   Hetzner / Railway / DigitalOcean — outside this work but listed in
   the deployment plan.

2. Install posthog-js in the Next.js repo.

3. Create lib/analytics.ts with a thin wrapper:
     init(distinctId: string)
     track(event: EventName, props?: Record<string, any>)
     identify(distinctId: string, traits?: Record<string, any>)
     reset()

   PII redaction at the source:
     - Strip email → hash before sending
     - Strip persona display name → send only persona_id (kezia/simone/renee)
     - Strip free-text inputs → send count, never content
     - Strip URLs that contain conditions / patient info → send route
       template instead (/patterns/[slug] not /patterns/pots)

4. Create lib/useTrack.ts hook for component-level usage.

5. Wire five core events at launch:
     · pattern_viewed             { metric, window }
     · thread_revealed            { route, position }
     · invite_validated           { success }
     · monk_interpretation_requested { mode, persona_id }
     · doctor_brief_generated     { protocol, persona_id }

6. Set up feature-flag taxonomy:
     · ff_concierge_enabled
     · ff_admin_queue_enabled
     · ff_travel_card_enabled
     · ff_emergency_mode_enabled
     · ff_research_contribution_visible

7. Document the event taxonomy at /_refinement/telemetry-taxonomy.md.

8. PII audit: run a smoke test, capture every event, verify no PII
   leaves the boundary. Document in /_refinement/pii-audit.md.

9. Cookie banner: NONE for now (no third-party analytics → no
   GDPR consent flow needed for first-party PostHog with strict
   data-minimisation). Revisit if Pro tier adds any third-party.
```

---

## Acceptance

- PostHog dashboard shows ≥ 1 event per visit on dev.impatient.app
- PII audit passes: no email, no display name, no free-text content in any event payload
- Five core events firing
- Feature flags documented + queryable
- Telemetry taxonomy doc committed
