import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import PatternThread from '../components/PatternThread';
import { PERSONAS, DEFAULT_PERSONA } from '../components/personas';

/*
  Today — the canonical first surface.
  Reads the active persona (defaults to renee/Grayson — Pro · The Complex Human)
  and renders the aura-hero, weather/location strip, biometric tiles, sources
  strip, and the seven-day pattern preview.

  This is a Next.js scaffold that mirrors the artifact prototype's
  components/today.jsx structure. Real-time data wiring is BLOCKED on
  Venkat's data endpoints (see /_refinement/sprint-board for ISSUE-005,
  ISSUE-011, ISSUE-013).
*/

export default function Today() {
  const p = PERSONAS[DEFAULT_PERSONA];

  return (
    <>
      <Head>
        <title>iMpatient · Today</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <PageShell current="/" crumb="Today">
        <PageHero
          eyebrow={p.ledeEyebrow}
          title={p.ledeHero}
          emClause={p.ledeEm}
          body={p.ledeBody}
          meta={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-1)' }}>
              <div className="eyebrow glow">Pro · all three domains</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-7)', fontSize: 'var(--t-xs)' }}>
                {p.locationStr}
              </div>
            </div>
          }
        />

        <PersonaBlock />
        <WeatherStrip />
        <BiometricsStrip />
        <SourcesStrip />
        <SevenDay />
      </PageShell>
    </>
  );
}

function PersonaBlock() {
  const p = PERSONAS[DEFAULT_PERSONA];
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        padding: 'var(--space-5) 0 var(--space-6)',
        borderBottom: '1px solid var(--card-border)',
      }}
    >
      <span className="eyebrow">{p.ledeEyebrow}</span>
      <div style={{ fontSize: 'var(--t-md)', color: 'var(--ink-0)' }}>
        {p.name}, {p.age} · {p.locationStr}
      </div>
      <div style={{ fontSize: 'var(--t-sm)', color: 'var(--ink-3)' }}>
        {p.role} · {p.conditions.join(' · ')}
      </div>
      <div style={{ fontSize: 'var(--t-sm)', color: 'var(--ink-3)' }}>
        Has crashed four times in two years. Each time she said: <em style={{ color: 'var(--ink-5)' }}>I could see this coming</em>. Now she actually can.
      </div>
    </section>
  );
}

function WeatherStrip() {
  return (
    <section
      style={{
        padding: 'var(--space-5) 0',
        borderBottom: '1px solid var(--card-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
      aria-label="Weather and location"
    >
      <div className="eyebrow">Atmosphere</div>
      <div style={{ fontSize: 'var(--t-md)', color: 'var(--ink-0)' }}>
        Washington D.C. · <span style={{ color: 'var(--ink-5)' }}>home</span> → Geneva (Tue 06:30)
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--ink-5)' }}>
        1014mb · 52°F · clear &nbsp; · &nbsp; Geneva forecast: <span style={{ color: 'var(--brand-glow)' }}>996mb</span> · 41°F · rain
      </div>
      <div style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-7)', fontStyle: 'italic' }}>
        Pressure drops 18mb across the flight — the strongest non-self predictor we have.
      </div>
    </section>
  );
}

function BiometricsStrip() {
  const tiles = [
    { label: 'HRV',         value: '38',     unit: 'ms',  trend: 'down', signal: 'high' },
    { label: 'RHR',         value: '64',     unit: 'bpm', trend: 'up',   signal: 'high' },
    { label: 'Sleep',       value: '6h 12m', unit: '',    trend: 'flat', signal: 'mid' },
    { label: 'Time on feet',value: '4h',     unit: '',    trend: 'down', signal: 'baseline' },
  ];
  return (
    <section style={{ padding: 'var(--space-5) 0', display: 'grid', gap: 'var(--space-3)' }} aria-label="Biometric strip">
      <div className="eyebrow">Yesterday · biometric</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
        {tiles.map((t) => (
          <div key={t.label} className="card" style={{ padding: 'var(--space-4)' }}>
            <div className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{t.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-xl)', fontWeight: 600 }}>{t.value}</span>
              {t.unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--ink-7)' }}>{t.unit}</span>}
            </div>
            <PatternThread height={32} emphasis={false} data={miniSeries(t.label.length)} ariaLabel={`${t.label} 7-day trend`} />
          </div>
        ))}
      </div>
    </section>
  );
}

function miniSeries(seed: number) {
  return Array.from({ length: 12 }, (_, i) => 0.5 + Math.sin(i / 2 + seed) * 0.2);
}

function SourcesStrip() {
  const sources = [
    { name: 'Oura Ring',                weight: 'high' },
    { name: 'Apple Watch Ultra',        weight: 'high' },
    { name: 'Withings BP + Body+',      weight: 'mid' },
    { name: 'Apple Health',             weight: 'baseline' },
    { name: 'Outlook (work)',           weight: 'high' },
    { name: 'Google Calendar (board)',  weight: 'mid' },
    { name: 'iCloud (family)',          weight: 'baseline' },
    { name: 'Care-team calendar',       weight: 'mid' },
    { name: 'Gmail + Outlook',          weight: 'baseline' },
    { name: 'TripIt + United + Lufthansa + UA Club', weight: 'high' },
    { name: 'Climate + barometric (Tomorrow.io)',    weight: 'high' },
    { name: 'iMessage / SMS volume',    weight: 'mid' },
    { name: 'Specialist EHR (×6)',      weight: 'mid' },
    { name: 'Service dog vet portal',   weight: 'baseline' },
  ];
  return (
    <section style={{ padding: 'var(--space-5) 0', display: 'grid', gap: 'var(--space-3)' }} aria-label="Sources">
      <div className="eyebrow">Reading from</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {sources.map((s) => (
          <span
            key={s.name}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--card-border)',
              background: 'rgba(10, 18, 48, 0.4)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--t-xs)',
              color: s.weight === 'high' ? 'var(--brand-glow)' : 'var(--ink-3)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: s.weight === 'high' ? 'var(--brand-glow)' : s.weight === 'mid' ? 'var(--brand-soft)' : 'var(--ink-7)',
              }}
            />
            {s.name}
          </span>
        ))}
      </div>
    </section>
  );
}

function SevenDay() {
  return (
    <section style={{ padding: 'var(--space-5) 0 var(--space-9)', display: 'grid', gap: 'var(--space-3)' }} aria-label="Last seven days">
      <div className="eyebrow">Your last seven days · what your body did</div>
      <div className="card">
        <PatternThread height={120} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--ink-7)' }}>
        <span>May 10</span>
        <span>May 17</span>
      </div>
      <p style={{ fontSize: 'var(--t-xs)', color: 'var(--ink-7)' }}>
        status: <code style={{ fontFamily: 'var(--font-mono)' }}>BLOCKED_ON_DATA_CONTRACT</code> · placeholder series. See /_refinement/sprint-board for ISSUE-011.
      </p>
    </section>
  );
}
