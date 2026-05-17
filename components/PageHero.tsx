import * as React from 'react';
import AuraHalo from './AuraHalo';

/*
  PageHero — the aura-hero zone. Every page on iMpatient gets one.
  Eyebrow + headline (with optional <em> italic clause) + body lede, plus a
  right-aligned meta slot for tier/persona context.
  Constitution: HANDOFF "Every page hero gets aura-hero + AuraHalo".
*/

export default function PageHero({
  eyebrow,
  title,
  emClause,
  body,
  meta,
}: {
  eyebrow: string;
  title: string;
  emClause?: string;
  body?: string;
  meta?: React.ReactNode;
}) {
  return (
    <section className="aura-hero">
      <AuraHalo />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 'var(--space-6)',
          alignItems: 'end',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span className="eyebrow">{eyebrow}</span>
          <h1
            style={{
              fontSize: 'var(--t-3xl)',
              lineHeight: 'var(--leading-display)',
              fontWeight: 600,
              maxWidth: 720,
            }}
          >
            {title}
            {emClause && (
              <>
                {' '}
                <em>{emClause}</em>
              </>
            )}
          </h1>
          {body && (
            <p
              style={{
                fontSize: 'var(--t-md)',
                color: 'var(--ink-3)',
                maxWidth: 640,
                lineHeight: 1.55,
              }}
            >
              {body}
            </p>
          )}
        </div>
        {meta && <div style={{ alignSelf: 'end', textAlign: 'right' }}>{meta}</div>}
      </div>
    </section>
  );
}
