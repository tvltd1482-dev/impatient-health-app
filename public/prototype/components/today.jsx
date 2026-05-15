// Today page — persona-driven. Same engine, three lives.

const TodayPage = () => {
  const personaId = (window.__activePersona || "renee");
  const p = window.PERSONAS[personaId] || window.PERSONAS.renee;

  return (
    <div className="page">
      {/* Persona banner */}
      <div className="persona-banner">
        <div className="persona-banner-left">
          <div className="persona-tier mono">{p.tier} · {p.archetype}</div>
          <div className="persona-name">{p.name}, {p.age} · {p.locationStr}</div>
          <div className="persona-role"><ConditionsText>{p.role}</ConditionsText></div>
        </div>
        <div className="persona-banner-right">
          <div className="persona-blurb"><ConditionsText>{p.blurb}</ConditionsText></div>
        </div>
      </div>

      <div className="aura-hero aura-on">
        <AuraHalo />
        <div className="page-head">
          <div>
            <div className="eyebrow">Today</div>
            <h1 className="page-title">
              {p.greeting} <em>{p.greetingEm}</em>
            </h1>
            {p.heroLine && <p className="page-lede-hero"><ConditionsText>{p.heroLine}</ConditionsText></p>}
            <LedeCollapsible text={p.lede} />
          </div>
          <div className="page-meta">
            <div className="page-meta-label">{p.metaLabel}</div>
            <div className="page-meta-value">{p.metaValue}</div>
          </div>
        </div>
      </div>

      {/* Clinical asking card — only when at a clinical location and we haven't resolved who-it's-for yet */}
      {p.location?.clinical && <LocationCard loc={p.location} personaName={p.name} />}

      {/* Atmospheric weather hero — primary signal class made visible.
          Replaces the old text-only LocationCard for non-clinical contexts. */}
      {p.weather && <WeatherHero weather={p.weather} persona={p} />}

      {/* Hero prediction — only Grayson gets the full predictive card; Bella gets a softer one; Harlow gets a discovery card */}
      <div style={{ marginTop: 16 }}>
        <PersonaHero persona={p} />
      </div>

      {/* Sources — grouped, glyphed, with active-contributors highlighted */}
      <SourcesStrip persona={p} />

      <div className="section-divider">
        <span className="label">Biometrics · last 14d vs your baseline</span>
        <span className="line" />
      </div>

      <div className="today-grid">
        {p.biometrics.map((b, i) => (
          <Stat key={i} {...b} sparkColor={b.color} />
        ))}
      </div>

      <div className="section-divider">
        <span className="label">{p.tier === "Free" ? "Last seven days · weighted by what your body did" : "Today · weighted by physiological cost"}</span>
        <span className="line" />
      </div>

      <div className="today-split">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">{p.scheduleTitle}</div>
              <div className="card-sub" style={{ marginTop: 4 }}>{p.scheduleSub}</div>
            </div>
            <div className="card-sub">{p.scheduleMeta}</div>
          </div>
          {p.schedule.map((e, i) => (
            <div key={i} className="schedule-event">
              <div>
                <div className="schedule-time">{e.t}</div>
                <div className="schedule-time-end">{e.end}</div>
              </div>
              <div>
                <div className="schedule-title">{e.title}</div>
                <div className="schedule-source mono">{e.source}</div>
                <div className="schedule-sub">{e.why}</div>
              </div>
              <div className="schedule-impact">
                <span className={"impact-dot " + e.impact} />
                <span className="impact-label">{e.impact}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="col" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-head">
              <div className="card-title">Active correlations</div>
              <div className="card-sub">your evidence</div>
            </div>
            <div className="corr-list">
              {p.correlations.map((c, i) => (
                <div key={i} className={"corr-row" + (c.hero ? " hero" : "") + (c.locked ? " locked" : "")}>
                  <div className="corr-pair">
                    {c.a} <em>↔</em> {c.b}
                  </div>
                  <div className="corr-strength">
                    {c.r !== null && (
                      <>
                        <div className="corr-strength-bar">
                          <div className="corr-strength-fill" style={{ width: `${c.r * 100}%` }} />
                        </div>
                        <div className="corr-strength-num">r={c.r.toFixed(2)}</div>
                      </>
                    )}
                    {c.r === null && <div className="corr-strength-num" style={{ color: "var(--brand-soft)" }}>—</div>}
                  </div>
                  {c.note && <div className="corr-note">{c.note}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title">Coach</div>
              <div className="card-sub">based on today</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {p.coachSuggestions.map((s, i) => (
                <CoachSuggestion key={i} text={s.text} tag={s.tag} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider">
        <span className="label">Behavioral signals · indexed</span>
        <span className="line" />
      </div>

      <div className="grid grid-3">
        {p.behavioral.map((b, i) => (
          <Stat key={i} {...b} />
        ))}
      </div>
    </div>
  );
};

// Persona-specific hero — different stakes, different language
const PersonaHero = ({ persona }) => {
  if (persona.id === "renee") return <ReneeHero />;
  if (persona.id === "simone") return <SimoneHero />;
  if (persona.id === "kezia") return <KeziaHero />;
  return null;
};

const ReneeHero = () => (
  <div className="card prediction">
    <div className="prediction-head">
      <div>
        <div className="eyebrow" style={{ color: "var(--flare)" }}>● Prediction · 81% confidence · 96h window</div>
        <h2 className="prediction-title">
          Thursday is asking for <em>a decision</em>.
        </h2>
        <p className="prediction-sub">
          14 comparable weeks indexed. Three factors stacking. Acted on now, this is a near-miss. Acted on Wednesday, this is a 3–5 day relapse.
        </p>
      </div>
      <div className="prediction-window">
        <div className="page-meta-label">Window</div>
        <div className="prediction-window-time mono">Thu · 14:00–18:00 CET</div>
        <div className="prediction-window-sub">≈ 96h out</div>
      </div>
    </div>
    <div className="prediction-signals">
      <SignalRow label="MCAS environment" detail="Hôtel Beau-Rivage — reaction logged Oct 14" value="Geneva, Tue" weight={0.34} color="var(--flare)" />
      <SignalRow label="Sleep deficit" detail="Accumulated since last Wed · architecture compromised" value="−6h 12m" weight={0.31} color="var(--flare)" />
      <SignalRow label="Cognitive load" detail="9 consecutive days above your personal threshold (78)" value="92/100" weight={0.35} color="var(--warn)" />
    </div>
    <div className="prediction-foot">
      <div className="prediction-foot-left">
        <span className="pill calm">3 adjustments queued by agent</span>
        <span className="pill">Philippa briefed</span>
        <span className="pill">Dr. Marsh on standby</span>
      </div>
      <div className="prediction-foot-right">
        <button className="btn btn-ghost">Review one-by-one</button>
        <button className="btn btn-primary">Approve all 3 →</button>
      </div>
    </div>
  </div>
);

const SimoneHero = () => (
  <div className="card prediction">
    <div className="prediction-head">
      <div>
        <div className="eyebrow" style={{ color: "var(--warn)" }}>● Pattern match · launch-week signature · 0.84</div>
        <h2 className="prediction-title">
          Your body is <em>already in launch week</em>.
        </h2>
        <p className="prediction-sub">
          Same shape as last November. Same shape as last May. The good news: you have your own protocol now. We've drafted three moves that worked last time.
        </p>
      </div>
      <div className="prediction-window">
        <div className="page-meta-label">Pattern</div>
        <div className="prediction-window-time mono">launch week #4</div>
        <div className="prediction-window-sub">since you joined</div>
      </div>
    </div>
    <div className="prediction-signals">
      <SignalRow label="Meeting density" detail="8.5h today, 7+ all week" value="+38%" weight={0.42} color="var(--warn)" />
      <SignalRow label="Cycle phase" detail="Day 24 — luteal, symptom-prone" value="day 24/28" weight={0.28} color="var(--brand)" />
      <SignalRow label="Standing time" detail="Already over POTS threshold by lunch" value="6h 12m" weight={0.30} color="var(--warn)" />
    </div>
    <div className="prediction-foot">
      <div className="prediction-foot-left">
        <span className="pill calm">Your protocol · proven 3×</span>
        <span className="pill">184 days since last collapse</span>
      </div>
      <div className="prediction-foot-right">
        <button className="btn btn-ghost">Skip</button>
        <button className="btn btn-primary">Use the protocol →</button>
      </div>
    </div>
  </div>
);

const KeziaHero = () => (
  <div className="card prediction" style={{ borderColor: "var(--line-2)" }}>
    <div className="prediction-head">
      <div>
        <div className="eyebrow" style={{ color: "var(--brand)" }}>● Discovery · your first pattern</div>
        <h2 className="prediction-title">
          Your resting heart rate <em>knows it's Sunday</em>.
        </h2>
        <p className="prediction-sub">
          Every Sunday evening for the last four weeks, +6 bpm. Not dramatic. Consistent. Your watch has been logging this for months. Nobody read it back to you until now.
        </p>
      </div>
      <div className="prediction-window">
        <div className="page-meta-label">Pattern strength</div>
        <div className="prediction-window-time mono">4 / 4 Sundays</div>
        <div className="prediction-window-sub">since you started</div>
      </div>
    </div>
    <div className="prediction-signals">
      <SignalRow label="Sunday evening RHR" detail="Consistently +6 bpm above your personal baseline" value="+6 bpm" weight={0.55} color="var(--warn)" />
      <SignalRow label="Standing days" detail="School-day standing >5h followed by hard nights" value="4 of 7" weight={0.45} color="var(--brand)" />
    </div>
    <div className="prediction-foot">
      <div className="prediction-foot-left">
        <span className="pill calm">7-day view · your free tier</span>
        <span className="pill" style={{ background: "var(--line-1)" }}>Connect calendar to see why →</span>
      </div>
      <div className="prediction-foot-right">
        <button className="btn btn-ghost">Maybe later</button>
        <button className="btn btn-primary">See the rest →</button>
      </div>
    </div>
  </div>
);

const CoachSuggestion = ({ text, tag }) => (
  <div className="coach-suggestion">
    <div className="coach-tag mono">{tag}</div>
    <div className="coach-text">{text}</div>
    <div className="coach-actions">
      <button className="btn btn-ghost" style={{ fontSize: 12, padding: "4px 8px" }}>Skip</button>
      <button className="btn" style={{ fontSize: 12, padding: "4px 8px" }}>Apply</button>
    </div>
  </div>
);

// Location — clinical-setting protocol only. Non-clinical contexts are
// covered by WeatherHero (atmospheric) — no more "Ambient" pill.
const LocationCard = ({ loc, personaName }) => {
  const [mode, setMode] = React.useState("asking");

  if (!loc.clinical) return null;

  if (mode === "asking") {
    return (
      <div className="location-card clinical">
        <div className="location-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 14s-5-3-5-7a5 5 0 0110 0c0 4-5 7-5 7z" />
            <circle cx="8" cy="7" r="2" />
          </svg>
        </div>
        <div className="location-body">
          <div className="location-eyebrow mono">● Clinical setting · biomarkers responding</div>
          <div className="location-where">{loc.label}</div>
          <div className="location-detail">
            Your HR is +14bpm and your HRV is dropping. The engine recognized a clinical setting before you walked in. Before I assume — <em>whose appointment is this?</em>
          </div>
          <div className="location-actions">
            <button className="btn" onClick={() => setMode("self")}>Mine</button>
            <button className="btn btn-primary" onClick={() => setMode("caregiver")}>It's {loc.who?.split(" ")[0] || "someone else"}'s</button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "caregiver") {
    return (
      <div className="location-card caregiver">
        <div className="location-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 14s-5-3-5-7a5 5 0 0110 0c0 4-5 7-5 7z" />
            <circle cx="8" cy="7" r="2" />
          </svg>
        </div>
        <div className="location-body">
          <div className="location-eyebrow mono" style={{ color: "var(--pulse)" }}>● Caregiver mode · {loc.who}</div>
          <div className="location-where">{loc.label}</div>
          <div className="location-detail">
            Your distress is empathic, not personal. Today's biomarker readings will be tagged separately so they don't pollute your baseline. I've queued: a post-visit summary template for Imani's chart, a refill check on her ondansetron (3 doses left), and the question for Dr. Patel you wrote down on Tuesday and forgot. Want to bring it up before you leave?
          </div>
          <div className="location-actions">
            <button className="btn btn-ghost" onClick={() => setMode("asking")}>Reset</button>
            <button className="btn">View Imani's queue</button>
            <button className="btn btn-primary">Show me the question</button>
          </div>
        </div>
      </div>
    );
  }

  // Self mode — small confirmation strip
  return (
    <div className="location-card clinical-self">
      <div className="location-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 14s-5-3-5-7a5 5 0 0110 0c0 4-5 7-5 7z" />
          <circle cx="8" cy="7" r="2" />
        </svg>
      </div>
      <div className="location-body-row">
        <div>
          <div className="location-where">{loc.label}</div>
          <div className="location-detail-inline">Your appointment · context loaded</div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Sources strip — grouped, glyphed, contributing-to-today aware.
// Replaces the old flat green-dot wall.
// ─────────────────────────────────────────────────────────────
const SourcesStrip = ({ persona }) => {
  const groups = window.SOURCE_GROUPS || [];
  const inputs = persona.inputs || [];
  const onCount = inputs.filter(i => i.on).length;
  const totalCount = inputs.length;

  // Heuristic: which sources actively contribute to today's read, and at
  // what *signal weight*? High-weight contributors carry warm color (the
  // signal is loud — the data is doing real work today). Baseline
  // contributors stay cool — present, useful, but not driving the call.
  const contribByPersona = {
    renee: {
      "Oura Ring": "high",
      "Apple Watch Ultra": "high",
      "Withings BP + Body+": "baseline",
      "Outlook (work)": "high",
      "Care-team calendar": "baseline",
      "TripIt + United + Lufthansa + UA Club": "high",
      "Climate + barometric (Tomorrow.io)": "high",
      "iMessage / SMS volume": "baseline",
      "Specialist EHR (×6)": "baseline",
    },
    simone: {
      "Oura Ring": "high",
      "Apple Health": "baseline",
      "Google Calendar (work)": "high",
      "iCloud Calendar (family)": "baseline",
      "Cycle tracker": "high",
    },
    kezia: {
      "Apple Watch": "high",
      "Apple Health": "baseline",
    },
  };
  const contribMap = contribByPersona[persona.id] || {};
  const contribSet = new Set(Object.keys(contribMap));
  const contribOn = inputs.filter(i => i.on && contribSet.has(i.name)).length;

  // Group inputs by SOURCE_GROUPS kinds
  const byGroup = groups.map(g => ({
    ...g,
    items: inputs.filter(i => g.kinds.includes(i.kind)),
  })).filter(g => g.items.length > 0);

  return (
    <div className="sources-strip">
      <div className="sources-head">
        <div className="sources-label mono">Sources · {onCount}/{totalCount} connected</div>
        <div className="sources-meta mono">
          <span className="sources-meta-dot" />
          {contribOn} feeding today's read
          <span className="sources-sync">· synced 2m ago</span>
        </div>
      </div>
      <div className="sources-groups">
        {byGroup.map(g => (
          <div key={g.id} className="sources-group">
            <div className="sources-group-label mono">{g.label}</div>
            <div className="sources-group-items">
              {g.items.map((inp, i) => {
                const isContributing = inp.on && contribSet.has(inp.name);
                const weight = contribMap[inp.name]; // 'high' | 'baseline' | undefined
                const cls = "src-chip"
                  + (inp.on ? " on" : " off")
                  + (isContributing ? " contributing" : "")
                  + (weight === "high" ? " weight-high" : "")
                  + (weight === "baseline" ? " weight-baseline" : "");
                const glyphKey = (window.logoFor || (() => "generic"))(inp.name);
                const Glyph = (window.SourceLogos || {})[glyphKey] || (window.SourceLogos || {}).generic;
                return (
                  <div key={i} className={cls} title={isContributing ? "Feeding today's prediction" : (inp.on ? "Connected" : "Not connected · " + (inp.note || "upgrade"))}>
                    <span className="src-chip-glyph">{Glyph}</span>
                    <span className="src-chip-name">{inp.name}</span>
                    {!inp.on && inp.note && (
                      <span className="src-chip-note">{inp.note}</span>
                    )}
                    {isContributing && <span className="src-chip-pulse" aria-hidden />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { TodayPage, SourcesStrip });

// Collapsible lede — keeps Today light. Hero line above; full reasoning a tap away.
function LedeCollapsible({ text }) {
  const [open, setOpen] = React.useState(false);
  if (!text) return null;
  return (
    <div className="lede-wrap">
      <button
        type="button"
        className={"page-lede-toggle" + (open ? " is-open" : "")}
        onClick={() => setOpen(o => !o)}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M3 2 L7 5 L3 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {open ? "Hide reasoning" : "Why I'm seeing this"}
      </button>
      <div className={"page-lede-collapse" + (open ? " is-open" : "")}>
        <div>
          <p className="page-lede"><ConditionsText>{text}</ConditionsText></p>
        </div>
      </div>
    </div>
  );
}
window.LedeCollapsible = LedeCollapsible;
