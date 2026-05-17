# ISSUE-006 · Port personas system into Next.js

**Priority** P0 · **Owner** Lachlan · **Tool** Claude Code (local)

---

## Paste-ready prompt — Claude Code

```
Audit components/personas.ts against the artifact prototype's
components/personas.jsx. Verify the following invariants:

1. Three personas exist with these exact internal IDs (NEVER renamed):
   kezia, simone, renee.

2. Display names are: Harlow (kezia), Bella (simone), Grayson (renee).
   These are the post-rename names per HANDOFF.md. If the live build
   still shows "Renee" anywhere, that's ISSUE-014 — flag don't fix here.

3. Each Persona object exposes:
     id, name, age, tier, archetype, role, locationStr,
     conditions[], systems[],
     ledeEyebrow, ledeHero, ledeEm, ledeBody

4. Tier values are strictly: 'Free' | 'Essential' | 'Pro' | 'Enterprise'.

5. DEFAULT_PERSONA exports as 'renee' (Pro/Grayson — the demo's most
   important moment is switching personas, and Grayson is the richest
   demo).

6. The Persona type is exported. The PersonaId type is exported.
   PERSONAS is exported as Record<PersonaId, Persona>.

7. Add a server-safe persona prompts module at lib/persona-prompts.ts
   with the Claude system prompts per persona (for Coach mode in
   ISSUE-004). Keep these strings free of React imports.

After auditing, list any deltas between components/personas.ts and the
HANDOFF/CLAUDE constitution. Fix anything that diverges. Do NOT rename
internal IDs.
```

---

## Acceptance

- `import { PERSONAS, DEFAULT_PERSONA, PersonaId, Persona } from '../components/personas'` works on every page
- Switching `DEFAULT_PERSONA` re-renders every persona-aware surface with the new persona's data
- `lib/persona-prompts.ts` exists with three system prompts, no React imports
- No occurrence of the legacy display names ("Renee", "Kezia", "Simone") in user-facing strings — those live only as internal IDs

## Already scaffolded in this pass

`components/personas.ts` ships with three personas. `lib/persona-prompts.ts` pending — Venkat needs it for ISSUE-004 Coach mode.
