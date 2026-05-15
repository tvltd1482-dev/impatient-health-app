// Atmospheric Weather hero — iOS Weather feel, but the data point that
// matters medically (pressure delta) is the foreground.
//
// Single-pane for personas without travel; dual-pane (current + destination)
// for travelers. Animated atmospheric gradients per sky condition.
// "Contributing to today" footer ties weather to the actual prediction.

const SkyMap = {
  clear:   { name: "clear",   bg: ["#0d2a4d", "#3d6da8", "#8fb3d9"], fg: "#f4ead3", glyph: "sun" },
  partly:  { name: "partly",  bg: ["#1a3854", "#5b7fa3", "#a8b8c9"], fg: "#f0e8d8", glyph: "partly" },
  cloudy:  { name: "cloudy",  bg: ["#2a3848", "#4d5e72", "#8590a0"], fg: "#d8dde4", glyph: "cloud" },
  rain:    { name: "rain",    bg: ["#1a2330", "#2e4358", "#4f6885"], fg: "#a8b8d4", glyph: "rain" },
  storm:   { name: "storm",   bg: ["#0f1620", "#22303f", "#3a4a5c"], fg: "#9caab8", glyph: "rain" },
  snow:    { name: "snow",    bg: ["#3a4860", "#6c7d96", "#c8d0dc"], fg: "#ffffff", glyph: "cloud" },
  night:   { name: "night",   bg: ["#0a0e18", "#1a2030", "#2a3850"], fg: "#9eb4d8", glyph: "moon" },
};

// ───────── Glyphs (atmospheric, single-color, ~80px tall) ─────────
const SkyGlyphs = {
  sun: ({ size = 72, color = "#f4ead3" }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="14" fill={color} opacity="0.95" />
      <circle cx="40" cy="40" r="22" fill={color} opacity="0.16" />
      <circle cx="40" cy="40" r="30" fill={color} opacity="0.07" />
    </svg>
  ),
  partly: ({ size = 72, color = "#f0e8d8" }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.95" />
      <circle cx="30" cy="30" r="18" fill={color} opacity="0.16" />
      <path d="M28 50 C 28 44, 33 40, 39 40 C 44 40, 48 43, 49 47 C 56 47, 62 52, 62 58 C 62 64, 57 68, 51 68 L 30 68 C 24 68, 20 64, 20 58 C 20 53, 24 49, 28 50 Z" fill={color} opacity="0.85" />
    </svg>
  ),
  cloud: ({ size = 72, color = "#d8dde4" }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M22 50 C 22 42, 28 36, 36 36 C 42 36, 47 39, 49 44 C 57 44, 64 50, 64 58 C 64 65, 58 70, 51 70 L 24 70 C 17 70, 12 65, 12 58 C 12 52, 17 48, 22 50 Z" fill={color} opacity="0.95" />
      <path d="M14 38 C 14 32, 19 28, 25 28 C 30 28, 34 31, 35 35" stroke={color} strokeOpacity="0.4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  rain: ({ size = 72, color = "#a8b8d4" }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M22 42 C 22 34, 28 28, 36 28 C 42 28, 47 31, 49 36 C 57 36, 64 42, 64 50 C 64 57, 58 62, 51 62 L 24 62 C 17 62, 12 57, 12 50 C 12 44, 17 40, 22 42 Z" fill={color} opacity="0.95" />
      <path d="M26 66 L 22 74" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M36 66 L 32 74" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M46 66 L 42 74" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M56 66 L 52 74" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
    </svg>
  ),
  moon: ({ size = 72, color = "#9eb4d8" }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M50 22 C 38 22, 28 32, 28 44 C 28 56, 38 66, 50 66 C 56 66, 61 64, 65 60 C 56 60, 48 52, 48 42 C 48 33, 52 26, 58 22 C 56 22, 53 22, 50 22 Z" fill={color} opacity="0.95" />
    </svg>
  ),
};

// ───────── Pressure micro-curve ─────────
const PressureCurve = ({ trend, delta, color = "#ffffff" }) => {
  const W = 120, H = 28, P = 2;
  const min = Math.min(...trend) - 1;
  const max = Math.max(...trend) + 1;
  const xs = trend.map((_, i) => P + (i / (trend.length - 1)) * (W - 2 * P));
  const ys = trend.map(v => P + (1 - (v - min) / (max - min)) * (H - 2 * P));
  const d = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ display: "block" }}>
      <path d={d} stroke={color} strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="2.4" fill={color} />
    </svg>
  );
};

