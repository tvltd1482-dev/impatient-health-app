import * as React from 'react';
import AuraHalo from './AuraHalo';

/*
  PageHero — aura-hero zone. Meta lives on its own row above the headline so it
  never overlaps the em-clause when the title runs long.
  Constitution: HANDOFF — "Every page hero gets aura-hero + AuraHalo".
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-component)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 'var(--space-6)',
          flexWrap: 'wrap',
        }}>
          <span className="eyebrow">{eyebrow}</span>
          {meta && <div style={{ textAlign: 'right' }}>{meta}</div>}
        </div>

        <h1 className="h1" style={{ maxWidth: 880 }}>
          {title}
          {emClause && (
            <>
              {' '}
              <em>{emClause}</em>
            </>
          )}
        </h1>

        {body && (
          <p className="lede" style={{ marginTop: 'var(--space-2)' }}>
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
