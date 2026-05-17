# ISSUE-014 · Voice + persona-name consistency audit

**Priority** P1 · **Owner** Lachlan · **Tool** Claude Code (local)

---

## Paste-ready prompt — Claude Code

```
Audit every string in pages/** and components/** for two issues:

1. Persona-name consistency.

Per CLAUDE.md and HANDOFF.md, the post-rename display names are final:
  · Harlow  (internal id: kezia)
  · Bella   (internal id: simone)
  · Grayson (internal id: renee)

The legacy display names (Kezia / Simone / Renee) survive ONLY as
internal IDs in components/personas.ts. They must NEVER appear as
user-facing display strings.

Grep for these legacy names appearing in user-facing positions:
  grep -rn 'Renee' --include='*.tsx' --include='*.ts'  pages/ components/
  grep -rn 'Kezia' --include='*.tsx' --include='*.ts'  pages/ components/
  grep -rn 'Simone' --include='*.tsx' --include='*.ts' pages/ components/

For each hit:
  · If it's a `PersonaId` literal or an internal-id reference (object
    key, type member, default constant) — LEAVE IT.
  · If it's user-facing display text — REPLACE with the corresponding
    display name, ideally via PERSONAS[id].name lookup rather than
    hardcode.

The dev.impatient.app live build (screenshot 2026-05-17) still shows
"Renee, 47" in the Today persona block. That's the legacy display name
leaking through. Find the source of the live string. If it's in the
artifact-prototype's components/today.jsx, that's outside this repo —
log it as a follow-up for the design-source workspace. If it's in
THIS repo, fix it via the PERSONAS lookup.

2. Voice audit.

Scan every user-facing string for these AI-slop tropes (CLAUDE.md
"never do" list):

  · "wellness journey"
  · "AI-powered insights"
  · "optimal health"
  · "✨" or any emoji at all
  · "Get started" → replace with surface-specific verb
  · "Welcome to your..."
  · "Empower"
  · "Unlock the power of..."
  · Any sentence ending in an exclamation mark

For each hit, propose a rewrite in the iMpatient voice — calm, specific,
literary, em-clause cadence. Example transforms:

  BAD: "Get insights into your wellness journey!"
  GOOD: "Your resting heart rate has been climbing six beats every
         Sunday evening. The same time, every week."

  BAD: "Welcome to your dashboard."
  GOOD: "Grayson — Sunday evening read. Thursday is asking for a decision."

  BAD: "Unlock your health potential."
  GOOD: "Open the rest of your record at Pro."

3. Apply the fixes. Commit with the message:
   "voice + persona audit (ISSUE-014)"
```

---

## Acceptance

- `grep -rn 'Renee\|Kezia\|Simone' pages/ components/` returns zero user-facing strings (internal IDs OK)
- `grep -rn '✨\|wellness journey\|AI-powered\|optimal health' pages/ components/` returns zero hits
- No exclamation marks in user-facing copy (annotations excepted)
- Em-clause cadence preserved on every page hero
