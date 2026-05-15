/* Desktop adaptations of key onboarding moments.
   Used in Section 5 of the canvas to show how the same content scales
   to wider viewports — split panel: brand + content on the left, the
   active surface (form / diagram / first-read card) on the right. */

function DesktopOpener({ tone = 'literary' }) {
  const c = OPENER_COPY[tone];
  return (
    <div className="ob-desktop">
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 50% 60% at 28% 38%, rgba(168, 212, 255, 0.32) 0%, rgba(122, 184, 255, 0.16) 25%, rgba(45, 95, 224, 0.08) 50%, transparent 75%)
        `,
        mixBlendMode: 'screen',
      }} aria-hidden="true" />

      <div className="ob-desktop-left">
        <div className="ob-desktop-brandmark" style={{ position: 'static', padding: 0, marginBottom: 36, gap: 0 }}>
          <Logo variant="lockup-white" height={32} />
        </div>
        <p className="ob-desktop-eyebrow">{c.eyebrow}</p>
        <h1 className="ob-desktop-headline">{c.headline}</h1>
        <p className="ob-desktop-lede">{c.lede}</p>
        <div className="ob-desktop-actions">
          <button className="ob-btn ob-btn-primary" style={{ fontSize: 16, padding: '17px 30px' }}>
            {c.cta}
            <Chevron />
          </button>
          <button className="ob-btn ob-btn-ghost" style={{ fontSize: 14 }}>{c.ghost}</button>
        </div>
        <div className="ob-desktop-foot">No account · No payment · Your data, your device</div>
      </div>

      <div className="ob-desktop-right">
        {/* Signal panel — a slowly scrolling HRV-like trace.
            Replaces the previous luminous orb so the right panel reads
            as CONTENT (a signal we're listening to) instead of a second
            brand-shaped symbol competing with the lockup top-left. */}
        <div className="ob-desktop-signal" aria-hidden="true">
          <div className="ob-desktop-signal-label">
            <span className="ob-desktop-signal-dot" />
            <span>Live · HRV · Bella · 184d</span>
          </div>
          <svg className="ob-desktop-signal-svg" viewBox="0 0 800 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ob-sig-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="rgba(168, 212, 255, 0)" />
                <stop offset="14%"  stopColor="rgba(122, 184, 255, 0.85)" />
                <stop offset="86%"  stopColor="rgba(168, 212, 255, 0.95)" />
                <stop offset="100%" stopColor="rgba(168, 212, 255, 0)" />
              </linearGradient>
              <linearGradient id="ob-sig-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="rgba(122, 184, 255, 0.22)" />
                <stop offset="100%" stopColor="rgba(122, 184, 255, 0)" />
              </linearGradient>
            </defs>

            {/* horizon line */}
            <line x1="0" y1="110" x2="800" y2="110" stroke="rgba(168, 212, 255, 0.08)" strokeWidth="1" />

            {/* tick marks at intervals */}
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((p, i) => (
              <line key={i} x1={800 * p} y1="105" x2={800 * p} y2="115" stroke="rgba(168, 212, 255, 0.12)" strokeWidth="1" />
            ))}

            {/* the signal — a soft sinusoidal HRV-ish trace, scrolling left */}
            <g className="ob-desktop-signal-scroll">
              <path
                d="M 0 110
                   C 30 80, 60 130, 100 95
                   S 160 145, 200 105
                   S 260 85, 300 115
                   S 360 65, 400 115
                   S 460 130, 500 100
                   S 560 75, 600 110
                   S 660 130, 700 95
                   S 760 130, 800 110
                   C 830 80, 860 130, 900 95
                   S 960 145, 1000 105
                   S 1060 85, 1100 115
                   S 1160 65, 1200 115
                   S 1260 130, 1300 100
                   S 1360 75, 1400 110
                   S 1460 130, 1500 95
                   S 1560 130, 1600 110"
                stroke="url(#ob-sig-grad)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px rgba(122, 184, 255, 0.45))"
              />
            </g>

            {/* annotation point — a "noticed something" star */}
            <g transform="translate(620, 95)">
              <circle r="14" fill="rgba(168, 212, 255, 0.1)" />
              <circle r="4"  fill="#A8D4FF" filter="drop-shadow(0 0 6px rgba(168, 212, 255, 0.7))" />
            </g>
            <text x="640" y="78" fill="rgba(168, 212, 255, 0.7)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em">
              + 6 BPM · SUNDAYS
            </text>
          </svg>
          <div className="ob-desktop-signal-foot">
            <span>00:00</span>
            <span>Mon · 184 days listening</span>
            <span>Now</span>
          </div>
        </div>

        {/* Quoted murmur — three brand phrases at the very bottom */}
        <div style={{ position: 'absolute', bottom: 36, left: 64, right: 64, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(168, 212, 255, 0.55)', textTransform: 'uppercase', display: 'flex', gap: 24, justifyContent: 'space-between' }}>
          <span>· Signals read, never stored ·</span>
          <span>· Plain English ·</span>
          <span>· Yours first ·</span>
        </div>
      </div>
    </div>
  );
}

function DesktopPrivacy() {
  return (
    <div className="ob-desktop">
      <div className="ob-desktop-left">
        <div className="ob-desktop-brandmark" style={{ position: 'static', padding: 0, marginBottom: 36, gap: 0 }}>
          <Logo variant="lockup-white" height={32} />
        </div>
        <p className="ob-desktop-eyebrow">A word, before the next one</p>
        <h1 className="ob-desktop-headline">
          We will <em style={{ fontStyle: 'normal', color: 'var(--brand-soft)' }}>never</em> read your messages.
        </h1>
        <p className="ob-desktop-lede">
          A heavy-message day costs your body something. A long phone call costs it differently. We need to know <em style={{ color: 'var(--ink-9)', fontStyle: 'normal' }}>that</em> they happened and <em style={{ color: 'var(--ink-9)', fontStyle: 'normal' }}>when.</em> We never need the contents. We never will.
        </p>
        <div className="ob-desktop-actions">
          <button className="ob-btn ob-btn-primary" style={{ fontSize: 16, padding: '17px 30px' }}>
            I understand. Continue. <Chevron />
          </button>
          <button className="ob-btn ob-btn-ghost" style={{ fontSize: 14 }}>How exactly does this work?</button>
        </div>
        <div className="ob-desktop-foot">On-device wherever possible · Revoke in one tap · Audit anytime</div>
      </div>
      <div className="ob-desktop-right" style={{ padding: '88px 56px' }}>
        <div style={{
          background: 'rgba(10, 18, 48, 0.55)',
          border: '1.5px solid rgba(168, 212, 255, 0.18)',
          borderRadius: 18,
          padding: '28px 26px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 22,
        }}>
          <div className="ob-privacy-col ob-privacy-yes">
            <div className="ob-privacy-col-head" style={{ fontSize: 11, marginBottom: 8 }}>What we read</div>
            <div className="ob-privacy-chip" style={{ padding: '10px 13px', fontSize: 13 }}>Message volume</div>
            <div className="ob-privacy-chip" style={{ padding: '10px 13px', fontSize: 13 }}>Timing &amp; rate</div>
            <div className="ob-privacy-chip" style={{ padding: '10px 13px', fontSize: 13 }}>Call duration</div>
            <div className="ob-privacy-chip" style={{ padding: '10px 13px', fontSize: 13 }}>App you used</div>
          </div>
          <div className="ob-privacy-col ob-privacy-no">
            <div className="ob-privacy-col-head" style={{ fontSize: 11, marginBottom: 8 }}>What we don't</div>
            <div className="ob-privacy-chip" style={{ padding: '10px 13px', fontSize: 13 }}>The text</div>
            <div className="ob-privacy-chip" style={{ padding: '10px 13px', fontSize: 13 }}>Who you spoke to</div>
            <div className="ob-privacy-chip" style={{ padding: '10px 13px', fontSize: 13 }}>Subject lines</div>
            <div className="ob-privacy-chip" style={{ padding: '10px 13px', fontSize: 13 }}>Voice content</div>
          </div>
        </div>
        <p style={{
          marginTop: 22,
          fontSize: 13, lineHeight: 1.55, color: 'var(--ink-7)',
          fontFamily: 'var(--font-display)',
        }}>
          The same promise applies to your calendar — we read titles, times, locations. Not attendees, not notes, not bodies.
        </p>
      </div>
    </div>
  );
}

function DesktopFirstRead() {
  return (
    <div className="ob-desktop">
      <div className="ob-desktop-left">
        <div className="ob-desktop-brandmark" style={{ position: 'static', padding: 0, marginBottom: 36, gap: 0 }}>
          <Logo variant="lockup-white" height={32} />
        </div>
        <p className="ob-desktop-eyebrow">All set, Bella</p>
        <h1 className="ob-desktop-headline">
          Here is the <em>first thing</em> your body has been telling us.
        </h1>
        <p className="ob-desktop-lede">
          Three days of listening. One pattern strong enough to put words to. Your full Today is ready when you are.
        </p>
        <div className="ob-desktop-actions">
          <button className="ob-btn ob-btn-primary" style={{ fontSize: 16, padding: '17px 30px' }}>
            Take me into Today <Chevron />
          </button>
        </div>
        <div className="ob-desktop-foot">Free · 7-day view · Patterns unlock when you upgrade</div>
      </div>
      <div className="ob-desktop-right" style={{ padding: '64px 56px', justifyContent: 'flex-start', paddingTop: 88 }}>
        <div style={{
          position: 'relative',
          background: 'rgba(10, 18, 48, 0.55)',
          border: '1.5px solid rgba(122, 184, 255, 0.34)',
          borderRadius: 22,
          padding: '28px 28px 22px',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: '-30% -20% 50% -20%',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(168, 212, 255, 0.22), transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--brand-glow)',
              marginBottom: 18,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--brand-glow)',
                boxShadow: '0 0 10px var(--brand-glow)',
                animation: 'ob-breathe 2.4s ease-in-out infinite',
              }} />
              First read · day 3
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 30, lineHeight: 1.18, letterSpacing: '-0.018em',
              margin: '0 0 14px', color: 'var(--ink-9)',
              fontWeight: 500,
            }}>
              The week ahead is loud. <em style={{ color: 'var(--ink-7)', fontWeight: 400 }}>We can see it from here.</em>
            </h2>
            <p style={{
              margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-7)',
            }}>
              Tuesday through Friday: <em style={{ color: 'var(--ink-9)', fontStyle: 'normal' }}>8h+ of meetings</em> daily, with <em style={{ color: 'var(--ink-9)', fontStyle: 'normal' }}>6h+ standing time</em> projected. Your last four launch-weeks all crossed your POTS threshold by Wednesday. <em style={{ color: 'var(--ink-9)', fontStyle: 'normal' }}>We'll draft a horizontal block for Tuesday lunch.</em>
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 24, paddingTop: 18, borderTop: '1px solid rgba(122, 184, 255, 0.18)' }}>
              {[
                { label: "Meeting hours", val: "8.5h/day" },
                { label: "Standing", val: "6h+" },
                { label: "Threshold crossed", val: "Wed 4 of 4" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-6)' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink-9)', marginTop: 4 }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p style={{ marginTop: 18, fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-6)' }}>
          Nothing here is a diagnosis · Translated, not prescribed
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { DesktopOpener, DesktopPrivacy, DesktopFirstRead });
