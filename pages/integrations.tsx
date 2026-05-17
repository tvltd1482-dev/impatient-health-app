import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { PERSONAS, DEFAULT_PERSONA } from '../components/personas';

export default function Integrations() {
  const p = PERSONAS[DEFAULT_PERSONA];
  return (
    <>
      <Head><title>iMpatient · Integrations</title></Head>
      <PageShell current="/integrations" crumb="Integrations">
        <PageHero
          eyebrow="Sources · privacy first, controls second"
          title="Volume only. Timing only."
          emClause="Never the text."
          body="iMpatient reads when the world is asking a lot of you, not what it is asking. Toggle off any source at any time. The user owns every byte."
        />

        <section style={{ padding: 'var(--space-7) 0', display: 'grid', gap: 'var(--space-4)' }}>
          <div className="eyebrow">Connected · {p.name}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
            {p.systems.map((src) => (
              <article key={src} className="card" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 'var(--t-base)', fontWeight: 500 }}>{src}</h3>
                  <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-glow)', boxShadow: '0 0 0 4px rgba(184,212,255,0.16)' }} />
                </div>
                <span className="eyebrow">Reading since · Mar 14</span>
              </article>
            ))}
          </div>
          <Queued issue="ISSUE-013" surface="Full Integrations port (tier-locked cards, custom 24×24 mono-glyphs, six groupings)" />
        </section>
      </PageShell>
    </>
  );
}

function Queued({ issue, surface }: { issue: string; surface: string }) {
  return (
    <div className="card" style={{ padding: 'var(--space-7)', textAlign: 'center', marginTop: 'var(--space-5)' }}>
      <div className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>Queued</div>
      <div style={{ color: 'var(--ink-3)' }}>{surface} — see /_refinement/sprint-board for {issue}.</div>
    </div>
  );
}
