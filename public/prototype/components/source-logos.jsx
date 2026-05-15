// Monochrome SVG glyphs for the data sources Aurelia reads.
// Single-color (currentColor) so they take on the chip's text color
// and stay calm — a receipt, not a sponsor wall.
//
// Each glyph is a 24x24 viewBox, optical-balanced. We're not drawing
// brand logos verbatim — these are recognizable abstractions that
// scan as "Oura / Watch / Calendar / Email" without turning the
// dashboard into a logo gallery.

const SourceLogos = {
  // ── Wearables / Biometrics ─────────────────────────────────
  oura: (
    // Ring
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ),
  appleWatch: (
    // Watch with crown + band stubs
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="6" width="12" height="12" rx="3" />
      <path d="M9 6 L9.5 3.5 L14.5 3.5 L15 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 18 L9.5 20.5 L14.5 20.5 L15 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 10.5 L19.5 10.5 M18 13.5 L19.5 13.5" strokeLinecap="round" />
    </svg>
  ),
  withings: (
    // BP cuff: rectangle with reading line
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="7" width="17" height="10" rx="1.5" />
      <path d="M7 12 L9.5 12 L10.5 9.5 L12 14.5 L13 12 L17 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  appleHealth: (
    // Heart
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19.5 C 6 15.5, 3.5 12, 3.5 8.8 C 3.5 6.4, 5.4 4.5, 7.8 4.5 C 9.6 4.5, 11.1 5.6, 12 7.2 C 12.9 5.6, 14.4 4.5, 16.2 4.5 C 18.6 4.5, 20.5 6.4, 20.5 8.8 C 20.5 12, 18 15.5, 12 19.5 Z" />
    </svg>
  ),
  cycle: (
    // Cycle / circular arrow
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12 A 7 7 0 1 1 12 5" />
      <path d="M12 5 L15.5 5 M12 5 L12 8.5" />
    </svg>
  ),

  // ── Calendars ──────────────────────────────────────────────
  outlook: (
    // Squared "O"
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4.5" y="6.5" width="11" height="11" rx="1.5" />
      <ellipse cx="10" cy="12" rx="2.2" ry="2.8" />
      <path d="M15.5 9 L19.5 11 L19.5 13 L15.5 15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  googleCal: (
    // Calendar with date mark
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 9.5 L20 9.5" />
      <path d="M8 4 L8 7 M16 4 L16 7" />
      <path d="M11 13 L13 13 L13 16.5 M11.5 16.5 L14.5 16.5" />
    </svg>
  ),
  icloud: (
    // Cloud
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 17 C 5 17, 3.5 15.4, 3.5 13.4 C 3.5 11.6, 4.9 10.1, 6.7 9.9 C 7.2 7.6, 9.3 6, 11.8 6 C 14.6 6, 16.9 8, 17.3 10.6 C 19 10.8, 20.5 12.2, 20.5 14 C 20.5 15.7, 19.2 17, 17.5 17 Z" />
    </svg>
  ),
  careTeam: (
    // Calendar + plus (clinical)
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 9.5 L20 9.5" />
      <path d="M8 4 L8 7 M16 4 L16 7" />
      <path d="M12 12 L12 17 M9.5 14.5 L14.5 14.5" />
    </svg>
  ),

  // ── Email / Comms ──────────────────────────────────────────
  gmail: (
    // Envelope with M
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M3 6 L12 13 L21 6" />
    </svg>
  ),
  imessage: (
    // Speech bubble
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7 C 4 5.3, 5.3 4, 7 4 L 17 4 C 18.7 4, 20 5.3, 20 7 L 20 14 C 20 15.7, 18.7 17, 17 17 L 9 17 L 5.5 20 L 5.5 17 L 5.5 17 C 4.7 17, 4 16.3, 4 14 Z" />
    </svg>
  ),

  // ── Travel ─────────────────────────────────────────────────
  tripit: (
    // Boarding pass
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8 L17 8 L20.5 12 L17 16 L3 16 Z" />
      <path d="M14 12 L18 12" />
      <circle cx="7" cy="12" r="0.6" fill="currentColor" />
    </svg>
  ),
  airline: (
    // Plane (United/Lufthansa generic)
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13.5 L9 12 L11 6 L13 6 L12 12 L17.5 11 L20 9.5 L21 11 L13 15 L11 21 L9 21 L9 16 L4 16.5 Z" />
    </svg>
  ),

  // ── Environment ────────────────────────────────────────────
  weather: (
    // Sun + cloud (barometric)
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <path d="M9 3.5 L9 5 M9 13 L9 14.5 M3.5 9 L5 9 M14.5 9 L13 9 M5 5 L6 6 M13 13 L12 12 M5 13 L6 12 M13 5 L12 6" />
      <path d="M11 17 C 11 15.3, 12.3 14, 14 14 C 15.5 14, 16.7 15, 17 16.3 C 18.7 16.5, 20 17.8, 20 19.3 C 20 20.8, 18.8 22, 17.3 22 L 12.3 22 C 10.5 22, 9 20.5, 9 18.7 C 9 17, 10.4 16, 11 17 Z" transform="translate(0 -2)" />
    </svg>
  ),

  // ── Medical / Care ─────────────────────────────────────────
  ehr: (
    // Document with caduceus tick
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3.5 L15 3.5 L19 7.5 L19 20.5 L6 20.5 Z" />
      <path d="M15 3.5 L15 7.5 L19 7.5" />
      <path d="M9.5 13 L11 14.5 L14.5 11" />
    </svg>
  ),
  vet: (
    // Paw
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <ellipse cx="7" cy="9" rx="1.6" ry="2.2" />
      <ellipse cx="12" cy="7.5" rx="1.6" ry="2.2" />
      <ellipse cx="17" cy="9" rx="1.6" ry="2.2" />
      <ellipse cx="5" cy="13.5" rx="1.4" ry="1.8" />
      <ellipse cx="19" cy="13.5" rx="1.4" ry="1.8" />
      <path d="M12 11 C 9.5 11, 7.5 13, 7.5 15.5 C 7.5 17.5, 9 19, 10.5 19 C 11.2 19, 11.5 18.5, 12 18.5 C 12.5 18.5, 12.8 19, 13.5 19 C 15 19, 16.5 17.5, 16.5 15.5 C 16.5 13, 14.5 11, 12 11 Z" />
    </svg>
  ),

  // ── Generic fallback ───────────────────────────────────────
  generic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="7.5" opacity="0.4" />
    </svg>
  ),
};

