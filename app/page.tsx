import Aura from "@/components/Aura";
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
import ScrollChapter from "@/components/ScrollChapter";
import ScrollHero from "@/components/ScrollHero";
import ScrollTagline from "@/components/ScrollTagline";

export default function HomePage() {
  return (
    <>
      <ScrollHero />

      {/* ─── Withings card grid (light, big confident type) ─────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-40 md:py-56">
          <Reveal>
            <p className="text-deep/70 text-[14px] md:text-[15px] font-medium">
              A quieter way to know what&rsquo;s coming
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-navy text-[64px] md:text-[112px] lg:text-[148px] leading-[0.94] tracking-[-0.03em] font-semibold max-w-[14ch]">
              Where life gets a little easier
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 text-navy/65 text-[17px] md:text-[19px] leading-[1.55] max-w-[58ch]">
              iMpatient lays your week against itself &mdash; the calendar,
              the rhythms, the weather coming through &mdash; and quietly
              hands back the read you would have made if you&rsquo;d had
              time.
            </p>
          </Reveal>

          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
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

      {/* ─── Pinned chapter — the Rail ──────────────────────────────── */}
      <ScrollChapter
        number="02"
        eyebrow="CHAPTER 02 · A QUIET TOOLKIT"
        headline={{
          primary: "Five soft lights,",
          accent: "for the moments your day asks for one.",
        }}
        accent="filament"
        body="Always at the top of Home. Never a streak, never a target — they hold their positions, and whichever fits the moment leans gently brighter."
      />

      {/* The orb row, immediately after the pinned chapter releases */}
      <Aura className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              <Orb kind="alph" label="alph" lead />
              <Orb kind="breathing" label="breathing" />
              <Orb kind="sleep" label="sleep" />
              <Orb kind="focus" label="focus" />
              <Orb kind="noise" label="noise" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-20 text-center">
              <CTA href="/how-it-works" tone="dark" variant="ghost">
                Read how the Rail works ›
              </CTA>
            </div>
          </Reveal>
        </div>
      </Aura>

      {/* ─── Adaptive zero-baseline promise (light) ─────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-40 md:py-52">
          <Reveal>
            <p className="text-deep/70 text-[14px] md:text-[15px] font-medium">
              A promise, kept quietly
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-navy text-[52px] md:text-[88px] lg:text-[112px] leading-[0.96] tracking-[-0.025em] font-semibold max-w-[16ch]">
              No streaks. No targets. No ideal version of you.
            </h2>
          </Reveal>

          <div className="mt-24 grid md:grid-cols-3 gap-12 max-w-6xl">
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
              <Reveal key={t.tag} delay={i * 0.08}>
                <div className="border-t border-navy/15 pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-deep/75">
                    {t.tag}
                  </p>
                  <p className="mt-5 text-navy/75 text-[17px] md:text-[18px] leading-[1.6]">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollTagline />
    </>
  );
}
