type Props = {
  children?: React.ReactNode;
  className?: string;
  variant?: "deep" | "soft";
};

export default function Aura({ children, className = "", variant = "deep" }: Props) {
  const grad =
    variant === "deep"
      ? "radial-gradient(120% 80% at 70% 20%, rgba(26,85,209,0.20), transparent 60%), radial-gradient(80% 60% at 20% 80%, rgba(245,182,66,0.07), transparent 70%), linear-gradient(180deg, #060920 0%, #0B1230 55%, #0E1A44 100%)"
      : "radial-gradient(100% 70% at 50% 0%, rgba(26,85,209,0.10), transparent 60%), linear-gradient(180deg, #0B1230 0%, #0E1A44 100%)";

  return (
    <div
      className={`relative isolate text-ink-bright ${className}`}
      style={{ background: grad }}
    >
      {children}
    </div>
  );
}
