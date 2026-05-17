import * as React from 'react';
import Link from 'next/link';
import Wordmark from './Wordmark';

/*
  Sidebar — chrome from dev.impatient.app: cloud-mark top-left, then three
  eyebrow sections (NOW / LIFE ADMIN / EVIDENCE) with route rows beneath.
  Badges on rows are time-anchored ("Tue", "Thu", "7") — not decoration.
*/

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
        padding: 'var(--space-5) var(--space-4)',
        borderRight: '1px solid var(--card-border)',
        background: 'rgba(6, 9, 32, 0.6)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Link href="/" style={{ borderBottom: 0, display: 'inline-flex', padding: 'var(--space-2)' }} aria-label="iMpatient · Today">
        <Wordmark size={28} />
      </Link>

      <nav style={{ marginTop: 'var(--space-7)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {SECTIONS.map((section) => (
          <div key={section.eyebrow}>
            <div className="eyebrow" style={{ marginBottom: 'var(--space-3)', paddingLeft: 'var(--space-2)' }}>
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
                        borderRadius: 'var(--radius-2)',
                        background: isActive ? 'var(--card-bg)' : 'transparent',
                        border: isActive ? '1px solid var(--card-border)' : '1px solid transparent',
                        color: isActive ? 'var(--ink-0)' : 'var(--ink-5)',
                        fontSize: 'var(--t-sm)',
                        borderBottom: isActive ? '1px solid var(--card-border)' : '1px solid transparent',
                      }}
                    >
                      <span>{row.label}</span>
                      {row.badge && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--t-xs)',
                            color: 'var(--ink-7)',
                            background: 'var(--aura-bg-2)',
                            padding: '1px 6px',
                            borderRadius: 'var(--radius-1)',
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
