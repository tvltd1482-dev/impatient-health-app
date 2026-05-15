// TierLocked — the pane shown when a persona navigates to a route their
// tier doesn't unlock. The product's tier ladder isn't a pricing exercise;
// it's a ladder of understanding. Lock screens have to read like that —
// not paywall copy, not "upgrade now ✨". Calm. Specific. The voice of
// the next room over.

// Route → required tier. Free gets the Observer minimum. Essential adds
// the pattern engine and the care directory. Pro adds every agentic
// surface. Anything not in the map is treated as universally accessible.
const ROUTE_TIER = {
  today: "Free",
  coach: "Free",
  integrations: "Free",
  conditions: "Free",
  profile: "Free",
  settings: "Free",
  patterns: "Essential",
  care: "Essential",
  foresight: "Pro",
  concierge: "Pro",
  admin: "Pro",
  travel: "Pro",
  cost: "Pro",
};

const TIER_RANK = { Free: 0, Essential: 1, Pro: 2 };

function isLockedAtTier(route, currentTier) {
  const required = ROUTE_TIER[route];
  if (!required) return false;
  return (TIER_RANK[currentTier] ?? 0) < TIER_RANK[required];
}

// Per-surface copy. Each is short, calm, specific. Em-clause cadence per
// the constitution. No emoji. No "your wellness journey." We are reading
// what the next tier would let the body say more of, not selling it.
const SURFACE_COPY = {
  patterns: {
    title: "Patterns",
    em: "what your last 30 days have been telling you.",
    lede: "Essential turns thirty days of body signals into pairs that hold up under statistics. Seven days is too small a window to find one. The engine has been watching anyway.",
  },
  care: {
    title: "Care directory",
    em: "your team, on one page.",
    lede: "Essential gives you a place to keep the people who know your body — GP, specialists, infusion nurse, pharmacist — with a line under each name on what is shared with them and when you last saw them.",
  },
  foresight: {
    title: "Foresight",
    em: "the seventy-two-hour window.",
    lede: "Pro reads compounding signals — sleep, pressure, schedule, flights — and tells you which afternoon to keep clear before your body asks you to. The forecast comes with the contributing patterns named.",
  },
  concierge: {
    title: "Appointment concierge",
    em: "the visit, held for both of you.",
    lede: "Pro prepares the appointment in advance — bloodwork ordered, the brief composed in the doctor's voice, the follow-through staged for the days after. Before · during · after, on one page.",
  },
  admin: {
    title: "Admin queue",
    em: "what the system has handled for you.",
    lede: "Pro acts. It reschedules the meeting, drafts the note to the people who need to know, sends the lab order to the lab. Each action is queued for one-tap approval before it ships.",
  },
  travel: {
    title: "Travel Card",
    em: "before you leave, your body knows.",
    lede: "Pro builds the pre-flight protocol from your travel calendar — what to pack, when to take meds, hydration plan, the time-zone shift, the cabin-pressure note. The protocol updates if the trip changes.",
  },
  cost: {
    title: "Cost of Care",
    em: "the dysautonomia tax.",
    lede: "Pro tracks out-of-pocket spend per condition, what insurance covered, what FSA and HSA you kept meaning to log. The number that has been quietly adding up gets a page.",
  },
};

const TierLocked = ({ surface }) => {
  const copy = SURFACE_COPY[surface];
  const required = ROUTE_TIER[surface];

  if (!copy || !required) {
    return (
      <div className="page">
        <div className="page-head"><h1 className="page-title">Locked</h1></div>
      </div>
    );
  }

  const next =
    required === "Essential"
      ? "Move from observation to pattern detection. Thirty-day rolling reads, statistical pairs, the care directory, more sources connected."
      : "Move from pattern detection to a system that acts. Predictive windows, the appointment concierge, the doctor-side brief, the admin queue, travel and cost views.";

  return (
    <div className="page tier-locked-page">
      <div className="aura-hero aura-on">
        <AuraHalo />
        <div className="page-head">
          <div>
            <div className="eyebrow">Requires {required}</div>
            <h1 className="page-title">{copy.title}, <em>{copy.em}</em></h1>
            <p className="page-lede-hero">{copy.lede}</p>
          </div>
          <div className="page-meta">
            <div className="page-meta-label">Tier · locked</div>
            <div className="page-meta-value">{required} or higher</div>
          </div>
        </div>
      </div>

      <div className="tier-locked-card card">
        <div className="tier-locked-eyebrow mono">What {required} adds</div>
        <p className="tier-locked-body">{next}</p>
        <button className="btn btn-primary tier-locked-cta">
          See what {required} adds →
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { TierLocked, ROUTE_TIER, TIER_RANK, isLockedAtTier });
