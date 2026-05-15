// Sparkline component
const Spark = ({ data, color = "var(--pulse)", height = 56, fill = true }) => {
  const w = 240;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - ((v - min) / range) * (h - 8) - 4]);
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const fillPath = path + ` L${w},${h} L0,${h} Z`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {fill && <path d={fillPath} fill={color} opacity="0.08" />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
};

// Stat tile
const Stat = ({ label, value, unit, delta, deltaKind, spark, sparkColor }) => (
  <div className="card">
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value tnum">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </div>
      {delta && <div className={"stat-delta " + (deltaKind || "")}>{delta}</div>}
    </div>
    {spark && (
      <div style={{ marginTop: 12 }}>
        <Spark data={spark} color={sparkColor || "var(--pulse)"} />
      </div>
    )}
  </div>
);

// Big prediction card — the centerpiece
const PredictionCard = () => (
  <div className="card prediction">
    <div className="prediction-head">
      <div>
        <div className="eyebrow" style={{ color: "var(--warn)" }}>● Flare prediction · confidence 0.87</div>
        <h2 className="prediction-title">
          A POTS flare is likely <em>~Thursday afternoon</em>.
        </h2>
        <p className="prediction-sub">
          Three back-to-back signals point the same direction: cumulative meeting load is up 38% week-over-week, your HRV trended down for four nights running, and you fly Sydney → JFK Wednesday night.
        </p>
      </div>
      <div className="prediction-window">
        <div className="page-meta-label">Window</div>
        <div className="prediction-window-time mono">Thu, Apr 30 · 14:00–18:00 EDT</div>
        <div className="prediction-window-sub">≈ 48h out</div>
      </div>
    </div>

    <div className="prediction-signals">
      <SignalRow
        label="Meeting density"
        detail="38% above your 30d average"
        value="9.2h / day"
        weight={0.42}
        color="var(--warn)"
      />
      <SignalRow
        label="HRV trend"
        detail="4 consecutive nights below baseline"
        value="−14ms"
        weight={0.31}
        color="var(--flare)"
      />
      <SignalRow
        label="Travel disruption"
        detail="SYD→JFK overnight, 14h, +14h timezone shift"
        value="Wed 22:30"
        weight={0.27}
        color="var(--pulse)"
      />
    </div>

    <div className="prediction-foot">
      <div className="prediction-foot-left">
        <span className="pill calm">Pre-flare protocol available</span>
        <span className="pill">Auto-shared with Dr. Chen</span>
      </div>
      <div className="prediction-foot-right">
        <button className="btn btn-ghost">Dismiss</button>
        <button className="btn btn-primary">Open protocol →</button>
      </div>
    </div>
  </div>
);

const SignalRow = ({ label, detail, value, weight, color }) => (
  <div className="signal-row">
    <div className="signal-bar">
      <div className="signal-bar-fill" style={{ width: `${weight * 100}%`, background: color }} />
    </div>
    <div className="signal-content">
      <div className="signal-label">{label}</div>
      <div className="signal-detail">{detail}</div>
    </div>
    <div className="signal-value mono">{value}</div>
    <div className="signal-weight mono">w {weight.toFixed(2)}</div>
  </div>
);

Object.assign(window, { Spark, Stat, PredictionCard });
