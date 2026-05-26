import Link from "next/link";

type Props = {
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  href?: string;
  className?: string;
};

const sizes = {
  sm: "text-[18px]",
  md: "text-[22px]",
  lg: "text-[40px] md:text-[56px]",
};

export default function Wordmark({
  size = "md",
  tone = "dark",
  href = "/",
  className = "",
}: Props) {
  const color = tone === "dark" ? "text-ink-bright" : "text-navy";
  const mark = (
    <span className={`wordmark ${sizes[size]} ${color} ${className}`}>
      <span className="i">i</span>
      <span className="m">M</span>
      <span>patient</span>
      <span className="align-super text-[0.45em] ml-[2px] opacity-70">™</span>
    </span>
  );
  if (!href) return mark;
  return (
    <Link href={href} aria-label="iMpatient — home" className="inline-block">
      {mark}
    </Link>
  );
}
