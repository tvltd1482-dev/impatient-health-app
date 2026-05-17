import * as React from 'react';

/*
  Topbar — header strip with mono-caps breadcrumb on the left and chrome
  badges on the right ("live · Last sync 2m · Export"). Per the live build.
*/

export default function Topbar({
  crumb = 'Today',
  lastSync = '2m',
  live = true,
}: {
  crumb?: string;
  lastSync?: string;
  live?: boolean;
}) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-4) var(--space-6)',
        borderBottom: '1px solid var(--card-border)',
        background: 'rgba(6, 9, 32, 0.6)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="eyebrow"
        style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'baseline' }}
        aria-label={`iMpatient — ${crumb}`}
      >
        <span style={{ color: 'var(--ink-7)' }}>iMpatient</span>
        <span style={{ color: 'var(--ink-9)' }}>/</span>
        <span style={{ color: 'var(--ink-0)' }}>{crumb}</span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', fontSize: 'var(--t-sm)', color: 'var(--ink-5)' }}>
        {live && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--brand-glow)',
                boxShadow: '0 0 0 4px rgba(184, 212, 255, 0.18)',
              }}
            />
            <span style={{ color: 'var(--ink-0)' }}>live</span>
          </span>
        )}
        <span aria-hidden style={{ color: 'var(--ink-9)' }}>·</span>
        <span>Last sync <span style={{ fontFamily: 'var(--font-mono)' }}>{lastSync}</span></span>
        <button
          type="button"
          style={{
            background: 'var(--aura-bg-2)',
            color: 'var(--ink-0)',
            border: '1px solid var(--card-border)',
            padding: 'var(--space-1) var(--space-3)',
            borderRadius: 'var(--radius-2)',
            fontSize: 'var(--t-sm)',
            fontWeight: 500,
          }}
        >
          Export
        </button>
      </div>
    </header>
  );
}
