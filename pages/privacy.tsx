import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

export default function Privacy() {
  return (
    <>
      <Head><title>iMpatient · Privacy</title></Head>
      <PageShell current="/privacy" crumb="Privacy">
        <PageHero
          eyebrow="Privacy · draft"
          title="The user owns every byte."
          emClause="Always. Forever."
          body="STUB — required for Apple App Store and Google Play submission. Counsel must finalise this copy before May 30, 2026. SymbAIo Inc. — Delaware C-corp, TELLER Ventures portfolio."
        />

        <section style={{ padding: 'var(--space-6) 0 var(--space-9)', maxWidth: 640, display: 'grid', gap: 'var(--space-5)' }}>
          <Section title="What we read">
            <p>Wearable streams, calendars by life domain, communication volume and timing only — <em>never the content of your messages</em>. Weather and barometric pressure at your origin and destination. Travel and clinical-setting metadata.</p>
          </Section>
          <Section title="What we never read">
            <p>The text of your messages. The bodies of your emails. The contents of your notes. The audio of your calls.</p>
          </Section>
          <Section title="Where it lives">
            <p>Your record is held in encrypted storage. The Travel Card is agent-fronted, time-bound, and key-controlled by you.</p>
          </Section>
          <Section title="Aggregate intelligence">
            <p>Enterprise customers see anonymised population signal at the source. Individual records never leave your account without explicit, revocable consent.</p>
          </Section>
          <Section title="Contact">
            <p><a href="mailto:privacy@impatient.app">privacy@impatient.app</a></p>
          </Section>
        </section>
      </PageShell>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article>
      <h2 style={{ fontSize: 'var(--t-lg)', marginBottom: 'var(--space-2)' }}>{title}</h2>
      <div style={{ color: 'var(--ink-3)' }}>{children}</div>
    </article>
  );
}
