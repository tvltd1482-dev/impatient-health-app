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
        <Queued issue="ISSUE-010" surface="Coach surface · Anthropic SDK port from window.claude.complete" />
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
