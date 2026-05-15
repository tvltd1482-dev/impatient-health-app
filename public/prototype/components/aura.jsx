/* eslint-disable no-undef */
/* AuraHalo + AuraLoader
   The luminous bright-blue aura is iMpatient's hero motif. It is the
   visual ethos of the brand: knowledge meeting calm. We treat it like
   weather — a presence in the background that subtly shifts with time
   of day, never demanding attention.

   AuraHalo  — drop into any positioned container as a backdrop.
   AuraLoader — fullscreen overlay used between heavy transitions
                (generating a doctor brief, opening a weekly read, etc.)
   useAuraTone() — hook returning the right tone for the current hour.
*/

function useAuraTone() {
  // Tone shifts with time of day. Cool early morning, warm late afternoon,
  // dusk in evening, default the rest of the time. Memoized to the hour
  // so it doesn't thrash on every render.
  const [tone, setTone] = React.useState(() => toneForHour(new Date().getHours()));
  React.useEffect(() => {
    const id = setInterval(() => setTone(toneForHour(new Date().getHours())), 60_000);
    return () => clearInterval(id);
  }, []);
  return tone;
}
function toneForHour(h) {
  if (h >= 5 && h < 10)  return "cool";   // dawn / morning
  if (h >= 10 && h < 16) return "default";
  if (h >= 16 && h < 19) return "warm";   // golden hour
  return "dusk";
}

function AuraHalo({ tone, size = "lg", style, className = "" }) {
  const auto = useAuraTone();
  const t = tone || auto;
  const cls = size === "sm" ? "aura-halo-sm" : "aura-halo";
  return <div className={cls + " " + className} data-tone={t} style={style} aria-hidden="true" />;
}

/* Page-level backdrop — sits below all content. Mount once per page. */
function AuraBackdrop({ tone }) {
  const auto = useAuraTone();
  return <div className="aura-backdrop" data-tone={tone || auto} aria-hidden="true" />;
}

/* AuraLoader — full-screen 'take a breath' moment. Pass `message` and
   optionally `submessage`. Auto-dismisses after `durationMs` if provided
   (default: stays until parent unmounts it). */
function AuraLoader({ message = "Reading your week…", submessage, durationMs, onDone, tone }) {
  const auto = useAuraTone();
  React.useEffect(() => {
    if (!durationMs) return;
    const id = setTimeout(() => onDone && onDone(), durationMs);
    return () => clearTimeout(id);
  }, [durationMs, onDone]);

  return (
    <div className="aura-loader" role="status" aria-live="polite">
      <div className="aura-loader-halo" data-tone={tone || auto} aria-hidden="true" />
      <div className="aura-loader-core" aria-hidden="true">
        <div className="aura-loader-pulse" />
        <div className="aura-loader-pulse aura-loader-pulse-2" />
        <div className="aura-loader-pulse aura-loader-pulse-3" />
      </div>
      <div className="aura-loader-text">
        <p className="aura-loader-message">{message}</p>
        {submessage && <p className="aura-loader-sub">{submessage}</p>}
      </div>
    </div>
  );
}

/* AuraOrb — small, inline luminous orb. Used as a brand mark
   accent or near hero numbers to signal the iMpatient presence. */
function AuraOrb({ size = 48, tone }) {
  const auto = useAuraTone();
  return (
    <div className="aura-orb" data-tone={tone || auto} style={{ width: size, height: size }} aria-hidden="true">
      <div className="aura-orb-glow" />
      <div className="aura-orb-core" />
    </div>
  );
}

Object.assign(window, { AuraHalo, AuraBackdrop, AuraLoader, AuraOrb, useAuraTone });
