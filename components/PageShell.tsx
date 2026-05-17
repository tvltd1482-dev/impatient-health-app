import * as React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/*
  PageShell — common chrome for every surface in the product (sidebar + topbar
  + main column). Mirrors the layout of the artifact prototype's index.html.
*/

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
        <main style={{ flex: 1, padding: 'var(--space-6) var(--space-7)', maxWidth: 1080, width: '100%' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
