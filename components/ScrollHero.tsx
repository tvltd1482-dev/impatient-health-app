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

  /* All reveals are scroll-progress driven, not time-driven.
     The pinned panel holds for the full scroll of the 300vh container. */
  const eyebrowOpacity = band(scrollYProgress, [0, 0.04, 0.92, 1], [0, 1, 1, 0.5]);
  const eyebrowY = band(scrollYProgress, [0, 0.04], [12, 0]);

  const lineAOpacity = band(scrollYProgress, [0.08, 0.22, 0.95], [0, 1, 1]);
  const lineAY = band(scrollYProgress, [0.08, 0.22], [60, 0]);

  const lineBOpacity = band(scrollYProgress, [0.28, 0.46, 0.95], [0, 1, 1]);
  const lineBY = band(scrollYProgress, [0.28, 0.46], [60, 0]);
  const lineBBlur = band(scrollYProgress, [0.28, 0.46], [8, 0]);
  const lineBFilter = useTransform(lineBBlur, (b) => `blur(${b}px)`);

  const bodyOpacity = band(scrollYProgress, [0.5, 0.66, 0.95], [0, 1, 1]);
  const bodyY = band(scrollYProgress, [0.5, 0.66], [24, 0]);

  const ctaOpacity = band(scrollYProgress, [0.7, 0.86, 0.95], [0, 1, 1]);
  const ctaY = band(scrollYProgress, [0.7, 0.86], [16, 0]);

  const capOpacity = band(scrollYProgress, [0.86, 0.96], [0, 1]);

  /* Atmospheric: the filament-warm halo intensifies as the amber line lands */
  const haloOpacity = band(scrollYProgress, [0.18, 0.46, 0.9], [0, 0.55, 0.7]);
  const haloScale = band(scrollYProgress, [0.18, 0.9], [0.8, 1.15]);

  /* Scroll-cue at top fades in early then out as you progress */
  const cueOpacity = band(scrollYProgress, [0, 0.06, 0.12], [0, 1, 0]);

  return (
    <section ref={ref} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden aura">
        {/* Ambient filament halo */}
        <motion.div
          aria-hidden
          style={
            reduce
              ? { opacity: 0.4 }
              : { opacity: haloOpacity, scale: haloScale }
          }
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[80vh] pointer-events-none"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(245,182,66,0.22) 0%, rgba(245,182,66,0.06) 35%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* Faint vertical hairlines for depth */}
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
            style={
              reduce
                ? { opacity: 1, y: 0 }
                : { opacity: eyebrowOpacity, y: eyebrowY }
            }
            className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.32em] text-soft"
          >
            <span>IMPATIENT</span>
            <span className="mx-3 text-soft/50">·</span>
            <span>BEHAVIORAL INTELLIGENCE</span>
          </motion.p>

          <h1 className="mt-12 md:mt-16 font-serif italic font-light text-ink-bright leading-[0.98] tracking-[-0.025em] text-[64px] md:text-[112px] lg:text-[148px]">
            <motion.span
              style={
                reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: lineAOpacity, y: lineAY }
              }
              className="block"
            >
              Born from chronic illness.
            </motion.span>
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
              className="block text-filament-mid"
            >
              Designed for everyone.
            </motion.span>
          </h1>

          <motion.p
            style={
              reduce
                ? { opacity: 1, y: 0 }
                : { opacity: bodyOpacity, y: bodyY }
            }
            className="mt-12 md:mt-16 max-w-[58ch] text-ink-secondary text-[17px] md:text-[20px] leading-[1.6]"
          >
            Your body has been keeping a notebook, quietly, for years.
            iMpatient is the first tool that gets to read it back.
          </motion.p>

          <motion.div
            style={
              reduce
                ? { opacity: 1, y: 0 }
                : { opacity: ctaOpacity, y: ctaY }
            }
            className="mt-10 md:mt-14 flex flex-wrap justify-center items-center gap-5"
          >
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
          </motion.div>

          <motion.p
            style={reduce ? { opacity: 1 } : { opacity: capOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-ink-tertiary"
          >
            PRE-LAUNCH
            <span className="mx-3 opacity-50">·</span>
            IMPATIENT.APP
            <span className="mx-3 opacity-50">·</span>
            2026
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            style={reduce ? { opacity: 0 } : { opacity: cueOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-tertiary"
            aria-hidden
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.32em]">
              scroll
            </span>
            <span className="w-px h-10 bg-current opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
