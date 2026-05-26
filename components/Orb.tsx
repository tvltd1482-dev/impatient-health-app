"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RailKind = "alph" | "breathing" | "sleep" | "focus" | "noise";

const RAIL: Record<RailKind, { ring: string; glow: string; dot: string }> = {
  alph: {
    ring: "#F5B642",
    glow: "rgba(245,182,66,0.55)",
    dot: "#FFF1CE",
  },
  breathing: {
    ring: "#7BCBA1",
    glow: "rgba(123,203,161,0.45)",
    dot: "#E6F4ED",
  },
  sleep: {
    ring: "#8FA3E0",
    glow: "rgba(143,163,224,0.45)",
    dot: "#E6ECFA",
  },
  focus: {
    ring: "#A8D4FF",
    glow: "rgba(168,212,255,0.45)",
    dot: "#EAF4FF",
  },
  noise: {
    ring: "#E2B07A",
    glow: "rgba(226,176,122,0.45)",
    dot: "#FAEDDB",
  },
};

type Props = {
  kind: RailKind;
  label: string;
  lead?: boolean;
  size?: number;
  icon?: ReactNode;
};

export default function Orb({ kind, label, lead = false, size = 80, icon }: Props) {
  const r = RAIL[kind];
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        initial={false}
        animate={reduce ? {} : { scale: lead ? [1, 1.04, 1] : 1 }}
        transition={{ duration: 5, repeat: lead ? Infinity : 0, ease: "easeInOut" }}
        className="relative grid place-items-center rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(closest-side, ${r.glow} 0%, transparent 75%)`,
        }}
      >
        <div
          className="rounded-full grid place-items-center"
          style={{
            width: size * 0.7,
            height: size * 0.7,
            background: `radial-gradient(closest-side, ${r.dot} 0%, ${r.ring} 70%)`,
            boxShadow: lead
              ? `0 0 24px ${r.glow}, inset 0 0 0 1.5px ${r.ring}`
              : `inset 0 0 0 1px rgba(255,255,255,0.18)`,
            color: "#0B1230",
          }}
        >
          {icon}
        </div>
      </motion.div>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary">
        {label}
      </span>
    </div>
  );
}
