import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

export default function Foresight() {
  return (
    <>
      <Head><title>iMpatient · Foresight</title></Head>
      <PageShell current="/foresight" crumb="Foresight">
        <PageHero
          eyebrow="Foresight · Pro"
          title="Seventy-two hours,"
          emClause="held in advance."
          body="Flare windows projected from your indexed history. The trip, the appointment, the launch week — long-range pattern projection, not horoscope."
        />
        <Queued issue="ISSUE-020" surface="Foresight detail · flare window drill-down" />
      </PageShell>
    </>
  );
}

function Queued({ issue, surface }: { issue: string; surface: string }) {
  return (
    <section className="card" style={{ padding: 'var(--space-12)', textAlign: 'center', marginTop: 'var(--gap-stack)' }}>
      <div className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>Queued</div>
      <div className="body" style={{ color: 'var(--text-body)' }}>{surface}</div>
      <div className="caption" style={{ marginTop: 'var(--space-2)' }}>see /_refinement/sprint-board for {issue}</div>
    </section>
  );
}
