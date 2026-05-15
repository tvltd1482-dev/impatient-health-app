/* Breathing object — six exploration variants of iMpatient's signature
   visual presence. The breathing object is what the user sees when:
     - the app is listening, between visits
     - a moment needs to breathe (loaders, transitions)
     - the brand needs a hero presence (splash, marketing)

   Each variant has a different voice:
     LuminousOrb     · The Listener   · "I am calm, I am here"
     ConcentricRings · The Pulse      · "I am listening at intervals"
     MeshGradient    · The Living     · "I am alive, I am unique"
     Constellation   · The Signal     · "I am made of your signals"
     HeartbeatTrace  · The Rhythm     · "I am clinical, I am rhythm"
     MarkOrb         · The Brand      · "I am the brand, breathing"

   All variants accept a `size` (square px) and `speed` (1 = default,
   higher = faster). Sized via inline width/height so they can be used
   inline anywhere without CSS overrides.
*/

function LuminousOrb({ size = 220, speed = 1 }) {
  const animMul = `${1 / speed}`;
  return (
    <div className="bo bo-luminous" style={{ width: size, height: size, ['--bo-speed']: animMul }}>
      <div className="bo-luminous-halo" />
      <div className="bo-luminous-core" />
      <div className="bo-luminous-highlight" />
    </div>
  );
}

function ConcentricRings({ size = 220, speed = 1 }) {
  const animMul = `${1 / speed}`;
  return (
    <div className="bo bo-rings" style={{ width: size, height: size, ['--bo-speed']: animMul }}>
      <div className="bo-ring bo-ring-1" />
      <div className="bo-ring bo-ring-2" />
      <div className="bo-ring bo-ring-3" />
      <div className="bo-ring bo-ring-4" />
      <div className="bo-rings-center" />
    </div>
  );
}

