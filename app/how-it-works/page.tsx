import Aura from "@/components/Aura";
import { CTA } from "@/components/CTA";
import Eyebrow from "@/components/Eyebrow";
import Orb from "@/components/Orb";
import PinnedHero from "@/components/PinnedHero";
import Reveal from "@/components/Reveal";
import ScrollChapter from "@/components/ScrollChapter";

export const metadata = {
  title: "How it works — iMpatient™",
  description:
    "What iMpatient does on day one, on day seven, and on day ninety. Behavioral intelligence, in plain language.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* ─── Pinned hero ─────────────────────────────────────────────── */}
      <PinnedHero
        eyebrow={["HOW IT WORKS", "BEHAVIORAL INTELLIGENCE"]}
        primary="It reads your week"
        accent="the way a friend might."
        accentColor="calm"
        body="Calendar. Clock. Geography. Whatever wearables you choose to connect. iMpatient lays them next to each other and asks a quiet question: what is this person walking into?"
        cap="ENGINE · ALPH · NODES · RAIL"
      />

      {/* ─── Section: alph's four minds (light) ─────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-44">
          <Reveal>
            <Eyebrow tone="light">the engine</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-navy text-[52px] md:text-[96px] lg:text-[124px] leading-[0.96] tracking-[-0.025em] font-semibold max-w-[18ch]">
              Four minds, one named voice.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 text-navy/65 text-[17px] md:text-[19px] leading-[1.55] max-w-[58ch]">
              iMpatient&rsquo;s engine has four ways of thinking. The user
              never sees them as a menu &mdash; they show up only as
              <em className="font-serif">{" "}how{" "}</em>
              alph is paying attention.
            </p>
          </Reveal>

          <div className="mt-24 grid md:grid-cols-2 gap-x-16 gap-y-20">
            {[
              {
                tag: "noticing",
                dot: "calm" as const,
                title: "What's true right now.",
                body: "Picks up signal the moment it lands — a missed lunch, a cluster of late nights, a calendar that just stacked.",
              },
              {
                tag: "looking ahead",
                dot: "caution" as const,
                title: "What the next 48 hours hold.",
                body: "Lines up tomorrow's calendar against the week behind, the weather coming through, the rhythms you already keep.",
              },
              {
                tag: "remembering",
                dot: "win" as const,
                title: "What's happened before.",
                body: "Holds the shape of your patterns over weeks, then months — so the same heavy Tuesday isn't a surprise twice.",
              },
              {
                tag: "suggesting",
                dot: "discovery" as const,
                title: "What might make this easier.",
                body: "Only when it earns the right to. A small offering — never a prescription, never a list, always one thing at a time.",
              },
            ].map((m, i) => (
              <Reveal key={m.tag} delay={i * 0.05}>
                <div className="border-t border-navy/15 pt-6">
                  <Eyebrow tone="light" dot={m.dot}>
                    {m.tag}
                  </Eyebrow>
                  <h3 className="mt-5 text-navy text-[28px] md:text-[36px] leading-[1.1] font-semibold tracking-[-0.015em]">
                    {m.title}
                  </h3>
                  <p className="mt-5 text-navy/70 text-[16px] md:text-[17px] leading-[1.6] max-w-[44ch]">
                    {m.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pinned chapter — Day-1 Value Layer ─────────────────────── */}
      <ScrollChapter
        number="01"
        eyebrow="DAY ONE · UNIVERSAL PATTERNS"
        headline={{
          primary: "You don't have to wait a week",
          accent: "to be read.",
        }}
        accent="filament"
        body="Three universal patterns most bodies share — ultradian rhythms, circadian alignment, biometeorology. From the first hour, with nothing connected, iMpatient already has something quiet to say."
      />

      {/* ─── Day-1 detail cards (dark) ──────────────────────────────── */}
      <Aura variant="soft" className="py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tag: "ultradian rhythms",
                dot: "caution" as const,
                title: "Focus thins after about 90 minutes.",
                body: "A back-to-back stretch gets a soft signal before it spills into the afternoon.",
                quote:
                  "a pattern most bodies share — a small pause now would protect your afternoon.",
              },
              {
                tag: "circadian alignment",
                dot: "caution" as const,
                title: "Late finishes compound early starts.",
                body: "When the day before runs past 10 and the morning starts before 9, the night sees it first.",
                quote:
                  "tomorrow starts early after a late one. a gentle landing in the first hour might help.",
              },
              {
                tag: "biometeorology",
                dot: "flare" as const,
                title: "Pressure drops are felt before they're noticed.",
                body: "Barometric dips, humidity swings, cold snaps — quietly aligned to a heavy block on your calendar.",
                quote:
                  "pressure's dropping around 3pm — worth a stretch before your 3:30.",
              },
            ].map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.08}>
                <div className="rounded-card border border-white/10 bg-white/[0.03] p-8 h-full">
                  <Eyebrow tone="dark" dot={p.dot}>
                    {p.tag}
                  </Eyebrow>
                  <h3 className="mt-5 text-ink-bright text-[24px] md:text-[28px] leading-[1.18] font-semibold tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-5 text-ink-primary/85 text-[15px] md:text-[16px] leading-[1.6]">
                    {p.body}
                  </p>
                  <p className="mt-8 font-serif italic text-filament-cool/90 text-[15px] md:text-[16px] leading-[1.5] border-l border-filament-mid/40 pl-5">
                    {p.quote}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Aura>

      {/* ─── Nodes (light) ──────────────────────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-32 md:py-44">
          <Reveal>
            <Eyebrow tone="light">nodes</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-navy text-[52px] md:text-[96px] lg:text-[120px] leading-[0.96] tracking-[-0.025em] font-semibold max-w-[20ch]">
              Three streams of an adult life. One filter that flows
              through them.
            </h2>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Unified",
                sub: "the Unified Activity Feed",
                dot: "discovery" as const,
                body: "Everything together, in the order it actually happened.",
              },
              {
                name: "Work",
                sub: "focus & schedules",
                dot: "calm" as const,
                body: "Scoped to the cognitive load you're carrying.",
              },
              {
                name: "Personal",
                sub: "habits & rhythms",
                dot: "win" as const,
                body: "Scoped to the rest of your life that isn't an inbox.",
              },
              {
                name: "Health",
                sub: "energy & weather",
                dot: "caution" as const,
                body: "Scoped to the parts of you that aren't a calendar.",
              },
            ].map((n, i) => (
              <Reveal key={n.name} delay={i * 0.06}>
                <div className="rounded-card border border-navy/10 bg-white p-7 h-full">
                  <Eyebrow tone="light" dot={n.dot}>
                    {n.sub}
                  </Eyebrow>
                  <h3 className="mt-5 text-navy text-[28px] font-semibold tracking-[-0.01em]">
                    {n.name}
                  </h3>
                  <p className="mt-4 text-navy/70 text-[15px] leading-[1.6]">
                    {n.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pinned chapter — the Rail ──────────────────────────────── */}
      <ScrollChapter
        number="02"
        eyebrow="CHAPTER 02 · A QUIET TOOLKIT"
        headline={{
          primary: "A regulation toolkit,",
          accent: "quiet at the top of Home.",
        }}
        accent="filament"
        body="Five soft orbs. Four state-shifting tools, plus the summon to alph. They hold their positions; whichever one fits the moment leans gently brighter — never bossy."
      />

      {/* ─── Rail orbs + tool descriptions ──────────────────────────── */}
      <Aura className="py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              <Orb kind="alph" label="alph" />
              <Orb kind="breathing" label="breathing" lead />
              <Orb kind="sleep" label="sleep" />
              <Orb kind="focus" label="focus" />
              <Orb kind="noise" label="noise" />
            </div>
          </Reveal>

          <div className="mt-24 grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {[
              {
                title: "breathing",
                body: "Paced pulse. 4-7-8 by default, box on demand. No timer, no target — as long as helps.",
              },
              {
                title: "sleep",
                body: "Wind-down with a soft soundscape. Lands the day before it asks for tomorrow.",
              },
              {
                title: "focus",
                body: "A session and a soundscape. Brown noise, pink noise, distant city, silent room.",
              },
              {
                title: "noise",
                body: "Ambient atmosphere that keeps running while you work. The only tool with a mini-player — because it's the only one that earns one.",
              },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 0.04}>
                <div className="border-t border-white/10 pt-6">
                  <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-ink-secondary">
                    {t.title}
                  </p>
                  <p className="mt-4 text-ink-primary text-[16px] md:text-[17px] leading-[1.6]">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Aura>

      {/* ─── Adaptive Zero-Baseline closer (light) ──────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-32 md:py-44">
          <Reveal>
            <Eyebrow tone="light">a promise</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-navy text-[44px] md:text-[80px] lg:text-[104px] leading-[0.98] tracking-[-0.025em] font-semibold max-w-[22ch]">
              No streaks. No targets. No ideal version of you.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-10 text-navy/75 text-[18px] md:text-[20px] leading-[1.65] max-w-[58ch]">
              iMpatient never measures you against a chart. Every read
              starts from where you are in the current hour and asks only
              how to make the next few easier. We call it
              <em className="font-serif">{" "}Adaptive Zero-Baseline{" "}</em>
              &mdash; and it&rsquo;s a discipline, not a feature.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-14">
              <CTA href="/waitlist" tone="light" variant="primary">
                Get started ›
              </CTA>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
