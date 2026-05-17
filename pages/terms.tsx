import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

export default function Terms() {
  return (
    <>
      <Head><title>iMpatient · Terms</title></Head>
      <PageShell current="/terms" crumb="Terms">
        <PageHero
          eyebrow="Terms · draft"
          title="We are not the diagnosis."
          emClause="We are the mirror."
          body="STUB — required for store submission. Counsel must finalise this copy before May 30, 2026. Governing law: Delaware, USA. SymbAIo Inc."
        />

        <section style={{ padding: 'var(--space-6) 0 var(--space-9)', maxWidth: 640, display: 'grid', gap: 'var(--space-5)' }}>
          <Section title="Use of the service">
            <p>iMpatient is provided as a behavioral-intelligence partner. It is not a medical device. It does not replace clinical care.</p>
          </Section>
          <Section title="Accounts">
            <p>Tiers: Free / Essential / Pro / Enterprise. Each tier is a depth of integration and a depth of intelligence — never a withholding of dignity.</p>
          </Section>
          <Section title="Limitations">
            <p>The engine reads patterns. It does not diagnose. It translates what your body has been telling you.</p>
          </Section>
          <Section title="Governing law">
            <p>Delaware, USA. SymbAIo Inc.</p>
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
