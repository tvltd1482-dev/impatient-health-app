"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/waitlist", label: "Waitlist" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = pathname === "/" || pathname === "/how-it-works";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-black/30 border-b border-white/10"
          : "bg-transparent",
        onDark ? "text-ink-bright" : "text-navy",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Wordmark size="sm" tone={onDark ? "dark" : "light"} />
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "transition-opacity",
                  active ? "opacity-100" : "opacity-70 hover:opacity-100",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/waitlist"
            className={[
              "rounded-btn px-4 py-2 text-[14px] font-semibold transition",
              onDark
                ? "bg-ink-bright text-navy hover:bg-white"
                : "bg-navy text-ink-bright hover:bg-deep",
            ].join(" ")}
          >
            Get started ›
          </Link>
        </nav>
        <button
          aria-label="Menu"
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-5 h-px bg-current mb-1" />
          <span className="block w-5 h-px bg-current mb-1" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-abyss-0/95 backdrop-blur">
          <div className="px-6 py-6 flex flex-col gap-4 text-ink-bright">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[18px]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/waitlist"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-btn bg-ink-bright text-navy px-4 py-3 text-center font-semibold"
            >
              Get started ›
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
