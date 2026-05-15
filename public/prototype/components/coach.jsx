// AI Coach — Claude-powered conversational surface inside iMpatient
// Per the constitution, the system prompt is loaded from the active
// persona's signals. Switching personas in Tweaks resets the conversation
// and rebuilds the prompt, context strip, opener, and prompt chips from
// that persona's data — same engine, three lives.

// Tier-specific voice rules (BRIEF.md):
//   Free / Harlow: gentle, curious, never pushy
//   Essential / Bella: specific, precise, validating
//   Pro / Grayson: brisk, executive-grade, no hand-holding
const VOICE_BY_TIER = {
  Free: "Voice: gentle, curious, never pushy. The body has been keeping a notebook — you are reading it back without selling anything. Newly diagnosed; do not overload her.",
  Essential: "Voice: specific, precise, validating. She has been searching for years; show her the patterns her body has been writing. 'You weren't imagining it.'",
  Pro: "Voice: brisk, executive-grade, no hand-holding. She knows her body, has the resources, wants the verdict and the protocol. Cut the preamble.",
};

// What the active tier actually grants the Coach to reason from.
const SCOPE_BY_TIER = {
  Free: "Your view is the last 7 days, from her Apple Watch only. You cannot see her calendar, communication patterns, or any forecast — say so plainly when she asks about anything you cannot see.",
  Essential: "Your view is the last 30 days, multi-source (wearables + calendars + cycle). Pattern detection is on. You do not yet have predictive flare windows or the agentic concierge — surface insight, do not promise actions.",
  Pro: "Your view is the full predictive stack — 72-hour flare windows, the agentic concierge, drafted doctor-side briefs. You can suggest actions for queued one-tap approval. Do not act unilaterally.",
};

const pickBio = (persona, label) => persona.biometrics?.find((b) => b.label === label);

function buildSystemPrompt(persona) {
  const hrv = pickBio(persona, "HRV");
  const rhr = pickBio(persona, "Resting HR");
  const slp = pickBio(persona, "Sleep");
  const live = [
    hrv && `HRV ${hrv.value}${hrv.unit || ""} (${hrv.delta})`,
    rhr && `resting HR ${rhr.value}${rhr.unit || ""} (${rhr.delta})`,
    slp && `sleep ${slp.value} (${slp.delta})`,
  ].filter(Boolean).join(", ");

  return `You are the AI Coach inside iMpatient — a clinical companion for people living with chronic, hard-to-diagnose illness. You are speaking with ${persona.name}, ${persona.age}. ${persona.role}. Today she is in ${persona.locationStr}.

Her live signals: ${live}.

${SCOPE_BY_TIER[persona.tier]}

${VOICE_BY_TIER[persona.tier]}

You are not a doctor — you surface what her body has been saying, suggest protocols she has logged before, and prepare her for medical conversations. Never moralize about workload. Use short paragraphs. When you reference her data, be specific. When you don't know, say so. Never use emoji.`;
}

const SEED_BY_TIER = {
  Free: (p) => ({
    text: `Morning, ${p.name}. Your watch has been keeping a quieter notebook than you have — this is the first week we've read it back. Want me to walk you through what it has noticed, or talk through the Sundays?`,
    meta: `Reading: HRV · resting HR · sleep · time on feet · last 7d only`,
  }),
  Essential: (p) => ({
    text: `${p.name} — you've been searching three years. Today the 30-day view has something that holds up: a pair the body has been making, consistently, in the same shape. Walk through it with me?`,
    meta: `Reading: 30d biometrics · 2 calendars · cycle · pattern engine on`,
  }),
  Pro: (p) => ({
    text: `${p.name}. The 72-hour window flags Thursday afternoon. Geneva trip is on the calendar. Two protocols are queued for your approval, the doctor-side brief is composed. Where do you want to start?`,
    meta: `Reading: 14d biometrics · 4 calendars · travel · forecast · concierge`,
  }),
};

