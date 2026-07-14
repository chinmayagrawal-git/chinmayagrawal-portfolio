/**
 * Horizontal numbered flow of pipeline stages, wraps on small screens.
 * Ported from the outbound-engine collateral, re-skinned to the light palette.
 */
export default function FlowChips({
  steps,
}: {
  steps: { h: string; p: string }[];
}) {
  return (
    <div className="flex flex-wrap items-stretch gap-2.5">
      {steps.map((s, i) => (
        <div key={s.h} className="flex items-stretch gap-2.5" style={{ flex: "1 1 150px" }}>
          <div
            className="rounded-xl p-4 flex-1"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div
              className="font-body"
              style={{ fontSize: "11px", letterSpacing: "0.08em", color: "var(--navy)", fontWeight: 600 }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h4 className="font-body font-semibold text-sm mt-1.5 mb-1" style={{ color: "var(--ink)" }}>
              {s.h}
            </h4>
            <p className="font-body text-xs leading-snug" style={{ color: "var(--muted)" }}>
              {s.p}
            </p>
          </div>
          {i < steps.length - 1 && (
            <span
              className="self-center font-body hidden sm:inline"
              style={{ color: "var(--border)", fontSize: "15px" }}
              aria-hidden="true"
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
