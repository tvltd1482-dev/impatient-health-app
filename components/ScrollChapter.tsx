"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type AccentColor = "filament" | "calm" | "win" | "discovery" | "flare";

const ACCENTS: Record<AccentColor, string> = {
  filament: "#F5B642",
  calm: "#7AB8FF",
  win: "#7BCBA1",
  discovery: "#F4B23C",
  flare: "#F07F77",
};

type Props = {
  number: string;
  eyebrow: string;
  headline: { primary: string; accent: string };
  body?: string;
  accent?: AccentColor;
  children?: ReactNode;
};

export default function ScrollChapter({
  number,
  eyebrow,
  headline,
  body,
  accent = "filament",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const color = ACCENTS[accent];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Numeral starts huge & centered, scales down & drifts right, fades to watermark */
  const numScale = useTransform(scrollYProgress, [0, 0.45, 1], [1.6, 0.85, 0.8]);
  const numX = useTransform(scrollYProgress, [0, 0.45], [0, 240]);
  const numOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.85, 1],
    [0, 0.7, 0.22, 0.18, 0.1],
  );

  /* Text reveals as numeral recedes */
  const textOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.4, 0.92],
    [0, 1, 1],
  );
  const textY = useTransform(scrollYProgress, [0.18, 0.4], [40, 0]);

  /* Children (orbs / extras) come in last */
  const childOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.7, 0.95],
    [0, 1, 1],
  );
  const childY = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);

  return (
    <section ref={ref} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden aura">
        <motion.div
          aria-hidden
          style={
            reduce
              ? { opacity: 0.18, scale: 0.85 }
              : { opacity: numOpacity, scale: numScale, x: numX }
          }
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        >
          <div
            style={{
              fontFamily: "var(--font-newsreader)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(280px, 36vw, 560px)",
              lineHeight: 1,
              color,
              filter: "blur(0.5px)",
              textShadow: `0 0 120px ${color}66`,
            }}
          >
            {number}
          </div>
        </motion.div>

        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-10 flex items-center">
          <div className="w-full grid md:grid-cols-12 gap-10 items-center">
            <motion.div
              style={
                reduce
                  ? { opacity: 1, y: 0 }
                  : { opacity: textOpacity, y: textY }
              }
              className="md:col-span-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-secondary inline-flex items-center gap-3">
                <span
                  className="inline-block w-[7px] h-[7px] rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                {eyebrow}
              </p>
              <h2 className="mt-8 md:mt-10 font-serif italic font-light text-ink-bright text-[44px] md:text-[80px] lg:text-[104px] leading-[1.0] tracking-[-0.02em]">
                {headline.primary}
                <br />
                <span style={{ color }}>{headline.accent}</span>
              </h2>
              {body && (
                <p className="mt-8 text-ink-secondary text-[17px] md:text-[19px] leading-[1.6] max-w-[58ch]">
                  {body}
                </p>
              )}
            </motion.div>

            {children && (
              <motion.div
                style={
                  reduce
                    ? { opacity: 1, y: 0 }
                    : { opacity: childOpacity, y: childY }
                }
                className="md:col-span-5"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
