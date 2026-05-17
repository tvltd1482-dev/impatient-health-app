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
    <section className="card" style={{ padding: 'var(--space-12)', textAlign: 'center', marginTop: 'var(--gap-stack)' }}>
      <div className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>Queued</div>
      <div className="body" style={{ color: 'var(--text-body)' }}>{surface}</div>
      <div className="caption" style={{ marginTop: 'var(--space-2)' }}>see /_refinement/sprint-board for {issue}</div>
    </section>
  );
}
