# ISSUE-023 · Cost of Care ledger

**Priority** P2 · **Owner** Lachlan · **Tool** v0 by Vercel

---

## Paste-ready prompt — v0

```
Build pages/cost-of-care.tsx — the financial overlay.

Hero:
  Eyebrow:    Cost of Care · Pro
  Headline:   What your illness is costing you,
  Em-clause:  made visible.
  Body:       Out-of-pocket spend tracked alongside flares. Per-trip,
              per-month, per-quarter, per-condition. Budgeting your
              illness is part of living with it, especially when it
              will never be covered by insurance.

Section 1 — 12-month spend chart:
  · Horizontal bar chart, one bar per month, May 2025 → May 2026
  · Each bar segmented by category:
      Specialists · Infusions · Medications · Diagnostics ·
      Insurance premiums · Out-of-pocket-max applied · Travel
  · Overlay: flare incidence dots in --brand-glow above each month
  · Voice annotation: "Months with > 2 flares average 1.8× higher
    out-of-pocket spend."

Section 2 — By-condition breakdown:
  · 4-6 rows, one per active condition
  · Each row: condition name, total $ this year, % of total spend,
    a 12-month sparkline
  · Sortable by total / by recency / by acceleration

Section 3 — FSA/HSA usage:
  · "Used $2,847 of $3,300 FSA · 86%"
  · 4-month projection
  · "Push the $487 left to: ..." Coach suggestion line

Section 4 — Insurance interactions:
  · Denials, appeals, EOBs — count + status pills
  · Click → opens a list view (deferred)

Voice: factual, no judgment, no "save money" framing. This is data the
user already lives with — we're surfacing it.
```

---

## Acceptance

- 12-month spend chart with category segments + flare overlay
- By-condition breakdown sortable
- FSA/HSA usage with projection
- Insurance interactions count + status
- Voice never moralizes about money
