import * as React from 'react';
import { useState } from 'react';

/*
  InviteGate — the only gate today is INVITE_CODE (per .env.example).
  Surface uses Withings form chrome (mono-caps eyebrow, 1.5px outlined input,
  brand-soft focus glow). Voice: calm, explicit. No exclamation marks.
*/

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
    <form
      onSubmit={submit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 360 }}
    >
      <label htmlFor="invite" className="eyebrow">Invite code</label>
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
          background: 'rgba(10, 18, 48, 0.32)',
          color: 'var(--ink-0)',
          border: '1.5px solid var(--card-border)',
          borderRadius: 'var(--radius-2)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          outline: 'none',
          transition: 'border-color var(--dur-fast) var(--ease-aura), box-shadow var(--dur-fast) var(--ease-aura)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--brand-soft)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(122, 184, 255, 0.18)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--card-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {error && (
        <span role="alert" style={{ color: 'var(--brand-glow)', fontSize: 'var(--t-sm)' }}>
          {error}
        </span>
      )}
      <button
        type="submit"
        style={{
          marginTop: 'var(--space-2)',
          padding: 'var(--space-3) var(--space-5)',
          background: 'var(--brand-soft)',
          color: 'var(--aura-bg-0)',
          border: 0,
          borderRadius: 'var(--radius-2)',
          fontWeight: 600,
          letterSpacing: 'var(--tracking-snug)',
        }}
      >
        Continue
      </button>
    </form>
  );
}
