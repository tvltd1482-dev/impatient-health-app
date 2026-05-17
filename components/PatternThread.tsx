import * as React from 'react';

/*
  PatternThread — a longitudinal motif. Stroke uses --ink-3 (light on navy),
  baseline hairline uses --card-border, terminus dot uses --brand-glow.
  emphasis=false drops the terminus dot for tile-grid contexts.
*/

export default function PatternThread({
  data = [0.40, 0.42, 0.38, 0.45, 0.50, 0.48, 0.55, 0.60, 0.58, 0.65, 0.70, 0.68, 0.72, 0.78, 0.75, 0.82, 0.85, 0.81, 0.88, 0.90],
  height = 96,
  ariaLabel = 'A longitudinal pattern',
  emphasis = true,
}: {
  data?: number[];
  height?: number;
  ariaLabel?: string;
  emphasis?: boolean;
}) {
  const w = 600;
  const stepX = data.length > 1 ? w / (data.length - 1) : w;

  const path = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i * stepX).toFixed(2)} ${(height - v * height).toFixed(2)}`)
    .join(' ');

  const lastY = height - data[data.length - 1] * height;

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      style={{ width: '100%', height, display: 'block' }}
    >
      <line x1={0} y1={height - 0.5} x2={w} y2={height - 0.5} stroke="var(--card-border)" strokeWidth={1} />
      <path d={path} fill="none" stroke="var(--ink-3)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {emphasis && (
        <>
          <circle cx={w - 1} cy={lastY} r={6} fill="var(--brand-glow)" opacity="0.18" />
          <circle cx={w - 1} cy={lastY} r={3} fill="var(--brand-glow)" />
        </>
      )}
    </svg>
  );
}
