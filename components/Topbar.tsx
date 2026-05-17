import * as React from 'react';

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
        padding: 'var(--space-4) var(--space-8)',
        borderBottom: '1px solid var(--border-default)',
        background: 'var(--bg-surface)',
      }}
    >
      <div
        className="eyebrow subordinate"
        style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'baseline' }}
        aria-label={`iMpatient — ${crumb}`}
      >
        <span style={{ color: 'var(--text-secondary)' }}>iMpatient</span>
        <span style={{ color: 'var(--text-disabled)' }}>/</span>
        <span style={{ color: 'var(--text-display)' }}>{crumb}</span>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center', fontSize: 'var(--t-sm)', color: 'var(--text-body)' }}>
        {live && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--brand-glow)',
                boxShadow: '0 0 0 4px rgba(168, 212, 255, 0.18)',
              }}
            />
            <span style={{ color: 'var(--text-display)' }}>live</span>
          </span>
        )}
        <span aria-hidden style={{ color: 'var(--text-disabled)' }}>·</span>
        <span>Last sync <span style={{ fontFamily: 'var(--font-mono)' }}>{lastSync}</span></span>
        <button type="button" className="btn btn-secondary" style={{ padding: '8px 14px' }}>
          Export
        </button>
      </div>
    </header>
  );
}
