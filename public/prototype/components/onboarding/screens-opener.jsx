/* Opener + Entry-point screens.
   The first impression. Three tonal pitches × three entry contexts.

   TONES — same structure, different voice:
     literary:  "Your body has been keeping a notebook. Quietly. For years."
     validating:"You weren't imagining it."
     clinical:  "A second set of eyes, on duty between visits."

   ENTRY POINTS — what the screen after the opener looks like:
     cold:      "What brings you here?"  (a soft 4-way self-identification)
     clinician: "Dr. Marsh wanted you to have this."  (referral acceptance)
     community: "[friend] thought you'd find this useful."  (warm hand-off)
*/

/* ============================================================
   OPENER — three tonal pitches
   ============================================================ */

const OPENER_COPY = {
  literary: {
    eyebrow: "Welcome to iMpatient",
    headline: <>Your body has been keeping a notebook, <em>quietly,</em> for years.</>,
    lede: <>This is the first tool that gets to read it back. Nothing here is a diagnosis. It is just what your body has been telling you — translated, finally, into something we can act on together.</>,
    cta: "Read it back to me",
    ghost: "Tell me first how this works",
  },
  validating: {
    eyebrow: "Hello",
    headline: <>You weren't imagining it.</>,
    lede: <>Your wearable, your calendar, the weather, your weeks — they've been telling a story your appointments never had time to hear. We've been listening on your behalf.</>,
    cta: "Show me what you've heard",
    ghost: "What does iMpatient see?",
  },
  clinical: {
    eyebrow: "A co-doctor in your pocket",
    headline: <>A second set of eyes, <em>on duty</em> between visits.</>,
    lede: <>Continuous read across your wearables, calendar, and environment. Patterns surfaced in plain language. A clinical brief ready when your doctor is.</>,
    cta: "Begin setup",
    ghost: "How is this different from a tracker?",
  },
};

function OpenerScreen({ tone = 'literary', onNext }) {
  const c = OPENER_COPY[tone];
  return (
    <ScreenShell withHalo={true}>
      <div style={{ marginTop: 8 }}>
        <Logo variant="mark-white" height={56} style={{ marginBottom: 22 }} />
        <p className="ob-eyebrow">{c.eyebrow}</p>
        <h1 className={"ob-headline ob-headline-lg"}>{c.headline}</h1>
        <p className="ob-lede">{c.lede}</p>
      </div>
      <div className="ob-actions">
        <PrimaryBtn onClick={onNext}>{c.cta}</PrimaryBtn>
        <GhostBtn onClick={onNext}>{c.ghost}</GhostBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   ENTRY · COLD — "what brings you here?"
   The four lived-experience options come straight from BRIEF.md voice.
   ============================================================ */

const COLD_OPTIONS = [
  {
    id: 'newly',
    title: "I'm newly diagnosed.",
    sub: "Trying to learn what my body is actually doing.",
  },
  {
    id: 'years',
    title: "I've been at this for years.",
    sub: "I have the notebook. I want help reading it back.",
  },
  {
    id: 'crashes',
    title: "I crash. Often.",
    sub: "I want to see the bad weeks before they land.",
  },
  {
    id: 'unsure',
    title: "I'm not sure yet.",
    sub: "Something's wrong. I'm here to look.",
  },
];

function EntryColdScreen({ onNext, stepper }) {
  const flow = useFlow();
  const [pick, setPick] = React.useState(null);
  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">What brings you here</p>
      <h1 className="ob-headline">What made you download us today?</h1>
      <p className="ob-lede" style={{ marginBottom: 22 }}>
        There's no wrong answer. We just want to start where you actually are.
      </p>
      <div className="ob-choices">
        {COLD_OPTIONS.map((o) => (
          <ChoiceCard
            key={o.id}
            selected={pick === o.id}
            onClick={() => setPick(o.id)}
            title={o.title}
            sub={o.sub}
          />
        ))}
      </div>
      <div className="ob-actions">
        <PrimaryBtn
          disabled={!pick}
          onClick={() => { flow && flow.update({ coldReason: pick }); onNext && onNext(); }}
        >
          Continue
        </PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   ENTRY · CLINICIAN — referral acceptance
   ============================================================ */

function EntryClinicianScreen({ onNext, stepper }) {
  return (
    <ScreenShell stepper={stepper}>
      <div className="ob-entry-badge">
        <div className="ob-entry-badge-avatar">M</div>
        Referred by Dr. Marsh
      </div>
      <h1 className="ob-headline">
        Dr. Marsh wanted you to have this.
      </h1>
      <p className="ob-lede" style={{ marginBottom: 18 }}>
        Your clinician set this up before your visit so you'd arrive on the same page. Anything we surface stays yours first. We share back only what you approve.
      </p>
      <div style={{
        background: 'rgba(122, 184, 255, 0.05)',
        border: '1.5px solid rgba(122, 184, 255, 0.16)',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
      }}>
        <div className="ob-eyebrow" style={{ marginBottom: 8 }}>From Dr. Marsh</div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--ink-8)', fontStyle: 'italic' }}>
          "Bring me a week of this before our follow-up. We'll have more to work with than ten minutes of memory can hold."
        </p>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-6)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          <span>NEUROLOGY · OXFORD</span>
          <span>FOLLOW-UP IN 21 DAYS</span>
        </div>
      </div>
      <div className="ob-actions">
        <PrimaryBtn onClick={onNext}>Accept the invitation</PrimaryBtn>
        <GhostBtn onClick={onNext}>I'd rather start without a connection</GhostBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   ENTRY · COMMUNITY — a friend sent this
   ============================================================ */

function EntryCommunityScreen({ onNext, stepper }) {
  return (
    <ScreenShell stepper={stepper}>
      <div className="ob-entry-badge">
        <div className="ob-entry-badge-avatar">N</div>
        A friend shared this
      </div>
      <h1 className="ob-headline">
        Naya thought you'd find <em>this</em> useful.
      </h1>
      <p className="ob-lede" style={{ marginBottom: 16 }}>
        She didn't tell us anything about you. She just sent the link. Her account stays private — she gets nothing for inviting you, and we don't share what either of you do here.
      </p>
      <div style={{
        background: 'rgba(10, 18, 48, 0.5)',
        border: '1.5px solid rgba(168, 212, 255, 0.14)',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #B8D4FF, #2D5FE0)',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          color: '#060920',
          fontSize: 14,
        }}>N</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: 'var(--ink-6)', textTransform: 'uppercase', marginBottom: 6 }}>
            Naya · friend since 2021
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--ink-8)', fontStyle: 'italic' }}>
            "It's the first one that didn't make me track another thing. It just reads. Try a week."
          </p>
        </div>
      </div>
      <div className="ob-actions">
        <PrimaryBtn onClick={onNext}>See what she saw</PrimaryBtn>
        <GhostBtn onClick={onNext}>I'd rather start fresh</GhostBtn>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, {
  OpenerScreen, OPENER_COPY,
  EntryColdScreen, EntryClinicianScreen, EntryCommunityScreen,
  COLD_OPTIONS,
});
