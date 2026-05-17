import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

const SECTIONS = [
  { title: 'Use of the service', body: 'iMpatient is a behavioral-intelligence partner. It is not a medical device. It does not diagnose, treat, cure, or prevent any condition.' },
  { title: 'Accounts',           body: 'Free / Essential / Pro / Enterprise. Each tier is a depth of integration and a depth of intelligence — never a withholding of dignity.' },
  { title: 'Limitations',        body: 'The engine reads patterns. It does not diagnose. The engine is wrong sometimes — your correction trains the read for next time.' },
  { title: 'Governing law',      body: 'Delaware, USA. SymbAIo Inc. Disputes resolved per Delaware law.' },
];

export default function Terms() {
  return (
    <>
      <Head><title>iMpatient · Terms</title></Head>
      <PageShell current="/terms" crumb="Terms">
        <PageHero
          eyebrow="Terms · draft"
          title="We are not the diagnosis."
          emClause="We are the mirror."
          body="STUB — required for store submission. Counsel must finalise this copy before May 30, 2026."
        />

        <div style={{ display: 'grid', gap: 'var(--gap-component)', marginTop: 'var(--gap-stack)' }}>
          {SECTIONS.map((s) => (
            <article key={s.title} className="card">
              <h2 className="h3" style={{ marginBottom: 'var(--space-3)' }}>{s.title}</h2>
              <p className="body">{s.body}</p>
            </article>
          ))}
        </div>
      </PageShell>
    </>
  );
}
