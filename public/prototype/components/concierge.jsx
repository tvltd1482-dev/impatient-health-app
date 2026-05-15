// Appointment Concierge — pre · during · post · open-loops · doctor-side · emergency.
// "A concierge on both sides" — same data, different framing for patient vs physician.

const ConciergePage = () => {
  const personaId = window.__activePersona || "renee";
  const p = window.PERSONAS[personaId] || window.PERSONAS.renee;
  const data = window.CONCIERGE_DATA[personaId] || window.CONCIERGE_DATA.renee;
  const lib = window.CONCIERGE_LIBRARY;

  const [phase, setPhase] = React.useState("pre"); // pre / during / post / doctor / emergency
  const [activeType, setActiveType] = React.useState("bloodwork");
  const [emergencyMode, setEmergencyMode] = React.useState(false);
  // When the user requests the Doctor's-side brief, we pause for a beat
  // and play the AuraLoader. This is intentional: the generation moment
  // is the product's "soul" — pulling 14 days of signals into a 4-line
  // recipient-framed read. We make it feel earned.
  const [generating, setGenerating] = React.useState(false);

  function gotoPhase(next) {
    if (next === "doctor" && phase !== "doctor") {
      setGenerating(true);
      // The loader's onDone fires after durationMs and flips us in.
    } else {
      setPhase(next);
    }
  }

  const bw = data.bloodworkFull;

  return (
    <div className="page concierge">
      <div className="aura-hero aura-on">
        <AuraHalo />
        <div className="page-head">
          <div>
            <div className="eyebrow">Appointment Concierge</div>
            <h1 className="page-title">
              Before · during · after. <em>The visit, held for both of you.</em>
            </h1>
            <p className="page-lede">
              Cortisol spikes the moment you walk into a clinic. Your heart rate climbs eighteen beats. Your working memory narrows. The doctor reads a body that isn't your baseline — and the next appointment is six months away. iMpatient holds the context for both sides. Calm before. Grounded during. Followed-through after.
            </p>
          </div>
          <div className="page-meta">
            <div className="page-meta-label">{p.tier} · {p.name}</div>
            <div className="page-meta-value">2 upcoming · 5 protocols · agentic execution {p.tier === "Pro" ? "ON" : "available at Pro"}</div>
          </div>
        </div>
      </div>

      {/* Library strip — the 5 appointment types */}
      <div className="section-divider">
        <span className="label">Library · five protocols, one engine</span>
        <span className="line" />
      </div>

      <div className="library-strip">
        {Object.values(lib).map(t => (
          <button
            key={t.id}
            className={"library-tile" + (activeType === t.id ? " active" : "")}
            onClick={() => setActiveType(t.id)}
          >
            <div className="library-tile-head">
              <ApptIcon name={t.icon} />
              <div className="library-tile-dur mono">{t.duration}</div>
            </div>
            <div className="library-tile-name">{t.label}</div>
            <div className="library-tile-desc">{t.desc}</div>
            <div className="library-tile-typical mono">
              {t.typical.slice(0, 2).join(" · ")}
            </div>
          </button>
        ))}
      </div>

      {/* Upcoming list */}
      <div className="section-divider">
        <span className="label">Upcoming · staged by the agent</span>
        <span className="line" />
      </div>

      <div className="upcoming-list">
        {data.upcoming.map(u => (
          <div key={u.id} className={"upcoming-row" + (u.type === "bloodwork" ? " is-anchor" : "")}>
            <div className="upcoming-when">
              <div className="upcoming-when-day mono">{u.when.split(" · ")[0]}</div>
              <div className="upcoming-when-time mono">{u.when.split(" · ")[1]}</div>
            </div>
            <div className="upcoming-body">
              <div className="upcoming-row-head">
                <span className="upcoming-type mono">{lib[u.type]?.label}</span>
                {u.fasting && <span className="pill" style={{ background: "var(--warn-bg)", color: "var(--warn)", borderColor: "var(--warn-dim)" }}>fasting · 12h</span>}
                {u.type === "bloodwork" && <span className="pill calm">protocol active</span>}
              </div>
              <div className="upcoming-where">{u.whenDetail}</div>
              <div className="upcoming-provider mono">{u.provider}</div>
              <div className="upcoming-order">{u.order}</div>
            </div>
            <div className="upcoming-cta">
              {u.type === "bloodwork" ? (
                <span className="upcoming-anchor-tag mono">— anchored below · live</span>
              ) : (
                <button className="btn btn-ghost">Open protocol</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Emergency strip — gentle until activated */}
      <div className="emergency-strip">
        <div className="emergency-strip-left">
          <div className="emergency-strip-icon">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 1.5L1.5 13.5h13L8 1.5z" />
              <path d="M8 6v3" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <div className="emergency-strip-title">Emergency / urgent-care protocol</div>
            <div className="emergency-strip-sub">Triggers automatically when location class detects an ED, urgent care, or hospital admission. ICE contacts notified · physicians informed · ambient recording · discharge-notes requested · 14-day follow-through.</div>
          </div>
        </div>
        <button className="btn btn-ghost" onClick={() => setEmergencyMode(!emergencyMode)}>
          {emergencyMode ? "Hide simulation" : "Show what activates"}
        </button>
      </div>

      {emergencyMode && <EmergencyView />}

      {/* Phase tabs — anchored on the bloodwork */}
      <div className="section-divider">
        <span className="label">Wednesday's draw · the protocol in three motions</span>
        <span className="line" />
      </div>

      <div className="phase-tabs">
        {[
          { id: "pre", label: "Before · 36h" },
          { id: "during", label: "During · the room" },
          { id: "post", label: "After · open loops" },
          { id: "doctor", label: "Doctor's side" },
        ].map(t => (
          <button key={t.id} className={"phase-tab" + (phase === t.id ? " on" : "")} onClick={() => gotoPhase(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {generating && (
        <AuraLoader
          message="Composing the brief for Dr. Marsh."
          submessage="Reading 14 days of signals · framing for a recipient · 4 lines, no chart-dump."
          durationMs={2600}
          onDone={() => { setGenerating(false); setPhase("doctor"); }}
        />
      )}

      {phase === "pre" && <PrePhase data={bw.preHeads} />}
      {phase === "during" && <DuringPhase data={bw.during} />}
      {phase === "post" && <PostPhase data={bw.post} />}
      {phase === "doctor" && !generating && <DoctorSide data={bw.doctorSide} />}
    </div>
  );
};

// ============================================================================

const PrePhase = ({ data }) => (
  <div className="phase-body">
    <div className="phase-head">
      <div>
        <div className="eyebrow">{data.title}</div>
        <div className="phase-sub">{data.sub}</div>
      </div>
    </div>

    <div className="phase-grid-pre">
      {/* Body read */}
      <div className="card">
        <div className="card-head">
          <div>
            <div className="card-title">{data.bodyRead.headline}</div>
            <div className="card-sub" style={{ marginTop: 6, maxWidth: "60ch", lineHeight: 1.55 }}>
              {data.bodyRead.detail}
            </div>
          </div>
        </div>
        <div className="markers-row">
          {data.bodyRead.markers.map((m, i) => (
            <div key={i} className="marker-tile">
              <div className="marker-label mono">{m.label}</div>
              <div className="marker-value mono tnum">{m.value}</div>
              <div className="marker-base mono">baseline {m.baseline}</div>
              <div className="marker-delta mono">{m.delta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent's draft note to doctor */}
      <div className="card draft-note">
        <div className="card-head">
          <div>
            <div className="eyebrow" style={{ color: "var(--pulse)" }}>● Drafted · awaiting your approval</div>
            <div className="card-title" style={{ marginTop: 6 }}>To {data.agentNote.to}</div>
          </div>
          <div className="page-meta-label">{data.agentNote.status}</div>
        </div>
        <div className="draft-note-meta mono">re: {data.agentNote.subject}</div>
        <pre className="draft-note-body">{data.agentNote.body}</pre>
        <div className="draft-note-actions">
          <button className="btn btn-ghost">Edit</button>
          <button className="btn">Send Wed AM</button>
          <button className="btn btn-primary">Approve · send now</button>
        </div>
      </div>
    </div>

    {/* Fasting timeline */}
    <div className="card" style={{ marginTop: 16 }}>
      <div className="card-head">
        <div>
          <div className="card-title">Fasting window · staged in your calendar</div>
          <div className="card-sub" style={{ marginTop: 4 }}>
            {data.fasting.start} → {data.fasting.end} · auto-held · meals you had Tuesday remain on schedule
          </div>
        </div>
        <span className="pill calm">on calendar</span>
      </div>
      <div className="fasting-timeline">
        {data.fasting.reminders.map((r, i) => (
          <div key={i} className="fasting-step">
            <div className="fasting-when mono">{r.when}</div>
            <div className="fasting-line">
              <div className="fasting-dot" />
              {i < data.fasting.reminders.length - 1 && <div className="fasting-segment" />}
            </div>
            <div className="fasting-text">{r.text}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Two columns: carry list + user brief */}
    <div className="phase-grid-2col" style={{ marginTop: 16 }}>
      <div className="card">
        <div className="card-head">
          <div>
            <div className="card-title">What's coming with you</div>
            <div className="card-sub" style={{ marginTop: 4 }}>checked Mon · re-checked Wed 06:00</div>
          </div>
        </div>
        <div className="carry-list">
          {data.carry.map((c, i) => (
            <div key={i} className="carry-row">
              <div className="carry-check">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,8 7,12 13,4" />
                </svg>
              </div>
              <div className="carry-item">{c.item}</div>
              <div className="carry-status mono">{c.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <div className="card-title">{data.userBrief.title}</div>
            <div className="card-sub" style={{ marginTop: 4 }}>written by you, between Tuesday and Sunday · surfaced when you arrive</div>
          </div>
        </div>
        <div className="brief-list">
          {data.userBrief.items.map((b, i) => (
            <div key={i} className="brief-row">
              <div className="brief-tag mono">{b.tag}</div>
              <div className="brief-text">{b.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================

const DuringPhase = ({ data }) => (
  <div className="phase-body">
    <div className="phase-head">
      <div>
        <div className="eyebrow">{data.title}</div>
        <div className="phase-sub">{data.sub}</div>
      </div>
    </div>

    <div className="during-layout">
      {/* Phone-mockup card showing the live read */}
      <div className="phone-frame">
        <div className="phone-bezel">
          <div className="phone-screen">
            <div className="phone-status mono">
              <span>07:34</span>
              <span>●●●●●  5G  100</span>
            </div>
            <div className="phone-content">
              <div className="phone-eyebrow mono">● iMpatient · live read</div>
              <div className="phone-headline">{data.liveRead.headline}</div>
              <div className="phone-detail">{data.liveRead.detail}</div>
              <div className="phone-tone-quote">{data.liveRead.tone}</div>
              <div className="phone-metrics">
                {data.liveRead.metrics.map((m, i) => (
                  <div key={i} className={"phone-metric state-" + m.state}>
                    <div className="phone-metric-label mono">{m.label}</div>
                    <div className="phone-metric-value mono tnum">{m.value}</div>
                    <div className="phone-metric-note">{m.note}</div>
                  </div>
                ))}
              </div>
              <div className="phone-recording">
                <div className="recording-dot" />
                <div>
                  <div className="recording-state mono">{data.ambientRecording.status}</div>
                  <div className="recording-consent">{data.ambientRecording.consent}</div>
                </div>
              </div>
              <div className="phone-share-row">
                <button className="btn btn-ghost" style={{ flex: 1 }}>I'm OK · dismiss</button>
                <button className="btn" style={{ flex: 1 }}>Show Dr. Marsh</button>
              </div>
            </div>
          </div>
        </div>
        <div className="phone-caption mono">phone lock-screen · the only view, glanceable</div>
      </div>

      {/* Side: prompts the user can lean on */}
      <div className="during-side">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">If you go blank — these are yours</div>
              <div className="card-sub" style={{ marginTop: 4 }}>tap any one. it stays on your phone, not the doctor's.</div>
            </div>
          </div>
          <div className="prompt-list">
            {data.prompts.map((pr, i) => (
              <div key={i} className="prompt-row">
                <div className="prompt-tag mono">{pr.tag}</div>
                <div className="prompt-text">{pr.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card recording-card">
          <div className="card-head">
            <div>
              <div className="card-title">On-device recording</div>
              <div className="card-sub" style={{ marginTop: 4, lineHeight: 1.55 }}>{data.ambientRecording.note}</div>
            </div>
            <span className="pill calm">running</span>
          </div>
          <div className="recording-sound">
            <RecordingWave />
          </div>
          <div className="recording-foot mono">14m 22s · 3.4 hr buffer · transcript local until you approve</div>
        </div>
      </div>
    </div>
  </div>
);

const RecordingWave = () => {
  const bars = Array.from({ length: 60 }, (_, i) => 0.2 + Math.abs(Math.sin(i * 0.7)) * 0.7 + Math.random() * 0.15);
  return (
    <div className="rec-wave">
      {bars.map((h, i) => (
        <div key={i} className="rec-bar" style={{ height: `${h * 100}%`, opacity: 0.4 + h * 0.6 }} />
      ))}
    </div>
  );
};

// ============================================================================

const PostPhase = ({ data }) => (
  <div className="phase-body">
    <div className="phase-head">
      <div>
        <div className="eyebrow">{data.title}</div>
        <div className="phase-sub">{data.sub}</div>
      </div>
    </div>

    {/* Hour 0 timeline */}
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">{data.immediate.title}</div>
          <div className="card-sub" style={{ marginTop: 4 }}>before you've even left the parking lot, the agent has already done four things.</div>
        </div>
      </div>
      <div className="hour-zero">
        {data.immediate.steps.map((s, i) => (
          <div key={i} className="hz-step">
            <div className="hz-time mono">{s.t}</div>
            <div className="hz-line">
              <div className={"hz-dot " + s.status} />
              {i < data.immediate.steps.length - 1 && <div className="hz-seg" />}
            </div>
            <div className="hz-text">{s.text}</div>
            <div className={"hz-state mono state-" + s.status}>{s.status}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Open loops — the hero of post */}
    <div className="card open-loops" style={{ marginTop: 16 }}>
      <div className="card-head">
        <div>
          <div className="eyebrow" style={{ color: "var(--pulse)" }}>● Open loops · agent watching</div>
          <div className="card-title" style={{ marginTop: 6 }}>{data.openLoops.title}</div>
          <div className="card-sub" style={{ marginTop: 4, maxWidth: "60ch", lineHeight: 1.55 }}>
            {data.openLoops.sub}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="page-meta-label">Active loops</div>
          <div style={{ fontSize: "var(--t-xl)", fontFamily: "var(--font-mono)", color: "var(--ink-9)" }}>{data.openLoops.rows.length}</div>
        </div>
      </div>
      <div className="loops-list">
        {data.openLoops.rows.map((r, i) => (
          <div key={i} className={"loop-row state-" + r.state}>
            <div className="loop-state-dot" />
            <div className="loop-body">
              <div className="loop-what">{r.what}</div>
              <div className="loop-meta mono">
                <span>owner · {r.owner}</span>
                <span className="meta-dot">·</span>
                <span>eta · {r.eta}</span>
              </div>
              <div className="loop-action">{r.action}</div>
            </div>
            <div className={"loop-state-tag mono state-" + r.state}>{r.state}</div>
          </div>
        ))}
      </div>
    </div>

    {/* The summary in three voices: patient, structured, wellbeing */}
    <div className="phase-grid-3col" style={{ marginTop: 16 }}>
      <div className="card summary-card">
        <div className="card-head">
          <div>
            <div className="eyebrow">In your language</div>
            <div className="card-title" style={{ marginTop: 6 }}>{data.summary.patient.title}</div>
          </div>
        </div>
        <p className="summary-prose">{data.summary.patient.body}</p>
      </div>

      <div className="card summary-card">
        <div className="card-head">
          <div>
            <div className="eyebrow">Structured</div>
            <div className="card-title" style={{ marginTop: 6 }}>{data.summary.structured.title}</div>
          </div>
        </div>
        <div className="structured-list">
          {data.summary.structured.sections.map((s, i) => (
            <div key={i} className="structured-section">
              <div className="structured-name mono">{s.name}</div>
              <ul className="structured-items">
                {s.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="card summary-card wellbeing-card">
        <div className="card-head">
          <div>
            <div className="eyebrow" style={{ color: "var(--calm)" }}>Wellbeing</div>
            <div className="card-title" style={{ marginTop: 6 }}>{data.summary.wellbeing.title}</div>
          </div>
        </div>
        <div className="wellbeing-list">
          <div className="wellbeing-row">
            <div className="wellbeing-when mono">now · 90 min</div>
            <div className="wellbeing-text">{data.summary.wellbeing.now}</div>
          </div>
          <div className="wellbeing-row">
            <div className="wellbeing-when mono">today</div>
            <div className="wellbeing-text">{data.summary.wellbeing.today}</div>
          </div>
          <div className="wellbeing-row">
            <div className="wellbeing-when mono">tomorrow</div>
            <div className="wellbeing-text">{data.summary.wellbeing.tomorrow}</div>
          </div>
          <div className="wellbeing-row">
            <div className="wellbeing-when mono">this week</div>
            <div className="wellbeing-text">{data.summary.wellbeing.week}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================

const DoctorSide = ({ data }) => (
  <div className="phase-body">
    <div className="phase-head">
      <div>
        <div className="eyebrow">Doctor's side · the same brief, recipient-framed</div>
        <div className="phase-sub">This is what Dr. Marsh sees in her inbox at 06:48 Tuesday morning, before she opens Grayson's chart for Wednesday's results.</div>
      </div>
    </div>

    <div className="doctor-frame">
      <div className="doctor-frame-top">
        <div className="doctor-frame-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 2v6M9 5h6M5 9c0 6 2 12 7 13 5-1 7-7 7-13H5z" />
          </svg>
        </div>
        <div>
          <div className="doctor-from">{data.format}</div>
          <div className="doctor-to mono">{data.recipient}</div>
        </div>
        <div className="doctor-meta mono">
          <div>sent {data.sentAt}</div>
          <div className="doctor-read">{data.readAt}</div>
        </div>
      </div>

      <div className="doctor-body">
        {data.sections.map((s, i) => (
          <div key={i} className="doctor-section">
            <div className="doctor-heading">{s.heading}</div>
            <p className="doctor-prose">{s.body}</p>
            {s.items && (
              <ul className="doctor-items">
                {s.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="doctor-foot">
        <div className="doctor-foot-cta">{data.cta}</div>
        <div className="doctor-foot-actions">
          <button className="btn btn-ghost">Reply to Grayson directly</button>
          <button className="btn">Open file (read-only · 14d)</button>
        </div>
      </div>
    </div>

    <div className="card" style={{ marginTop: 16, padding: 20 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>Why this works for the physician</div>
      <p style={{ color: "var(--ink-7)", lineHeight: 1.6, margin: 0, maxWidth: "70ch" }}>
        Dr. Marsh has 14 minutes per patient on a good day. The brief lets her arrive informed without re-reading the chart. The wearable trace is framed as <em>interpretability context</em>, not a request for action — so it doesn't add to her queue. The "what Grayson is asking from you" footer is a respect mechanism: the patient is asking for a precise thing, not a vague reassurance. Both sides walk in already aligned on the question. The visit gets to be the visit.
      </p>
    </div>
  </div>
);

// ============================================================================

const EmergencyView = () => {
  const e = window.EMERGENCY_PROTOCOL;
  return (
    <div className="card emergency-card">
      <div className="emergency-card-head">
        <div>
          <div className="eyebrow" style={{ color: "var(--flare)", letterSpacing: "0.16em" }}>● Emergency protocol · simulation view</div>
          <h2 className="emergency-title">When the location class becomes <em>"emergency department"</em>, this all happens.</h2>
          <p className="emergency-sub">{e.trigger}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="page-meta-label">Triggered</div>
          <div className="mono" style={{ fontSize: "var(--t-md)", color: "var(--ink-9)" }}>{e.triggeredAt}</div>
          <div className="mono" style={{ fontSize: "var(--t-xs)", color: "var(--flare)", marginTop: 2 }}>{e.facility}</div>
        </div>
      </div>

      <div className="phase-grid-2col" style={{ marginTop: 16 }}>
        <div>
          <div className="ice-block">
            <div className="ice-block-title mono">ICE contacts</div>
            {e.iceContacts.map((c, i) => (
              <div key={i} className="ice-row">
                <div>
                  <div className="ice-name">{c.name}</div>
                  <div className="ice-relation mono">{c.relation} · {c.phone}</div>
                </div>
                <div className="ice-status mono">{c.status}</div>
              </div>
            ))}
          </div>

          <div className="ice-block" style={{ marginTop: 12 }}>
            <div className="ice-block-title mono">Nominated physicians informed</div>
            {e.physicians.map((d, i) => (
              <div key={i} className="phys-row">
                <div>
                  <div className="phys-name">{d.name}</div>
                  <div className="phys-role mono">{d.role}</div>
                </div>
                <div className="phys-status mono">
                  {d.emailed && <span className="pill" style={{ background: "var(--pulse-bg)", color: "var(--pulse)", borderColor: "var(--pulse-dim)" }}>emailed</span>}
                  {d.paged && <span className="pill" style={{ background: "var(--flare-bg)", color: "var(--flare)", borderColor: "var(--flare-dim)" }}>paged</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="emerg-timeline">
          {e.steps.map((s, i) => (
            <div key={i} className={"emerg-step state-" + s.status}>
              <div className="emerg-time mono">{s.t}</div>
              <div className="emerg-line">
                <div className={"emerg-dot state-" + s.status} />
                {i < e.steps.length - 1 && <div className="emerg-seg" />}
              </div>
              <div className="emerg-body">
                <div className="emerg-title-row">
                  <div className="emerg-title-text">{s.title}</div>
                  <span className={"emerg-state-pill mono state-" + s.status}>{s.status}</span>
                </div>
                <div className="emerg-detail">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================

const ApptIcon = ({ name }) => {
  const props = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "drop":
      return <svg {...props}><path d="M12 2c-3 4-6 8-6 12a6 6 0 0012 0c0-4-3-8-6-12z" /></svg>;
    case "stethoscope":
      return <svg {...props}><path d="M5 4v5a4 4 0 008 0V4" /><path d="M9 14v3a4 4 0 008 0" /><circle cx="17" cy="10" r="2" /></svg>;
    case "scan":
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18M12 3v18" /></svg>;
    case "iv":
      return <svg {...props}><rect x="9" y="2" width="6" height="10" rx="1" /><path d="M12 12v8M9 16h6" /><path d="M12 4h2" /></svg>;
    case "procedure":
      return <svg {...props}><path d="M5 19l5-5 7-7 2 2-7 7-5 5z" /><path d="M14 6l4 4" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="9" /></svg>;
  }
};

Object.assign(window, { ConciergePage });