const SUGGESTED_BY_TIER = {
  Free: [
    "Why does Sunday evening feel different?",
    "What did my body do this week?",
    "What would the watch tell my doctor?",
    "Should I worry about the borrowed legs days?",
  ],
  Essential: [
    "What changed in the last 14 nights?",
    "Show me the pair that holds up across 30 days.",
    "Pre-visit summary for Dr. Chen.",
    "Is the launch week showing up in my body yet?",
  ],
  Pro: [
    "What's behind Thursday's flare window?",
    "Draft the pre-visit brief for Dr. Marsh.",
    "Which queued protocols are ready to approve?",
    "Move the Geneva infusion if LH441 slips >90min.",
  ],
};

const META_BY_TIER = {
  Free: "7d watch only · 1 condition",
  Essential: "30d multi-source · cycle · 2 conditions",
  Pro: "14d biometrics · 4 calendars · travel · 4 conditions",
};

const DOCTOR_BY_TIER = {
  Free: "your GP",
  Essential: "Dr. Chen",
  Pro: "Dr. Marsh",
};

const THREADS_BY_TIER = {
  Free: [
    { id: "today", title: "What did this week say?", sub: "Today · 09:12", preview: "First read of the watch notebook" },
    { id: "sundays", title: "Why every Sunday evening?", sub: "Apr 27 · 19:48", preview: "+6 bpm, same time, all 4 weeks" },
    { id: "notebook", title: "Should I bring the watch read to my GP?", sub: "Apr 25 · 16:02", preview: "What would she want to see" },
  ],
  Essential: [
    { id: "today", title: "What changed in the last 14 nights?", sub: "Today · 14:22", preview: "Trend across HRV + sleep" },
    { id: "patterns", title: "Pair that holds at 30 days", sub: "Apr 22 · 09:14", preview: "Standing + cycle phase" },
    { id: "visit", title: "Pre-visit brief for Dr. Chen", sub: "Apr 18 · 10:46", preview: "30-day signal summary" },
  ],
  Pro: [
    { id: "today", title: "Thursday flare window — what's behind it?", sub: "Today · 06:30", preview: "78% · 3 contributing patterns" },
    { id: "geneva", title: "Geneva trip · pre-flight protocol", sub: "Yesterday · 22:14", preview: "Infusion + compression + meds" },
    { id: "marsh", title: "Pre-visit brief for Dr. Marsh", sub: "May 11 · 09:10", preview: "Generated 30-day signal summary" },
    { id: "lh441", title: "If LH441 delays >90min", sub: "May 10 · 17:22", preview: "Auto re-time Geneva infusion" },
  ],
};

