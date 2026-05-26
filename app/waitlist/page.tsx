import Aura from "@/components/Aura";
import Eyebrow from "@/components/Eyebrow";
import Lamp from "@/components/Lamp";
import Reveal from "@/components/Reveal";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: "Waitlist — iMpatient™",
  description:
    "Get notified when iMpatient opens. We'll only ever email you about the launch.",
};

export default function WaitlistPage() {
  return (
    <Aura className="min-h-[100svh] pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <Reveal>
            <Eyebrow tone="dark">waitlist</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-ink-bright text-[40px] md:text-[60px] leading-[1.05] tracking-[-0.02em] font-semibold max-w-[18ch]">
              How much are you ready to see?
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-ink-primary text-[18px] leading-[1.6] max-w-[52ch]">
              Not a paywall. A question about pace. Pick the door that
              suits you today — you can change it any time once we open.
            </p>
          </Reveal>

          <div className="mt-12">
            <Reveal delay={0.18}>
              <WaitlistForm />
            </Reveal>
          </div>
        </div>

        <aside className="md:col-span-5">
          <Reveal delay={0.15} className="flex md:justify-end">
            <Lamp size={260} register="win" />
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 rounded-card border border-white/10 bg-white/[0.03] p-6">
              <Eyebrow tone="dark">what happens next</Eyebrow>
              <ol className="mt-4 space-y-4 text-ink-primary text-[15px] leading-[1.55]">
                <li className="flex gap-3">
                  <span className="font-mono text-ink-tertiary text-[12px] mt-1">
                    01
                  </span>
                  <span>
                    We&rsquo;ll send a single quiet email when iMpatient
                    opens — likely in waves.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-ink-tertiary text-[12px] mt-1">
                    02
                  </span>
                  <span>
                    Onboarding is six minutes. You choose what to connect.
                    Wearables are an enhancement, not a prerequisite.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-ink-tertiary text-[12px] mt-1">
                    03
                  </span>
                  <span>
                    Day one already has something to say. The first read
                    is gentle; the patterns sharpen over weeks.
                  </span>
                </li>
              </ol>
            </div>
          </Reveal>
        </aside>
      </div>
    </Aura>
  );
}
