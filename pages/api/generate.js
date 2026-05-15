import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Coach (real-time chat) is always Haiku — sub-second first-token latency is
// the product requirement. Higher-tier intelligence lives in async surfaces:
// doctor-brief generation (Concierge), flare prediction (Foresight),
// 30-day summary — those should be on separate endpoints the dev team
// builds out, and they can reach for this map when they do.
//
// eslint-disable-next-line no-unused-vars
const PERSONA_CONFIG = {
  renee:  { model: "claude-opus-4-7",   thinking: { type: "adaptive" }, output_config: { effort: "high" } },
  simone: { model: "claude-sonnet-4-6", thinking: { type: "adaptive" } },
  kezia:  { model: "claude-haiku-4-5" },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
  }

  const { messages, prompt } = req.body || {};
  const finalMessages = Array.isArray(messages) && messages.length
    ? messages
    : prompt
      ? [{ role: "user", content: prompt }]
      : null;
  if (!finalMessages) return res.status(400).json({ error: "Missing 'messages' or 'prompt'" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  const write = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  try {
    const stream = client.messages.stream({
      model: "claude-haiku-4-5",
      max_tokens: 16000,
      messages: finalMessages,
    });

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        write({ delta: event.delta.text });
      }
    }

    const final = await stream.finalMessage();
    write({ done: true, model: final.model });
    res.end();
  } catch (e) {
    const status = e instanceof Anthropic.APIError ? (e.status || 500) : 500;
    const message = e instanceof Anthropic.RateLimitError
      ? "Rate limited — retry shortly"
      : (e?.message || "Claude request failed");
    write({ error: message, status });
    res.end();
  }
}