const CoachPage = () => {
  const persona =
    (typeof window !== "undefined" && window.PERSONAS[window.__activePersona]) ||
    window.PERSONAS.renee;
  const SYSTEM_PROMPT = React.useMemo(() => buildSystemPrompt(persona), [persona]);
  const seed = React.useMemo(() => SEED_BY_TIER[persona.tier](persona), [persona]);
  const STARTER_THREADS = THREADS_BY_TIER[persona.tier];
  const SUGGESTED_PROMPTS = SUGGESTED_BY_TIER[persona.tier];

  const [messages, setMessages] = React.useState([{ role: "assistant", ...seed }]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [streamingText, setStreamingText] = React.useState("");
  const [activeThread, setActiveThread] = React.useState("today");
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, streamingText]);

  async function send(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || busy) return;
    const next = [...messages, { role: "user", text: trimmed }];
    setMessages(next);
    setInput("");
    setStreamingText("");
    setBusy(true);

    try {
      const reply = await window.claude.complete({
        messages: [
          { role: "user", content: SYSTEM_PROMPT + "\n\nConversation so far:\n" +
            next.map(m => `${m.role.toUpperCase()}: ${m.text}`).join("\n\n") +
            "\n\nReply as the AI Coach. Plainspoken, 2–4 short paragraphs max."
          }
        ],
        onChunk: (delta) => setStreamingText((s) => s + delta),
      });
      setMessages([...next, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages([...next, { role: "assistant", text: "I'm having trouble reaching the model right now. Try again in a moment.", error: true }]);
    } finally {
      setStreamingText("");
      setBusy(false);
    }
  }

  return (
    <div className="page coach-page">
      <div className="aura-hero aura-on">
        <AuraHalo />
        <div className="page-head">
          <div>
            <div className="eyebrow">AI Coach · powered by Claude</div>
            <h1 className="page-title">
              Talk through your signals, <em>like a person.</em>
            </h1>
          </div>
          <div className="page-meta">
            <div className="page-meta-label">Context loaded</div>
            <div className="page-meta-value">{META_BY_TIER[persona.tier]}</div>
          </div>
        </div>
      </div>

      <div className="coach-shell">
        {/* Thread sidebar */}
        <aside className="coach-threads">
          <div className="coach-threads-head">
            <div className="card-sub">Conversations</div>
            <button className="btn btn-ghost coach-new">+ New</button>
          </div>
          {STARTER_THREADS.map(t => (
            <button
              key={t.id}
              className={"thread-item" + (activeThread === t.id ? " active" : "")}
              onClick={() => setActiveThread(t.id)}
            >
              <div className="thread-title"><ConditionsText>{t.title}</ConditionsText></div>
              <div className="thread-preview"><ConditionsText>{t.preview}</ConditionsText></div>
              <div className="thread-time mono">{t.sub}</div>
            </button>
          ))}
        </aside>

        {/* Conversation pane */}
        <section className="coach-conv">
          <div className="coach-conv-head">
            <div>
              <div className="coach-conv-title">
                <ConditionsText>{(STARTER_THREADS.find(t => t.id === activeThread) || STARTER_THREADS[0]).title}</ConditionsText>
              </div>
              <div className="coach-conv-sub mono">{persona.tier} tier · {messages.length - 1} turns</div>
            </div>
            <div className="coach-conv-actions">
              <span className="pill pulse"><span className="dot" /> Claude · live</span>
              <button className="btn btn-ghost">Share with {DOCTOR_BY_TIER[persona.tier]}</button>
            </div>
          </div>

          <div className="coach-context-strip">
            {persona.biometrics.slice(0, 4).map((b) => (
              <ContextChip
                key={b.label}
                label={b.label}
                value={`${b.value}${b.unit || ""}`}
                delta={b.delta}
                tone={b.deltaKind === "alert" ? "flare" : b.deltaKind === "up" || b.deltaKind === "down" ? "warn" : "pulse"}
              />
            ))}
          </div>

          <div className="coach-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <Message key={i} msg={m} />
            ))}
            {busy && streamingText && (
              <Message msg={{ role: "assistant", text: streamingText }} />
            )}
            {busy && !streamingText && (
              <div className="msg msg-assistant">
                <div className="msg-avatar"><img src="assets/logo-mark.svg" alt="" /></div>
                <div className="msg-body">
                  <div className="typing"><span /><span /><span /></div>
                </div>
              </div>
            )}
          </div>

          <div className="coach-suggested">
            {SUGGESTED_PROMPTS.map((p, i) => (
              <button key={i} className="suggest-chip" onClick={() => send(p)} disabled={busy}>
                {p}
              </button>
            ))}
          </div>

          <form
            className="coach-input"
            onSubmit={(e) => { e.preventDefault(); send(); }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your signals, draft a doctor brief, plan the day…"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <div className="coach-input-foot">
              <div className="coach-input-meta mono">
                <span className="dot" style={{ marginRight: 6 }} />
                Claude reads your last 14d of signals · never your raw email body
              </div>
              <button type="submit" className="btn btn-primary" disabled={busy || !input.trim()}>
                Send →
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

const Message = ({ msg }) => {
  if (msg.role === "user") {
    return (
      <div className="msg msg-user">
        <div className="msg-body">
          <div className="msg-text">{msg.text}</div>
        </div>
        <div className="msg-avatar user-avatar">AA</div>
      </div>
    );
  }
  return (
    <div className="msg msg-assistant">
      <div className="msg-avatar"><img src="assets/logo-mark.svg" alt="" /></div>
      <div className="msg-body">
        {msg.meta && <div className="msg-meta mono">{msg.meta}</div>}
        <div className="msg-text">{msg.text}</div>
      </div>
    </div>
  );
};

const ContextChip = ({ label, value, delta, tone }) => (
  <div className={"context-chip context-chip-" + tone}>
    <div className="context-chip-label mono">{label}</div>
    <div className="context-chip-value mono">{value}</div>
    <div className="context-chip-delta mono">{delta}</div>
  </div>
);

Object.assign(window, { CoachPage });
