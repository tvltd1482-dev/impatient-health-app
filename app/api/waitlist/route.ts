import { NextRequest, NextResponse } from "next/server";

const STANCES = new Set(["breathing", "patterns", "full"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: unknown; stance?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const stance = typeof body.stance === "string" ? body.stance : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email doesn't look right." },
      { status: 400 },
    );
  }
  if (!STANCES.has(stance)) {
    return NextResponse.json(
      { ok: false, error: "Pick a stance." },
      { status: 400 },
    );
  }

  console.log("[waitlist]", new Date().toISOString(), email, stance);

  return NextResponse.json({ ok: true });
}
