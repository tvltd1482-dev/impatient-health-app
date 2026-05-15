/* Shared primitives for onboarding screens.
   These are the building blocks every screen reaches for: the screen
   shell, the back/forward nav, the stepper, the choice card, the tag,
   the source row.
*/

/* ScreenShell — base container with optional hero halo and stepper. */
function ScreenShell({ stepper, children, withHalo = true, scrollKey }) {
  // Scroll-to-top whenever the key changes (used by flows as you advance).
  const bodyRef = React.useRef(null);
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [scrollKey]);
  return (
    <div className="ob-screen">
      {withHalo && <div className="ob-hero-halo" aria-hidden="true" />}
      {stepper}
      <div className="ob-screen-body" ref={bodyRef}>
        {children}
      </div>
    </div>
  );
}

/* Stepper — segmented progress bar at the top of multi-step flows. */
function Stepper({ total, index }) {
  return (
    <div className="ob-stepper" aria-label={`Step ${index + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={"ob-stepper-seg" + (i < index ? " done" : i === index ? " active" : "")}
        />
      ))}
    </div>
  );
}

/* Primary action button. */
function PrimaryBtn({ children, onClick, disabled, full = true }) {
  return (
    <button
      type="button"
      className="ob-btn ob-btn-primary"
      onClick={onClick}
      disabled={disabled}
      style={full ? undefined : { width: 'auto' }}
    >
      {children}
      <Chevron />
    </button>
  );
}
function GhostBtn({ children, onClick }) {
  return (
    <button type="button" className="ob-btn ob-btn-ghost" onClick={onClick}>
      {children}
    </button>
  );
}
function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6.2l2.4 2.4 4.6-5.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ChoiceCard — radio-style large tap target. */
function ChoiceCard({ selected, onClick, title, sub }) {
  return (
    <button
      type="button"
      className={"ob-choice" + (selected ? " selected" : "")}
      onClick={onClick}
    >
      <div className="ob-choice-radio" />
      <div className="ob-choice-body">
        <p className="ob-choice-title">{title}</p>
        {sub && <p className="ob-choice-sub">{sub}</p>}
      </div>
    </button>
  );
}

/* Tag — pill-shape, used in the diagnoses/symptoms cloud. */
function Tag({ selected, onClick, children }) {
  return (
    <button
      type="button"
      className={"ob-tag" + (selected ? " selected" : "")}
      onClick={onClick}
    >
      {selected && <span className="ob-tag-check"><CheckIcon /></span>}
      {children}
    </button>
  );
}

/* SourceRow — wearable/calendar/comms list item.
   `comingSoon`: true → overlays a "Coming soon" badge, dims the row,
   blocks the connect action.
   `connected`:  true → row is in connected state with a check.
*/
function SourceRow({ glyph, glyphSvg, name, sub, connected, comingSoon, onConnect, glyphTone }) {
  return (
    <button
      type="button"
      className={"ob-source" + (connected ? " connected" : "")}
      onClick={comingSoon ? undefined : onConnect}
      style={comingSoon ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
      aria-disabled={comingSoon}
    >
      <div className="ob-source-glyph" style={glyphTone ? { background: glyphTone.bg, color: glyphTone.fg } : undefined}>
        {glyphSvg || glyph}
      </div>
      <div className="ob-source-body">
        <p className="ob-source-title">{name}</p>
        <p className="ob-source-sub">{sub}</p>
      </div>
      <div className="ob-source-action">
        {comingSoon ? (
          <span style={{ color: 'var(--ink-6)' }}>Coming soon</span>
        ) : connected ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Connected <span className="ob-source-action-icon"><CheckIcon /></span>
          </span>
        ) : (
          <span>Connect</span>
        )}
      </div>
    </button>
  );
}

/* Brand glyphs (svg, mono-tone). Drawn schematically — not actual logos. */
const GLYPHS = {
  appleHealth: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.7A4 4 0 0119 11c0 5.5-7 10-7 10z" fill="currentColor" />
    </svg>
  ),
  oura: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
    </svg>
  ),
  whoop: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  garmin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L3 18h18L12 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  withings: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h2l2 4 2-8 2 4h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fitbit: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="6" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <circle cx="12" cy="18" r="2" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  google: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 11v3h4.8c-.4 1.8-2.1 3.2-4.8 3.2a5.2 5.2 0 010-10.4c1.4 0 2.6.5 3.6 1.4l2.1-2.1A8.2 8.2 0 0012 4a8 8 0 100 16 7.7 7.7 0 008-8c0-.6-.1-1.1-.2-1.6H12z" fill="currentColor" />
    </svg>
  ),
  apple: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17 13.4c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-2-3.6-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.8-1.7 0-3.2 1-4.1 2.5-1.8 3-.5 7.5 1.2 9.9.9 1.2 1.9 2.5 3.2 2.5 1.3 0 1.8-.8 3.3-.8 1.6 0 2 .8 3.3.8s2.3-1.2 3.1-2.4c1-1.4 1.4-2.7 1.4-2.8-.1 0-2.7-1-2.8-4z" fill="currentColor" />
      <path d="M14.7 5c.7-.9 1.2-2.1 1.1-3.3-1 .1-2.3.7-3 1.5-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.5 3-1.4z" fill="currentColor" />
    </svg>
  ),
  outlook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M5 9l4 3 4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="15" y="8" width="6" height="8" rx="1" fill="currentColor" opacity="0.85" />
    </svg>
  ),
  gmail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  imessage: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 4c-5 0-9 3.4-9 7.6 0 2.4 1.3 4.5 3.3 5.8L5.5 21l4.2-2.5c.7.1 1.5.2 2.3.2 5 0 9-3.4 9-7.6S17 4 12 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  slack: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="4"  y="10" width="6" height="3" rx="1.5" fill="currentColor" />
      <rect x="11" y="4"  width="3" height="6" rx="1.5" fill="currentColor" />
      <rect x="14" y="11" width="6" height="3" rx="1.5" fill="currentColor" />
      <rect x="10" y="14" width="3" height="6" rx="1.5" fill="currentColor" />
    </svg>
  ),
  whatsapp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 21l1.6-4.4A8 8 0 1112 20a8 8 0 01-3.6-.9L3 21z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l.7-1.4-2-1-1.2 1c-.8-.4-1.5-1.1-1.9-1.9l1-1.2-1-2L9 9.5z" fill="currentColor" />
    </svg>
  ),
};

Object.assign(window, {
  ScreenShell, Stepper, PrimaryBtn, GhostBtn, ChoiceCard, Tag, SourceRow,
  Chevron, CheckIcon, GLYPHS,
});
