"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type AccentColor = "filament" | "calm" | "win" | "discovery" | "flare";

const ACCENTS: Record<AccentColor, string> = {
  filament: "#F5B642",
  calm: "#7AB8FF",
  win: "#7BCBA1",
  discovery: "#F4B23C",
  flare: "#F07F77",
};

function band(
  mv: MotionValue<number>,
  inputs: number[],
  outputs: (number | string)[],
) {
  return useTransform(mv, inputs, outputs);
}

type Props = {
  eyebrow: string[];
  primary: string;
  accent: string;
  accentColor?: AccentColor;
  body?: string;
  cap?: string;
};

export default function PinnedHero({
  eyebrow,
  primary,
  accent,
  accentColor = "filament",
  body,
  cap,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const color = ACCENTS[accentColor];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Same approach as ScrollHero — first scene fully visible at load.
     Only the accent line + halo are scroll-driven. */

  const lineBOpacity = band(scrollYProgress, [0.04, 0.28], [0, 1]);
  const lineBY = band(scrollYProgress, [0.04, 0.28], [60, 0]);
  const lineBBlur = band(scrollYProgress, [0.04, 0.28], [10, 0]);
  const lineBFilter = useTransform(lineBBlur, (b) => `blur(${b}px)`);

  const haloOpacity = band(scrollYProgress, [0, 0.28, 0.95], [0.25, 0.55, 0.6]);
  const haloScale = band(scrollYProgress, [0, 0.95], [0.9, 1.15]);

  const eyebrowOpacity = band(scrollYProgress, [0, 0.9, 1], [1, 1, 0.55]);

  return (
    <section ref={ref} className="relative" style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden aura">
        <motion.div
          aria-hidden
          style={
            reduce
              ? { opacity: 0.45 }
              : { opacity: haloOpacity, scale: haloScale }
          }
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[80vh] pointer-events-none"
        >
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(closest-side, ${color}33 0%, ${color}11 35%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 159px, rgba(255,255,255,0.6) 159px 160px)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%)",
          }}
        />

        <div className="relative h-full flex flex-col items-center justify-center px-6 md:px-10 text-center">
          <motion.p
            style={reduce ? { opacity: 1 } : { opacity: eyebrowOpacity }}
            className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.32em] text-soft"
          >
            {eyebrow.map((e, i) => (
              <span key={e}>
                {i > 0 && <span className="mx-3 text-soft/50">·</span>}
                {e}
              </span>
            ))}
          </motion.p>

          <h1 className="mt-12 md:mt-16 font-serif italic font-light text-ink-bright leading-[0.98] tracking-[-0.025em] text-[48px] md:text-[88px] lg:text-[112px]">
            <span className="block">{primary}</span>
            <motion.span
              style={
                reduce
                  ? { opacity: 1, y: 0, filter: "blur(0)" }
                  : {
                      opacity: lineBOpacity,
                      y: lineBY,
                      filter: lineBFilter,
                    }
              }
              className="block"
            >
              <span style={{ color }}>{accent}</span>
            </motion.span>
          </h1>

          {body && (
            <p className="mt-10 md:mt-12 max-w-[58ch] text-ink-secondary text-[17px] md:text-[20px] leading-[1.6]">
              {body}
            </p>
          )}

          {cap && (
            <p className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-ink-tertiary">
              {cap.split(" · ").map((seg, i) => (
                <span key={seg}>
                  {i > 0 && <span className="mx-3 opacity-50">·</span>}
                  {seg}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
