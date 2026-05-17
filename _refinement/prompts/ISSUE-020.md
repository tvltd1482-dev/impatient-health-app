# ISSUE-020 · Conditions library — citable global database

**Priority** P2 · **Owner** Lachlan · **Tool** v0 by Vercel + Claude Code

---

## Paste-ready prompt — Claude Code

```
Build data/conditions.json with entries for the launch set:
  POTS · ME/CFS · MS (RRMS) · MCAS · Autoimmune overlap · ADHD ·
  Hypothyroidism · Dysautonomia

Each entry:
{
  "slug": "pots",
  "name": "Postural Orthostatic Tachycardia Syndrome",
  "shortName": "POTS",
  "livedExperience": "What your body experiences. 4-6 paragraphs.
    Literary voice. Reference specific physical experiences (orthostatic
    intolerance, post-meal flares, etc.) in plain language before any
    clinical term.",
  "translatedClinicalTerms": [
    { "term": "orthostatic intolerance",
      "plainLanguage": "the dizziness when you stand up too fast",
      "source": "NIH NINDS, 2023" }
  ],
  "patternsWeWatch": [
    "Heart rate rise > 30 bpm within 10 min of standing",
    "Afternoon RHR climb correlated with hydration",
    "Heat days > 80°F → fatigue spike"
  ],
  "sources": [
    { "label": "NIH NINDS — POTS information page",
      "url": "https://www.ninds.nih.gov/health-information/disorders/postural-orthostatic-tachycardia-syndrome-pots",
      "lastVerified": "2026-04-15" },
    { "label": "Mayo Clinic — POTS overview",
      "url": "https://www.mayoclinic.org/diseases-conditions/postural-tachycardia-syndrome/symptoms-causes/syc-20355987",
      "lastVerified": "2026-04-15" }
  ]
}

Source restrictions per BRIEF: NIH / NHS / Mayo / MedlinePlus / Cochrane
/ peer-reviewed only. NOT WebMD. NOT Wikipedia. Each source must have a
last-verified date.

Then build pages/conditions/[slug].tsx that renders any entry. Aura-hero
with the condition name + an em-clause line that names the lived
experience. Body paragraphs follow. "Patterns we watch" section uses
the existing PatternThread for each. "Sources" section at the bottom
is mono-caps, citation-style.

This is one of the brief's "the things a user can show their doctor"
surfaces. Voice respects clinicians.
```

---

## Acceptance

- 8 condition entries in `data/conditions.json`
- Every claim has a NIH/NHS/Mayo/MedlinePlus citation with last-verified date
- `pages/conditions/[slug].tsx` renders any entry
- Lived experience leads; clinical translation follows
