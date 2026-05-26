import type { ReactNode } from "react";

type Tone = "warm" | "sage" | "dove" | "rose";

const TONE: Record<Tone, { bg: string; ink: string }> = {
  warm: {
    bg: "linear-gradient(140deg, #F1EAD7 0%, #DFCFB1 100%)",
    ink: "#0A1230",
  },
  sage: {
    bg: "linear-gradient(140deg, #DEE7D9 0%, #B9CCB5 100%)",
    ink: "#0A1230",
  },
  dove: {
    bg: "linear-gradient(140deg, #DEE3EA 0%, #B7C2D2 100%)",
    ink: "#0A1230",
  },
  rose: {
    bg: "linear-gradient(140deg, #EDDDD3 0%, #D3B8A1 100%)",
    ink: "#0A1230",
  },
};

type Props = {
  eyebrow: string;
  headline: string;
  tone?: Tone;
  children: ReactNode;
};

export default function FeatureCard({
  eyebrow,
  headline,
  tone = "warm",
  children,
}: Props) {
  const t = TONE[tone];
  return (
    <div className="group">
      <div
        className="relative aspect-[4/5] rounded-[28px] overflow-hidden"
        style={{ background: t.bg }}
      >
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.6), transparent 60%), radial-gradient(60% 60% at 30% 90%, rgba(0,0,0,0.08), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 grid place-items-center p-6">
          {children}
        </div>
      </div>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-navy/55">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-navy text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.01em] font-medium max-w-[18ch]">
        {headline}
      </h3>
    </div>
  );
}
