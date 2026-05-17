import * as React from 'react';
import Link from 'next/link';
import Wordmark from './Wordmark';

type Row = { label: string; href: string; badge?: string };
type Section = { eyebrow: string; rows: Row[] };

const SECTIONS: Section[] = [
  {
    eyebrow: 'Now',
    rows: [
      { label: 'Today',     href: '/' },
      { label: 'Foresight', href: '/foresight', badge: 'Thu' },
      { label: 'Coach',     href: '/coach' },
    ],
  },
  {
    eyebrow: 'Life admin',
    rows: [
      { label: 'Appointments', href: '/admin',       badge: 'Tue' },
      { label: 'Admin queue',  href: '/admin/queue', badge: '7'   },
      { label: 'Travel Card',  href: '/travel-card' },
      { label: 'Cost of Care', href: '/cost-of-care' },
    ],
  },
  {
    eyebrow: 'Evidence',
    rows: [
      { label: 'Patterns',           href: '/patterns' },
      { label: 'Conditions library', href: '/conditions' },
      { label: 'Care directory',     href: '/care' },
      { label: 'Integrations',       href: '/integrations' },
      { label: 'Profile',            href: '/profile' },
    ],
  },
];

export default function Sidebar({ current = '/' }: { current?: string }) {
  return (
    <aside
      style={{
        position: 'sticky',
        top: 0,
        alignSelf: 'start',
        width: 240,
        minHeight: '100dvh',
        padding: 'var(--space-6) var(--space-5)',
        borderRight: '1px solid var(--border-default)',
        background: 'var(--bg-surface)',
      }}
    >
      <Link href="/" style={{ borderBottom: 0, display: 'inline-flex', padding: 'var(--space-2)' }} aria-label="iMpatient · Today">
        <Wordmark variant="mark" size={32} tone="light" />
      </Link>

      <nav style={{ marginTop: 'var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-stack)' }}>
        {SECTIONS.map((section) => (
          <div key={section.eyebrow}>
            <div className="eyebrow subordinate" style={{ marginBottom: 'var(--space-3)', paddingLeft: 'var(--space-2)' }}>
              {section.eyebrow}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.rows.map((row) => {
                const isActive = row.href === current;
                return (
                  <li key={row.href}>
                    <Link
                      href={row.href}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'var(--bg-elevated)' : 'transparent',
                        color: isActive ? 'var(--text-display)' : 'var(--text-body)',
                        fontSize: 'var(--t-sm)',
                        borderBottom: 0,
                      }}
                    >
                      <span>{row.label}</span>
                      {row.badge && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--t-xs)',
                            color: 'var(--text-secondary)',
                            background: 'var(--bg-elevated)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          {row.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
