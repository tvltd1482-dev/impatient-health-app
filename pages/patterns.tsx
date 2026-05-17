import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import PatternThread from '../components/PatternThread';

export default function Patterns() {
  return (
    <>
      <Head><title>iMpatient · Patterns</title></Head>
      <PageShell current="/patterns" crumb="Patterns">
        <PageHero
          eyebrow="Patterns · evidence library"
          title="The shape your body has been drawing,"
          emClause="for fourteen weeks."
          body="Your own data, organised by the relationships the engine has found and you have confirmed. This is what you show your doctor. This is what wins an insurance appeal."
        />

        <section style={{ padding: 'var(--space-7) 0', display: 'grid', gap: 'var(--space-5)' }}>
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>Pattern · driving today’s prediction</div>
            <h3 style={{ fontSize: 'var(--t-xl)' }}>Barometric drop → 48h prodrome, r = 0.74</h3>
            <p style={{ color: 'var(--ink-3)', maxWidth: 560, marginTop: 'var(--space-3)' }}>
              Every flight you’ve taken to a lower-pressure city in the last fourteen months has been followed by a flare within 48 hours. Geneva’s forecast is 18mb below D.C.
            </p>
            <div style={{ marginTop: 'var(--space-4)' }}>
              <PatternThread />
            </div>
          </div>

          <Queued issue="ISSUE-011" surface="Patterns library grid + locked-pattern tier hint" />
        </section>
      </PageShell>
    </>
  );
}

function Queued({ issue, surface }: { issue: string; surface: string }) {
  return (
    <div className="card" style={{ padding: 'var(--space-7)', textAlign: 'center' }}>
      <div className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>Queued</div>
      <div style={{ color: 'var(--ink-3)' }}>{surface} — see /_refinement/sprint-board for {issue}.</div>
    </div>
  );
}
