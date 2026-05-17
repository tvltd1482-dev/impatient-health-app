import * as React from 'react';
import { useEffect, useState } from 'react';

/*
  AuraHalo — luminous brand-blue halo behind every page hero.
  Single subtle disc tuned for chrome behind body content (not the demo bible's
  full-bleed treatment). Time-of-day hue shift (dawn warmer, evening cooler).
  Honors prefers-reduced-motion via globals.css.
*/

function useAuraTone() {
  const [hue, setHue] = useState(220);
  useEffect(() => {
    const compute = () => {
      const h = new Date().getHours();
      setHue(h < 6 ? 215 : h < 12 ? 222 : h < 18 ? 218 : 232);
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);
  return hue;
}

export default function AuraHalo({ intensity = 0.55 }: { intensity?: number }) {
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
        style={{
          position: 'absolute',
          left: '20%',
          top: '20%',
          width: '70%',
          aspectRatio: '1.4 / 1',
          background: `radial-gradient(ellipse at center,
            hsla(${hue},92%,82%,${intensity}) 0%,
            hsla(${hue},80%,68%,${intensity * 0.4}) 30%,
            hsla(${hue + 12},70%,48%,${intensity * 0.12}) 60%,
            hsla(${hue + 18},60%,16%,0) 80%)`,
          filter: 'blur(40px)',
          animation: 'aura-breath var(--dur-breath) ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes aura-breath {
          0%, 100% { transform: scale(1);    opacity: ${intensity}; }
          50%      { transform: scale(1.04); opacity: ${intensity * 0.88}; }
        }
      `}</style>
    </div>
  );
}
