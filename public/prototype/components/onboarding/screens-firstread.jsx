/* Reading loader + first-read reveal.
   The "take a breath" moment between setup and the app proper.

   LoadingScreen plays a brief aura pulse with rotating reassurance
   copy, then the parent flow advances to FirstReadScreen — which shows
   the first thing iMpatient noticed about you.
*/

/* ============================================================
   LOADING — "Reading your first three days…"
   ============================================================ */

const LOAD_MESSAGES = [
  ["Reading what your wearable noticed,", "the last few nights."],
  ["Lining up the shape of your week,", "against the weather."],
  ["Listening for the first pattern,", "without naming it yet."],
];

function LoadingScreen({ onNext, stepper, durationMs = 3200 }) {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, LOAD_MESSAGES.length - 1)), 1100);
    const done = setTimeout(() => onNext && onNext(), durationMs);
    return () => { clearInterval(id); clearTimeout(done); };
  }, [durationMs, onNext]);

  const [a, b] = LOAD_MESSAGES[step];

  return (
    <ScreenShell stepper={stepper}>
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div style={{ margin: '36px auto 24px' }}>
          <BreathingObject
            variant={(typeof window !== 'undefined' && window.__breathingVariant) || 'luminous'}
            size={150}
          />
        </div>
        <div className="ob-loader-text">
          {a}<br /><em style={{ fontStyle: 'italic', color: 'var(--ink-7)', fontWeight: 400 }}>{b}</em>
        </div>
      </div>
      <p className="ob-help" style={{ textAlign: 'center', marginTop: 0, marginBottom: 8 }}>
        Nothing here is leaving your device until you say so.
      </p>
    </ScreenShell>
  );
}

/* ============================================================
   FIRST-READ REVEAL — show what we already heard
   ============================================================ */

/* The reveal content is contextual: built from what the user connected.
   We pick the strongest signal we can defend with the seed personas'
   patterns — even with no connections, we have an honest fallback. */
function pickFirstRead(state) {
  const hasOura = (state.wearables || []).includes('oura');
  const hasApple = (state.wearables || []).includes('apple-health');
  const hasCal = (state.calendars || []).length > 0;
  const hasMS = (state.diagnoses || []).some((d) => /\bMS\b/.test(d));
  const hasPOTS = (state.diagnoses || []).some((d) => /POTS/i.test(d));

  if (hasMS && (hasApple || hasOura)) {
    return {
      eyebrow: "First read · day 3",
      title: <>A pattern on Sundays we'd like to ask you about.</>,
      body: <>Your resting heart rate has been <em>+6 bpm every Sunday evening</em> for the last four weeks. The same time, every week. Not pathological — just consistent. <em>Connecting your calendar would let us show you what's behind it.</em></>,
      stats: [
        { label: "Sundays observed", val: "4 of 4" },
        { label: "Average rise", val: "+5.8 bpm" },
        { label: "Time", val: "18:00–20:00" },
      ],
    };
  }
  if (hasPOTS && hasCal) {
    return {
      eyebrow: "First read · day 3",
      title: <>The week ahead is loud. We can see it from here.</>,
      body: <>Tuesday through Friday: <em>8h+ of meetings</em> daily, with <em>6h+ standing time</em> projected. Your last four launch-weeks all crossed your POTS threshold by Wednesday. <em>We'll draft a horizontal block for Tuesday lunch.</em></>,
      stats: [
        { label: "Meeting hours", val: "8.5h/day" },
        { label: "Standing projected", val: "6h+" },
        { label: "Threshold crossed", val: "Wed last 4×" },
      ],
    };
  }
  if (hasApple || hasOura) {
    return {
      eyebrow: "First read · day 3",
      title: <>Your sleep architecture has been telling us something.</>,
      body: <>Three nights this week, your deep sleep collapsed in the third hour. We don't know the why yet, but we know <em>when</em> — it lines up with days you logged more than five hours on your feet. <em>It's not nothing.</em></>,
      stats: [
        { label: "Nights observed", val: "3 of 7" },
        { label: "Deep-sleep loss", val: "−38%" },
        { label: "Common factor", val: "5h+ standing" },
      ],
    };
  }
  // No connections — the honest version.
  return {
    eyebrow: "What we'll read",
    title: <>The first read is waiting for one signal.</>,
    body: <>Connect a wearable when you're ready and we'll show you what we've heard within three days. Until then, we'll stay quiet.</>,
    stats: [
      { label: "First read", val: "3 days after connect" },
      { label: "Privacy", val: "On device" },
      { label: "Plan", val: "Free · 7-day view" },
    ],
  };
}

function FirstReadScreen({ onFinish, stepper }) {
  const flow = useFlow();
  const { state } = flow;
  const firstName = flowFirstName(state);
  const fr = pickFirstRead(state);

  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">All set, {firstName}</p>
      <h1 className="ob-headline ob-headline-lg">
        Here is the <em>first thing</em> your body has been telling us.
      </h1>

      <div className="ob-firstread" style={{ marginTop: 18 }}>
        <div className="ob-firstread-eyebrow">{fr.eyebrow}</div>
        <h2 className="ob-firstread-title">{fr.title}</h2>
        <p className="ob-firstread-body">{fr.body}</p>
        {fr.stats && fr.stats.map((s, i) => (
          <div key={i} className="ob-firstread-stat">
            <span className="ob-firstread-stat-label">{s.label}</span>
            <span className="ob-firstread-stat-val">{s.val}</span>
          </div>
        ))}
      </div>

      <p className="ob-lede" style={{ fontSize: 13.5 }}>
        Your full Today is ready. Nothing surfaced today is a diagnosis. It is just what we heard, in plain language, with your permission to keep listening.
      </p>

      <div className="ob-actions">
        <PrimaryBtn onClick={onFinish}>Take me into Today</PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, { LoadingScreen, FirstReadScreen, pickFirstRead });
