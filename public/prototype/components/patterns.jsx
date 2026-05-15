// Patterns — the correlations explorer.
// "Your watch has been keeping a quieter notebook for you. Read it back."
//
// This is the soul of the product: every signal pair the engine has scored,
// rendered as discoverable evidence. Three lenses on the same library:
//   1. Hero pattern — the one driving today's prediction, fully unpacked
//   2. Library — every correlation indexed; sortable, filterable, sparkline-paired
//   3. Discovery feed — newly-passing-significance patterns this week
//   4. Locked — what we'd see if you connected X (gentle, never naggy)

const PatternsPage = () => {
  const personaId = window.__activePersona || "renee";
  const p = window.PERSONAS[personaId] || window.PERSONAS.renee;
  const lib = window.PATTERN_LIBRARY[personaId] || window.PATTERN_LIBRARY.renee;

  const [sort, setSort] = React.useState("strength");
  const [domain, setDomain] = React.useState("all");
  const [openId, setOpenId] = React.useState(lib.hero.id);

  const filtered = React.useMemo(() => {
    let xs = lib.patterns.slice();
    if (domain !== "all") xs = xs.filter(x => x.domain === domain);
    if (sort === "strength") xs.sort((a, b) => b.r - a.r);
    if (sort === "recency") xs.sort((a, b) => b.recency - a.recency);
    if (sort === "novelty") xs.sort((a, b) => b.novelty - a.novelty);
    return xs;
  }, [lib, sort, domain]);

  const open = lib.patterns.find(x => x.id === openId) || lib.hero;

  const domains = ["all", ...Array.from(new Set(lib.patterns.map(x => x.domain)))];

  return (
    <div className="page">
      <div className="aura-hero aura-on">
        <AuraHalo />
        <div className="page-head">
          <div>
            <div className="eyebrow">Patterns</div>
            <h1 className="page-title">
              {lib.headline} <em>{lib.headlineEm}</em>
            </h1>
            <p className="page-lede">{lib.lede}</p>
          </div>
          <div className="page-meta">
            <div className="page-meta-label">{p.tier} · {p.name}</div>
            <div className="page-meta-value">{lib.indexed} signal-pairs scored · {lib.passing} passing significance</div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="patterns-stat-strip">
        <PatternStat label="Pairs scored" value={lib.indexed} note="all signals × all signals" />
        <PatternStat label="Passing significance" value={lib.passing} note="r ≥ 0.5 · n ≥ 14" tone="brand" />
        <PatternStat label="New this week" value={lib.newThisWeek} note="rose above threshold" tone="warn" />
        <PatternStat label="Driving today's prediction" value={lib.driving} note={`${(lib.hero.r).toFixed(2)} compound r`} tone="flare" />
      </div>

      {/* HERO — the pattern driving today */}
      <div className="section-divider">
        <span className="label">The one your body is asking about today</span>
        <span className="line" />
      </div>

      <HeroPattern hero={lib.hero} persona={p} />

      {/* DETAIL VIEWER — open one pattern fully */}
      <div className="section-divider">
        <span className="label">Library · every pair the engine is watching</span>
        <span className="line" />
      </div>

      <div className="patterns-split">
        {/* Left: filterable list */}
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">{filtered.length} patterns</div>
              <div className="card-sub" style={{ marginTop: 4 }}>tap one to read its evidence</div>
            </div>
            <div className="patterns-controls">
              <div className="control-group">
                <span className="control-label mono">sort</span>
                {[["strength", "strength"], ["recency", "recency"], ["novelty", "new"]].map(([k, l]) => (
                  <button key={k} className={"chip" + (sort === k ? " on" : "")} onClick={() => setSort(k)}>{l}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="patterns-domain-row">
            {domains.map(d => (
              <button key={d} className={"chip" + (domain === d ? " on" : "")} onClick={() => setDomain(d)}>
                {d === "all" ? "all domains" : d}
              </button>
            ))}
          </div>

          <div className="pattern-rows">
            {filtered.map(pat => (
              <button
                key={pat.id}
                className={"pattern-row" + (pat.id === openId ? " selected" : "") + (pat.locked ? " locked" : "")}
                onClick={() => !pat.locked && setOpenId(pat.id)}
                disabled={pat.locked}
              >
                <div className="pattern-row-strength">
                  <div className="pattern-r mono">{pat.locked ? "?" : pat.r.toFixed(2)}</div>
                  <StrengthBar r={pat.r} locked={pat.locked} />
                </div>
                <div className="pattern-row-body">
                  <div className="pattern-pair">
                    <span className="sig-a"><ConditionsText>{pat.a}</ConditionsText></span>
                    <span className="pair-arrow">↔</span>
                    <span className="sig-b"><ConditionsText>{pat.b}</ConditionsText></span>
                  </div>
                  <div className="pattern-meta">
                    <span className="pattern-domain mono">{pat.domain}</span>
                    <span className="pattern-meta-dot">·</span>
                    <span className="pattern-n mono">n={pat.n}</span>
                    {pat.novelty > 0.6 && <span className="pattern-tag new">new</span>}
                    {pat.driving && <span className="pattern-tag driving">driving today</span>}
                    {pat.locked && <span className="pattern-tag locked-tag">{pat.unlock}</span>}
                  </div>
                  <div className="pattern-note"><ConditionsText>{pat.note}</ConditionsText></div>
                </div>
                <PairSpark a={pat.sparkA} b={pat.sparkB} colorA={pat.colorA} colorB={pat.colorB} locked={pat.locked} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: open pattern in detail */}
        <PatternDetail pattern={open} persona={p} />
      </div>

      {/* DISCOVERY — new this week */}
      <div className="section-divider">
        <span className="label">Discovery · what crossed the threshold this week</span>
        <span className="line" />
      </div>

      <div className="patterns-discovery">
        {lib.discovery.map((d, i) => (
          <DiscoveryCard key={i} d={d} />
        ))}
      </div>

      {/* LOCKED — gentle */}
      {lib.locked.length > 0 && (
        <>
          <div className="section-divider">
            <span className="label">What we'd see if · no pressure</span>
            <span className="line" />
          </div>
          <div className="patterns-locked">
            {lib.locked.map((l, i) => (
              <LockedCard key={i} l={l} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PatternStat = ({ label, value, note, tone }) => (
  <div className={"pattern-stat" + (tone ? " tone-" + tone : "")}>
    <div className="pattern-stat-label mono">{label}</div>
    <div className="pattern-stat-value mono tnum">{value}</div>
    <div className="pattern-stat-note">{note}</div>
  </div>
);

const StrengthBar = ({ r, locked }) => {
  const pct = locked ? 0 : r * 100;
  const color = r >= 0.8 ? "var(--flare)" : r >= 0.65 ? "var(--warn)" : "var(--pulse)";
  return (
    <div className="strength-bar-vertical">
      <div className="strength-bar-fill-vertical" style={{ height: `${pct}%`, background: locked ? "var(--ink-4)" : color }} />
    </div>
  );
};

// Two sparklines stacked, sharing time axis — the lock-step visual that proves correlation
const PairSpark = ({ a, b, colorA = "var(--pulse)", colorB = "var(--warn)", locked }) => {
  if (locked || !a || !b) {
    return <div className="pair-spark locked-spark" />;
  }
  return (
    <div className="pair-spark">
      <MiniSpark data={a} color={colorA} h={20} />
      <MiniSpark data={b} color={colorB} h={20} />
    </div>
  );
};

const MiniSpark = ({ data, color, h = 20 }) => {
  const w = 100;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg className="mini-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// HERO — the compound pattern driving the live prediction
const HeroPattern = ({ hero, persona }) => (
  <div className="card pattern-hero">
    <div className="pattern-hero-head">
      <div>
        <div className="eyebrow" style={{ color: "var(--flare)" }}>● Compound pattern · driving today</div>
        <h2 className="pattern-hero-title">
          <ConditionsText>{hero.headline}</ConditionsText>
        </h2>
        <p className="pattern-hero-sub"><ConditionsText>{hero.sub}</ConditionsText></p>
      </div>
      <div className="pattern-hero-r">
        <div className="page-meta-label">Compound r</div>
        <div className="pattern-hero-r-val mono tnum">{hero.r.toFixed(2)}</div>
        <div className="pattern-hero-r-note mono">n = {hero.n} comparable weeks</div>
      </div>
    </div>

    <div className="pattern-hero-stack">
      <div className="stack-label mono">how it stacks</div>
      <div className="stack-bars">
        {hero.factors.map((f, i) => (
          <div key={i} className="stack-factor">
            <div className="stack-factor-head">
              <span className="stack-factor-name">{f.name}</span>
              <span className="stack-factor-r mono">r {f.r.toFixed(2)} · w {(f.weight * 100).toFixed(0)}%</span>
            </div>
            <div className="stack-bar">
              <div className="stack-bar-fill" style={{ width: `${f.weight * 100}%`, background: f.color }} />
            </div>
            <div className="stack-factor-detail">{f.detail}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="pattern-hero-foot">
      <div className="pattern-hero-history">
        <div className="stack-label mono">14 comparable weeks · 11 ended in an event</div>
        <div className="history-strip">
          {hero.history.map((h, i) => (
            <div key={i} className={"history-cell " + h.outcome} title={`${h.week}: ${h.outcome}`}>
              <span className="history-cell-tick">{h.outcome === "event" ? "●" : h.outcome === "near-miss" ? "○" : "·"}</span>
            </div>
          ))}
        </div>
        <div className="history-key mono">
          <span><span className="key-dot event" /> event ({hero.history.filter(h => h.outcome === "event").length})</span>
          <span><span className="key-dot near-miss" /> near-miss ({hero.history.filter(h => h.outcome === "near-miss").length})</span>
          <span><span className="key-dot clean" /> clean ({hero.history.filter(h => h.outcome === "clean").length})</span>
        </div>
      </div>

      <div className="pattern-hero-actions">
        <button className="btn btn-ghost">Read the cases</button>
        <button className="btn btn-primary">Open today's window →</button>
      </div>
    </div>
  </div>
);

// Detail viewer — opens any pattern from the library
const PatternDetail = ({ pattern, persona }) => {
  if (pattern.locked) return null;

  return (
    <div className="card pattern-detail">
      <div className="card-head">
        <div>
          <div className="eyebrow">Pattern detail</div>
          <div className="card-title" style={{ marginTop: 6, fontSize: "var(--t-md)" }}>
            <span className="sig-a">{pattern.a}</span>
            <em style={{ color: "var(--ink-6)", margin: "0 8px" }}>↔</em>
            <span className="sig-b">{pattern.b}</span>
          </div>
        </div>
        <div className="pattern-detail-r">
          <div className="page-meta-label">strength</div>
          <div className="mono tnum" style={{ fontSize: "var(--t-xl)", color: "var(--ink-9)" }}>{pattern.r.toFixed(2)}</div>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-6)", letterSpacing: "0.08em" }}>n = {pattern.n}</div>
        </div>
      </div>

      <div className="pattern-detail-body">
        <p className="pattern-detail-narr"><ConditionsText>{pattern.narrative}</ConditionsText></p>

        {/* Time-aligned dual sparkline — the proof */}
        <div className="dual-spark">
          <div className="dual-spark-row">
            <div className="dual-spark-label" style={{ color: pattern.colorA }}>
              <span className="dual-dot" style={{ background: pattern.colorA }} />
              {pattern.a}
            </div>
            <DualSpark data={pattern.sparkA} color={pattern.colorA} />
          </div>
          <div className="dual-spark-row">
            <div className="dual-spark-label" style={{ color: pattern.colorB }}>
              <span className="dual-dot" style={{ background: pattern.colorB }} />
              {pattern.b}
            </div>
            <DualSpark data={pattern.sparkB} color={pattern.colorB} />
          </div>
          <div className="dual-spark-axis mono">
            {pattern.timeAxis.map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>

        {/* Highlighted moments */}
        <div className="moments">
          <div className="moments-label mono">moments that contributed</div>
          {pattern.moments.map((m, i) => (
            <div key={i} className="moment-row">
              <div className="moment-when mono">{m.when}</div>
              <div className="moment-text">{m.text}</div>
              <div className="moment-delta mono">{m.delta}</div>
            </div>
          ))}
        </div>

        <div className="pattern-detail-actions">
          <button className="btn btn-ghost">Tag for Dr. Marsh</button>
          <button className="btn">Open in foresight</button>
          <button className="btn btn-primary">Use as protocol trigger →</button>
        </div>
      </div>
    </div>
  );
};

// Larger sparkline used in detail view
const DualSpark = ({ data, color }) => {
  const w = 480;
  const h = 44;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - ((v - min) / range) * (h - 6) - 3]);
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const fillPath = path + ` L${w},${h} L0,${h} Z`;
  return (
    <svg className="dual-spark-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={fillPath} fill={color} opacity="0.10" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (i % 2 === 0 ? <circle key={i} cx={p[0]} cy={p[1]} r="1.2" fill={color} opacity="0.7" /> : null))}
    </svg>
  );
};

const DiscoveryCard = ({ d }) => (
  <div className="discovery-card">
    <div className="discovery-card-head">
      <div className="discovery-pulse">
        <span className="dot" />
      </div>
      <div className="discovery-strength mono">
        <span className="discovery-r-was">was {d.was.toFixed(2)}</span>
        <span className="discovery-arrow">→</span>
        <span className="discovery-r-now">now {d.now.toFixed(2)}</span>
      </div>
    </div>
    <div className="discovery-pair">
      <span className="sig-a">{d.a}</span>
      <em>↔</em>
      <span className="sig-b">{d.b}</span>
    </div>
    <div className="discovery-note">{d.note}</div>
    <div className="discovery-foot mono">crossed threshold {d.when}</div>
  </div>
);

const LockedCard = ({ l }) => (
  <div className="locked-card">
    <div className="locked-icon">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="7" width="10" height="7" rx="1" />
        <path d="M5 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    </div>
    <div className="locked-body">
      <div className="locked-pair">
        <span className="sig-a">{l.a}</span>
        <em>↔</em>
        <span className="sig-b">{l.b}</span>
      </div>
      <div className="locked-note">{l.note}</div>
      <div className="locked-foot mono">unlocks with: {l.unlock}</div>
    </div>
    <button className="btn btn-ghost locked-cta">Connect</button>
  </div>
);

Object.assign(window, { PatternsPage });
