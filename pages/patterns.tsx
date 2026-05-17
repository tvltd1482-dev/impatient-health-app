import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import PatternThread from '../components/PatternThread';

const STATS = [
  { eyebrow: 'Pairs scored',          value: '23' },
  { eyebrow: 'r ≥ 0.6',               value: '12' },
  { eyebrow: 'New this week',         value: '3'  },
  { eyebrow: 'Driving today',         value: '1'  },
];

const LIBRARY = [
  { title: 'Barometric drop → 48h prodrome',          r: 0.74,  state: 'confirmed' },
  { title: 'International flight → 72h flare window', r: 0.68,  state: 'confirmed' },
  { title: 'Board meeting day → cortisol elevated',   r: 0.61,  state: 'confirmed' },
  { title: 'Late-night Slack → splintered sleep',     r: -0.59, state: 'confirmed' },
  { title: 'Pre-period day → MCAS flare',             r: 0.71,  state: 'confirmed' },
  { title: 'Heat day > 80°F → fatigue',               r: 0.58,  state: 'exploring' },
  { title: 'Three-night travel → cognitive slowdown', r: 0.66,  state: 'confirmed' },
  { title: 'Hydration < 60oz → afternoon RHR spike',  r: 0.62,  state: 'confirmed' },
];

export default function Patterns() {
  return (
    <>
      <Head><title>iMpatient · Patterns</title></Head>
      <PageShell current="/patterns" crumb="Patterns">
        <PageHero
          eyebrow="Patterns · evidence library"
          title="The shape your body has been drawing,"
          emClause="for fourteen weeks."
          body="Your own data, organised by the relationships the engine has found and you have confirmed. This is what you show your doctor."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-stack)', marginTop: 'var(--gap-stack)' }}>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap-component)' }} aria-label="Pattern stats">
            {STATS.map((s) => (
              <div key={s.eyebrow} className="card">
                <div className="eyebrow subordinate" style={{ marginBottom: 'var(--space-2)' }}>{s.eyebrow}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-2xl)', fontWeight: 700, color: 'var(--text-display)', letterSpacing: 'var(--ls-h2)' }}>
                  {s.value}
                </div>
              </div>
            ))}
          </section>

          <section className="card" style={{ padding: 'var(--space-7)' }} aria-label="Pattern driving today">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <div className="eyebrow">Pattern · driving today</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--brand-soft)' }}>r = 0.74 · n = 14</div>
            </div>
            <h3 className="h3" style={{ marginBottom: 'var(--space-4)' }}>
              Barometric drop <em>→ 48h prodrome.</em>
            </h3>
            <PatternThread height={120} />
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap-component)' }} aria-label="Pattern library">
            {LIBRARY.map((p) => (
              <article key={p.title} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-3)' }}>
                  <span className="eyebrow subordinate">{p.state}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: p.r > 0 ? 'var(--brand-glow)' : 'var(--text-secondary)' }}>
                    r = {p.r.toFixed(2)}
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-base)', fontWeight: 600, color: 'var(--text-display)', marginBottom: 'var(--space-3)', letterSpacing: 'var(--ls-h3)' }}>
                  {p.title}
                </h4>
                <PatternThread height={40} emphasis={false} data={Array.from({ length: 14 }, (_, i) => 0.5 + Math.sin(i / 2 + p.title.length) * 0.2 * Math.sign(p.r))} ariaLabel={`${p.title} sparkline`} />
              </article>
            ))}
          </section>

          <section className="card-elevated" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
            <div className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Locked at Pro</div>
            <h3 className="h3" style={{ marginBottom: 'var(--space-3)' }}>
              Three more patterns are waiting. <em>Open them at Pro.</em>
            </h3>
            <button className="btn btn-secondary" style={{ marginTop: 'var(--space-4)' }}>Upgrade · $49.99 / mo</button>
          </section>
        </div>
      </PageShell>
    </>
  );
}
