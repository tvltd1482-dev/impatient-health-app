"use client";

import { motion, useReducedMotion } from "framer-motion";

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
  align?: "left" | "center";
  className?: string;
};

export default function Chapter({
  number,
  eyebrow,
  headline,
  body,
  accent = "calm",
  align = "left",
  className = "",
}: Props) {
  const color = ACCENTS[accent];
  const reduce = useReducedMotion();
  const isCenter = align === "center";

  return (
    <div className={`relative ${className}`}>
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        whileInView={reduce ? undefined : { opacity: 0.16, scale: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "absolute pointer-events-none select-none top-1/2 -translate-y-1/2",
          isCenter ? "left-1/2 -translate-x-1/2" : "right-0 md:right-[6%]",
        ].join(" ")}
        style={{
          fontFamily: "var(--font-newsreader)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(160px, 22vw, 320px)",
          lineHeight: 1,
          color,
          filter: "blur(0.5px)",
          textShadow: `0 0 90px ${color}55`,
        }}
      >
        {number}
      </motion.div>

      <div
        className={[
          "relative max-w-3xl",
          isCenter ? "mx-auto text-center" : "",
        ].join(" ")}
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7 }}
          className={[
            "font-mono text-[11px] uppercase tracking-[0.22em] text-ink-secondary inline-flex items-center gap-3",
            isCenter ? "justify-center" : "",
          ].join(" ")}
        >
          <span
            className="inline-block w-[7px] h-[7px] rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden
          />
          {eyebrow}
        </motion.p>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 font-serif italic font-normal text-ink-bright text-[44px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-[-0.015em]"
        >
          {headline.primary}
          <br />
          <span style={{ color }}>{headline.accent}</span>
        </motion.h2>

        {body && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className={[
              "mt-8 font-ui text-ink-secondary text-[17px] leading-[1.6] max-w-[58ch]",
              isCenter ? "mx-auto" : "",
            ].join(" ")}
          >
            {body}
          </motion.p>
        )}
      </div>
    </div>
  );
}
