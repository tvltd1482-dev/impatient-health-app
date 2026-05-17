import * as React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function PageShell({
  current,
  crumb,
  children,
}: {
  current: string;
  crumb: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        minHeight: '100dvh',
      }}
    >
      <Sidebar current={current} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar crumb={crumb} />
        <main
          id="main"
          style={{
            flex: 1,
            padding: 'var(--space-8) var(--space-10)',
            maxWidth: 'var(--container-lg)',
            width: '100%',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
