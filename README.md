# iMpatient — Replit to Vercel Demo

Upload this ZIP into **Replit** → push to **GitHub** → deploy on **Vercel**.

## Steps

1. **New Repl**
   - Language: Node.js

2. **Upload this ZIP**
   - Left sidebar → three dots (...) → Upload File → choose this ZIP.
   - In Replit Shell:
     ```bash
     unzip impatient-replit-to-vercel.zip -d impatient-vercel-demo
     mv impatient-vercel-demo/* .
     ```

3. **GitHub Setup**
   - Click the Git icon in Replit.
   - Connect GitHub → create repo (e.g., `impatient-vercel-demo`).
   - Commit & Push.

4. **Deploy to Vercel**
   - Go to https://vercel.com/new → import your repo.
   - Set env vars:
     - `INVITE_CODE` (your secret code)
     - `BACKEND_URL` (Cloud Run URL) **OR** `OPENAI_API_KEY` (fallback).
   - Click **Deploy**.

## Endpoints
- `/` → Demo UI
- `/api/generate` → AI integration
- `/healthz` → Health check
