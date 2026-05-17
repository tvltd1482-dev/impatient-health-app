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
          body="Encrypted, agent-fronted, time-bound. Conditions, meds, allergies, infusion schedule, MCAS triggers, emergency contacts, specialist protocols. Shareable as a one-page PDF or QR code at ER intake."
        />
        <Queued issue="ISSUE-022" surface="Travel Card composer" />
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
