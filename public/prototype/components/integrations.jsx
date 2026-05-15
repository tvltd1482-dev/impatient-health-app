/* eslint-disable no-undef */
/* Integrations — the connections directory.
   Architecture:
     - Persona's actual `inputs[]` is the source of truth for what's ON.
     - We layer a fuller catalog on top so the user sees the full surface
       of what iMpatient *could* read — even if their tier doesn't allow it.
     - Tier-gated rows are visible but locked, with the badge that names
       the required tier. This is intentional: scarcity is the path.

   Voice: each integration has a one-line voice description of WHAT it
   tells iMpatient, in plain language. Not "syncs sleep data" but "tells us
   when your nights start splintering before you feel it."
*/

const INTEGRATION_CATALOG = [
  // --- WEARABLES & HEALTH ---
  {
    group: "Wearables", id: "wearables",
    eyebrow: "Body signals",
    sub: "Continuous reads of HRV, sleep, heart rate, activity, temperature.",
    items: [
      { id: "apple-watch", name: "Apple Watch", brand: "Apple", role: "wearable",
        voice: "The continuous baseline. HRV, RHR, sleep stages, time on feet.", glyph: "watch" },
      { id: "oura", name: "Oura Ring", brand: "Oura", role: "wearable",
        voice: "Night-time precision. Body temperature, sleep architecture, readiness.", glyph: "ring" },
      { id: "whoop", name: "WHOOP", brand: "WHOOP", role: "wearable",
        voice: "Strain, recovery, respiratory rate — useful if you train.", glyph: "band" },
      { id: "withings-bp", name: "Withings BP / Body+", brand: "Withings", role: "wearable",
        voice: "Spot blood pressure and weight — calibrates the wearable view.", glyph: "cuff" },
      { id: "garmin", name: "Garmin", brand: "Garmin", role: "wearable",
        voice: "Endurance-grade sleep + variability data, longest battery on the market.", glyph: "watch" },
    ],
  },
  {
    group: "Health records", id: "health",
    eyebrow: "What your body knows",
    sub: "Steps, workouts, cycle, hearing exposure, mindfulness, lab results.",
    items: [
      { id: "apple-health", name: "Apple Health", brand: "Apple", role: "health",
        voice: "The aggregator. Pulls everything iOS already knows about you.", glyph: "heart" },
      { id: "google-fit", name: "Google Fit / Health Connect", brand: "Google", role: "health",
        voice: "Same role on Android — plus Samsung Health bridge.", glyph: "heart" },
      { id: "cycle", name: "Cycle tracker", brand: "Apple Health", role: "health",
        voice: "Hormonal phase as a known confounder. Crucial for menstruating users.", glyph: "moon" },
      { id: "fhir", name: "MyChart / FHIR records", brand: "Epic, Athena", role: "health",
        voice: "Your real lab history, prior to iMpatient. Becomes the longitudinal floor.", tier: "Essential", glyph: "doc" },
    ],
  },

  // --- CALENDARS ---
  {
    group: "Calendars", id: "calendars",
    eyebrow: "What you've committed to",
    sub: "We don't read content. We read what's ahead, how long, and where.",
    items: [
      { id: "apple-cal", name: "Apple Calendar", brand: "Apple", role: "calendar",
        voice: "Personal events, family logistics, recurring patterns.", tier: "Essential", glyph: "cal" },
      { id: "google-cal", name: "Google Calendar", brand: "Google", role: "calendar",
        voice: "Work meetings — start times, duration, in-person vs. remote.", tier: "Essential", glyph: "cal" },
      { id: "outlook", name: "Outlook", brand: "Microsoft", role: "calendar",
        voice: "Enterprise-grade work blocks. Travel attached. Conference rooms named.", tier: "Essential", glyph: "cal" },
      { id: "ical-family", name: "Family / shared calendars", brand: "iCloud, Cozi", role: "calendar",
        voice: "School pickups, kid handoffs, weekend logistics — the invisible standing time.", tier: "Essential", glyph: "cal" },
      { id: "care-team", name: "Care-team calendar", brand: "iMpatient", role: "calendar",
        voice: "Specialists, infusions, lab draws, follow-ups. Lives across providers.", tier: "Pro", glyph: "stethoscope" },
    ],
  },

  // --- COMMUNICATION ---
  {
    group: "Communication", id: "comms",
    eyebrow: "How much you're being asked",
    sub: "We never read content. We read the rate of demand on you — message volume, response latency, escalation.",
    items: [
      { id: "imessage", name: "iMessage / SMS", brand: "Apple", role: "behavioral",
        voice: "Volume only. Tells us when the world is asking a lot of you.", tier: "Pro", glyph: "msg" },
      { id: "gmail", name: "Gmail", brand: "Google", role: "email",
        voice: "Email pace and unanswered count — a quiet predictor of cognitive load.", tier: "Pro", glyph: "envelope" },
      { id: "outlook-mail", name: "Outlook Mail", brand: "Microsoft", role: "email",
        voice: "Same role on the work side. Read-only headers; never the body.", tier: "Pro", glyph: "envelope" },
      { id: "slack", name: "Slack", brand: "Slack", role: "behavioral",
        voice: "Mention rate, after-hours activity, channel demand. Optional.", tier: "Pro", glyph: "chat" },
    ],
  },

  // --- TRAVEL & ENVIRONMENT ---
  {
    group: "Travel & environment", id: "travel",
    eyebrow: "Where your body has to go",
    sub: "Flights, time-zone shifts, altitude, weather pressure, air quality.",
    items: [
      { id: "tripit", name: "TripIt", brand: "Concur", role: "travel",
        voice: "Flight legs, layovers, hotels — the canonical itinerary.", tier: "Pro", glyph: "plane" },
      { id: "united", name: "United / Lufthansa / Delta", brand: "Airlines", role: "travel",
        voice: "Direct from the airline — gate changes, delays, seat assignments.", tier: "Pro", glyph: "plane" },
      { id: "tomorrow", name: "Tomorrow.io climate", brand: "Tomorrow.io", role: "travel",
        voice: "Barometric pressure, AQI, allergens — the strongest non-self predictor we have.", tier: "Pro", glyph: "cloud" },
      { id: "city-air", name: "Local AQI + pollen", brand: "PurpleAir, Pollen.com", role: "travel",
        voice: "Fine-grained at-home reads when broad weather isn't enough.", tier: "Pro", glyph: "leaf" },
    ],
  },

  // --- MEDICAL ---
  {
    group: "Medical", id: "medical",
    eyebrow: "The clinical record",
    sub: "Lab results, imaging, prescriptions, prior visit notes — pulled into the record you control.",
    items: [
      { id: "labs", name: "Quest / LabCorp", brand: "Direct labs", role: "medical",
        voice: "Bloodwork results, ranges, longitudinal trends. Auto-imported.", tier: "Pro", glyph: "vial" },
      { id: "rx", name: "Pharmacy + e-prescribing", brand: "CVS, Walgreens, mail-order", role: "medical",
        voice: "Refills, adherence, interaction checks. Reads timing, not why.", tier: "Pro", glyph: "pill" },
      { id: "imaging", name: "Imaging archives", brand: "MRI, CT, ultrasound", role: "medical",
        voice: "DICOM access via your portals. Surfaced when relevant.", tier: "Pro", glyph: "scan" },
    ],
  },
];

