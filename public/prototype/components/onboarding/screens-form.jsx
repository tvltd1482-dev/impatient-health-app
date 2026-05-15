/* Form screens — the parts where the user types or picks something.
   Name, diagnoses/symptoms, year first noticed, cadence.

   Plain-language picker design — categorised tag cloud, not a clinical
   dropdown. Diagnosed conditions are first; "symptoms / what it feels
   like" are second; "I don't have words yet" is always available as
   an escape hatch. */

/* ============================================================
   NAME — legal name + the name we'll use in-app
   ============================================================ */

function NameScreen({ onNext, stepper }) {
  const flow = useFlow();
  const { state, update } = flow;
  const [legal, setLegal] = React.useState(state.legalName || '');
  const [call, setCall]   = React.useState(state.callName || '');

  // When the user types a legal name and hasn't customized call name,
  // auto-suggest first token so the second field reflects something real.
  const firstToken = legal.trim().split(/\s+/)[0] || '';
  const callDisplay = call || firstToken;

  const commit = () => {
    update({ legalName: legal.trim(), callName: callDisplay });
    onNext && onNext();
  };

  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">Starting with you</p>
      <h1 className="ob-headline">What should we call you?</h1>
      <p className="ob-lede" style={{ marginBottom: 22 }}>
        Your records may say one thing. We'll use what you actually answer to.
      </p>
      <div className="ob-field">
        <label className="ob-field-label" htmlFor="ob-legal">Legal · for medical records</label>
        <input
          id="ob-legal"
          className="ob-input"
          type="text"
          placeholder="e.g. Harlow Mae Aldridge"
          value={legal}
          onChange={(e) => setLegal(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div className="ob-field">
        <label className="ob-field-label" htmlFor="ob-call">What we call you, in app</label>
        <input
          id="ob-call"
          className="ob-input"
          type="text"
          placeholder={firstToken || "e.g. Harlow"}
          value={call}
          onChange={(e) => setCall(e.target.value)}
          autoComplete="off"
        />
        <p className="ob-help">Used in greetings, briefs, and anywhere we speak to you directly. You can change this anytime.</p>
      </div>
      <div className="ob-actions">
        <PrimaryBtn disabled={!legal && !call} onClick={commit}>
          {callDisplay ? `That's me — ${callDisplay}` : "That's me"}
        </PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   DIAGNOSES / SYMPTOMS — the big picker
   ============================================================ */

const DIAGNOSED = [
  'MS · RRMS', 'MS · SPMS', 'POTS', 'MCAS', 'EDS · hypermobility',
  'Endometriosis', 'Adenomyosis', 'ME/CFS', 'Long COVID', 'Fibromyalgia',
  'Hashimoto\'s', 'Lupus · SLE', 'Sjögren\'s', 'Rheumatoid arthritis',
  'ADHD', 'Autism', 'Migraine', 'Crohn\'s', 'IBS', 'PCOS',
  'Type 1 diabetes', 'Type 2 diabetes', 'Cardiac dysautonomia',
];

const SYMPTOMS = [
  'Fatigue · "borrowed legs"', 'Brain fog', 'Dizziness · standing',
  'Splintered sleep', 'Headaches · migraine', 'Joint pain', 'Heat intolerance',
  'Cold extremities', 'Tachycardia · resting HR jumps', 'Hives · flushing',
  'Cycle-linked flares', 'Sensory overload', 'Food sensitivities',
  'Tremor', 'Numbness · tingling', 'Visual disturbances',
];

function DiagnosesScreen({ onNext, stepper, hint }) {
  const flow = useFlow();
  const { state, toggle, update } = flow;
  const noWords = state.diagnoses.includes('__nowords__');

  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">What you're carrying</p>
      <h1 className="ob-headline">Tell us what's been with you.</h1>
      <p className="ob-lede">
        Diagnosed, suspected, or just lived-with. Pick anything that feels true. {hint || "We use this to know which patterns to watch for, never to label you."}
      </p>

      {!noWords && (
        <>
          <div className="ob-tag-cat">Diagnosed conditions</div>
          <div className="ob-tag-cloud">
            {DIAGNOSED.map((d) => (
              <Tag key={d} selected={state.diagnoses.includes(d)} onClick={() => toggle('diagnoses', d)}>
                {d}
              </Tag>
            ))}
          </div>

          <div className="ob-tag-cat">Or, what it feels like</div>
          <div className="ob-tag-cloud">
            {SYMPTOMS.map((s) => (
              <Tag key={s} selected={state.symptoms.includes(s)} onClick={() => toggle('symptoms', s)}>
                {s}
              </Tag>
            ))}
          </div>

          <button
            type="button"
            onClick={() => update({ diagnoses: ['__nowords__'], symptoms: [] })}
            style={{
              background: 'transparent', border: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 13, color: 'var(--brand-soft)',
              padding: '14px 0 4px',
              textAlign: 'left', cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            I don't have words for it yet — that's okay.
          </button>
        </>
      )}

      {noWords && (
        <div style={{
          background: 'rgba(122, 184, 255, 0.06)',
          border: '1.5px solid rgba(122, 184, 255, 0.18)',
          borderRadius: 14,
          padding: 18,
          margin: '14px 0 8px',
        }}>
          <p style={{ margin: 0, fontSize: 14.5, color: 'var(--ink-9)', lineHeight: 1.5, fontStyle: 'italic' }}>
            Okay. We'll start where you are. Your body will fill in the rest, and we'll show you what it tells us.
          </p>
          <button
            type="button"
            onClick={() => update({ diagnoses: [] })}
            style={{
              background: 'transparent', border: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 12.5, color: 'var(--brand-soft)',
              padding: '10px 0 0', cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            Actually, let me try to put words to it.
          </button>
        </div>
      )}

      <div className="ob-actions">
        <PrimaryBtn onClick={onNext}>Continue</PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   YEAR — when did you first notice
   ============================================================ */

function YearScreen({ onNext, stepper }) {
  const flow = useFlow();
  const { state, update } = flow;
  const [year, setYear] = React.useState(state.yearDiagnosed || '');

  // Pre-baked options for one-tap answers.
  const NOW = new Date().getFullYear();
  const SUGGESTED = [
    { label: `This year (${NOW})`, val: String(NOW) },
    { label: `${NOW - 1}–${NOW - 2}`, val: String(NOW - 1) },
    { label: `${NOW - 5}–${NOW - 2}`, val: String(NOW - 4) },
    { label: `More than 5 years ago`, val: String(NOW - 6) },
    { label: "Honestly? My whole life.", val: 'lifelong' },
  ];

  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">A timeline</p>
      <h1 className="ob-headline">When did your body start telling you something was off?</h1>
      <p className="ob-lede" style={{ marginBottom: 22 }}>
        Approximate is fine. We use this to weight how much history to read against.
      </p>
      <div className="ob-choices">
        {SUGGESTED.map((s) => (
          <ChoiceCard
            key={s.val}
            selected={year === s.val}
            onClick={() => setYear(s.val)}
            title={s.label}
          />
        ))}
      </div>
      <div className="ob-actions">
        <PrimaryBtn
          disabled={!year}
          onClick={() => { update({ yearDiagnosed: year }); onNext && onNext(); }}
        >
          Continue
        </PrimaryBtn>
        <GhostBtn onClick={onNext}>I'd rather not say</GhostBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   CADENCE — when to ping you
   ============================================================ */

function CadenceScreen({ onNext, stepper }) {
  const flow = useFlow();
  const { state, update } = flow;
  const [pick, setPick] = React.useState(state.cadence || 'morning');

  const OPTS = [
    { id: 'morning', title: "Mornings · 07:30", sub: "A quiet first-read before the day starts." },
    { id: 'evening', title: "Evenings · 21:00", sub: "Wrap-up read for what your body did today." },
    { id: 'whenneeded', title: "Only when something needs me", sub: "We stay quiet unless your body is asking for a change." },
    { id: 'never', title: "Don't ping me. I'll come find you.", sub: "We won't push notifications. You open the app when ready." },
  ];

  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">When we speak</p>
      <h1 className="ob-headline">How often should we check in?</h1>
      <p className="ob-lede" style={{ marginBottom: 22 }}>
        We default to quiet. You can change this anytime — and on bad days, we get even quieter.
      </p>
      <div className="ob-choices">
        {OPTS.map((o) => (
          <ChoiceCard key={o.id} selected={pick === o.id} onClick={() => setPick(o.id)} title={o.title} sub={o.sub} />
        ))}
      </div>
      <div className="ob-actions">
        <PrimaryBtn onClick={() => { update({ cadence: pick }); onNext && onNext(); }}>
          Continue
        </PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, {
  NameScreen, DiagnosesScreen, YearScreen, CadenceScreen,
  DIAGNOSED, SYMPTOMS,
});
