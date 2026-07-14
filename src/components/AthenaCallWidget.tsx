"use client";
import { useState } from "react";
import { Phone, PhoneCall } from "lucide-react";

const INBOUND_NUMBER = "+1 980 944 8877";

type Status = { kind: "idle" | "loading" | "ok" | "err"; msg: string };

export default function AthenaCallWidget() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle", msg: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setStatus({ kind: "err", msg: "Please tick the consent box first." });
      return;
    }
    setStatus({ kind: "loading", msg: "Placing your call…" });
    try {
      const r = await fetch("/api/call-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok) {
        setStatus({ kind: "ok", msg: "Calling you now — Athena rings in a few seconds." });
      } else {
        setStatus({ kind: "err", msg: data.error || "Could not place the call." });
      }
    } catch {
      setStatus({ kind: "err", msg: "Network error — dial the number below instead." });
    }
  }

  const statusColor =
    status.kind === "ok" ? "#2f9e6f" : status.kind === "err" ? "#b4532f" : "var(--muted)";

  return (
    <div
      className="rounded-2xl p-6 md:p-7"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div
        className="font-body font-semibold mb-4 inline-flex items-center gap-2"
        style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy)" }}
      >
        <span className="live-dot" aria-hidden="true" />
        Try it now · live
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Call-me-back */}
        <div>
          <h4 className="font-body font-semibold text-sm mb-1" style={{ color: "var(--ink)" }}>
            Have Athena call you
          </h4>
          <p className="font-body text-[13px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            Enter your number with country code. Athena calls in a few seconds.
          </p>
          <form onSubmit={onSubmit} className="flex flex-col gap-2.5" autoComplete="off">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={60}
              className="font-body text-sm rounded-lg px-3 py-2.5 outline-none"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--ink)" }}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              maxLength={20}
              required
              className="font-body text-sm rounded-lg px-3 py-2.5 outline-none"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--ink)" }}
            />
            <label className="flex gap-2 items-start font-body text-xs cursor-pointer" style={{ color: "var(--muted)" }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5"
                style={{ accentColor: "#2f9e6f" }}
              />
              <span>I agree to receive an automated demo call from Athena at this number.</span>
            </label>
            <button
              type="submit"
              disabled={status.kind === "loading"}
              className="font-body font-semibold text-sm rounded-lg px-4 py-2.5 inline-flex items-center justify-center gap-2 transition-opacity"
              style={{
                background: "var(--navy)",
                color: "#fff",
                opacity: status.kind === "loading" ? 0.6 : 1,
                cursor: status.kind === "loading" ? "not-allowed" : "pointer",
              }}
            >
              <PhoneCall size={14} />
              {status.kind === "loading" ? "Calling…" : "Call me"}
            </button>
            <div
              className="font-body text-xs min-h-[18px]"
              role="status"
              aria-live="polite"
              style={{ color: statusColor }}
            >
              {status.msg}
            </div>
          </form>
        </div>

        {/* Inbound number — the reliable path */}
        <div>
          <h4 className="font-body font-semibold text-sm mb-1" style={{ color: "var(--ink)" }}>
            Or call in yourself
          </h4>
          <p className="font-body text-[13px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            Prefer to dial? Ring the line and Athena picks up on the first ring.
          </p>
          <a
            href="tel:+19809448877"
            className="inline-flex items-center gap-2 font-body font-semibold rounded-lg px-4 py-2.5 transition-opacity hover:opacity-80"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--ink)", fontSize: "1rem" }}
          >
            <Phone size={15} style={{ color: "var(--navy)" }} />
            {INBOUND_NUMBER}
          </a>
          <p className="font-body text-xs leading-relaxed mt-3" style={{ color: "var(--muted)" }}>
            Try booking an orthopedic, then ask for a slot that doesn&rsquo;t exist — and watch it refuse to invent one.
          </p>
        </div>
      </div>
    </div>
  );
}
