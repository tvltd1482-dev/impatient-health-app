/* eslint-disable no-undef */
/* Profile — Withings-inspired form chrome on a navy aura backdrop.
   Goal: forms here are calm and dignified. The user is asked for very
   little, and each field is given room. The aura halo stays present
   above the avatar; everything below it is clean monochrome lines.
*/

const ProfilePage = () => {
  const personaId = (window.__activePersona || "renee");
  const p = window.PERSONAS[personaId] || window.PERSONAS.renee;

  // Local form state — pre-filled from persona, editable for demo.
  const [first, setFirst] = React.useState(p.name.split(" ")[0] || p.name);
  const [last, setLast]   = React.useState(p.name.split(" ").slice(1).join(" ") || "");
  const [dob, setDob]     = React.useState(profileDob(p.id));
  const [sex, setSex]     = React.useState("Female");
  const [heightFt, setHt] = React.useState(profileHt(p.id).ft);
  const [heightIn, setIn] = React.useState(profileHt(p.id).in);
  const [country, setCo]  = React.useState(profileCountry(p.id));
  const [units, setUnits] = React.useState("imperial");
  const [theme, setTheme] = React.useState("aura");

  return (
    <div className="page profile-page">
      <div className="aura-hero aura-on">
        <AuraHalo />
        <div className="page-head">
          <div>
            <div className="eyebrow">Profile</div>
            <h1 className="page-title">
              {first}, <em>this is your record.</em>
            </h1>
            <p className="page-lede-hero">
              The details that calibrate everything iMpatient sees about you.
            </p>
          </div>
          <div className="page-meta">
            <div className="page-meta-label">{p.tier} tier · {p.name}</div>
            <div className="page-meta-value">enrolled · {profileEnrolled(p.id)}</div>
          </div>
        </div>
      </div>

      <div className="form-shell-wide" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
        {/* LEFT: identity */}
        <div className="form-shell" style={{ maxWidth: "none" }}>
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-eyebrow">Identity</div>
              <h2 className="form-section-title">Who you are</h2>
              <p className="form-section-sub">
                Used to set normal ranges for your age and biology. Your
                privacy is, and always has been, our priority.
              </p>
            </div>

            <div className="avatar-block">
              <div className="avatar">{first[0]}{last[0]}</div>
              <div className="avatar-meta">
                <div className="avatar-name">{first} {last}</div>
                <div className="avatar-sub">{p.tier} · joined {profileEnrolled(p.id)}</div>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">First name</label>
                <input className="input" value={first} onChange={e => setFirst(e.target.value)} />
              </div>
              <div className="field">
                <label className="field-label">Last name</label>
                <input className="input" value={last} onChange={e => setLast(e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Date of birth</label>
              <select className="input-select" value={dob} onChange={e => setDob(e.target.value)}>
                <option>{dob}</option>
                <option>1 Jan 1970</option>
                <option>15 Mar 1985</option>
                <option>22 Jun 1992</option>
              </select>
            </div>

            <div className="field">
              <label className="field-label">Assigned sex</label>
              <select className="input-select" value={sex} onChange={e => setSex(e.target.value)}>
                <option>Female</option>
                <option>Male</option>
                <option>Intersex</option>
                <option>Prefer not to say</option>
              </select>
              <div className="field-help">Used for age-and-sex-adjusted lab ranges. You can override per-test in Settings.</div>
            </div>

            <div className="field">
              <label className="field-label">Height</label>
              <div className="field-row">
                <div className="input-with-unit">
                  <input className="input" type="number" value={heightFt} onChange={e => setHt(e.target.value)} />
                  <span className="input-unit">ft</span>
                </div>
                <div className="input-with-unit">
                  <input className="input" type="number" value={heightIn} onChange={e => setIn(e.target.value)} />
                  <span className="input-unit">in</span>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="field-label">Residency country</label>
              <select className="input-select" value={country} onChange={e => setCo(e.target.value)}>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Canada</option>
                <option>Switzerland</option>
                <option>Germany</option>
              </select>
              <div className="field-help">Determines which medical regulations apply to your data.</div>
            </div>
          </div>
        </div>

        {/* RIGHT: preferences + actions */}
        <div className="form-shell" style={{ maxWidth: "none" }}>
          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-eyebrow">Preferences</div>
              <h2 className="form-section-title">How you read iMpatient</h2>
              <p className="form-section-sub">
                Calm by default. You can change any of these whenever you want.
              </p>
            </div>

            <div className="field">
              <label className="field-label">Units</label>
              <div className="segmented" role="group">
                <button className={"segmented-btn" + (units === "imperial" ? " active" : "")} onClick={() => setUnits("imperial")}>Imperial</button>
                <button className={"segmented-btn" + (units === "metric" ? " active" : "")} onClick={() => setUnits("metric")}>Metric</button>
              </div>
              <div className="field-help">Affects display only. The engine works in metric internally.</div>
            </div>

            <div className="field">
              <label className="field-label">Theme</label>
              <div className="segmented" role="group">
                <button className={"segmented-btn" + (theme === "aura" ? " active" : "")} onClick={() => setTheme("aura")}>Aura (default)</button>
                <button className={"segmented-btn" + (theme === "ink" ? " active" : "")} onClick={() => setTheme("ink")}>Ink (low motion)</button>
              </div>
            </div>

            <ToggleRow
              label="Predictive notifications"
              help="iMpatient pings you when a high-confidence flare window is forming."
              defaultOn={true}
            />
            <ToggleRow
              label="Ambient summary at 7am"
              help="A quiet daily read of what your body did overnight. No alerts. Just the line."
              defaultOn={true}
            />
            <ToggleRow
              label="Share anonymized signals with research"
              help="Help expand the dysautonomia evidence base. Off by default. You can revoke any time."
              defaultOn={false}
            />
            <ToggleRow
              label="Reduce motion"
              help="The aura halo and breathing animations soften out. Useful during a flare."
              defaultOn={false}
            />
          </div>

          <div className="form-section">
            <div className="form-section-head">
              <div className="form-section-eyebrow">Connected sources</div>
              <h2 className="form-section-title">What feeds your engine</h2>
              <p className="form-section-sub">
                {p.inputs.filter(i => i.on).length} of {p.inputs.length} integrations connected.
              </p>
            </div>

            <a className="list-row" href="#integrations">
              <div className="list-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 12h16M4 8h12M4 16h8" strokeLinecap="round"/></svg>
              </div>
              <div className="list-row-body">
                <div className="list-row-title">Manage integrations</div>
                <div className="list-row-sub">Wearables, calendars, communications, medical records</div>
              </div>
              <div className="list-row-trail">
                <span>{p.inputs.filter(i => i.on).length}/{p.inputs.length}</span>
                <Chevron />
              </div>
            </a>

            <a className="list-row" href="#privacy">
              <div className="list-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="5" y="11" width="14" height="9" rx="2"/>
                  <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="list-row-body">
                <div className="list-row-title">Privacy promise</div>
                <div className="list-row-sub">What we read. What we don't. What you can revoke.</div>
              </div>
              <div className="list-row-trail">
                <span className="bright-accent">Always on</span>
                <Chevron />
              </div>
            </a>

            <a className="list-row" href="#export">
              <div className="list-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 4v12m-5-5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 20h14" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="list-row-body">
                <div className="list-row-title">Export your record</div>
                <div className="list-row-sub">Full PDF · FHIR bundle · CSV — yours, always</div>
              </div>
              <div className="list-row-trail"><Chevron /></div>
            </a>
          </div>

          <div className="form-actions">
            <button className="btn-pill btn-pill-ghost">Cancel</button>
            <div className="form-actions-spacer" />
            <button className="btn-pill btn-pill-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small helpers ------------------------------------------------

function ToggleRow({ label, help, defaultOn }) {
  const [on, setOn] = React.useState(!!defaultOn);
  return (
    <div className="toggle-row">
      <div>
        <div className="toggle-row-label">{label}</div>
        <p className="toggle-row-help">{help}</p>
      </div>
      <button
        type="button"
        className={"toggle" + (on ? " on" : "")}
        onClick={() => setOn(o => !o)}
        role="switch"
        aria-checked={on}
        aria-label={label}
      />
    </div>
  );
}

function Chevron() {
  return (
    <svg className="list-row-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Per-persona profile data ------------------------------------

function profileDob(id) {
  return ({
    renee: "8 Apr 1978",
    simone: "12 Sep 1989",
    kezia: "23 May 1996",
  })[id] || "1 Jan 1990";
}
function profileHt(id) {
  return ({
    renee:  { ft: 5, in: 7 },
    simone: { ft: 5, in: 6 },
    kezia:  { ft: 5, in: 4 },
  })[id] || { ft: 5, in: 6 };
}
function profileCountry(id) {
  return ({
    renee: "United States",
    simone: "United States",
    kezia: "United States",
  })[id] || "United States";
}
function profileEnrolled(id) {
  return ({
    renee:  "Mar 2024",
    simone: "Aug 2024",
    kezia:  "Oct 2024",
  })[id] || "2024";
}

Object.assign(window, { ProfilePage, ToggleRow });
