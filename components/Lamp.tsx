"use client";

import { motion, useReducedMotion } from "framer-motion";

type Register = "discovery" | "win" | "caution" | "flare" | "calm";

const POOL: Record<Register, string> = {
  discovery: "#F4B23C",
  win: "#7BCBA1",
  caution: "#E9B452",
  flare: "#F07F77",
  calm: "#7AB8FF",
};

type Props = {
  register?: Register;
  size?: number;
  className?: string;
  glow?: boolean;
};

export default function Lamp({
  register = "discovery",
  size = 280,
  className = "",
  glow = true,
}: Props) {
  const reduce = useReducedMotion();
  const pool = POOL[register];

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="0 0 280 280"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="filament-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF1CE" stopOpacity="1" />
            <stop offset="40%" stopColor="#F5B642" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#E9B452" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lamp-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={pool} stopOpacity="0.55" />
            <stop offset="60%" stopColor={pool} stopOpacity="0.15" />
            <stop offset="100%" stopColor={pool} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lamp-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#99A2C6" />
            <stop offset="50%" stopColor="#D7DDF2" />
            <stop offset="100%" stopColor="#69708F" />
          </linearGradient>
        </defs>

        {/* Cast pool of light on the surface (takes register colour) */}
        <ellipse cx="180" cy="230" rx="110" ry="22" fill="url(#lamp-pool)" />

        {/* Surface line */}
        <line
          x1="40"
          y1="234"
          x2="270"
          y2="234"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />

        {/* Base */}
        <ellipse
          cx="80"
          cy="232"
          rx="34"
          ry="5"
          fill="#0E1538"
          stroke="url(#lamp-metal)"
          strokeWidth="1.2"
        />
        <rect x="76" y="222" width="8" height="11" rx="1" fill="url(#lamp-metal)" />

        {/* Vertical post */}
        <line
          x1="80"
          y1="222"
          x2="80"
          y2="180"
          stroke="url(#lamp-metal)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Lower joint */}
        <circle cx="80" cy="180" r="4.5" fill="url(#lamp-metal)" />

        {/* Lower arm — going up-right toward elbow */}
        <line
          x1="80"
          y1="180"
          x2="135"
          y2="110"
          stroke="url(#lamp-metal)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Elbow */}
        <circle cx="135" cy="110" r="5" fill="url(#lamp-metal)" />

        {/* Upper arm — going right and slightly down */}
        <line
          x1="135"
          y1="110"
          x2="200"
          y2="130"
          stroke="url(#lamp-metal)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Wrist */}
        <circle cx="200" cy="130" r="4.5" fill="url(#lamp-metal)" />

        {/* Lamp head — trapezoidal shade, opening down */}
        <path
          d="M 196 128 L 218 132 L 226 178 L 178 170 Z"
          fill="#0B1230"
          stroke="url(#lamp-metal)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Inner shade rim */}
        <path
          d="M 180 168 L 224 176"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />

        {/* Filament — warm spark inside the shade */}
        <motion.g
          initial={false}
          animate={
            reduce || !glow
              ? { opacity: 1 }
              : { opacity: [0.85, 1, 0.92, 1] }
          }
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle cx="202" cy="170" r="22" fill="url(#filament-grad)" />
          <circle cx="202" cy="170" r="3.2" fill="#FFF1CE" />
        </motion.g>
      </svg>
    </div>
  );
}
