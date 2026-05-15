import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Tier ladder = intelligence ladder. Each persona's Coach gets the model that
// matches its narrative (Observer → Pattern-Seeker → Executive Patient).
const PERSONA_CONFIG = {
  renee: {
    model: "claude-opus-4-7",
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
  },
  simone: {
    model: "claude-sonnet-4-6",
    thinking: { type: "adaptive" },
  },
  kezia: {
    model: "claude-haiku-4-5",
  },
};

const DEFAULT_PERSONA = "kezia";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
  }

  const { messages, prompt, persona } = req.body || {};
  const finalMessages = Array.isArray(messages) && messages.length
    ? messages
    : prompt
      ? [{ role: "user", content: prompt }]
      : null;
  if (!finalMessages) return res.status(400).json({ error: "Missing 'messages' or 'prompt'" });

  const config = PERSONA_CONFIG[persona] || PERSONA_CONFIG[DEFAULT_PERSONA];

  try {
    const response = await client.messages.create({
      ...config,
      max_tokens: 16000,
      messages: finalMessages,
    });
    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    return res.status(200).json({ text, model: response.model });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: "Rate limited — retry shortly" });
    }
    if (e instanceof Anthropic.APIError) {
      return res.status(e.status || 500).json({ error: e.message });
    }
    return res.status(500).json({ error: e.message || "Claude request failed" });
  }
}
