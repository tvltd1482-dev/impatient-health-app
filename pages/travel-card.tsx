import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

export default function TravelCard() {
  return (
    <>
      <Head><title>iMpatient · Travel Card</title></Head>
      <PageShell current="/travel-card" crumb="Travel Card">
        <PageHero
          eyebrow="Travel Card · Pro"
          title="Your medical file,"
          emClause="in your pocket. Never in your luggage."
          body="Encrypted, agent-fronted, time-bound. Conditions, meds, allergies, infusion schedule, MCAS triggers. Shareable as a one-page PDF or QR code at ER intake."
        />
        <Queued issue="ISSUE-022" surface="Travel Card composer" />
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
