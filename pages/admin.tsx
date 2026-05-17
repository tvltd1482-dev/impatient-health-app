import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

export default function Admin() {
  return (
    <>
      <Head><title>iMpatient · Appointments</title></Head>
      <PageShell current="/admin" crumb="Appointments">
        <PageHero
          eyebrow="Admin · Pro"
          title="What Coach owes your life this week."
          emClause="Approve, dismiss, modify."
          body="The appointment queue, the refill queue, the insurance queue, the document queue. Coach handles. You approve. Vagal calm is the deliverable."
        />
        <Queued issue="ISSUE-023" surface="Admin queue · agentic actions" />
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
