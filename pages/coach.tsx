import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

export default function Coach() {
  return (
    <>
      <Head><title>iMpatient · Coach</title></Head>
      <PageShell current="/coach" crumb="Coach">
        <PageHero
          eyebrow="Coach · Anthropic-powered"
          title="Talk through your signals,"
          emClause="like a person."
          body="Coach reads your record before you arrive. Persona-specific system prompt, threaded conversation, context strip on every reply."
        />
        <Queued issue="ISSUE-010" surface="Coach surface (Anthropic SDK port from window.claude.complete)" />
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
