import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

export default function CostOfCare() {
  return (
    <>
      <Head><title>iMpatient · Cost of Care</title></Head>
      <PageShell current="/cost-of-care" crumb="Cost of Care">
        <PageHero
          eyebrow="Cost of Care · Pro"
          title="What your illness is costing you,"
          emClause="made visible."
          body="Out-of-pocket spend tracked alongside flares. Per-trip, per-month, per-quarter, per-condition. Budgeting your illness is part of living with it — especially when it will never be covered by insurance."
        />
        <Queued issue="ISSUE-024" surface="Cost of Care ledger" />
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
