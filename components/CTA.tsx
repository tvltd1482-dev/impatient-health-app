import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  variant?: "primary" | "ghost";
  className?: string;
};

export function CTA({
  href,
  children,
  tone = "dark",
  variant = "primary",
  className = "",
}: Props) {
  const base = "inline-flex items-center justify-center rounded-btn px-5 py-3 text-[15px] font-semibold transition";
  if (variant === "primary") {
    const skin =
      tone === "dark"
        ? "bg-ink-bright text-navy hover:bg-white"
        : "bg-navy text-ink-bright hover:bg-deep";
    return (
      <Link href={href} className={`${base} ${skin} ${className}`}>
        {children}
      </Link>
    );
  }
  const skin =
    tone === "dark"
      ? "text-ink-bright underline-offset-4 hover:underline"
      : "text-deep underline-offset-4 hover:underline";
  return (
    <Link href={href} className={`${base} ${skin} ${className}`}>
      {children}
    </Link>
  );
}
