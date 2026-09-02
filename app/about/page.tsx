import Aura from "@/components/Aura";
import { CTA } from "@/components/CTA";
import Eyebrow from "@/components/Eyebrow";
import PinnedHero from "@/components/PinnedHero";
import Reveal from "@/components/Reveal";
import ScrollChapter from "@/components/ScrollChapter";
import ScrollTagline from "@/components/ScrollTagline";

export const metadata = {
  title: "About — iMpatient™",
  description:
    "Why iMpatient. Born from chronic illness, designed for everyone whose life moves faster than they can process it.",
};

export default function AboutPage() {
  return (
    <>
      {/* ─── Pinned hero — the name double-entendre ──────────────────── */}
      <PinnedHero
        eyebrow={["ABOUT", "IMPATIENT"]}
        primary="i'm patient."
        accent="impatient."
        accentColor="filament"
        body="The name carries two stances. The patience to read a life quietly, for years. The impatience of humanity to be heard the first time. Both are true."
        cap="ORIGIN · POSITIONING · WHO"
      />

      {/* ─── Origin (light, big confident type) ─────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-44">
          <Reveal>
            <Eyebrow tone="light">origin</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-navy text-[52px] md:text-[88px] lg:text-[112px] leading-[0.96] tracking-[-0.025em] font-semibold max-w-[18ch]">
              Inspired by, and dedicated to, the 1.3 billion managing
              chronic illness.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-10 text-navy/70 text-[18px] md:text-[20px] leading-[1.65] max-w-[58ch]">
              The hardest signal-to-noise problem in adult life belongs to
              the people whose bodies keep telling them things at the
              wrong volume. We started there because if iMpatient could
              read <em className="font-serif">that</em> well, it could
              read anyone&rsquo;s life.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-6 text-navy/70 text-[18px] md:text-[20px] leading-[1.65] max-w-[58ch]">
              Chronic illness is the proof of concept. The audience is
              everyone whose life moves faster than they can process it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Pinned chapter — positioning ───────────────────────────── */}
      <ScrollChapter
        number="01"
        eyebrow="POSITIONING · WHAT IT IS"
        headline={{
          primary: "The first intelligence",
          accent: "that walks through your life with you.",
        }}
        accent="filament"
        body="Without prejudice, without an agenda, without ever needing a break."
      />

      {/* ─── Not / instead (light) ──────────────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-40">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-deep">
                not
              </p>
              <ul className="mt-8 space-y-4 text-navy/80 text-[20px] md:text-[24px] font-serif italic leading-[1.4]">
                <li>a health-tracking app</li>
                <li>a wellness app</li>
                <li>a partner</li>
                <li>a concierge</li>
                <li>a coach</li>
                <li>a chart</li>
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-deep">
                instead
              </p>
              <p className="mt-8 text-navy/85 text-[22px] md:text-[28px] leading-[1.4] tracking-[-0.005em] max-w-[28ch]">
                A behavioral intelligence engine. A quiet record of how
                your life actually moves. A presence that arrives when
                it&rsquo;s useful and recedes the rest of the time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Who builds it (dark, smaller) ──────────────────────────── */}
      <Aura variant="soft" className="py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <Eyebrow tone="dark">who builds it</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 text-ink-bright text-[36px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.02em] font-light max-w-[28ch]">
              <span className="font-semibold">iMpatient™</span> is a
              product of{" "}
              <span className="font-serif italic font-normal text-filament-mid">
                SymbAIo Inc.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-10 text-ink-primary text-[17px] md:text-[19px] leading-[1.65] max-w-[60ch]">
              A small team building behavioral intelligence the patient
              way &mdash; one careful read at a time. Registered in
              Delaware, building between Australia and the United States.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-12">
              <CTA href="/waitlist" tone="dark" variant="primary">
                Get started ›
              </CTA>
            </div>
          </Reveal>
        </div>
      </Aura>

      <ScrollTagline />
    </>
  );
}
