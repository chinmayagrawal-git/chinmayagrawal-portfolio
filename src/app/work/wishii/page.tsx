import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Wishii() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-dvh pt-20 pb-16 px-6"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-[760px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft size={14} />
            Back
          </Link>

          <div className="flex gap-2 mb-4">
            <span
              className="font-body text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "#2d5a3d", color: "#fff", fontSize: "11px" }}
            >
              Wishlink
            </span>
            <span
              className="font-body text-xs px-3 py-1 rounded-full"
              style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "11px" }}
            >
              AI Support
            </span>
          </div>

          <h1
            className="font-display font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", lineHeight: 1.1 }}
          >
            Wishii — Support Chatbot Rebuild
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {["50% query deflection", "750 creators", "v2 shipped post-monitoring"].map((p) => (
              <span
                key={p}
                className="font-body text-xs px-3 py-1.5 rounded-full"
                style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}
              >
                {p}
              </span>
            ))}
          </div>

          <section className="mb-10">
            <h2
              className="font-body font-semibold uppercase mb-3"
              style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}
            >
              Problem
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "1rem" }}>
              Wishlink&apos;s support chatbot was resolving 7% of creator queries on its own.
              The remaining 93% were going straight to human agents. The knowledge base was
              disorganized, coverage was patchy, and the bot had no way to handle anything
              that didn&apos;t match an exact keyword. Support volume was growing; the team wasn&apos;t.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="font-body font-semibold uppercase mb-3"
              style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}
            >
              What I built
            </h2>
            <p className="font-body leading-relaxed mb-4" style={{ color: "var(--ink)", fontSize: "1rem" }}>
              Started with a full audit of the knowledge base — identified the 40 query types
              that made up 80% of volume, mapped which ones had no coverage, and rewrote the
              articles that were causing drop-offs. Then rebuilt the bot&apos;s retrieval logic
              using semantic search instead of keyword matching.
            </p>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "1rem" }}>
              Ran the new version in shadow mode for two weeks before going live, tracking
              where it would have succeeded vs. failed. Used that data to tune confidence
              thresholds before flipping the switch. v2 shipped after monitoring confirmed
              the improvement was real.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="font-body font-semibold uppercase mb-3"
              style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}
            >
              Outcome
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "1rem" }}>
              Self-resolution rate went from 7% to 49% across 750 active creators. Human agents
              now handle the genuinely complex cases — account issues, edge cases, escalations —
              rather than repeating the same answers to the same questions.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
