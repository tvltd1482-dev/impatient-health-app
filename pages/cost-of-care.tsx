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
          body="Out-of-pocket spend tracked alongside flares. Per-trip, per-month, per-condition. Budgeting your illness is part of living with it."
        />
        <Queued issue="ISSUE-024" surface="Cost of Care ledger" />
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
