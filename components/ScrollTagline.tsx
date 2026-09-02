"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function ScrollTagline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Atmosphere reads raw scroll progress. Springs are forbidden by the
     design system outside the Pulse veil. */
  const progress = scrollYProgress;

  /* Tagline scales up + brightens through viewport — transforms only,
     no blur. The opacity envelope keeps it crisp at peak. */
  const scale = 1;
  const opacity = 1;

  const haloOpacity = useTransform(
    progress,
    [0, 0.5, 1],
    [0, 0.45, 0],
  );

  const ctaOpacity = 1;

  return (
    <section ref={ref} className="relative" style={{ height: "180vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden aura">
        <motion.div
          aria-hidden
          style={reduce ? { opacity: 0.35 } : { opacity: haloOpacity }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[80vh] pointer-events-none"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(245,182,66,0.22) 0%, rgba(245,182,66,0.06) 45%, transparent 75%)",
            }}
          />
        </motion.div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 md:px-10 text-center">
          <motion.p
            style={
              reduce
                ? { opacity: 1 }
                : { scale, opacity, willChange: "transform, opacity" }
            }
            className="font-serif italic font-normal text-ink-bright leading-[0.98] tracking-[-0.02em] text-[44px] md:text-[88px] lg:text-[128px] max-w-[18ch]"
          >
            We&rsquo;re here to give you
            <br />
            <span className="text-filament-mid">a little of your time back.</span>
          </motion.p>

          <motion.div
            style={reduce ? { opacity: 1 } : { opacity: ctaOpacity }}
            className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <Link
              href="/waitlist"
              className="inline-flex items-center rounded-btn bg-ink-bright text-navy px-6 py-3.5 text-[15px] font-semibold hover:bg-white transition"
            >
              Join the waitlist ›
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink-tertiary">
              pre-launch · early access in waves
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
