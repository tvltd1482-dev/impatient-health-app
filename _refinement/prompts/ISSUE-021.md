# ISSUE-021 · Admin queue — agentic actions

**Priority** P2 · **Owner** Lachlan + Venkat · **Tool** v0 by Vercel · **Pro tier**

---

## Paste-ready prompt — v0

```
Build pages/admin/queue.tsx — the agentic-actions queue. Pro tier only.

Hero:
  Eyebrow:    Admin queue · Pro · this week
  Headline:   What Coach owes your life this week.
  Em-clause:  Approve, dismiss, modify.
  Body:       The appointment queue, the refill queue, the insurance
              queue, the document queue. Coach handles. You approve.
              Vagal calm is the deliverable.

Build components/AgentAction.tsx:
  Each card:
    · Eyebrow with action type (Reschedule / Draft / Send / File / etc.)
    · Headline in clinician-brisk voice: "Held Friday board meeting"
    · Rationale paragraph linking back to the pattern: "Compound r=0.81
       flare prediction Thursday. Friday is below your post-flare
       recovery threshold."
    · Three buttons: Approve (filled brand-soft) · Modify (outlined) ·
       Dismiss (text)
    · Timestamp + "Queued 6h ago" in mono micro

Render 10 example actions for Grayson:
  · Held Friday's board meeting
  · Drafted note to COO explaining
  · Sent lab order to Quest (CBC + ferritin + CRP)
  · Rescheduled Geneva infusion to post-return Mon
  · Pre-booked Geneva MCAS-aware specialist (Dr. Voss, fourth floor)
  · Drafted insurance appeal for last month's denied infusion
  · Filed FSA receipt batch (12 entries, $487 reimbursable)
  · Reminded Greg (PA) to confirm Lufthansa wheelchair assistance
  · Drafted Mon-Wed hydration protocol (80oz / day target)
  · Filed cost-of-care receipts for travel

Empty state copy: "Coach is quiet today." (--ink-7 italic)

Voice: brisk, executive, factual. NEVER "wellness". NEVER apologize for
being helpful.

Backend (Venkat): /api/admin-queue returns the user's pending actions.
For now, stub with hardcoded fixtures keyed by persona.
```

---

## Acceptance

- 10 example actions rendered for Grayson
- Each has Approve / Modify / Dismiss
- Each has a rationale paragraph
- Approving / dismissing persists locally for v1
- Empty state copy is one line
