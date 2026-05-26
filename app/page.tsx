import Link from "next/link";
import Aura from "@/components/Aura";
import Lamp from "@/components/Lamp";
import Eyebrow from "@/components/Eyebrow";
import { CTA } from "@/components/CTA";
import Reveal from "@/components/Reveal";
import Orb from "@/components/Orb";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <Aura className="min-h-[100svh] pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow tone="dark" dot="discovery">
                behavioral intelligence
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-ink-bright text-[44px] md:text-[68px] leading-[1.04] tracking-[-0.02em] font-semibold">
                Born from chronic illness.
                <br />
                <span className="font-serif italic font-normal text-ink-primary">
                  Designed for everyone.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[44ch] text-ink-primary text-[18px] md:text-[20px] leading-[1.55]">
                Your body has been keeping a notebook, quietly, for years.
                iMpatient is the first tool that gets to read it back.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <CTA href="/waitlist" tone="dark" variant="primary">
                  Get started ›
                </CTA>
                <CTA href="/how-it-works" tone="dark" variant="ghost">
                  How it works
                </CTA>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.2} className="flex md:justify-end">
              <Lamp size={320} register="discovery" />
            </Reveal>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 md:px-10 mt-24">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-tertiary">
            scroll · what it is
          </p>
        </div>
      </Aura>

      {/* ─── The closest phrase ─────────────────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-28 md:py-40">
          <Reveal>
            <Eyebrow tone="light">positioning</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-navy text-[28px] md:text-[44px] leading-[1.15] tracking-[-0.01em] max-w-[20ch]">
              Not a health app. Not a wellness app.
              <br />
              Not a partner. Not a concierge.
            </p>
          </Reveal>
          <div className="hairline mt-16" />
          <Reveal delay={0.15}>
            <p className="mt-16 font-serif italic text-navy/85 text-[22px] md:text-[30px] leading-[1.35] max-w-[40ch]">
              The first intelligence that walks through your life with you —
              without prejudice, without an agenda, without ever needing a
              break.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── What it does ───────────────────────────────────────────── */}
      <section className="bg-page border-t border-navy/5">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-28">
          <Reveal>
            <Eyebrow tone="light">what it does</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-navy text-[36px] md:text-[52px] leading-[1.08] tracking-[-0.015em] font-semibold max-w-[18ch]">
              Three quiet jobs. One that holds the rest together.
            </h2>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-10">
            {[
              {
                eyebrow: "indexes",
                dot: "calm" as const,
                title: "The patterns of your life.",
                body: "Work, travel, health, relationships, climate, sleep — read together, the way you actually live them.",
              },
              {
                eyebrow: "returns",
                dot: "discovery" as const,
                title: "Them as foresight.",
                body: "Not predictions. Not prescriptions. A heads-up: here's what tomorrow looks like, given who you are.",
              },
              {
                eyebrow: "sharpens",
                dot: "win" as const,
                title: "The longer it runs.",
                body: "The first read is gentle. The hundredth knows the shape of your week. iMpatient is patient.",
              },
            ].map((b, i) => (
              <Reveal key={b.eyebrow} delay={i * 0.08}>
                <div className="border-t border-navy/15 pt-6">
                  <Eyebrow tone="light" dot={b.dot}>
                    {b.eyebrow}
                  </Eyebrow>
                  <h3 className="mt-4 text-navy text-[24px] md:text-[28px] leading-[1.18] font-semibold tracking-[-0.01em]">
                    {b.title}
                  </h3>
                  <p className="mt-4 text-navy/70 text-[16px] leading-[1.55]">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Rail preview ───────────────────────────────────────── */}
      <Aura variant="soft" className="py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <Eyebrow tone="dark">a quiet toolkit</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-ink-bright text-[36px] md:text-[52px] leading-[1.08] tracking-[-0.015em] font-semibold max-w-[22ch]">
              A row of soft lights for the moments your day asks for one.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-ink-primary text-[17px] leading-[1.55] max-w-[60ch]">
              Five state-shifting offerings, always at the top of Home —
              never a streak, never a target.
            </p>
          </Reveal>

          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12">
            <Orb kind="alph" label="alph" lead />
            <Orb kind="breathing" label="breathing" />
            <Orb kind="sleep" label="sleep" />
            <Orb kind="focus" label="focus" />
            <Orb kind="noise" label="noise" />
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/how-it-works"
              className="font-mono text-[12px] uppercase tracking-eyebrow text-ink-secondary hover:text-ink-bright"
            >
              read how the Rail works ›
            </Link>
          </div>
        </div>
      </Aura>

      {/* ─── Tagline + CTA ──────────────────────────────────────────── */}
      <Aura className="py-32 md:py-48">
        <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
          <Reveal>
            <p className="font-serif italic text-ink-bright text-[36px] md:text-[64px] leading-[1.1] tracking-[-0.015em]">
              We're here to give you a little of your time back.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col items-center gap-4">
              <CTA href="/waitlist" tone="dark" variant="primary">
                Get started ›
              </CTA>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-tertiary">
                pre-launch · join the waitlist
              </p>
            </div>
          </Reveal>
        </div>
      </Aura>
    </>
  );
}
