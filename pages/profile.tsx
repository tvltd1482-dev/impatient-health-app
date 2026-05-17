import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { PERSONAS, DEFAULT_PERSONA } from '../components/personas';

export default function Profile() {
  const p = PERSONAS[DEFAULT_PERSONA];
  return (
    <>
      <Head><title>iMpatient · Profile</title></Head>
      <PageShell current="/profile" crumb="Profile">
        <PageHero
          eyebrow={`${p.tier} · ${p.name}`}
          title={`${p.name}, this is your record.`}
          emClause="Held by you."
          body="Identity, preferences, connected sources. Each field gets room. You are asked for very little."
        />

        <section className="card" style={{ padding: 'var(--space-10)', textAlign: 'center', marginTop: 'var(--gap-stack)' }}>
          <div className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>Queued</div>
          <div className="body">Withings-inspired form chrome port</div>
          <div className="caption" style={{ marginTop: 'var(--space-2)' }}>see /_refinement/sprint-board for ISSUE-009</div>
        </section>
      </PageShell>
    </>
  );
}
