"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ─────────── Mini phone surface — shared frame ─────────── */

function PhoneCard({
  children,
  width = 220,
}: {
  children: React.ReactNode;
  width?: number;
}) {
  return (
    <div
      className="rounded-[18px] bg-white/90 backdrop-blur-sm shadow-[0_20px_50px_-20px_rgba(10,18,48,0.35)] border border-white/60 px-5 py-5"
      style={{ width }}
    >
      {children}
    </div>
  );
}

/* ─────────── 1 · pattern precedent ─────────── */

export function MockPrecedent() {
  const reduce = useReducedMotion();
  return (
    <PhoneCard width={240}>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-navy/45">
        recent pattern · my day
      </p>
      <p className="mt-3 font-serif italic text-navy text-[17px] leading-[1.2]">
        this shape has landed
        <br />
        around <span className="text-[#E9B452]">3pm.</span>
      </p>

      <div className="mt-4 grid grid-cols-12 gap-[3px] items-end h-[34px]">
        {Array.from({ length: 12 }).map((_, i) => {
          const heights = [10, 14, 22, 26, 30, 18, 12, 20, 32, 28, 16, 10];
          const flagged = i === 8;
          return (
            <motion.div
              key={i}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={reduce ? undefined : { scaleY: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.03 }}
              className="rounded-[2px] origin-bottom"
              style={{
                height: heights[i],
                background: flagged ? "#E9B452" : "rgba(10,18,48,0.18)",
              }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="w-[6px] h-[6px] rounded-full bg-[#E9B452]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/60">
          caution · worth a stretch
        </span>
      </div>
    </PhoneCard>
  );
}

/* ─────────── 2 · Three streams (Nodes) ─────────── */

export function MockNodes() {
  const lanes = [
    { name: "work", color: "#7AB8FF", dots: [0.1, 0.32, 0.55, 0.78] },
    { name: "personal", color: "#7BCBA1", dots: [0.22, 0.48, 0.7] },
    { name: "health", color: "#E9B452", dots: [0.15, 0.42, 0.6, 0.85] },
  ];
  return (
    <PhoneCard width={250}>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-navy/45">
        nodes · today
      </p>
      <p className="mt-3 font-serif italic text-navy text-[17px] leading-[1.2]">
        three streams,
        <br />
        one read.
      </p>

      <div className="mt-5 space-y-3.5">
        {lanes.map((l) => (
          <div key={l.name}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/55">
                {l.name}
              </span>
            </div>
            <div className="mt-1.5 relative h-[5px] rounded-full bg-navy/8">
              {l.dots.map((d, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full"
                  style={{ left: `calc(${d * 100}% - 3.5px)`, background: l.color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PhoneCard>
  );
}

/* ─────────── 3 · Pattern ring (sharpens over time) ─────────── */

export function MockPatternRing() {
  const dots = 40;
  const colors = ["#F4B23C", "#7BCBA1", "#7AB8FF", "#F07F77", "#E9B452"];
  return (
    <div className="relative">
      <svg width="240" height="240" viewBox="0 0 240 240">
        <defs>
          <radialGradient id="ring-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5B642" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#F5B642" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="120" r="100" fill="url(#ring-halo)" />
        {Array.from({ length: dots }).map((_, i) => {
          const angle = (i / dots) * Math.PI * 2 - Math.PI / 2;
          const r = 92;
          const cx = 120 + Math.cos(angle) * r;
          const cy = 120 + Math.sin(angle) * r;
          const c = colors[i % colors.length];
          return <circle key={i} cx={cx} cy={cy} r={3.6} fill={c} />;
        })}
      </svg>

      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-navy/45">
            day 28 · baseline
          </p>
          <p className="mt-1 font-serif italic text-navy text-[34px] leading-none">
            72%
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/55">
            forming
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 4 · alph lamp + cast pool ─────────── */

export function MockAlph() {
  return (
    <div className="relative grid place-items-center w-full h-full">
      <div
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[70%] h-[28%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(244,178,60,0.45) 0%, rgba(244,178,60,0.12) 50%, transparent 80%)",
          filter: "blur(2px)",
        }}
      />
      <svg viewBox="0 0 220 220" width="200" height="200">
        <defs>
          <radialGradient id="ms-filament" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF1CE" stopOpacity="1" />
            <stop offset="50%" stopColor="#F5B642" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E9B452" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ms-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B4575" />
            <stop offset="50%" stopColor="#0E1538" />
            <stop offset="100%" stopColor="#3B4575" />
          </linearGradient>
        </defs>

        <ellipse cx="55" cy="190" rx="25" ry="4" fill="#0E1538" />
        <line
          x1="55"
          y1="186"
          x2="55"
          y2="148"
          stroke="url(#ms-metal)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="55" cy="148" r="4" fill="url(#ms-metal)" />
        <line
          x1="55"
          y1="148"
          x2="105"
          y2="90"
          stroke="url(#ms-metal)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="105" cy="90" r="4.5" fill="url(#ms-metal)" />
        <line
          x1="105"
          y1="90"
          x2="165"
          y2="108"
          stroke="url(#ms-metal)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="165" cy="108" r="4" fill="url(#ms-metal)" />

        <path
          d="M 161 106 L 184 112 L 191 154 L 145 146 Z"
          fill="#0E1538"
          stroke="url(#ms-metal)"
          strokeWidth="1.8"
        />
        <circle cx="168" cy="146" r="20" fill="url(#ms-filament)" />
        <circle cx="168" cy="146" r="3" fill="#FFF1CE" />
      </svg>
    </div>
  );
}