const IntegrationsPage = () => {
  const personaId = (window.__activePersona || "renee");
  const p = window.PERSONAS[personaId] || window.PERSONAS.renee;

  // Build a lookup of what's currently ON for this persona, by name match.
  const onByName = React.useMemo(() => {
    const m = {};
    (p.inputs || []).forEach(i => {
      // Match anything that contains the integration's name (loose).
      m[i.name.toLowerCase()] = i.on;
    });
    return m;
  }, [p]);

  // Decide state for each catalog item.
  function statusFor(item) {
    const candidates = [
      item.name,
      item.name.split(" ")[0],
      item.brand,
    ].map(s => (s || "").toLowerCase());
    for (const k of Object.keys(onByName)) {
      if (candidates.some(c => k.includes(c)) || candidates.some(c => c.includes(k))) {
        return onByName[k] ? "connected" : "available";
      }
    }
    return "available";
  }

  const tierRank = { Free: 0, Essential: 1, Pro: 2 };
  function locked(item) {
    if (!item.tier) return false;
    return tierRank[p.tier] < tierRank[item.tier];
  }

  // Counts for the page meta
  const totals = INTEGRATION_CATALOG.reduce(
    (acc, g) => {
      g.items.forEach(it => {
        const s = statusFor(it);
        acc.total++;
        if (s === "connected") acc.connected++;
        if (locked(it)) acc.locked++;
      });
      return acc;
    },
    { total: 0, connected: 0, locked: 0 }
  );

  return (
    <div className="page integrations-page">
      <div className="aura-hero aura-on">
        <AuraHalo />
        <div className="page-head">
          <div>
            <div className="eyebrow">Integrations</div>
            <h1 className="page-title">
              The sources, <em>and what each one tells us.</em>
            </h1>
            <p className="page-lede-hero">
              We never read the content of your messages or email. We read what
              your body is being asked to do, and how it's responding. Each
              source below is described in those terms.
            </p>
          </div>
          <div className="page-meta">
            <div className="page-meta-label">{p.tier} · {p.name}</div>
            <div className="page-meta-value">{totals.connected} connected · {totals.total - totals.connected - totals.locked} available · {totals.locked} tier-locked</div>
          </div>
        </div>
      </div>

      {/* Privacy promise — sits above the catalog so the user reads it
          before any toggle. The frame matters more than the controls. */}
      <div className="integrations-promise">
        <div className="integrations-promise-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="11" width="14" height="9" rx="2"/>
            <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="integrations-promise-body">
          <div className="integrations-promise-eyebrow">Privacy promise</div>
          <p className="integrations-promise-text">
            iMpatient reads <em>signals</em>, not content. We see the volume and
            timing of your messages — never their text. We see the start and
            duration of meetings — never their notes. You can revoke any
            source at any moment, and the data exits with you.
          </p>
        </div>
        <a className="integrations-promise-link" href="#privacy">
          Read the promise <Chevron />
        </a>
      </div>

      {/* Each group */}
      {INTEGRATION_CATALOG.map(group => {
        const groupConnected = group.items.filter(i => statusFor(i) === "connected").length;
        return (
          <section key={group.id} className="integrations-group">
            <div className="integrations-group-head">
              <div>
                <div className="form-section-eyebrow">{group.eyebrow}</div>
                <h2 className="integrations-group-title">{group.group}</h2>
                <p className="integrations-group-sub">{group.sub}</p>
              </div>
              <div className="integrations-group-count">
                <span className="bright-accent">{groupConnected}</span>
                <span className="dim-meta"> / {group.items.length} connected</span>
              </div>
            </div>

            <div className="integrations-grid">
              {group.items.map(item => {
                const status = statusFor(item);
                const isLocked = locked(item);
                return (
                  <IntegrationCard
                    key={item.id}
                    item={item}
                    status={status}
                    locked={isLocked}
                  />
                );
              })}
            </div>
          </section>
        );
      })}

      <div className="integrations-footer">
        <p className="form-section-sub" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          Don't see something you use? <a href="#request" className="bright-accent" style={{ textDecoration: "none" }}>Tell us what to add.</a>
          {" "}We add 2–3 integrations per quarter, voted on by users.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// IntegrationCard
// ============================================================

function IntegrationCard({ item, status, locked }) {
  return (
    <div className={"integration-card status-" + status + (locked ? " locked" : "")}>
      <div className="integration-card-head">
        <div className="integration-glyph">
          <IntegrationGlyph kind={item.glyph} />
        </div>
        <div className="integration-card-status">
          {status === "connected" && (
            <span className="status-dot status-dot-on" />
          )}
          {status === "connected" ? (
            <span className="integration-status-label connected">Connected</span>
          ) : locked ? (
            <span className="integration-status-label locked">{item.tier}</span>
          ) : (
            <span className="integration-status-label">Available</span>
          )}
        </div>
      </div>

      <div className="integration-card-body">
        <h3 className="integration-name">{item.name}</h3>
        <div className="integration-brand">{item.brand}</div>
        <p className="integration-voice">{item.voice}</p>
      </div>

      <div className="integration-card-foot">
        {status === "connected" ? (
          <>
            <span className="integration-meta">Reading since {connectedSince(item.id)}</span>
            <button className="integration-action ghost">Manage</button>
          </>
        ) : locked ? (
          <>
            <span className="integration-meta">Requires {item.tier}</span>
            <button className="integration-action upgrade">Upgrade</button>
          </>
        ) : (
          <>
            <span className="integration-meta">Read-only · revoke anytime</span>
            <button className="integration-action primary">Connect</button>
          </>
        )}
      </div>
    </div>
  );
}

// Stable made-up "since" label per integration id, for connected state.
function connectedSince(id) {
  const m = {
    "apple-watch": "Mar 24",
    "oura": "Aug 24",
    "apple-health": "Mar 24",
    "google-cal": "Aug 24",
    "ical-family": "Aug 24",
    "outlook": "Mar 24",
    "cycle": "Aug 24",
    "withings-bp": "Sep 24",
    "tripit": "Sep 24",
    "united": "Sep 24",
    "tomorrow": "Oct 24",
    "imessage": "Oct 24",
    "gmail": "Sep 24",
    "outlook-mail": "Sep 24",
    "care-team": "Oct 24",
  };
  return m[id] || "this year";
}

// ============================================================
// Glyphs — a small library of mono-line icons matched to integrations.
// Each is a 24×24 viewBox, 1.6 stroke, currentColor — calm and cohesive.
// ============================================================

function IntegrationGlyph({ kind }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (kind) {
    case "watch":
      return (
        <svg {...props}>
          <rect x="7" y="6" width="10" height="12" rx="2.5"/>
          <path d="M9 6V3M15 6V3M9 21v-3M15 21v-3"/>
          <circle cx="12" cy="12" r="0.6" fill="currentColor"/>
        </svg>
      );
    case "ring":
      return <svg {...props}><ellipse cx="12" cy="12" rx="6" ry="4"/><path d="M9 8.5C10 6 14 6 15 8.5"/></svg>;
    case "band":
      return <svg {...props}><rect x="4" y="9" width="16" height="6" rx="3"/><path d="M9 12h6"/></svg>;
    case "cuff":
      return <svg {...props}><rect x="4" y="8" width="12" height="8" rx="2"/><path d="M16 12h4M8 12h0.01"/></svg>;
    case "heart":
      return <svg {...props}><path d="M12 19s-7-4.35-7-9a4 4 0 017-2.65A4 4 0 0119 10c0 4.65-7 9-7 9z"/></svg>;
    case "moon":
      return <svg {...props}><path d="M19 14a8 8 0 01-9-12 8 8 0 109 12z"/></svg>;
    case "doc":
      return <svg {...props}><path d="M7 4h7l4 4v12a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z"/><path d="M14 4v4h4"/></svg>;
    case "cal":
      return <svg {...props}><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M4 10h16M9 4v4M15 4v4"/></svg>;
    case "stethoscope":
      return <svg {...props}><path d="M6 4v6a4 4 0 008 0V4"/><path d="M10 14a4 4 0 008 0v-2"/><circle cx="18" cy="10" r="1.5"/></svg>;
    case "msg":
      return <svg {...props}><path d="M5 7a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-7l-4 3v-3H7a2 2 0 01-2-2V7z"/></svg>;
    case "envelope":
      return <svg {...props}><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 8l8 6 8-6"/></svg>;
    case "chat":
      return <svg {...props}><path d="M5 6a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2h-3l-3 4-3-4H7a2 2 0 01-2-2V6z"/></svg>;
    case "plane":
      return <svg {...props}><path d="M4 13l16-7-3 14-5-5-3 4-1-4-4-2z"/></svg>;
    case "cloud":
      return <svg {...props}><path d="M7 17a4 4 0 010-8 5 5 0 019.6-1.4A4 4 0 0117 17H7z"/></svg>;
    case "leaf":
      return <svg {...props}><path d="M5 19c0-7 5-13 14-14 0 9-6 14-14 14z"/><path d="M5 19l8-8"/></svg>;
    case "vial":
      return <svg {...props}><path d="M9 3h6M10 3v14a2 2 0 004 0V3"/><path d="M10 11h4"/></svg>;
    case "pill":
      return <svg {...props}><rect x="4" y="9" width="16" height="6" rx="3"/><path d="M12 9v6"/></svg>;
    case "scan":
      return <svg {...props}><path d="M5 9V6a1 1 0 011-1h3M19 9V6a1 1 0 00-1-1h-3M5 15v3a1 1 0 001 1h3M19 15v3a1 1 0 01-1 1h-3"/><path d="M5 12h14"/></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="6"/></svg>;
  }
}

Object.assign(window, { IntegrationsPage, INTEGRATION_CATALOG });
