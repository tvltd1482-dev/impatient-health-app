// Shared icons (stroke-based, minimal)
const Icon = ({ name, size = 14 }) => {
  const paths = {
    today: <path d="M3 5h10M3 8h10M3 11h10" />,
    pulse: <path d="M1 8h3l1.5-4 3 8 1.5-4h3" />,
    foresight: <><circle cx="7" cy="7" r="5" /><path d="M7 4v3l2 2" /></>,
    admin: <><rect x="3" y="2.5" width="8" height="9" rx="0.5" /><path d="M5 5h4M5 7h4M5 9h2.5" /></>,
    travel: <path d="M2 8l10-3-3 8-2-3-3 1z" />,
    pattern: <><circle cx="4" cy="4" r="2" /><circle cx="11" cy="11" r="2" /><path d="M5.5 5.5l4 4" /></>,
    cost: <><circle cx="7" cy="7" r="5" /><path d="M7 4v6M5.5 5.5h2a1 1 0 010 2h-1a1 1 0 000 2H9" /></>,
    coach: <path d="M2 4h10a1 1 0 011 1v5a1 1 0 01-1 1H6l-3 2.5V11H2a1 1 0 01-1-1V5a1 1 0 011-1z" />,
    care: <><path d="M7 12s-4-2.5-4-5.5a2.5 2.5 0 014.5-1.5A2.5 2.5 0 0111 6.5C11 9.5 7 12 7 12z" /></>,
    conditions: <><rect x="2.5" y="2.5" width="9" height="9" /><path d="M7 5v4M5 7h4" /></>,
    integrations: <><circle cx="4" cy="4" r="2" /><circle cx="10" cy="10" r="2" /><circle cx="10" cy="4" r="2" /><circle cx="4" cy="10" r="2" /></>,
    profile: <><circle cx="7" cy="5" r="2.5" /><path d="M2 13c0-2.5 2.5-4 5-4s5 1.5 5 4" /></>,
    settings: <><circle cx="7" cy="7" r="2" /><path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.5 2.5l1.5 1.5M10 10l1.5 1.5M2.5 11.5L4 10M10 4l1.5-1.5" /></>,
    chevron: <path d="M5 3l4 4-4 4" />,
    arrow: <><path d="M3 7h8" /><path d="M8 4l3 3-3 3" /></>,
    plus: <path d="M7 3v8M3 7h8" />,
    dot: <circle cx="7" cy="7" r="2" fill="currentColor" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// Brand mark — uses real logo
const Brand = () => (
  <div className="brand">
    <img src="assets/logo-lockup.svg" alt="iMpatient" className="brand-lockup" width="160" height="28" />
  </div>
);

// Sidebar
const Sidebar = ({ current, onNav, persona, open, onClose }) => {
  const tier = persona?.tier || "Free";
  const items = [
    { section: "Now" },
    { id: "today", label: "Today", icon: "today" },
    { id: "foresight", label: "Foresight", icon: "foresight", badge: { text: "Thu", kind: "alert" } },
    { id: "coach", label: "Coach", icon: "coach" },
    { section: "Life admin" },
    { id: "concierge", label: "Appointments", icon: "care", badge: { text: "Tue" } },
    { id: "admin", label: "Admin queue", icon: "admin", badge: { text: "7" } },
    { id: "travel", label: "Travel Card", icon: "travel" },
    { id: "cost", label: "Cost of Care", icon: "cost" },
    { section: "Evidence" },
    { id: "patterns", label: "Patterns", icon: "pattern" },
    { id: "conditions", label: "Conditions library", icon: "conditions" },
    { id: "care", label: "Care directory", icon: "care" },
    { section: "Account" },
    { id: "integrations", label: "Integrations", icon: "integrations", badge: { text: "12" } },
    { id: "profile", label: "Profile", icon: "profile" },
    { id: "settings", label: "Settings", icon: "settings" },
    { section: "Preview" },
    { id: "onboarding", label: "Onboarding", icon: "pulse" },
  ];
  const handleNav = (id) => {
    onNav?.(id);
    // Close the mobile drawer after a route change so the user lands
    // on the new page instead of staring at the menu they just used.
    onClose?.();
  };
  return (
    <>
      {/* Mobile-only scrim. Tapping it closes the drawer. */}
      <div className={"sidebar-scrim" + (open ? " open" : "")} onClick={onClose} aria-hidden="true" />
      <aside className={"sidebar" + (open ? " open" : "")}>
        <Brand />
        <nav className="nav">
          {items.map((it, i) => {
            if (it.section) return <div key={i} className="nav-section">{it.section}</div>;
            const locked = window.isLockedAtTier && window.isLockedAtTier(it.id, tier);
            const requiredTier = locked && window.ROUTE_TIER ? window.ROUTE_TIER[it.id] : null;
            return (
              <div
                key={it.id}
                className={"nav-item" + (current === it.id ? " active" : "") + (locked ? " locked" : "")}
                onClick={() => handleNav(it.id)}
              >
                <span className="nav-item-icon"><Icon name={it.icon} /></span>
                <span>{it.label}</span>
                {locked ? (
                  <span className="nav-item-tier mono">{requiredTier}</span>
                ) : it.badge ? (
                  <span className={"nav-item-badge" + (it.badge.kind === "alert" ? " alert" : "")}>
                    {it.badge.text}
                  </span>
                ) : null}
              </div>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <div className="user-card">
            <div className="user-avatar">{persona?.name ? persona.name.slice(0, 2).toUpperCase() : "AA"}</div>
            <div>
              <div className="user-name">{persona?.name || "Azure A."}</div>
              <div className="user-status mono">
                {(persona?.locationStr?.split(",")[0] || "NY")} · {tier.toLowerCase()} tier
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Topbar
const Topbar = ({ crumb, persona, onMenuToggle }) => (
  <header className="topbar">
    <div className="topbar-left">
      {/* Hamburger — visible only on mobile via CSS. */}
      <button className="menu-btn" onClick={onMenuToggle} aria-label="Open menu">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M3 5h12M3 9h12M3 13h12" />
        </svg>
      </button>
      <div className="crumbs">
        <span>iMpatient</span> / <strong>{crumb}</strong>
      </div>
    </div>
    <div className="topbar-right">
      {persona?.tier && <span className="pill tier-pill mono">{persona.tier}</span>}
      <span className="pill pulse"><span className="dot" /> live</span>
      <button className="btn btn-ghost topbar-action">Last sync · 2m</button>
      <button className="btn topbar-action">Export</button>
    </div>
  </header>
);

Object.assign(window, { Icon, Brand, Sidebar, Topbar });