// ───────── Atmosphere overlay (rain dots / clouds) ─────────
const Atmosphere = ({ sky }) => {
  if (sky === "rain" || sky === "storm") {
    // Drifting rain streaks
    const streaks = Array.from({ length: 26 });
    return (
      <div className="wx-atmo wx-atmo-rain" aria-hidden>
        {streaks.map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 4 + (i * 7) % 17) % 100}%`,
              animationDelay: `${(i * 137) % 1800}ms`,
              animationDuration: `${800 + ((i * 53) % 700)}ms`,
              opacity: 0.18 + ((i * 11) % 12) / 60,
            }}
          />
        ))}
      </div>
    );
  }
  if (sky === "partly" || sky === "cloudy") {
    return (
      <div className="wx-atmo wx-atmo-clouds" aria-hidden>
        <span className="wx-cloud wx-cloud-1" />
        <span className="wx-cloud wx-cloud-2" />
        <span className="wx-cloud wx-cloud-3" />
      </div>
    );
  }
  if (sky === "clear") {
    return (
      <div className="wx-atmo wx-atmo-clear" aria-hidden>
        <span className="wx-haze" />
      </div>
    );
  }
  return null;
};

// ───────── A single pane (current OR destination) ─────────
const WeatherPane = ({ pane, role, isDestination = false }) => {
  const sky = SkyMap[pane.sky] || SkyMap.clear;
  const Glyph = SkyGlyphs[sky.glyph] || SkyGlyphs.sun;
  const gradient = `linear-gradient(155deg, ${sky.bg[0]} 0%, ${sky.bg[1]} 55%, ${sky.bg[2]} 100%)`;
  const deltaSign = pane.pressureDelta > 0 ? "+" : pane.pressureDelta < 0 ? "−" : "±";
  const deltaAbs = Math.abs(pane.pressureDelta);

  return (
    <div className={"wx-pane wx-sky-" + pane.sky} style={{ background: gradient, color: sky.fg }}>
      <Atmosphere sky={pane.sky} />

      <div className="wx-pane-inner">
        <div className="wx-pane-head">
          <div>
            <div className="wx-role mono">{role}</div>
            <div className="wx-place">{pane.place}</div>
            <div className="wx-sub mono">{pane.sublabel}</div>
          </div>
          <div className="wx-glyph"><Glyph color={sky.fg} /></div>
        </div>

        <div className="wx-temp-row">
          <div className="wx-temp">
            {pane.temp}<span className="wx-unit">{pane.unit}</span>
          </div>
          <div className="wx-cond">{pane.condition}</div>
        </div>

        <div className="wx-pressure">
          <div className="wx-pressure-left">
            <div className="wx-pressure-label mono">Barometric</div>
            <div className="wx-pressure-value">
              <span className="wx-pressure-num">{pane.pressure}</span>
              <span className="wx-pressure-mb mono">mb</span>
              {deltaAbs > 0 && (
                <span className={"wx-pressure-delta mono " + (deltaAbs >= 12 ? "wx-delta-warn" : "")}>
                  {deltaSign}{deltaAbs}mb
                </span>
              )}
            </div>
          </div>
          <PressureCurve trend={pane.pressureTrend} delta={pane.pressureDelta} color={sky.fg} />
        </div>

        <div className="wx-meta-row mono">
          <span><i>humidity</i> {pane.humidity}%</span>
          <span><i>wind</i> {pane.windMph}mph</span>
          <span><i>↑</i> {pane.sunrise}</span>
          <span><i>↓</i> {pane.sunset}</span>
        </div>

        {isDestination && pane.flight && (
          <div className="wx-flight mono">
            <span className="wx-flight-dot" />
            {pane.flight.code} · departs {pane.flight.depart} · {pane.flight.duration}
          </div>
        )}
      </div>
    </div>
  );
};

// ───────── Hero (handles single + dual-pane) ─────────
const WeatherHero = ({ weather, persona }) => {
  if (!weather) return null;
  const dual = !!weather.destination;

  return (
    <div className={"wx-hero " + (dual ? "wx-hero-dual" : "wx-hero-single")}>
      {dual ? (
        <div className="wx-panes">
          <WeatherPane pane={weather.current} role="now" />
          <div className="wx-arrow" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 11 L19 11 M13 5 L19 11 L13 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <WeatherPane pane={weather.destination} role="next" isDestination />
        </div>
      ) : (
        <WeatherPane pane={weather.current} role="now" />
      )}

      {weather.contributing && weather.contributing.length > 0 && (
        <div className="wx-contributing">
          <div className="wx-contributing-label mono">
            Feeding today's read
            <span className="wx-contributing-line" />
          </div>
          <div className="wx-contributing-rows">
            {weather.contributing.map((c, i) => (
              <div key={i} className={"wx-contrib-row" + (c.weight === "high" ? " is-heavy" : "") + (c.weight === "med" ? " is-med" : "")}>
                <span className="wx-contrib-bullet" />
                <div className="wx-contrib-body">
                  <div className="wx-contrib-headline">{c.label}</div>
                  <div className="wx-contrib-note">{c.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

window.WeatherHero = WeatherHero;
