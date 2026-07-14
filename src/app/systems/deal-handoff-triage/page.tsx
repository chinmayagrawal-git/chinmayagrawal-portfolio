import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoomEmbed from "@/components/LoomEmbed";
import FlowChips from "@/components/FlowChips";
import HandoffReceipt from "@/components/HandoffReceipt";
import Zoomable from "@/components/Zoomable";

const LOOM_ID = "0bdeafdccde447739925d5a63dce8776";

const FLOW = [
  { h: "Trigger", p: "A won deal, or a bug labelled P0. The record decides — not a hardcoded list." },
  { h: "Dispatch", p: "A filter workflow picks what to act on and drops what's below threshold." },
  { h: "Process", p: "The processor drafts the handoff or the triage from the knowledge base." },
  { h: "Human gate", p: "It posts to Slack and waits. Approve, edit, or send back — nothing acts alone." },
  { h: "Write + log", p: "On approval it writes the doc, labels the issue, and logs the win." },
];

const SHOTS = [
  { src: "/systems/refold/approval.png", alt: "Slack approval card for a CS handoff, with approve / decline / edit actions" },
  { src: "/systems/refold/triage.png", alt: "Bug triage alert in Slack showing the AI's proposed severity and team" },
  { src: "/systems/refold/override.png", alt: "Human override checkpoint in Slack — editing the AI's triage before it commits" },
];

export default function DealHandoffTriage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-20 pb-16 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-body text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              <ChevronLeft size={14} />
              Back
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            {/* Prose — second on mobile, left on desktop */}
            <div className="flex-1 order-2 md:order-1 md:[flex:0_0_55%]">
              <div className="flex gap-2 mb-4 flex-wrap">
                <span
                  className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "var(--navy)", color: "#fff", fontSize: "11px" }}
                >
                  AI System
                </span>
                <span
                  className="font-body text-xs px-3 py-1 rounded-full"
                  style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "11px" }}
                >
                  n8n · human-in-the-loop
                </span>
              </div>

              <h1
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)", lineHeight: 1.1 }}
              >
                Deal Handoff + Bug Triage
              </h1>

              <p className="font-body mb-6" style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
                Two workflows that make a judgment call — and never act on it alone.
              </p>

              <div className="flex flex-col gap-5" style={{ color: "var(--ink)", fontSize: "1rem" }}>
                <p className="font-body leading-relaxed">
                  Both exercises ask an LLM to decide something a person normally would. Is this deal worth a handoff to the customer team? Which team owns this bug, and is a customer affected? None of those have a right answer until you know what the business is — so I defined one first, then wired the automations to it. The threshold, the routing table, the approver, all live in a Google Sheet an operator can edit. Nobody has to open n8n to change how it behaves.
                </p>
                <p className="font-body leading-relaxed">
                  Each exercise splits into two workflows: a dispatcher that filters what to act on and drops what to ignore, and a processor that does the work on what survives. Splitting them fixed a real bug — Slack&rsquo;s send-and-wait node parks an entire execution while it waits, so two won deals arriving at once meant the second vanished. Fan out first, and every record gets its own execution and its own approval message.
                </p>
                <p className="font-body leading-relaxed">
                  The human gate does real work. The reviewer can override the team, severity, assignee, or customer-facing flag, or send the whole thing back with nothing committed. A reconcile step keeps both the AI&rsquo;s call and the human&rsquo;s, side by side, in the record. If a triage turns out wrong three weeks later, you can tell whether the model got it wrong or the person did.
                </p>
                <p className="font-body leading-relaxed">
                  The workflow can add — it cannot replace. GitHub&rsquo;s issue-edit endpoint is a full replace, and any field you leave out gets cleared, so I use the label and assignee append endpoints instead. The workflow has no way to destroy state it never read. Re-running is safe: each trigger checks for an existing handoff doc or a <span className="font-mono text-[13px]">triaged</span> label before it fires, so nothing doubles up.
                </p>
              </div>
            </div>

            {/* Walkthrough — first on mobile, sticky right on desktop. Leads so the
                page opens on context, not a raw artifact. */}
            <div className="w-full order-1 md:order-2 md:[flex:0_0_40%]">
              <div className="md:sticky md:top-[80px]" style={{ height: "fit-content" }}>
                <LoomEmbed loomId={LOOM_ID} start={10} title="Deal handoff + bug triage — walkthrough" />
                <p className="font-body text-center mt-2" style={{ color: "var(--muted)", fontSize: "11px", lineHeight: 1.5 }}>
                  Full run-through — both workflows, end to end.
                </p>
              </div>
            </div>
          </div>

          {/* Flow */}
          <div className="mb-10">
            <div
              className="font-body font-semibold mb-4"
              style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}
            >
              How a record moves
            </div>
            <FlowChips steps={FLOW} />
          </div>

          {/* Handoff receipt — now with the context the video + flow set up above */}
          <div className="mb-10">
            <div
              className="font-body font-semibold mb-2"
              style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}
            >
              What it writes back
            </div>
            <p className="font-body leading-relaxed mb-4" style={{ color: "var(--ink)", fontSize: "0.95rem", maxWidth: "620px" }}>
              When a deal clears the gate, the processor writes the CS team a handoff like this — filling from the knowledge base wherever the rep left a field blank, so the receiving team never starts from nothing.
            </p>
            <div className="max-w-[620px]">
              <HandoffReceipt />
            </div>
          </div>

          {/* Slack receipts — uniform tiles, click to expand */}
          <div>
            <div
              className="font-body font-semibold mb-4"
              style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}
            >
              The human gate, in Slack
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SHOTS.map((s) => (
                <Zoomable key={s.src} src={s.src} alt={s.alt} className="w-full">
                  <div
                    className="rounded-xl overflow-hidden card-lift"
                    style={{ border: "1px solid var(--border)", background: "var(--surface)", position: "relative", aspectRatio: "4 / 3" }}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 90vw, 30vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                </Zoomable>
              ))}
            </div>
            <p className="font-body mt-3" style={{ color: "var(--muted)", fontSize: "11px" }}>
              Click any card to expand.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
