import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('Say hello from iMpatient.');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setOutput(data.text || JSON.stringify(data));
    setLoading(false);
  }

  return (
    <main style={{padding:'2rem',fontFamily:'sans-serif'}}>
      <h1>iMpatient™ Demo</h1>
      <form onSubmit={onSubmit}>
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} />
        <button type="submit">{loading?'Loading...':'Generate'}</button>
      </form>
      <pre>{output}</pre>
    </main>
  );
}
