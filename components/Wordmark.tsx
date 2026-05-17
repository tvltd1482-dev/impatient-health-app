import * as React from 'react';

/*
  Wordmark — the cloud-mark seen at top-left of dev.impatient.app chrome.
  Default renders the cloud silhouette only (matching the live chrome).
  Set `withText` for hero contexts. The mønk variant renders the engine name
  with the literal stroked ø (never encoded as 'o' + combining stroke — the
  glyph carries patent identity).
*/

type Mark = 'impatient' | 'monk';

export default function Wordmark({
  mark = 'impatient',
  size = 24,
  withText = false,
  trademark = false,
}: {
  mark?: Mark;
  size?: number;
  withText?: boolean;
  trademark?: boolean;
}) {
  if (mark === 'monk') {
    return (
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: size,
          fontWeight: 500,
          letterSpacing: 'var(--tracking-tight)',
          color: 'inherit',
          display: 'inline-flex',
          alignItems: 'baseline',
        }}
        aria-label="monk, spelled m-o-n-k with a stroked o, pronounced monk"
      >
        m<span aria-hidden>ø</span><span style={{ position: 'absolute', left: -10000 }}>o</span>nk
        {trademark && (
          <span style={{ fontSize: '0.42em', marginLeft: '0.15ch', verticalAlign: 'super', color: 'var(--ink-7)' }}>™</span>
        )}
      </span>
    );
  }

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'inherit' }}
      aria-label="iMpatient"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        role="img"
        aria-hidden
      >
        <path
          d="M5.3 16.2 C3.5 16.2 2.4 14.6 3.2 13 C3.6 12 4.6 11.6 5.6 11.8 C5.3 9.6 6.9 7.9 9.1 8 C10.6 8 11.7 8.8 12.2 10 C12.8 9 13.9 8.7 15 9 C16.7 9.5 17.2 11 16.9 12.2 C18.5 12.1 19.7 13.4 19 15 C18.5 16 17.3 16.2 16.4 16.2 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withText && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: size * 0.7,
            fontWeight: 600,
            letterSpacing: 'var(--tracking-tight)',
          }}
        >
          iMpatient
          {trademark && (
            <span style={{ fontSize: '0.5em', marginLeft: '0.2ch', verticalAlign: 'super', color: 'var(--ink-7)' }}>™</span>
          )}
        </span>
      )}
    </span>
  );
}
