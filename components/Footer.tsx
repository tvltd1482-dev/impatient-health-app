import Link from "next/link";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="aura relative">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <div className="max-w-prose">
          <p className="font-serif italic text-[28px] md:text-[36px] leading-[1.2] text-ink-bright">
            We're here to give you a little of your time back.
          </p>
        </div>

        <div className="mt-16 hairline hairline-dark" />

        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <Wordmark size="sm" tone="dark" />
            <p className="mt-3 text-ink-secondary text-[13px] max-w-sm">
              Behavioral intelligence. Inspired by the 1.3 billion managing
              chronic illness. Built for anyone whose life moves faster than
              they can process it.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px] text-ink-primary">
            <Link href="/" className="hover:text-ink-bright">
              Home
            </Link>
            <Link href="/how-it-works" className="hover:text-ink-bright">
              How it works
            </Link>
            <Link href="/about" className="hover:text-ink-bright">
              About
            </Link>
            <Link href="/waitlist" className="hover:text-ink-bright">
              Waitlist
            </Link>
          </nav>
        </div>
        <p className="mt-10 text-[12px] text-ink-tertiary font-mono">
          iMpatient™ · pre-launch · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
