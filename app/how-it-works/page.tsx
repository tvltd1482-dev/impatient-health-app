import Aura from "@/components/Aura";
import Eyebrow from "@/components/Eyebrow";
import Lamp from "@/components/Lamp";
import Orb from "@/components/Orb";
import Reveal from "@/components/Reveal";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "How it works — iMpatient™",
  description:
    "What iMpatient does on day one, on day seven, and on day ninety. Behavioral intelligence, in plain language.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <Aura className="min-h-[80svh] pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow tone="dark">how it works</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-ink-bright text-[44px] md:text-[64px] leading-[1.04] tracking-[-0.02em] font-semibold">
                It reads your week
                <br />
                <span className="font-serif italic font-normal text-ink-primary">
                  the way a friend might.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-ink-primary text-[18px] md:text-[20px] leading-[1.55] max-w-[48ch]">
                Calendar. Clock. Geography. Whatever wearables you choose
                to connect. iMpatient lays them next to each other and asks
                a quiet question: <em className="font-serif">what is this person walking into?</em>
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <Reveal delay={0.2}>
              <Lamp size={300} register="calm" />
            </Reveal>
          </div>
        </div>
      </Aura>

      {/* ─── Section: alph's four minds ─────────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-28 md:py-36">
          <Reveal>
            <Eyebrow tone="light">the engine</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-navy text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.015em] font-semibold max-w-[20ch]">
              Four minds, one named voice.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-navy/70 text-[18px] leading-[1.55] max-w-[58ch]">
              iMpatient&rsquo;s engine has four ways of thinking. The user
              never sees them as a menu &mdash; they show up only as <em className="font-serif">how</em> alph is paying
              attention.
            </p>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-2 gap-12">
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
                  <h3 className="mt-4 text-navy text-[24px] md:text-[30px] leading-[1.15] font-semibold tracking-[-0.01em]">
                    {m.title}
                  </h3>
                  <p className="mt-4 text-navy/70 text-[16px] leading-[1.55] max-w-[44ch]">
                    {m.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section: Day-1 Value Layer ─────────────────────────────── */}
      <Aura variant="soft" className="py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <Eyebrow tone="dark">day one</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-ink-bright text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.015em] font-semibold max-w-[20ch]">
              You don&rsquo;t have to wait a week to be read.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-ink-primary text-[18px] leading-[1.55] max-w-[60ch]">
              Three universal patterns most bodies share. No wearable
              required. From the first hour, iMpatient already has
              something quiet to say.
            </p>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
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
                <div className="rounded-card border border-white/10 bg-white/[0.03] p-7 h-full">
                  <Eyebrow tone="dark" dot={p.dot}>
                    {p.tag}
                  </Eyebrow>
                  <h3 className="mt-4 text-ink-bright text-[22px] leading-[1.2] font-semibold tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-ink-primary/85 text-[15px] leading-[1.55]">
                    {p.body}
                  </p>
                  <p className="mt-6 font-serif italic text-filament-cool/90 text-[15px] leading-[1.45] border-l border-filament-mid/40 pl-4">
                    {p.quote}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Aura>

      {/* ─── Section: Nodes ─────────────────────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-28 md:py-36">
          <Reveal>
            <Eyebrow tone="light">nodes</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-navy text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.015em] font-semibold max-w-[22ch]">
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
                <div className="rounded-card border border-navy/10 bg-white p-6 h-full">
                  <Eyebrow tone="light" dot={n.dot}>
                    {n.sub}
                  </Eyebrow>
                  <h3 className="mt-4 text-navy text-[22px] font-semibold tracking-[-0.01em]">
                    {n.name}
                  </h3>
                  <p className="mt-3 text-navy/70 text-[14px] leading-[1.55]">
                    {n.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section: the Rail ──────────────────────────────────────── */}
      <Aura className="py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <Eyebrow tone="dark">the Rail</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-ink-bright text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.015em] font-semibold max-w-[22ch]">
              A regulation toolkit, sat quietly at the top of Home.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-ink-primary text-[17px] leading-[1.55] max-w-[60ch]">
              Five soft orbs. Four state-shifting tools, plus the summon
              to alph. They hold their positions. Whichever one fits the
              moment leans gently brighter — never bossy.
            </p>
          </Reveal>

          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12">
            <Orb kind="alph" label="alph" />
            <Orb kind="breathing" label="breathing" lead />
            <Orb kind="sleep" label="sleep" />
            <Orb kind="focus" label="focus" />
            <Orb kind="noise" label="noise" />
          </div>

          <div className="mt-20 grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
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
                <div className="border-t border-white/10 pt-5">
                  <p className="font-mono text-[12px] uppercase tracking-eyebrow text-ink-secondary">
                    {t.title}
                  </p>
                  <p className="mt-3 text-ink-primary text-[16px] leading-[1.55]">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Aura>

      {/* ─── Section: Adaptive Zero-Baseline ────────────────────────── */}
      <section className="bg-page">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-32">
          <Reveal>
            <Eyebrow tone="light">a promise</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 text-navy text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.015em] font-semibold max-w-[20ch]">
              No streaks. No targets. No ideal version of you.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 text-navy/75 text-[18px] leading-[1.6] max-w-[58ch]">
              iMpatient never measures you against a chart. Every read
              starts from where you are in the current hour and asks only
              how to make the next few easier. We call it{" "}
              <em className="font-serif">Adaptive Zero-Baseline</em>{" "}
              &mdash; and it&rsquo;s a discipline, not a feature.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12">
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
