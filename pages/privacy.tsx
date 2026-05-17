import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

const SECTIONS = [
  { title: 'What we read',          body: 'Wearable streams, calendars by life domain, communication volume and timing only — never the content of your messages. Weather and barometric pressure at your origin and destination. Travel and clinical-setting metadata.' },
  { title: 'What we never read',    body: 'The text of your messages. The bodies of your emails. The contents of your notes. The audio of your calls.' },
  { title: 'Where it lives',        body: 'Your record is held in encrypted storage. The Travel Card is agent-fronted, time-bound, and key-controlled by you.' },
  { title: 'Aggregate intelligence', body: 'Enterprise customers see anonymised population signal at the source. Individual records never leave your account without explicit, revocable consent.' },
];

export default function Privacy() {
  return (
    <>
      <Head><title>iMpatient · Privacy</title></Head>
      <PageShell current="/privacy" crumb="Privacy">
        <PageHero
          eyebrow="Privacy · draft"
          title="The user owns every byte."
          emClause="Always. Forever."
          body="STUB — required for Apple App Store and Google Play submission. Counsel must finalise this copy before May 30, 2026."
        />

        <div style={{ display: 'grid', gap: 'var(--gap-component)', marginTop: 'var(--gap-stack)' }}>
          {SECTIONS.map((s) => (
            <article key={s.title} className="card">
              <h2 className="h3" style={{ marginBottom: 'var(--space-3)' }}>{s.title}</h2>
              <p className="body">{s.body}</p>
            </article>
          ))}
          <article className="card">
            <h2 className="h3" style={{ marginBottom: 'var(--space-3)' }}>Contact</h2>
            <p className="body"><a href="mailto:privacy@impatient.app">privacy@impatient.app</a></p>
          </article>
        </div>
      </PageShell>
    </>
  );
}
