# ISSUE-009 · Port Withings form chrome

**Priority** P1 · **Owner** Lachlan · **Tool** v0 by Vercel · **Run after** ISSUE-001 system prime

---

## Paste-ready prompt — v0

```
Port the Withings-inspired form chrome from the artifact prototype
(styles/forms.css in the source repo) into the Next.js codebase as
styles/forms.css + a small primitive component library.

Components to build (all in components/, all importing tokens from
styles/tokens.css):

1. <FormField label="..." value={...} onChange={...} type="..." />
   · Mono-caps eyebrow label above the input (Geist Mono 10px,
     letter-spacing 0.16em, uppercase, --ink-7)
   · 1.5px outlined input on translucent navy --card-bg
   · Border --card-border default, focus brand-soft + 3px brand-soft
     glow (box-shadow 0 0 0 3px rgba(122,184,255,0.18))
   · Padding 12px 16px, radius 8px
   · Gilroy 15px, --ink-0 text
   · Optional helper text below in --ink-7 micro

2. <Segmented options={['ft/in', 'cm']} value={...} onChange={...} />
   · Pill-radius rounded container with --card-border
   · Active segment: --card-bg-strong with --brand-soft 1.5px border
   · Inactive: transparent with --ink-7 text
   · Sliding thumb animation: 240ms ease-aura on selection change
   · Small group: 2-4 options. Medium: 5-6. Wide: stack vertically.

3. <Toggle value={...} onChange={...} label="..." />
   · iOS-style rail + thumb, 34×20px
   · On: --brand-soft background, thumb shifted right
   · Off: --card-border background, thumb shifted left
   · 240ms ease-aura transition
   · Label to the left, mono-caps eyebrow style

4. <ListRow icon={...} title="..." subtitle="..." trailing={...} />
   · For non-input rows in forms — avatar pickers, navigation links
   · Padding 16px 0, hairline divider below
   · Title --ink-0 Gilroy 17px, subtitle --ink-5 13px
   · Trailing slot for badges / arrows / values
   · Hover: subtle background fade to --aura-bg-2

5. <FormSection eyebrow="..." description="...">{fields}</FormSection>
   · Sticky eyebrow heading
   · Optional description in --ink-5
   · 32px vertical spacing between sections

6. <StickySaveBar dirty={...} onCancel={...} onSave={...} />
   · Sticky to viewport bottom when dirty
   · Cancel (text button) + Save changes (filled --brand-soft button)
   · Slide-up animation when entering dirty state
   · Honors safe-area-inset-bottom on iOS

All components export named, ship to components/. Add styles/forms.css
if any styling exceeds inline reasonability — but prefer inline style
objects with CSS variable references.

Output the six files. Demonstrate them by composing pages/profile.tsx
with a two-column layout (Identity left, Preferences right) using these
primitives.
```

---

## Acceptance

- Every form field uses mono-caps eyebrow + 1.5px outlined input on translucent navy
- Focus glows brand-soft with a 3px halo
- Segmented thumb slides 240ms ease-aura
- Toggle has iOS-style switch animation
- No `<select>` / native `<input>` rendered without the new chrome
- `pages/profile.tsx` re-renders as a real form using the primitives

## Note

CLAUDE.md is explicit: "Do not invent new form chrome." This issue is a port, not a redesign. If anything is unclear, mirror the artifact prototype.
