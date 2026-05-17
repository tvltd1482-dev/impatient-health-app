import * as React from 'react';
import { useState } from 'react';

export default function InviteGate({ onPass }: { onPass?: (code: string) => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) { setError('Enter the invite you were given.'); return; }
    setError('');
    onPass?.(code.trim());
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 360 }}>
      <label htmlFor="invite" className="eyebrow subordinate">Invite code</label>
      <input
        id="invite"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        autoComplete="off"
        spellCheck={false}
        placeholder="MNK-XXXX-XXXX"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-base)',
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--bg-surface)',
          color: 'var(--text-display)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          outline: 'none',
        }}
      />
      {error && <span role="alert" style={{ color: 'var(--flare)', fontSize: 'var(--t-sm)' }}>{error}</span>}
      <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>Continue</button>
    </form>
  );
}
