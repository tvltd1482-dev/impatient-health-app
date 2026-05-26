"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [stance, setStance] = useState<"breathing" | "patterns" | "full">(
    "patterns",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), stance }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. We'll be in touch when we open.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl">
      <fieldset className="mb-8">
        <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary mb-4">
          where are you, today?
        </legend>
        <div className="grid gap-3">
          {(
            [
              {
                key: "breathing",
                label: "I want to start breathing.",
                hint: "free · the quiet door",
              },
              {
                key: "patterns",
                label: "I'm ready to see more of my patterns.",
                hint: "essential · recommended",
              },
              {
                key: "full",
                label: "I want the full picture.",
                hint: "pro · 30-day free trial",
              },
            ] as const
          ).map((opt) => {
            const selected = stance === opt.key;
            return (
              <label
                key={opt.key}
                className={[
                  "block cursor-pointer rounded-card border px-4 py-4 transition",
                  selected
                    ? "border-filament-mid bg-white/[0.05]"
                    : "border-white/15 hover:border-white/30 bg-white/[0.02]",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="stance"
                  value={opt.key}
                  checked={selected}
                  onChange={() => setStance(opt.key)}
                  className="sr-only"
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-ink-bright text-[16px] font-medium">
                    {opt.label}
                  </span>
                  <span
                    className={[
                      "shrink-0 w-4 h-4 rounded-full border",
                      selected
                        ? "border-filament-mid bg-filament-mid"
                        : "border-ink-secondary/60",
                    ].join(" ")}
                    aria-hidden
                  />
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary">
                  {opt.hint}
                </p>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-secondary">
          your email
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@anywhere.com"
          className="mt-2 w-full bg-transparent border-b border-white/20 focus:border-filament-mid outline-none text-ink-bright text-[18px] py-3 placeholder:text-ink-tertiary"
          autoComplete="email"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 inline-flex items-center rounded-btn bg-ink-bright text-navy px-5 py-3 text-[15px] font-semibold hover:bg-white disabled:opacity-60 transition"
      >
        {status === "loading" ? "Sending…" : "Join the waitlist ›"}
      </button>

      <AnimatePresence>
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={[
              "mt-5 text-[14px]",
              status === "success" ? "text-reg-win" : "text-reg-flare",
            ].join(" ")}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="mt-8 text-ink-tertiary text-[12px] leading-[1.5] max-w-md">
        We&rsquo;ll only ever email you about iMpatient&rsquo;s launch. You
        can leave at any time. Your data is held quietly — see our
        Privacy notes for the full posture.
      </p>
    </form>
  );
}
