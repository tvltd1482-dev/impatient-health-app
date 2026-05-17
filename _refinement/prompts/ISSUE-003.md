# ISSUE-003 · Build iMpatient cloud-mark + mønk™ inline wordmark

**Priority** P0 · **Owner** Lachlan · **Tool** v0 by Vercel · **Run after** ISSUE-001 system prime

---

## Paste-ready prompt — v0

```
Refine components/Wordmark.tsx — already scaffolded with two variants
(mark='impatient' renders a cloud silhouette SVG; mark='monk' renders
the engine name with the literal stroked ø glyph). Polish the cloud
silhouette to be a single mono-line, calm and unmistakable — a small
abstracted cumulus / wisp shape, not a weather-app cartoon cloud.

Constraints:
  · SVG 24×24 viewBox. Single path. stroke="currentColor",
    stroke-width="1.5", stroke-linecap="round", stroke-linejoin="round",
    fill="none". No fills inside the cloud.
  · The shape suggests a notebook page being turned into a soft cloud —
    or a wisp catching light — but never literal. No raindrops. No sun.
    No eyes. No face.
  · Size prop scales the SVG and the optional adjacent text together.
  · withText=true: render the SVG + "iMpatient" in Gilroy 600 at
    0.7 * size, letter-spacing -0.025em. Trademark superscript optional.
  · mark='monk': renders the literal Unicode ø (U+00F8), NOT 'o' with
    a CSS strikethrough. The glyph IS the brand identity.
  · aria-label on the impatient variant: "iMpatient". On the monk variant:
    "monk, spelled m-o-n-k with a stroked o, pronounced monk."

Test prop combinations to render:
  <Wordmark />                                     // chrome top-left
  <Wordmark withText />                            // hero contexts
  <Wordmark mark="monk" size={18} />               // inline body
  <Wordmark mark="monk" size={28} trademark />     // hero attribution

Output: an updated components/Wordmark.tsx ready to drop in. Keep the
TypeScript prop interface. Do NOT introduce new dependencies.
```

---

## Acceptance

- Cloud SVG path is a single `<path>` with stroke-only rendering, no fills inside the silhouette
- mønk variant uses literal `ø` — `grep ø components/` returns a hit
- Screen reader announces both marks correctly
- Trademark superscript is positioned cleanly (vertical-align: super, --ink-7 color)

## Already scaffolded in this pass

`components/Wordmark.tsx` ships with the two variants. v0's job is to refine the cloud silhouette path.
