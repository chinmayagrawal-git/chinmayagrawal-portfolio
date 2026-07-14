/**
 * Three-cell "how it runs" grid — Ingest / Synthesize / Alert.
 * Ported from the account-intelligence collateral, re-skinned to the light palette.
 */
const CELLS = [
  {
    k: "Ingest",
    warn: false,
    h: "Every call, every email",
    p: "Transcripts and mail land under the right account, one-directional. Read the source, write the record, never the other way. You can diff it and switch it off.",
  },
  {
    k: "Synthesize · daily",
    warn: false,
    h: "An LLM pass on a cron",
    p: "Every morning an agent re-reads everything new under an account and rewrites its summary to the current state. The part you read first stays true.",
  },
  {
    k: "Alert",
    warn: true,
    h: "Dormancy + daily brief",
    p: "Any account quiet past a threshold you set gets flagged. A brief hits your inbox each morning: what moved in 24 hours, what's open, who went cold.",
  },
];

export default function RunsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {CELLS.map((c) => (
        <div
          key={c.k}
          className="rounded-xl p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div
            className="font-body font-semibold mb-2"
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: c.warn ? "#b4532f" : "var(--navy)",
            }}
          >
            {c.k}
          </div>
          <h4 className="font-body font-semibold text-sm mb-1.5" style={{ color: "var(--ink)" }}>
            {c.h}
          </h4>
          <p className="font-body text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {c.p}
          </p>
        </div>
      ))}
    </div>
  );
}