// Map a source NAME (string) to a glyph key. Substring match — order matters
// (more specific tokens first).
function logoFor(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("oura")) return "oura";
  if (n.includes("apple watch") || n.includes("watch")) return "appleWatch";
  if (n.includes("withings")) return "withings";
  if (n.includes("apple health")) return "appleHealth";
  if (n.includes("cycle")) return "cycle";
  if (n.includes("outlook")) return "outlook";
  if (n.includes("google cal")) return "googleCal";
  if (n.includes("icloud")) return "icloud";
  if (n.includes("care-team") || n.includes("care team")) return "careTeam";
  if (n.includes("gmail")) return "gmail";
  if (n.includes("imessage") || n.includes("sms")) return "imessage";
  if (n.includes("tripit")) return "tripit";
  if (n.includes("united") || n.includes("lufthansa") || n.includes("airline") || n.includes("travel apps")) return "airline";
  if (n.includes("climate") || n.includes("barometric") || n.includes("tomorrow")) return "weather";
  if (n.includes("ehr") || n.includes("specialist")) return "ehr";
  if (n.includes("vet") || n.includes("dog")) return "vet";
  if (n.includes("work email") || n.includes("email")) return "gmail";
  return "generic";
}

// Group buckets — order is the rendering order.
const SOURCE_GROUPS = [
  { id: "body",     label: "Body",          kinds: ["wearable", "health"] },
  { id: "calendar", label: "Calendars",     kinds: ["calendar"] },
  { id: "comms",    label: "Communication", kinds: ["email", "behavioral"] },
  { id: "travel",   label: "Travel + env.", kinds: ["travel"] },
  { id: "care",     label: "Medical",       kinds: ["care"] },
];

window.SourceLogos = SourceLogos;
window.logoFor = logoFor;
window.SOURCE_GROUPS = SOURCE_GROUPS;
