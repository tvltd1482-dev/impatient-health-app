// AI Coach — Claude-powered conversational surface inside iMpatient
// Pulls in today's signals as context so the conversation isn't generic.

const SYSTEM_PROMPT = `You are the AI Coach inside iMpatient — a behavioral intelligence companion for people managing chronic illness. You are speaking with Azure, who manages RRMS, POTS, MCAS, ADHD, BRCA+, and Raynaud's, and travels between New York and Queensland. You see her live signals: today her HRV is 29ms (14ms below baseline, 4 nights running), resting HR 82 (+12), sleep 4h 48m, and she has a SYD→JFK flight tonight. The system has flagged a likely POTS flare Thursday afternoon (87% confidence).

Be calm, concise, plainspoken. You are not a doctor — you surface patterns, suggest protocols she has logged before, and prepare her for medical conversations. Never moralize about workload. Use short paragraphs. When you reference her data, be specific. When you don't know, say so.`;

const STARTER_THREADS = [
  {
    id: "today",
    title: "Why is my HRV tanking?",
    sub: "Yesterday · 14:22",
    preview: "Walk me through the last 4 nights",
  },
  {
    id: "appt",
    title: "Pre-visit brief for Dr. Chen",
    sub: "Apr 25 · 09:10",
    preview: "Generated 30-day signal summary",
  },
  {
    id: "travel",
    title: "Pre-flight POTS protocol",
    sub: "Apr 22 · 19:48",
    preview: "Hydration, compression, electrolytes…",
  },
  {
    id: "raynauds",
    title: "Raynaud's correlation with office HVAC",
    sub: "Apr 18 · 11:03",
    preview: "r=0.91 with cold exposure <12°C",
  },
];

const SUGGESTED_PROMPTS = [
  "What changed in the last 4 nights?",
  "Draft a pre-visit brief for Dr. Chen on Monday.",
  "Should I move the 14:00 packing block?",
  "What's the strongest correlation in my last 30 days?",
];

const SEED_MESSAGES = [
  {
    role: "assistant",
    text: "Good morning. I've been watching your overnights — your HRV has dropped four nights in a row and you're flying tonight. Want me to walk you through what I'm seeing, or jump to the pre-flight protocol?",
    meta: "Reading: HRV ↓14ms · RHR +12 · sleep 4h 48m · travel +14h tz",
  },
];

const CoachPage = () => {
  const [messages, setMessages] = React.useState(SEED_MESSAGES);
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
            <div className="page-meta-value">14d biometrics · 30d schedule · 6 conditions</div>
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
              <div className="coach-conv-title">Why is my HRV tanking?</div>
              <div className="coach-conv-sub mono">Started Apr 28 · 14:22 EDT · 8 turns</div>
            </div>
            <div className="coach-conv-actions">
              <span className="pill pulse"><span className="dot" /> Claude · live</span>
              <button className="btn btn-ghost">Share with Dr. Chen</button>
            </div>
          </div>

          <div className="coach-context-strip">
            <ContextChip label="HRV" value="29ms" delta="−14ms · 4n" tone="flare" />
            <ContextChip label="RHR" value="82bpm" delta="+12" tone="warn" />
            <ContextChip label="Sleep" value="4h 48m" delta="−2h 06m" tone="flare" />
            <ContextChip label="Movement" value="3,148" delta="−4,852" tone="warn" />
            <ContextChip label="Flight" value="QF11 22:30" delta="+14h tz" tone="pulse" />
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
                <div className="msg-avatar"><img src="assets/logo-mark.png" alt="" /></div>
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
      <div className="msg-avatar"><img src="assets/logo-mark.png" alt="" /></div>
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
