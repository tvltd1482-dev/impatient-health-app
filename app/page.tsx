import Aura from "@/components/Aura";
import Chapter from "@/components/Chapter";
import { CTA } from "@/components/CTA";
import FeatureCard from "@/components/FeatureCard";
import {
  MockAlph,
  MockForesight,
  MockNodes,
  MockPatternRing,
} from "@/components/MockSurface";
import Orb from "@/components/Orb";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero — centered serif italic, no product visual ────────── */}
      <Aura className="min-h-[100svh] flex items-center justify-center pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
          <Reveal>
            <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-soft">
              <span>IMPATIENT</span>
              <span className="mx-3 text-soft/50">·</span>
              <span>BEHAVIORAL INTELLIGENCE</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-12 font-serif italic font-light text-ink-bright text-[52px] md:text-[88px] lg:text-[108px] leading-[1.02] tracking-[-0.02em]">
              Born from chronic illness.
              <br />
              <span className="text-filament-mid">Designed for everyone.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-12 max-w-[58ch] mx-auto text-ink-secondary text-[18px] md:text-[20px] leading-[1.6]">
              Your body has been keeping a notebook, quietly, for years.
              iMpatient is the first tool that gets to read it back.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-14 flex flex-wrap justify-center items-center gap-5">
              <CTA href="/waitlist" tone="dark" variant="primary">
                Get started ›
              </CTA>
              <CTA href="/how-it-works" tone="dark" variant="ghost">
                How it works
              </CTA>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <p className="mt-32 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-ink-tertiary">
              PRE-LAUNCH
              <span className="mx-3 opacity-50">·</span>
              IMPATIENT.APP
              <span className="mx-3 opacity-50">·</span>
              2026
            </p>
          </Reveal>
        </div>
      </Aura>

      {/* ─── Withings-style card grid ───────────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-44">
          <Reveal>
            <p className="text-deep/70 text-[14px] md:text-[15px]">
              A quieter way to know what&rsquo;s coming
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-navy text-[52px] md:text-[88px] lg:text-[108px] leading-[0.98] tracking-[-0.025em] font-semibold max-w-[14ch]">
              Where life gets a little easier
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-navy/65 text-[17px] md:text-[18px] leading-[1.55] max-w-[58ch]">
              iMpatient lays your week against itself &mdash; the calendar,
              the rhythms, the weather coming through &mdash; and quietly
              hands back the read you would have made if you&rsquo;d had
              time.
            </p>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            <Reveal>
              <FeatureCard
                eyebrow="48-hour foresight"
                headline="A heads-up before things stack."
                tone="warm"
              >
                <MockForesight />
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.06}>
              <FeatureCard
                eyebrow="three life-streams"
                headline="Work, personal, health — read together."
                tone="dove"
              >
                <MockNodes />
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.12}>
              <FeatureCard
                eyebrow="the patient engine"
                headline="Sharper the longer it runs."
                tone="sage"
              >
                <MockPatternRing />
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.18}>
              <FeatureCard
                eyebrow="a named presence"
                headline="A quiet voice that arrives and recedes."
                tone="rose"
              >
                <MockAlph />
              </FeatureCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Chapter — the Rail ─────────────────────────────────────── */}
      <Aura className="py-40 md:py-56 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Chapter
            number="02"
            eyebrow="CHAPTER 02 · A QUIET TOOLKIT"
            headline={{
              primary: "Five soft lights,",
              accent: "for the moments your day asks for one.",
            }}
            accent="filament"
            body="Always at the top of Home. Never a streak, never a target — they hold their positions, and whichever fits the moment leans gently brighter."
          />

          <Reveal delay={0.3}>
            <div className="mt-24 flex flex-wrap justify-center gap-10 md:gap-14">
              <Orb kind="alph" label="alph" lead />
              <Orb kind="breathing" label="breathing" />
              <Orb kind="sleep" label="sleep" />
              <Orb kind="focus" label="focus" />
              <Orb kind="noise" label="noise" />
            </div>
          </Reveal>

          <div className="mt-20 text-center">
            <CTA href="/how-it-works" tone="dark" variant="ghost">
              Read how the Rail works ›
            </CTA>
          </div>
        </div>
      </Aura>

      {/* ─── Chapter — what stays out of the way ────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-44">
          <Reveal>
            <p className="text-deep/70 text-[14px] md:text-[15px]">
              A promise, kept quietly
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-navy text-[44px] md:text-[72px] leading-[1.02] tracking-[-0.02em] font-semibold max-w-[18ch]">
              No streaks. No targets. No ideal version of you.
            </h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-3 gap-12 max-w-5xl">
            {[
              {
                tag: "adaptive zero-baseline",
                body: "Every read starts from where you are in the current hour — not where a chart says you ought to be.",
              },
              {
                tag: "wearable-optional",
                body: "Real value from minute one with nothing connected. Wearables sharpen the read; they aren't a prerequisite.",
              },
              {
                tag: "honest about uncertainty",
                body: "Confidence surfaces openly. iMpatient says when it's still listening and when it's ready to commit.",
              },
            ].map((t, i) => (
              <Reveal key={t.tag} delay={i * 0.06}>
                <div className="border-t border-navy/15 pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-deep/75">
                    {t.tag}
                  </p>
                  <p className="mt-4 text-navy/75 text-[16px] leading-[1.6]">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tagline + CTA ──────────────────────────────────────────── */}
      <Aura className="py-32 md:py-48">
        <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
          <Reveal>
            <p className="font-serif italic font-light text-ink-bright text-[40px] md:text-[72px] leading-[1.05] tracking-[-0.02em]">
              We&rsquo;re here to give you
              <br />
              <span className="text-filament-mid">a little of your time back.</span>
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-14 flex flex-col items-center gap-4">
              <CTA href="/waitlist" tone="dark" variant="primary">
                Join the waitlist ›
              </CTA>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-tertiary">
                pre-launch · early access in waves
              </p>
            </div>
          </Reveal>
        </div>
      </Aura>
    </>
  );
}
