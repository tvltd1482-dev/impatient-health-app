import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import PatternThread from '../components/PatternThread';
import { PERSONAS, DEFAULT_PERSONA } from '../components/personas';

/*
  Today — the canonical first surface for Grayson (Pro · The Complex Human).
  Composed of containerized cards. No long text blocks; every section earns
  its space.
  Data wiring is BLOCKED on Venkat's /api/patterns endpoint (ISSUE-005).
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
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-stack)' }}>
          <StatRibbon />
          <FounderNarrative />
          <AtmosphereCard />
          <BiometricGrid />
          <DrivingPattern />
          <SourcesCard />
        </div>
      </PageShell>
    </>
  );
}

function StatRibbon() {
  const stats = [
    { eyebrow: 'Tier',     value: 'Pro',          context: 'The Complex Human' },
    { eyebrow: 'Window',   value: '72 h',         context: 'next decision · Thursday' },
    { eyebrow: 'Sources',  value: '14 of 14',     context: '4 high-signal today' },
  ];
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-component)' }} aria-label="Status ribbon">
      {stats.map((s) => (
        <div key={s.eyebrow} className="card">
          <div className="eyebrow subordinate" style={{ marginBottom: 'var(--space-2)' }}>{s.eyebrow}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-xl)', color: 'var(--text-display)', letterSpacing: 'var(--ls-h3)' }}>
            {s.value}
          </div>
          <div style={{ marginTop: 'var(--space-1)', fontSize: 'var(--t-sm)', color: 'var(--text-body)' }}>
            {s.context}
          </div>
        </div>
      ))}
    </section>
  );
}

function FounderNarrative() {
  return (
    <section className="card" style={{ padding: 'var(--space-8)' }}>
      <div className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Founder's note</div>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--t-lg)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: 'var(--text-display)',
        lineHeight: 1.35,
        maxWidth: '64ch',
      }}>
        Has crashed four times in two years. Each time she said:{' '}
        <em style={{ color: 'var(--brand-glow)', fontStyle: 'italic' }}>
          I could see this coming.
        </em>{' '}
        Now she actually can.
      </p>
    </section>
  );
}

function AtmosphereCard() {
  return (
    <section className="card" aria-label="Atmosphere — D.C. to Geneva">
      <div className="eyebrow" style={{ marginBottom: 'var(--space-5)' }}>Atmosphere · pressure delta is the signal</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 'var(--space-6)' }}>
        <Leg label="Origin · home" city="Washington D.C." pressure="1014 mb" temp="52°F" sky="clear" />
        <Delta />
        <Leg label="Destination · Tue 06:30" city="Geneva" pressure="996 mb" temp="41°F" sky="rain" highlight />
      </div>
    </section>
  );
}

function Leg({ label, city, pressure, temp, sky, highlight = false }: { label: string; city: string; pressure: string; temp: string; sky: string; highlight?: boolean }) {
  return (
    <div>
      <div className="eyebrow subordinate" style={{ marginBottom: 'var(--space-2)' }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--t-lg)',
        fontWeight: 600,
        color: 'var(--text-display)',
      }}>
        {city}
      </div>
      <div style={{ marginTop: 'var(--space-2)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)' }}>
        <span style={{ color: highlight ? 'var(--brand-glow)' : 'var(--text-primary)' }}>{pressure}</span>
        <span style={{ color: 'var(--text-secondary)' }}>·</span>
        <span style={{ color: 'var(--text-primary)' }}>{temp}</span>
        <span style={{ color: 'var(--text-secondary)' }}>·</span>
        <span style={{ color: 'var(--text-body)' }}>{sky}</span>
      </div>
    </div>
  );
}

function Delta() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-1)',
      padding: 'var(--space-4) var(--space-5)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--brand-soft)',
    }}>
      <span className="eyebrow" style={{ fontSize: '10px', letterSpacing: 'var(--ls-label)' }}>Δ pressure</span>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--t-xl)',
        fontWeight: 700,
        color: 'var(--brand-glow)',
        letterSpacing: 'var(--ls-h3)',
      }}>
        −18 mb
      </span>
      <span style={{ fontSize: 'var(--t-xs)', color: 'var(--text-body)', textAlign: 'center', maxWidth: '14ch' }}>
        strongest non-self predictor
      </span>
    </div>
  );
}

function BiometricGrid() {
  const tiles = [
    { label: 'HRV',          value: '38',     unit: 'ms',  series: [0.6, 0.62, 0.58, 0.55, 0.5, 0.48, 0.42],   trend: 'down', signal: 'high' },
    { label: 'RHR',          value: '64',     unit: 'bpm', series: [0.45, 0.5, 0.55, 0.6, 0.58, 0.62, 0.68],   trend: 'up',   signal: 'high' },
    { label: 'Sleep',        value: '6h 12m', unit: '',    series: [0.7, 0.65, 0.6, 0.55, 0.58, 0.5, 0.48],     trend: 'down', signal: 'mid'  },
    { label: 'Time on feet', value: '4h',     unit: '',    series: [0.55, 0.62, 0.5, 0.45, 0.4, 0.45, 0.38],    trend: 'down', signal: 'baseline' },
  ];
  return (
    <section style={{ display: 'grid', gap: 'var(--gap-component)' }} aria-label="Biometric strip">
      <div className="eyebrow">Yesterday · biometric</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap-component)' }}>
        {tiles.map((t) => {
          const signalColor =
            t.signal === 'high' ? 'var(--brand-glow)' :
            t.signal === 'mid'  ? 'var(--brand-soft)' :
                                   'var(--text-secondary)';
          return (
            <div key={t.label} className="card" style={{ padding: 'var(--space-5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <div className="eyebrow subordinate">{t.label}</div>
                <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: signalColor }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 'var(--space-3)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-2xl)', fontWeight: 700, color: 'var(--text-display)', letterSpacing: 'var(--ls-h2)' }}>
                  {t.value}
                </span>
                {t.unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-secondary)' }}>{t.unit}</span>}
              </div>
              <PatternThread height={32} emphasis={false} data={t.series} ariaLabel={`${t.label} 7-day trend`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DrivingPattern() {
  return (
    <section className="card" style={{ padding: 'var(--space-7)' }} aria-label="Pattern driving today's prediction">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div className="eyebrow">Pattern · driving today's prediction</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--brand-soft)' }}>
          r = 0.74 · n = 14
        </div>
      </div>
      <h3 className="h3" style={{ marginBottom: 'var(--space-4)' }}>
        Barometric drop <em>→ 48h prodrome.</em>
      </h3>
      <PatternThread height={120} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-3)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-secondary)' }}>
        <span>14 weeks ago</span>
        <span>today</span>
      </div>
    </section>
  );
}

function SourcesCard() {
  const sources = [
    { name: 'Oura Ring',                  weight: 'high' },
    { name: 'Apple Watch Ultra',          weight: 'high' },
    { name: 'Tomorrow.io · barometric',   weight: 'high' },
    { name: 'TripIt · Lufthansa',         weight: 'high' },
    { name: 'Outlook (work)',             weight: 'mid' },
    { name: 'Google Calendar (board)',    weight: 'mid' },
    { name: 'Withings BP + Body+',        weight: 'mid' },
    { name: 'Care-team calendar',         weight: 'mid' },
    { name: 'iMessage · SMS volume',      weight: 'mid' },
    { name: 'Specialist EHR (×6)',        weight: 'mid' },
    { name: 'Apple Health',               weight: 'baseline' },
    { name: 'iCloud (family)',            weight: 'baseline' },
    { name: 'Gmail + Outlook',            weight: 'baseline' },
    { name: 'Service dog vet portal',     weight: 'baseline' },
  ];
  return (
    <section className="card" aria-label="Sources">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div className="eyebrow">Reading from · 14 sources</div>
        <a href="/integrations" style={{ fontSize: 'var(--t-sm)', borderBottom: 0 }}>Manage →</a>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {sources.map((s) => (
          <Chip key={s.name} weight={s.weight} label={s.name} />
        ))}
      </div>
    </section>
  );
}

function Chip({ label, weight }: { label: string; weight: string }) {
  const color =
    weight === 'high' ? 'var(--brand-glow)' :
    weight === 'mid'  ? 'var(--brand-soft)' :
                         'var(--text-secondary)';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border-default)',
      background: 'var(--bg-elevated)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--t-xs)',
      color: weight === 'high' ? 'var(--brand-glow)' : 'var(--text-body)',
    }}>
      <span aria-hidden style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
      {label}
    </span>
  );
}
