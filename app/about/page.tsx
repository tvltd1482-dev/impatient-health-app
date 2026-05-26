import Aura from "@/components/Aura";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "About — iMpatient™",
  description:
    "Why iMpatient. Born from chronic illness, designed for everyone whose life moves faster than they can process it.",
};

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-5xl px-6 md:px-10 pt-32 md:pt-40 pb-24">
          <Reveal>
            <Eyebrow tone="light">about</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-navy text-[44px] md:text-[72px] leading-[1.04] tracking-[-0.02em] font-semibold">
              i&rsquo;m patient.
              <br />
              <span className="font-serif italic font-normal text-navy/85">
                impatient.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 text-navy/75 text-[20px] md:text-[22px] leading-[1.55] max-w-[52ch]">
              The name carries two stances. The patience to read a life
              quietly, for years. The impatience of humanity to be heard
              the first time. Both are true.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Origin ─────────────────────────────────────────────────── */}
      <Aura className="py-28 md:py-40">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <Eyebrow tone="dark">origin</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-ink-bright text-[36px] md:text-[52px] leading-[1.1] tracking-[-0.015em] font-semibold max-w-[24ch]">
              Inspired by, and dedicated to, the 1.3 billion managing
              chronic illness.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 text-ink-primary text-[18px] leading-[1.6] max-w-[60ch]">
              The hardest signal-to-noise problem in adult life belongs to
              the people whose bodies keep telling them things at the
              wrong volume. We started there because if iMpatient could
              read <em className="font-serif">that</em> well, it could
              read anyone&rsquo;s life.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-ink-primary text-[18px] leading-[1.6] max-w-[60ch]">
              Chronic illness is the proof of concept. The audience is
              everyone whose life moves faster than they can process it.
            </p>
          </Reveal>
        </div>
      </Aura>

      {/* ─── Positioning ────────────────────────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-28 md:py-36">
          <Reveal>
            <Eyebrow tone="light">positioning</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 font-serif italic text-navy text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.01em] max-w-[28ch]">
              The first intelligence that walks through your life with you
              &mdash; without prejudice, without an agenda, without ever
              needing a break.
            </p>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-2 gap-12">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-deep">
                not
              </p>
              <ul className="mt-4 space-y-3 text-navy/80 text-[17px]">
                <li>a health-tracking app</li>
                <li>a wellness app</li>
                <li>a partner</li>
                <li>a concierge</li>
                <li>a coach</li>
                <li>a chart</li>
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-deep">
                instead
              </p>
              <p className="mt-4 text-navy/85 text-[17px] leading-[1.6]">
                A behavioral intelligence engine. A quiet record of how
                your life actually moves. A presence that arrives when
                it&rsquo;s useful and recedes the rest of the time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Who builds it ──────────────────────────────────────────── */}
      <Aura variant="soft" className="py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <Eyebrow tone="dark">who builds it</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-ink-bright text-[28px] md:text-[40px] leading-[1.15] tracking-[-0.01em] font-semibold max-w-[28ch]">
              iMpatient™ is a product of SymbAIo Inc.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-ink-primary text-[17px] leading-[1.6] max-w-[58ch]">
              A small team building behavioral intelligence the patient
              way &mdash; one careful read at a time. Registered in
              Delaware, building between Australia and the United States.
            </p>
          </Reveal>
        </div>
      </Aura>

      {/* ─── Tagline + CTA ──────────────────────────────────────────── */}
      <Aura className="py-32 md:py-40">
        <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
          <Reveal>
            <p className="font-serif italic text-ink-bright text-[32px] md:text-[56px] leading-[1.1] tracking-[-0.015em]">
              We&rsquo;re here to give you a little of your time back.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14">
              <CTA href="/waitlist" tone="dark" variant="primary">
                Get started ›
              </CTA>
            </div>
          </Reveal>
        </div>
      </Aura>
    </>
  );
}
