/* eslint-disable no-undef */
/* ConditionTerm + ConditionsText + ConditionPopover
   ----
   Three primitives for hyperlinking conditions to the iMpatient glossary.

   <ConditionTerm term="POTS">POTS</ConditionTerm>
     Wraps a single mention. Shows a subtle dotted underline + "?" glyph.
     On hover OR click, shows a calm popover with the definition.

   <ConditionsText>You manage RRMS, POTS, and MCAS.</ConditionsText>
     Walks the children, finds anything in the conditions alias list,
     and wraps each match in <ConditionTerm/> automatically. Use this
     for body copy where authors shouldn't have to remember which
     terms to link.

   The popover anchors to the term, flips above/below based on space,
   and dismisses on outside click + Escape. Keyboard-accessible:
   the term is a real <button>, focusable, with aria-expanded.

   Voice rule: the popover is calm, not encyclopedic. Lead with the
   short lived-experience read; offer "Read more" to deep-dive in the
   future Conditions Library.
*/

// NOTE: React hooks are referenced as React.X inside this file to avoid
// top-level destructuring collisions with the App script's `useState`.

// ============================================================
// ConditionTerm — single inline mention
// ============================================================

function ConditionTerm({ term, children, displayAs }) {
  // Resolve the term (explicit prop or the visible text) to a DB entry.
  const key = (term || (typeof children === "string" ? children : "")).toLowerCase();
  const id = window.CONDITIONS_ALIAS_MAP[key];
  const entry = id ? window.CONDITIONS_DB[id] : null;

  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef(null);
  const popRef = React.useRef(null);
  const popoverId = React.useId();

  // Close on outside click or Escape.
  React.useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (popRef.current?.contains(e.target)) return;
      if (btnRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // If we couldn't resolve the term, render the children as-is — the
  // caller misspelled or we don't have a definition yet. Don't break copy.
  if (!entry) return <>{children}</>;

  return (
    <span className="condition-term-wrap">
      <button
        ref={btnRef}
        type="button"
        className={"condition-term" + (open ? " is-open" : "")}
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={(e) => {
          // Don't close if moving onto the popover itself.
          const rt = e.relatedTarget;
          if (rt && popRef.current?.contains(rt)) return;
          // Slight delay so clicking inside has time.
          setTimeout(() => {
            if (!popRef.current?.matches(":hover") && !btnRef.current?.matches(":hover")) {
              setOpen(false);
            }
          }, 120);
        }}
        aria-expanded={open}
        aria-controls={popoverId}
      >
        <span className="condition-term-label">{children || displayAs || entry.label}</span>
        <svg className="condition-term-glyph" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55"/>
          <text x="6" y="8.4" textAnchor="middle" fontSize="7" fontFamily="Geist Mono, ui-monospace, monospace" fill="currentColor" fontWeight="500">?</text>
        </svg>
      </button>
      {open && (
        <ConditionPopover
          ref={popRef}
          id={popoverId}
          entry={entry}
          onClose={() => setOpen(false)}
        />
      )}
    </span>
  );
}

// ============================================================
// ConditionPopover — the calm definition card
// ============================================================

const ConditionPopover = React.forwardRef(function ConditionPopover({ entry, onClose, id }, ref) {
  return (
    <span
      ref={ref}
      id={id}
      className="condition-popover"
      role="dialog"
      aria-label={`About ${entry.label}`}
      onMouseLeave={onClose}
    >
      <span className="condition-popover-arrow" aria-hidden="true" />
      <span className="condition-popover-inner">
        <span className="condition-popover-head">
          <span>
            <span className="condition-popover-eyebrow">Conditions library</span>
            <span className="condition-popover-title">{entry.label}</span>
            <span className="condition-popover-full">{entry.full}</span>
          </span>
          <button
            type="button"
            className="condition-popover-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </span>

        <p className="condition-popover-short">{entry.short}</p>

        {entry.body && entry.body.map((para, i) => (
          <p key={i} className="condition-popover-body">{para}</p>
        ))}

        {entry.signals && entry.signals.length > 0 && (
          <span className="condition-popover-signals">
            <span className="condition-popover-signals-eyebrow">What iMpatient watches for</span>
            <ul className="condition-popover-signals-list">
              {entry.signals.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </span>
        )}

        {entry.prevalence && (
          <span className="condition-popover-prevalence">{entry.prevalence}</span>
        )}

        <span className="condition-popover-foot">
          <a className="condition-popover-link" href={`#conditions/${entry.id}`}>
            Read more in the library
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M4 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </span>
      </span>
    </span>
  );
});

// ============================================================
// ConditionsText — auto-detect wrapper for body copy
// ============================================================
//
// Walks any string children and wraps recognized terms. Skips already-
// wrapped <ConditionTerm/> children. Use for paragraph-level copy where
// you don't want to manually wrap each mention.

function ConditionsText({ children, className }) {
  const out = React.useMemo(() => walkAndWrap(children), [children]);
  if (className) return <span className={className}>{out}</span>;
  return <>{out}</>;
}

// Walk nodes recursively.
function walkAndWrap(node) {
  if (typeof node === "string") return wrapString(node);
  if (Array.isArray(node)) return node.map((n, i) => <React.Fragment key={i}>{walkAndWrap(n)}</React.Fragment>);
  if (!React.isValidElement(node)) return node;
  // Don't double-wrap.
  if (node.type === ConditionTerm) return node;
  // Recurse into children.
  if (node.props && node.props.children !== undefined) {
    return React.cloneElement(node, {
      ...node.props,
      children: walkAndWrap(node.props.children),
    });
  }
  return node;
}

// Greedy match — try longest aliases first, case-insensitive,
// word-boundary aware. Returns an array of strings + <ConditionTerm/>s.
function wrapString(str) {
  if (!str) return str;
  const matchList = window.CONDITIONS_MATCH_LIST || [];
  if (matchList.length === 0) return str;

  // Build a single regex of all aliases, longest first, with word boundaries.
  // Word-boundary is tricky for terms like "ME/CFS" — we approximate with
  // (^|[\s.,;:!?()\[\]"']) lookbehinds aren't universally supported, so
  // we use a captured prefix + replacement.
  const escaped = matchList.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp("(^|[\\s.,;:!?()\\[\\]\"'\\u2014\\u2013\\u2026/])(" + escaped.join("|") + ")(?=$|[\\s.,;:!?()\\[\\]\"'\\u2014\\u2013\\u2026/])", "gi");

  const parts = [];
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(str)) !== null) {
    const matchStart = m.index + m[1].length;
    const matchEnd = matchStart + m[2].length;
    if (matchStart > last) parts.push(str.slice(last, matchStart));
    const original = str.slice(matchStart, matchEnd);
    const key = original.toLowerCase();
    const id = window.CONDITIONS_ALIAS_MAP[key];
    if (id) {
      parts.push(
        <ConditionTerm key={`ct-${i++}-${matchStart}`} term={original}>
          {original}
        </ConditionTerm>
      );
    } else {
      parts.push(original);
    }
    last = matchEnd;
  }
  if (last < str.length) parts.push(str.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}

Object.assign(window, { ConditionTerm, ConditionsText, ConditionPopover });
