/**
 * CSS-rendered Slack QC-bot DM "receipt" for the CS Quality Control pipeline.
 * Rebuilt as JSX so the alert reads as a live artifact, not a screenshot.
 */
export default function SlackQCReceipt() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* Channel header */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ background: "var(--navy)" }}
      >
        <span className="font-body font-semibold" style={{ color: "#fff", fontSize: "12px" }}>
          # cs-qc-alerts
        </span>
      </div>

      {/* Message body */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "14px" }}>🤖</span>
          <span className="font-body font-semibold" style={{ color: "var(--ink)", fontSize: "12px" }}>
            QC Bot
          </span>
          <span className="font-body" style={{ color: "var(--muted)", fontSize: "11px" }}>
            27 May
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-body" style={{ color: "var(--muted)", fontSize: "12px" }}>
            Agent: simran.sharma@wishlink.com
          </span>
          <span className="font-body font-bold" style={{ color: "var(--ink)", fontSize: "13px" }}>
            Score: 47 / 100 ·{" "}
            <span style={{ color: "#b4453a" }}>FAIL</span>
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-body font-semibold" style={{ color: "var(--ink)", fontSize: "11px" }}>
            What went wrong
          </span>
          <span className="font-body" style={{ color: "var(--muted)", fontSize: "12px", lineHeight: 1.5 }}>
            Jumped to unlink/relink with no diagnosis. No Health-tab check. Wrong navigation path given.
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-body font-semibold" style={{ color: "var(--ink)", fontSize: "11px" }}>
            What it should have been
          </span>
          <span
            className="font-body"
            style={{ color: "var(--muted)", fontSize: "12px", lineHeight: 1.5, fontStyle: "italic" }}
          >
            &ldquo;Is it the comment auto-reply or the DM automation that&apos;s failing? Share a screenshot of the Health tab so I can check the indicators.&rdquo;
          </span>
        </div>

        <span
          className="font-body"
          style={{ color: "var(--muted)", fontSize: "10px", letterSpacing: "0.04em", paddingTop: "4px" }}
        >
          conversation #1135203304543801
        </span>
      </div>
    </div>
  );
}
