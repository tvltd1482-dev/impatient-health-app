/* Connection screens — the integrations.
   Wearables, calendars, comms. The wearable list contains items that
   are not yet partnership-approved at launch — those show their logo
   but are overlaid with "Coming soon" and are non-tappable. Same
   pattern applied to calendars and comms.

   The privacy moment is its own screen, placed BEFORE the comms list
   so the user reads the promise before opting in. */

/* ============================================================
   WEARABLE
   ============================================================ */

const WEARABLE_OPTIONS = [
  { id: 'apple-health', name: 'Apple Health', sub: 'Watch · iPhone · sleep · activity', glyph: 'appleHealth', approved: true },
  { id: 'oura',         name: 'Oura Ring',    sub: 'HRV · sleep stages · readiness',    glyph: 'oura',        approved: true },
  { id: 'whoop',        name: 'Whoop 4.0',    sub: 'Strain · recovery · sleep',         glyph: 'whoop',       approved: false },
  { id: 'garmin',       name: 'Garmin Connect', sub: 'Movement · stress · body battery', glyph: 'garmin',     approved: false },
  { id: 'withings',     name: 'Withings',     sub: 'Scale · BP cuff · sleep mat',       glyph: 'withings',    approved: false },
  { id: 'fitbit',       name: 'Fitbit',       sub: 'Steps · sleep · heart rate',        glyph: 'fitbit',      approved: false },
];

