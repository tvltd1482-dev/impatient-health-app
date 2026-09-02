"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

function band(
  mv: MotionValue<number>,
  inputs: number[],
  outputs: (number | string)[],
) {
  return useTransform(mv, inputs, outputs);
}

export default function ScrollHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Smooth raw scroll into a spring so values change continuously
     instead of stepping per frame — this is what makes it feel buttery */
  /* Atmosphere reads raw scroll progress. Springs are forbidden by the
     design system outside the Pulse veil. */
  const progress = scrollYProgress;

  /* Only opacity + translate. NO filter:blur (that was the lag).
     Halo is opacity-only (no scale). */

  const lineBOpacity = 1;
  const lineBY = 0;

  const haloOpacity = band(progress, [0, 0.32, 0.9], [0.35, 0.7, 0.7]);
  const eyebrowOpacity = 1;

  return (
    <section ref={ref} className="relative" style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden aura">
        {/* Halo — no scale, no filter:blur. Cheap radial gradient. */}
        <motion.div
          aria-hidden
          style={
            reduce ? { opacity: 0.55 } : { opacity: haloOpacity }
          }
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[80vh] pointer-events-none"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(245,182,66,0.28) 0%, rgba(245,182,66,0.08) 40%, transparent 75%)",
            }}
          />
        </motion.div>

        {/* Static vertical hairlines, no animation */}
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
            <span>IMPATIENT</span>
            <span className="mx-3 text-soft/50">·</span>
            <span>BEHAVIORAL INTELLIGENCE</span>
          </motion.p>

          <h1 className="mt-12 md:mt-16 font-serif italic font-normal text-ink-bright leading-[0.98] tracking-[-0.025em] text-[56px] md:text-[104px] lg:text-[136px]">
            <span className="block">Born from chronic illness.</span>
            <motion.span
              style={
                reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: lineBOpacity, y: lineBY, willChange: "transform, opacity" }
              }
              className="block text-filament-mid"
            >
              Designed for everyone.
            </motion.span>
          </h1>

          <p className="mt-10 md:mt-14 max-w-[58ch] text-ink-secondary text-[17px] md:text-[20px] leading-[1.6]">
            Your body has been keeping a notebook, quietly, for years.
            iMpatient is the first tool that gets to read it back.
          </p>

          <div className="mt-10 md:mt-12 flex flex-wrap justify-center items-center gap-5">
            <Link
              href="/waitlist"
              className="inline-flex items-center rounded-btn bg-ink-bright text-navy px-6 py-3.5 text-[15px] font-semibold hover:bg-white transition"
            >
              Get started ›
            </Link>
            <Link
              href="/how-it-works"
              className="text-ink-bright text-[15px] font-medium underline-offset-4 hover:underline"
            >
              How it works
            </Link>
          </div>

          <p className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-ink-tertiary">
            PRE-LAUNCH
            <span className="mx-3 opacity-50">·</span>
            IMPATIENT.APP
            <span className="mx-3 opacity-50">·</span>
            2026
          </p>
        </div>
      </div>
    </section>
  );
}
