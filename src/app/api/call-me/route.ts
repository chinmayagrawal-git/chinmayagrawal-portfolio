// Places a single outbound call via Ringg so Athena rings the visitor back.
// Secrets stay server-side (Netlify env vars) — never shipped to the page.
// Env: RINGG_API_KEY, RINGG_AGENT_ID, RINGG_FROM_NUMBER (optional).

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RINGG_URL = "https://prod-api.ringg.ai/ca/api/v0/calling/outbound/individual";

// Naive in-memory throttle (per warm instance). Soft guard against button spam,
// not a hard security boundary — resets on cold start.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_NUMBER = 2;
const MAX_PER_IP = 4;

function tooMany(key: string, max: number): boolean {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(key, arr);
  return arr.length > max;
}

export async function POST(request: Request) {
  const apiKey = process.env.RINGG_API_KEY;
  const agentId = process.env.RINGG_AGENT_ID;
  const fromNumber = process.env.RINGG_FROM_NUMBER || "+19809448877";
  if (!apiKey || !agentId) {
    return NextResponse.json({ error: "Live call-back isn't configured on this deploy — dial the number instead." }, { status: 503 });
  }

  let body: { name?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const name = String(body.name || "there").slice(0, 60).trim() || "there";
  const phone = String(body.phone || "").replace(/[\s()-]/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
    return NextResponse.json({ error: "Enter a valid number with country code, e.g. +91…" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";
  if (tooMany(phone, MAX_PER_NUMBER) || tooMany(ip, MAX_PER_IP)) {
    return NextResponse.json({ error: "Too many calls from here. Try again later." }, { status: 429 });
  }

  try {
    const r = await fetch(RINGG_URL, {
      method: "POST",
      headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile_number: phone,
        agent_id: agentId,
        from_number: fromNumber,
        name,
        custom_args_values: {},
        // Widen the allowed calling window so the call fires immediately instead
        // of being deferred to daytime hours.
        call_config: {
          call_time: {
            call_start_time: "00:00",
            call_end_time: "23:59",
            timezone: "Asia/Kolkata",
          },
        },
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error("Ringg error", r.status, data);
      return NextResponse.json({ error: "Could not place the call right now." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, call_id: data.call_id || data.id || null });
  } catch (e) {
    console.error("call-me failed", e);
    return NextResponse.json({ error: "Could not reach the calling service." }, { status: 502 });
  }
}
