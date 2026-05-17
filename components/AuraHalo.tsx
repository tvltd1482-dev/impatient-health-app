import * as React from 'react';
import { useEffect, useState } from 'react';

/*
  AuraHalo — the brand's first impression on every page hero.
  Two layered radial gradients with offset breathing. Hue shifts gently by time
  of day (dawn warmer, evening cooler). Honors prefers-reduced-motion via the
  global stylesheet token.
  Constitution: CLAUDE.md "The aura design system — luminous bright-blue aura on deep navy."
*/

function useAuraTone() {
  const [hue, setHue] = useState(220);
  useEffect(() => {
    const compute = () => {
      const h = new Date().getHours();
      const t = h < 6 ? 215 : h < 12 ? 222 : h < 18 ? 218 : 232;
      setHue(t);
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);
  return hue;
}

export default function AuraHalo({ intensity = 0.95 }: { intensity?: number }) {
  const hue = useAuraTone();
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <div
        className="aura-halo-disc"
        style={{
          position: 'absolute',
          left: '50%',
          top: '45%',
          width: '120%',
          aspectRatio: '1.6 / 1',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(ellipse at center,
            hsla(${hue},92%,86%,${intensity}) 0%,
            hsla(${hue},80%,72%,${intensity * 0.55}) 25%,
            hsla(${hue + 12},70%,52%,${intensity * 0.18}) 55%,
            hsla(${hue + 18},60%,16%,0) 75%)`,
          filter: 'blur(20px)',
          animation: 'aura-breath var(--dur-breath) ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes aura-breath {
          0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: ${intensity}; }
          50%      { transform: translate(-50%, -50%) scale(1.04); opacity: ${intensity * 0.88}; }
        }
      `}</style>
    </div>
  );
}