function MeshGradient({ size = 240, speed = 1 }) {
  // Aurora — vertical ribbons of light, modeled on the northern lights.
  // The previous mesh read as planetary/fetal because of the perfect
  // circle + clipping. This version has no container silhouette: the
  // ribbons themselves are the shape, fading top/bottom into transparency.
  // Five swaying curtains (green/cyan/blue-white/violet/pink) on 4.8–7s
  // loops, plus a few twinkling stars for sky context.
  const animMul = `${1 / speed}`;
  const W = 240;
  const H = 240;
  // Star positions — fixed seed so the constellation is consistent
  const STARS = [
    [42, 32], [188, 48], [62, 198], [202, 178], [108, 14],
    [156, 212], [28, 138], [212, 92], [82, 76], [128, 230],
  ];
  return (
    <div className="bo bo-mesh" style={{ width: size, height: size, ['--bo-speed']: animMul }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="bo-mesh-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="bo-rib-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(140, 255, 200, 0)" />
            <stop offset="34%"  stopColor="rgba(140, 255, 200, 0.92)" />
            <stop offset="68%"  stopColor="rgba(90, 220, 200, 0.55)" />
            <stop offset="100%" stopColor="rgba(90, 220, 200, 0)" />
          </linearGradient>
          <linearGradient id="bo-rib-cyan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(90, 229, 216, 0)" />
            <stop offset="40%"  stopColor="rgba(120, 240, 235, 0.85)" />
            <stop offset="100%" stopColor="rgba(90, 200, 230, 0)" />
          </linearGradient>
          <linearGradient id="bo-rib-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(220, 235, 255, 0)" />
            <stop offset="46%"  stopColor="rgba(230, 240, 255, 1)" />
            <stop offset="100%" stopColor="rgba(122, 184, 255, 0)" />
          </linearGradient>
          <linearGradient id="bo-rib-violet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(178, 148, 255, 0)" />
            <stop offset="44%"  stopColor="rgba(178, 148, 255, 0.85)" />
            <stop offset="100%" stopColor="rgba(178, 148, 255, 0)" />
          </linearGradient>
          <linearGradient id="bo-rib-pink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255, 184, 224, 0)" />
            <stop offset="52%"  stopColor="rgba(255, 184, 224, 0.75)" />
            <stop offset="100%" stopColor="rgba(255, 184, 224, 0)" />
          </linearGradient>
          <filter id="bo-aurora-soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" />
          </filter>
        </defs>

        {/* Stars */}
        {STARS.map(([x, y], i) => (
          <circle
            key={i}
            cx={x} cy={y} r={(i % 4 === 0) ? 1.1 : 0.7}
            fill="rgba(255, 255, 255, 0.88)"
            style={{ animation: `bo-aurora-twinkle ${(2.4 + (i % 3) * 0.9) / speed}s ease-in-out ${(i * 0.45) / speed}s infinite` }}
          />
        ))}

        {/* Five aurora ribbons. Each is a stroke with a vertical
            gradient that fades to transparent top/bottom — gives the
            soft, edge-less aurora feel. Whole group is blurred. */}
        <g filter="url(#bo-aurora-soften)">
          <path className="bo-rib bo-rib-1"
            d="M 50,-20 C 72,38 32,96 52,152 C 70,202 52,260 52,260"
            stroke="url(#bo-rib-green)" strokeWidth="34" fill="none" strokeLinecap="round" />
          <path className="bo-rib bo-rib-2"
            d="M 96,-20 C 120,52 78,112 104,166 C 122,216 100,260 100,260"
            stroke="url(#bo-rib-cyan)"  strokeWidth="26" fill="none" strokeLinecap="round" />
          <path className="bo-rib bo-rib-3"
            d="M 132,-20 C 156,46 116,116 140,180 C 156,226 134,260 134,260"
            stroke="url(#bo-rib-blue)"  strokeWidth="14" fill="none" strokeLinecap="round" />
          <path className="bo-rib bo-rib-4"
            d="M 170,-20 C 196,60 156,114 176,180 C 192,226 172,260 172,260"
            stroke="url(#bo-rib-violet)" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path className="bo-rib bo-rib-5"
            d="M 210,-20 C 232,50 192,106 218,176 C 232,220 212,260 212,260"
            stroke="url(#bo-rib-pink)"  strokeWidth="20" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function Constellation({ size = 220, speed = 1 }) {
  // SVG with dots arranged in a 'constellation' and a central spark
  // glyph that pulses (references the spark inside the brand mark).
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;
  // Hand-tuned positions on roughly two concentric rings, with mild
  // randomization. Big stars at every 5th index, the rest are small.
  const SEED = [
    [0.95, 0.10], [0.80, 0.35], [0.85, 0.55], [0.95, 0.75], [0.78, 0.95],
    [0.55, 1.05], [0.30, 1.02], [0.05, 0.90], [-0.05, 0.65], [-0.05, 0.40],
    [0.05, 0.15], [0.30, 0.02], [0.55, 0.00], [0.70, 0.20], [0.40, 0.20],
    [0.45, 0.40], [0.30, 0.55], [0.55, 0.60], [0.70, 0.75], [0.50, 0.80],
    [0.20, 0.75], [0.85, 0.25], [0.15, 0.30], [0.65, 0.45],
  ];
  // Spark glyph (four-point star) — close to the mark's internal spark.
  const sparkPath = (cx, cy, scale) => {
    const s = scale;
    return `M ${cx} ${cy - 18 * s}
            C ${cx + 4 * s} ${cy - 6 * s} ${cx + 6 * s} ${cy - 4 * s} ${cx + 18 * s} ${cy}
            C ${cx + 6 * s} ${cy + 4 * s} ${cx + 4 * s} ${cy + 6 * s} ${cx} ${cy + 18 * s}
            C ${cx - 4 * s} ${cy + 6 * s} ${cx - 6 * s} ${cy + 4 * s} ${cx - 18 * s} ${cy}
            C ${cx - 6 * s} ${cy - 4 * s} ${cx - 4 * s} ${cy - 6 * s} ${cx} ${cy - 18 * s} Z`;
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="bo bo-constellation" style={{ ['--bo-speed']: `${1 / speed}` }}>
      <defs>
        <radialGradient id={`bo-c-halo-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(168, 212, 255, 0.32)" />
          <stop offset="100%" stopColor="rgba(168, 212, 255, 0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={size * 0.48} fill={`url(#bo-c-halo-${size})`} />
      {SEED.map(([x, y], i) => {
        const px = (x - 0.5) * r * 2 + cx + ((i % 3) - 1) * 5;
        const py = (y - 0.5) * r * 2 + cy + (((i + 1) % 3) - 1) * 5;
        const big = (i % 5 === 0);
        return (
          <circle
            key={i}
            cx={px} cy={py}
            r={big ? 3 : 1.5}
            fill={big ? "#A8D4FF" : "#7AB8FF"}
            style={{ animation: `bo-twinkle ${(2 + (i % 4)) / speed}s ease-in-out ${(i * 0.12) / speed}s infinite` }}
          />
        );
      })}
      {/* central main spark */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: `bo-spark-pulse ${3.4 / speed}s ease-in-out infinite` }}>
        <path d={sparkPath(cx, cy, size / 220)} fill="#A8D4FF" filter="url(#bo-c-glow)" />
      </g>
      {/* small accompanying spark, offset like in the brand mark */}
      <g style={{ transformOrigin: `${cx - size * 0.12}px ${cy - size * 0.10}px`, animation: `bo-spark-pulse ${4.2 / speed}s ease-in-out ${0.6 / speed}s infinite` }}>
        <path d={sparkPath(cx - size * 0.12, cy - size * 0.10, size / 660)} fill="#7AB8FF" />
      </g>
      <defs>
        <filter id="bo-c-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function HeartbeatTrace({ size = 220, speed = 1 }) {
  // ECG trace running across a centered horizontal line inside a circle.
  // The trace shifts left continuously, creating the running-tape feeling
  // of an ECG monitor. Pulses are timed against a steady rhythm.
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.42;
  // A single repeating pulse, stretched across width. Tail flat, peak QRS, flat.
  const pulse = (x0) => {
    const w = s * 0.50;
    return `
      L ${x0 + 0.00 * w} ${cy}
      L ${x0 + 0.30 * w} ${cy}
      L ${x0 + 0.34 * w} ${cy - s * 0.06}
      L ${x0 + 0.38 * w} ${cy + s * 0.18}
      L ${x0 + 0.42 * w} ${cy - s * 0.22}
      L ${x0 + 0.46 * w} ${cy + s * 0.06}
      L ${x0 + 0.50 * w} ${cy}
      L ${x0 + 0.65 * w} ${cy}
      L ${x0 + 0.68 * w} ${cy - s * 0.04}
      L ${x0 + 0.72 * w} ${cy + s * 0.04}
      L ${x0 + 0.76 * w} ${cy}
      L ${x0 + 1.00 * w} ${cy}
    `;
  };
  // Two pulses end-to-end so we can slide -50% and loop seamlessly.
  const path = `M ${-s * 0.5} ${cy} ${pulse(-s * 0.5)} ${pulse(0)} ${pulse(s * 0.5)} ${pulse(s * 1.0)}`;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="bo bo-heartbeat" style={{ ['--bo-speed']: `${1 / speed}` }}>
      <defs>
        <radialGradient id={`bo-hb-glow-${s}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(168, 212, 255, 0.45)" />
          <stop offset="55%" stopColor="rgba(122, 184, 255, 0.16)" />
          <stop offset="100%" stopColor="rgba(168, 212, 255, 0)" />
        </radialGradient>
        <clipPath id={`bo-hb-clip-${s}`}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        <linearGradient id={`bo-hb-grad-${s}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(122, 184, 255, 0)" />
          <stop offset="35%" stopColor="#7AB8FF" />
          <stop offset="80%" stopColor="#A8D4FF" />
          <stop offset="100%" stopColor="rgba(168, 212, 255, 0)" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r * 1.18} fill={`url(#bo-hb-glow-${s})`} />
      <circle cx={cx} cy={cy} r={r} stroke="rgba(122, 184, 255, 0.32)" strokeWidth={1.25} fill="rgba(10, 18, 48, 0.35)" />
      <g clipPath={`url(#bo-hb-clip-${s})`}>
        <g style={{ animation: `bo-hb-scroll ${4.2 / speed}s linear infinite` }}>
          <path
            d={path}
            stroke={`url(#bo-hb-grad-${s})`}
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ filter: 'drop-shadow(0 0 6px rgba(122, 184, 255, 0.55))' }}
          />
        </g>
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="rgba(168, 212, 255, 0.08)" strokeWidth={1} />
      </g>
    </svg>
  );
}

function MarkOrb({ size = 220, speed = 1 }) {
  const animMul = `${1 / speed}`;
  return (
    <div className="bo bo-mark" style={{ width: size, height: size, ['--bo-speed']: animMul }}>
      <div className="bo-mark-halo" />
      <div className="bo-mark-glow" />
      <Logo variant="mark-white" height={size * 0.50} className="bo-mark-logo" />
    </div>
  );
}

/* BreathingObject — generic dispatcher used by Tweaks to swap variants. */
function BreathingObject({ variant = 'luminous', size = 220, speed = 1 }) {
  switch (variant) {
    case 'rings':         return <ConcentricRings size={size} speed={speed} />;
    case 'mesh':          return <MeshGradient size={size} speed={speed} />;
    case 'constellation': return <Constellation size={size} speed={speed} />;
    case 'heartbeat':     return <HeartbeatTrace size={size} speed={speed} />;
    case 'mark':          return <MarkOrb size={size} speed={speed} />;
    case 'luminous':
    default:              return <LuminousOrb size={size} speed={speed} />;
  }
}

const BREATHING_OPTIONS = [
  { id: 'luminous',      name: 'Luminous Orb',     voice: 'The Listener', desc: 'The current default. Calm, present, knowledge. A small piece of sky that breathes with you.' },
  { id: 'rings',         name: 'Concentric Pulse', voice: 'The Pulse',    desc: 'Sonar at intervals. Reads as "actively listening." Best when the moment is short.' },
  { id: 'mesh',          name: 'Aurora',           voice: 'The Northern Lights', desc: 'Vertical ribbons of light, swaying. Greens, cyans, blue-white, violet, pink against a deep navy sky. Not a circle — the ribbons themselves are the shape.' },
  { id: 'constellation', name: 'Constellation',    voice: 'The Signal',   desc: 'Sparks arranged around a central glyph. "Made of your signals." Direct nod to the brand mark.' },
  { id: 'heartbeat',     name: 'Heartbeat Trace',  voice: 'The Rhythm',   desc: 'A running ECG inside a circle. Clinical, but quietly so. The body, kept in a window.' },
  { id: 'mark',          name: 'Mark Breathing',   voice: 'The Brand',    desc: 'The approved logo mark, breathing. Brand-forward — best for splash, marketing, top of the marketing site.' },
];

Object.assign(window, {
  LuminousOrb, ConcentricRings, MeshGradient, Constellation, HeartbeatTrace, MarkOrb,
  BreathingObject, BREATHING_OPTIONS,
});
