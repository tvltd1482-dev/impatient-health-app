/* Lean and Deep flows.
   Each flow is a sequence of screens with a Stepper at the top and
   forward/back navigation built in. State lives in a FlowProvider so
   typing your name in one screen reflects in later ones.

   LEAN — 5 screens:
     1. Opener (literary tone)
     2. Name
     3. Wearable
     4. Calendar
     5. First read

   DEEP — 12 screens:
     1. Opener
     2. Entry branch (cold by default)
     3. Name
     4. Year diagnosed
     5. Diagnoses / symptoms
     6. Wearable
     7. Calendar
     8. Privacy moment
     9. Comms
    10. Cadence
    11. Loading
    12. First read

   Both flows expose `entryKind` so we can use the same flow component
   from the canvas to render the clinician-entry deep variant. */

function FlowShell({ children, screens, label, onComplete }) {
  const [idx, setIdx] = React.useState(0);
  const clamped = Math.min(Math.max(idx, 0), screens.length - 1);
  const next = () => setIdx((i) => Math.min(i + 1, screens.length - 1));
  const back = () => setIdx((i) => Math.max(i - 1, 0));
  const reset = () => setIdx(0);

  const stepper = <Stepper total={screens.length} index={clamped} />;
  const Screen = screens[clamped];
  return (
    <>
      <Screen idx={clamped} onNext={next} onBack={back} onReset={reset} onComplete={onComplete} stepper={stepper} />
      {/* prev / restart overlay — tap targets in the bezel area below the phone */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: -34, height: 28,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 6px',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.12em',
        color: 'rgba(60, 50, 40, 0.6)',
        textTransform: 'uppercase',
      }}>
        <button
          type="button"
          onClick={back}
          disabled={clamped === 0}
          style={{
            background: 'transparent', border: 'none', cursor: clamped === 0 ? 'default' : 'pointer',
            opacity: clamped === 0 ? 0.3 : 1,
            fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit',
            color: 'inherit', padding: '4px 8px',
          }}
        >
          ← Back
        </button>
        <span>{label} · {clamped + 1} / {screens.length}</span>
        <button
          type="button"
          onClick={reset}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit',
            color: 'inherit', padding: '4px 8px',
          }}
        >
          Restart ↺
        </button>
      </div>
    </>
  );
}

/* ============================================================
   LEAN FLOW — 5 screens
   ============================================================ */

function LeanFlow({ tone = 'literary', onComplete }) {
  const screens = [
    ({ onNext }) => <OpenerScreen tone={tone} onNext={onNext} />,
    ({ onNext, stepper }) => <NameScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <WearableScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <CalendarScreen onNext={onNext} stepper={stepper} />,
    // Take me into Today: if the host supplied onComplete (production
    // hand-off to the dashboard) use it; otherwise fall back to onReset
    // so the design canvas can replay the flow.
    ({ onComplete, onReset, stepper }) => <FirstReadScreen onFinish={onComplete || onReset} stepper={stepper} />,
  ];
  return (
    <FlowProvider>
      <FlowShell screens={screens} label={`Lean · ${tone}`} onComplete={onComplete} />
    </FlowProvider>
  );
}

/* ============================================================
   DEEP FLOW — 12 screens
   ============================================================ */

function DeepFlow({ entry = 'cold', tone = 'literary', onComplete }) {
  const EntryScreen =
    entry === 'clinician' ? EntryClinicianScreen :
    entry === 'community' ? EntryCommunityScreen :
    EntryColdScreen;

  const screens = [
    ({ onNext }) => <OpenerScreen tone={tone} onNext={onNext} />,
    ({ onNext, stepper }) => <EntryScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <NameScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <YearScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <DiagnosesScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <WearableScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <CalendarScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <PrivacyMomentScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <CommsScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <CadenceScreen onNext={onNext} stepper={stepper} />,
    ({ onNext, stepper }) => <LoadingScreen onNext={onNext} stepper={stepper} />,
    ({ onComplete, onReset, stepper }) => <FirstReadScreen onFinish={onComplete || onReset} stepper={stepper} />,
  ];
  const label = entry === 'clinician' ? 'Deep · Clinician' : entry === 'community' ? 'Deep · Community' : 'Deep · Cold';
  return (
    <FlowProvider>
      <FlowShell screens={screens} label={label} onComplete={onComplete} />
    </FlowProvider>
  );
}

Object.assign(window, { LeanFlow, DeepFlow, FlowShell });
