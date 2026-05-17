# ISSUE-007 · PWA + mobile primitives for App Store / Play submission

**Priority** P0 · **Owner** Cameron · **Tool** Claude Code (local) + v0 (for in-app status-bar treatments)

---

## Paste-ready prompt — Claude Code

```
Validate the shipped PWA primitives against Apple HIG and Google Play
pre-submission checklists. The repo already ships:

  · public/manifest.webmanifest    (theme #060920, standalone, portrait)
  · public/icon.svg                (cloud-mark on navy aura disc)
  · public/icon-maskable.svg       (cloud-mark with safe-zone padding)
  · pages/_document.js             (theme-color, apple-touch-icon,
                                    apple-mobile-web-app-* metas)

Tasks:

1. Add 180×180 PNG fallback for apple-touch-icon (Safari 14- requires
   PNG, not SVG). Generate via sharp or rsvg-convert from icon.svg.
   Place at public/apple-touch-icon.png and link in _document.js.

2. Add 512×512 + 192×192 PNG icons to the manifest for Android
   compatibility. Generate from icon.svg. Add to manifest.icons array
   with appropriate sizes.

3. Validate manifest with `npx pwa-asset-generator` and
   `npx --yes pwa-builder validate ./public/manifest.webmanifest`.

4. Run Lighthouse against npm run dev. Target: PWA ≥ 90.

5. Add iOS-specific splash screens for all current iPhone sizes
   (use pwa-asset-generator). Link in _document.js with
   <link rel="apple-touch-startup-image" media="..." href="...">.

6. Verify Safari "Add to Home Screen" opens standalone with the
   cloud-mark icon and a black-translucent status bar.

7. Verify Chrome "Install app" prompt fires on Android Chrome.

8. Apple App Store Connect privacy disclosure draft: list every signal
   class iMpatient reads (wearables, calendars, communication volume
   only — never content, weather, travel, location, money, care
   system). Save as docs/app-store-privacy-disclosures.md.

9. Google Play Console data safety draft mirrors above. Save as
   docs/play-data-safety.md.

Both privacy disclosures must match the content of pages/privacy.tsx
exactly. Counsel will finalise wording.
```

---

## Acceptance

- Lighthouse PWA audit ≥ 90 on `npm run dev`
- iOS Safari "Add to Home Screen" works, opens standalone with cloud-mark icon
- Android Chrome "Install app" prompt fires
- `public/apple-touch-icon.png` (180×180), `public/icon-192.png`, `public/icon-512.png` all present
- Privacy disclosure drafts match `pages/privacy.tsx`

## Already scaffolded in this pass

- `public/manifest.webmanifest` (theme #060920, standalone, portrait, health/medical categories)
- `public/icon.svg` (cloud-mark on aura disc)
- `public/icon-maskable.svg` (safe-zone padding)
- `pages/_document.js` (full meta block)

Pending: PNG fallbacks + splash screens + privacy disclosure docs.
