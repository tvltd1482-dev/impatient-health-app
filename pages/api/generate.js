export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Missing 'prompt'" });

  // Fallback to OpenAI if BACKEND_URL not provided
  if (process.env.BACKEND_URL) {
    const r = await fetch(process.env.BACKEND_URL + '/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'No backend configured' });
  }

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await r.json();
  const text = data?.choices?.[0]?.message?.content || '';
  return res.status(200).json({ text, provider: 'openai' });
}