function WearableScreen({ onNext, stepper }) {
  const flow = useFlow();
  const { state, toggle } = flow;
  const connected = state.wearables || [];

  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">What your body already knows</p>
      <h1 className="ob-headline">Your watch has been keeping a notebook. <em>Let's read it.</em></h1>
      <p className="ob-lede" style={{ marginBottom: 18 }}>
        Connect what you already wear. We'll add more partners as they ship.
      </p>
      <div className="ob-source-list">
        {WEARABLE_OPTIONS.map((w) => (
          <SourceRow
            key={w.id}
            glyphSvg={GLYPHS[w.glyph]}
            name={w.name}
            sub={w.sub}
            connected={connected.includes(w.id)}
            comingSoon={!w.approved}
            onConnect={() => toggle('wearables', w.id)}
          />
        ))}
      </div>
      <p className="ob-help" style={{ marginTop: 16 }}>
        We can do the first read with any one of these — or none. You can connect a wearable later from Settings.
      </p>
      <div className="ob-actions">
        <PrimaryBtn onClick={onNext}>
          {connected.length === 0 ? "I'll connect one later" : `Continue · ${connected.length} connected`}
        </PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   CALENDAR
   ============================================================ */

const CALENDAR_OPTIONS = [
  { id: 'google',  name: 'Google Calendar', sub: 'Personal · work · shared',           glyph: 'google',  approved: true },
  { id: 'icloud',  name: 'iCloud Calendar', sub: 'Apple Calendar across your devices', glyph: 'apple',   approved: true },
  { id: 'outlook', name: 'Outlook · Microsoft 365', sub: 'Work · personal · school',   glyph: 'outlook', approved: false },
  { id: 'caldav',  name: 'Other (CalDAV)',  sub: 'Fastmail · ProtonMail · NextCloud',  glyph: 'apple',   approved: false },
];

function CalendarScreen({ onNext, stepper }) {
  const flow = useFlow();
  const { state, toggle } = flow;
  const connected = state.calendars || [];

  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">The shape of your days</p>
      <h1 className="ob-headline">Your calendar tells us when you're <em>standing, travelling, braced.</em></h1>
      <p className="ob-lede" style={{ marginBottom: 18 }}>
        We read event titles, times, and locations. <em className="ob-bright">Not attendees, not notes.</em> The shape of the day, not the contents of it.
      </p>
      <div className="ob-source-list">
        {CALENDAR_OPTIONS.map((c) => (
          <SourceRow
            key={c.id}
            glyphSvg={GLYPHS[c.glyph]}
            name={c.name}
            sub={c.sub}
            connected={connected.includes(c.id)}
            comingSoon={!c.approved}
            onConnect={() => toggle('calendars', c.id)}
          />
        ))}
      </div>
      <div className="ob-actions">
        <PrimaryBtn onClick={onNext}>
          {connected.length === 0 ? "Skip for now" : `Continue · ${connected.length} connected`}
        </PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   PRIVACY MOMENT — the "we read volume, not content" promise
   ============================================================ */

function PrivacyMomentScreen({ onNext, stepper }) {
  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow ob-eyebrow-faint">A word, before the next one</p>
      <h1 className="ob-headline ob-headline-lg">
        We will <em className="ob-bright" style={{ fontStyle: 'normal' }}>never</em> read your messages.
      </h1>
      <p className="ob-lede" style={{ marginBottom: 16 }}>
        A heavy-message day costs your body something. A 90-minute phone call costs it differently. We need to know <em>that</em> they happened, and <em>when</em>. We do not need to know what was said. We never will.
      </p>

      <div className="ob-privacy-diagram">
        <div className="ob-privacy-col ob-privacy-yes">
          <div className="ob-privacy-col-head">What we read</div>
          <div className="ob-privacy-chip">Message volume</div>
          <div className="ob-privacy-chip">Timing &amp; rate</div>
          <div className="ob-privacy-chip">Call duration</div>
          <div className="ob-privacy-chip">App you used</div>
        </div>
        <div className="ob-privacy-col ob-privacy-no">
          <div className="ob-privacy-col-head">What we don't</div>
          <div className="ob-privacy-chip">The text</div>
          <div className="ob-privacy-chip">Who you spoke to</div>
          <div className="ob-privacy-chip">Subject lines</div>
          <div className="ob-privacy-chip">Voice content</div>
        </div>
      </div>

      <p className="ob-help">
        We run this on-device wherever possible. You can audit what we read in Settings any time, and revoke a connection in one tap.
      </p>

      <div className="ob-actions">
        <PrimaryBtn onClick={onNext}>I understand. Continue.</PrimaryBtn>
        <GhostBtn onClick={onNext}>Tell me more about how this works</GhostBtn>
      </div>
    </ScreenShell>
  );
}

/* ============================================================
   COMMS — message volume sources
   ============================================================ */

const COMMS_OPTIONS = [
  { id: 'imessage', name: 'iMessage · SMS', sub: 'Volume + timing · on device',      glyph: 'imessage', approved: true },
  { id: 'gmail',    name: 'Gmail',         sub: 'Inbox volume · send/receive rate',  glyph: 'gmail',    approved: true },
  { id: 'outlook',  name: 'Outlook · Microsoft 365', sub: 'Work inbox volume',       glyph: 'outlook',  approved: false },
  { id: 'slack',    name: 'Slack',         sub: 'Message + DM volume',               glyph: 'slack',    approved: false },
  { id: 'whatsapp', name: 'WhatsApp',      sub: 'Volume + timing · on device',       glyph: 'whatsapp', approved: false },
];

function CommsScreen({ onNext, stepper }) {
  const flow = useFlow();
  const { state, toggle } = flow;
  const connected = state.comms || [];

  return (
    <ScreenShell stepper={stepper}>
      <p className="ob-eyebrow">The volume of your weeks</p>
      <h1 className="ob-headline">Where do your days get loud?</h1>
      <p className="ob-lede" style={{ marginBottom: 18 }}>
        Pick the places your communications stack up. Remember: volume only — never content. The promise still holds.
      </p>
      <div className="ob-source-list">
        {COMMS_OPTIONS.map((c) => (
          <SourceRow
            key={c.id}
            glyphSvg={GLYPHS[c.glyph]}
            name={c.name}
            sub={c.sub}
            connected={connected.includes(c.id)}
            comingSoon={!c.approved}
            onConnect={() => toggle('comms', c.id)}
          />
        ))}
      </div>
      <div className="ob-actions">
        <PrimaryBtn onClick={onNext}>
          {connected.length === 0 ? "Skip for now" : `Continue · ${connected.length} connected`}
        </PrimaryBtn>
      </div>
    </ScreenShell>
  );
}

Object.assign(window, {
  WearableScreen, CalendarScreen, PrivacyMomentScreen, CommsScreen,
  WEARABLE_OPTIONS, CALENDAR_OPTIONS, COMMS_OPTIONS,
});
