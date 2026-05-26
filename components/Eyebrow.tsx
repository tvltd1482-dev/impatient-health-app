type Props = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  dot?: "discovery" | "win" | "caution" | "flare" | "calm" | "none";
  className?: string;
};

const DOTS = {
  discovery: "#F4B23C",
  win: "#7BCBA1",
  caution: "#E9B452",
  flare: "#F07F77",
  calm: "#7AB8FF",
};

export default function Eyebrow({
  children,
  tone = "dark",
  dot = "none",
  className = "",
}: Props) {
  const color = tone === "dark" ? "text-ink-secondary" : "text-deep";
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-eyebrow ${color} ${className}`}
    >
      {dot !== "none" && (
        <span
          className="inline-block w-[6px] h-[6px] rounded-full mr-2 align-middle"
          style={{ backgroundColor: DOTS[dot] }}
          aria-hidden
        />
      )}
      {children}
    </p>
  );
}
