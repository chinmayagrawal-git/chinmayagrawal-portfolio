/**
 * CSS-rendered funnel "receipt" for the Future University project.
 * Rebuilt as JSX (not an image) so it stays crisp and reads as live, not faked.
 */
const stages = [
  { label: "Into the masterclass", sub: "top of funnel", value: "3,200", delta: "▲ 9%" },
  { label: "Convert to first purchase", sub: "masterclass → L1", value: "28%", delta: "▲ 4 pts" },
  { label: "Stays & spends more", sub: "CX · cross-sell · upsell", value: "₹24L", delta: "▲ 15%" },
];

export default function FunnelReceipt() {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <p
        className="font-body mb-4"
        style={{ color: "var(--muted)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        One funnel · one view
      </p>

      <div className="flex flex-col gap-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex flex-col gap-2">
            <div
              className="rounded-lg px-4 py-3 flex items-center justify-between gap-3"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            >
              <div className="flex flex-col">
                <span className="font-body font-semibold" style={{ color: "var(--ink)", fontSize: "13px" }}>
                  {s.label}
                </span>
                <span className="font-body" style={{ color: "var(--muted)", fontSize: "11px" }}>
                  {s.sub}
                </span>
              </div>
              <div className="flex items-baseline gap-2 flex-shrink-0">
                <span className="font-display font-bold" style={{ color: "var(--ink)", fontSize: "18px" }}>
                  {s.value}
                </span>
                <span className="font-body font-medium" style={{ color: "var(--navy)", fontSize: "11px" }}>
                  {s.delta}
                </span>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="flex justify-center" style={{ color: "var(--muted)", fontSize: "12px", lineHeight: 1 }}>
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
