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
          body="Flare windows projected from your indexed history. The trip, the appointment, the launch week, the school holiday — long-range pattern projection, not horoscope."
        />
        <Queued issue="ISSUE-020" surface="Foresight detail (flare window drill-down)" />
      </PageShell>
    </>
  );
}

function Queued({ issue, surface }: { issue: string; surface: string }) {
  return (
    <section style={{ padding: 'var(--space-7) 0', display: 'grid', gap: 'var(--space-3)' }}>
      <div className="card" style={{ padding: 'var(--space-7)', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>Queued</div>
        <div style={{ color: 'var(--ink-3)' }}>{surface} — see /_refinement/sprint-board for {issue}.</div>
      </div>
    </section>
  );
}
