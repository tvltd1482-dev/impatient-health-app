import Link from "next/link";

type Props = {
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
  href?: string;
  className?: string;
};

/* The wordmark artwork is 1920 x 550. Width is always derived from the
   rendered height at that ratio, so the letterforms are never distorted. */
const RATIO = 1920 / 550;

const heightClass = {
  sm: "h-[18px]",
  md: "h-[22px]",
  lg: "h-10 md:h-14",
};

const nominalHeight = { sm: 18, md: 22, lg: 40 };

export default function Wordmark({
  size = "md",
  tone = "dark",
  href = "/",
  className = "",
}: Props) {
  /* tone describes the surface the mark sits on, not the artwork.
     A dark surface takes the sanctioned mono variant; a light surface
     takes the full-colour navy wordmark. Both carry the trademark. */
  const src =
    tone === "dark"
      ? "/brand/logo-wordmark-mono-white.svg"
      : "/brand/logo-wordmark.svg";

  const h = nominalHeight[size];

  const mark = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="iMpatient"
      width={Math.round(h * RATIO)}
      height={h}
      className={`block w-auto ${heightClass[size]} ${className}`}
    />
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="iMpatient — home" className="inline-block">
      {mark}
    </Link>
  );
}
