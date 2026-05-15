/* Shared onboarding state — used by Lean and Deep flows.
   Each flow has its own scoped state via a Context. Allows typing your
   name in screen 2 to show up on screen 5's headline, etc.

   We don't persist beyond reload; this is a design canvas, not a real
   account. Each flow's state is fully independent so the user can run
   them in parallel without bleeding.
*/

const FlowCtx = React.createContext(null);

function useFlow() {
  return React.useContext(FlowCtx);
}

/* Default seed — Bella (Essential / The Pattern-Seeker) is the warmest
   placeholder if the user doesn't type anything: she's mid-journey, has
   a few diagnoses, and produces a satisfying first-read demo. */
const DEFAULT_FLOW = {
  entry: 'cold',                  // cold | clinician | community
  legalName: '',
  callName: '',
  yearDiagnosed: '',
  diagnoses: [],                  // array of tag ids
  symptoms: [],
  careTeam: [],
  wearables: [],
  calendars: [],
  comms: [],
  cadence: 'morning',
  shareWindow: false,
};

function FlowProvider({ initial, children }) {
  const [state, setState] = React.useState(() => ({ ...DEFAULT_FLOW, ...(initial || {}) }));
  const update = React.useCallback((patch) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);
  const toggle = React.useCallback((key, value) => {
    setState((s) => {
      const arr = s[key] || [];
      const exists = arr.includes(value);
      return { ...s, [key]: exists ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  }, []);
  return (
    <FlowCtx.Provider value={{ state, update, toggle }}>
      {children}
    </FlowCtx.Provider>
  );
}

/* Helper: which first name to display.
   - If user typed callName, use that.
   - If they typed legalName, use the first token.
   - Otherwise fall back to the seed (Bella). */
function flowFirstName(state, fallback = 'Bella') {
  if (state.callName && state.callName.trim()) return state.callName.trim();
  if (state.legalName && state.legalName.trim()) {
    return state.legalName.trim().split(/\s+/)[0];
  }
  return fallback;
}

Object.assign(window, { FlowCtx, useFlow, FlowProvider, flowFirstName, DEFAULT_FLOW });
