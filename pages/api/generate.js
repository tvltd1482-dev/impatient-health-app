import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

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

  try {
    // HANDOFF.md: Coach is Haiku-powered.
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 16000,
      messages: finalMessages,
    });
    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    return res.status(200).json({ text });
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
