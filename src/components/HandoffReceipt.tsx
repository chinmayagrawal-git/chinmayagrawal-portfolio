import { FileText } from "lucide-react";

/**
 * A real CS handoff document the deal-handoff workflow generated, rendered as a
 * receipt rather than a screenshot — structured, un-fakeable, on-brand.
 */
const SECTIONS = [
  { h: "What they bought", p: "Query API and White-label product lines. ACV $230,000." },
  { h: "Stakeholders", p: "Primary contact: Nadia Roy (nadia@ellisfintech.com)." },
  { h: "How they're deploying it", p: "Embedded in two applications: a customer-facing wealth app and an internal risk console. White-label hides vendor branding entirely." },
  { h: "Risks and open commitments", p: "Regulated industry — audit logs and compliance requirements matter to the customer." },
  { h: "Suggested first week", p: "Verify White-label branding is fully hidden, confirm audit logs meet regulatory requirements, and schedule a call with Nadia on deployment status." },
];

export default function HandoffReceipt() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
      >
        <FileText size={13} style={{ color: "var(--navy)" }} />
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          2026-07-12__Ellis-Fintech__D-1046__handoff.md
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        {SECTIONS.map((s) => (
          <div key={s.h}>
            <div className="font-body font-semibold text-[13px] mb-0.5" style={{ color: "var(--ink)" }}>
              {s.h}
            </div>
            <p className="font-body text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
              {s.p}
            </p>
          </div>
        ))}
      </div>
      <div
        className="px-4 py-2 font-mono text-[11px]"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)", background: "var(--bg)" }}
      >
        Written by the workflow — knowledge-base fields where the rep left no note.
      </div>
    </div>
  );
}
