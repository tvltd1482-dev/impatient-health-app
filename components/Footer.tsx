import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-page border-t border-navy/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16 pb-10">
        <p className="text-navy text-[18px] md:text-[22px] font-semibold tracking-[0.32em]">
          IMPATIENT
        </p>

        <div className="mt-10 h-px bg-navy/10" />

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[13px] text-navy/55">
          <p>
            © {new Date().getFullYear()} SymbAIo Inc. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/how-it-works" className="hover:text-navy">
              How it works
            </Link>
            <Link href="/about" className="hover:text-navy">
              About
            </Link>
            <Link href="/waitlist" className="hover:text-navy">
              Waitlist
            </Link>
            <span className="opacity-50">Privacy</span>
            <span className="opacity-50">Data security</span>
            <span className="opacity-50">Conditions</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
