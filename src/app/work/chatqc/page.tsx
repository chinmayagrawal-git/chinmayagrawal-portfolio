import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ChatQC() {
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
              style={{ background: "#6b2d1a", color: "#fff", fontSize: "11px" }}
            >
              Wishlink
            </span>
            <span
              className="font-body text-xs px-3 py-1 rounded-full"
              style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "11px" }}
            >
              AI Evaluation
            </span>
          </div>

          <h1
            className="font-display font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", lineHeight: 1.1 }}
          >
            CS Quality Control Pipeline
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {["86+ conversations scored", "5-dimension rubric", "Automated Slack alerts"].map((p) => (
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
              The CS team had no systematic way to evaluate agent quality. Reviews happened
              when something went wrong — reactive, not preventive. There was no shared
              rubric, no feedback cadence, and no way to catch patterns before they became
              problems.
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
              A 100-point AI evaluation framework that scores every conversation across
              5 dimensions: accuracy, tone, resolution quality, policy adherence, and
              escalation judgment. The rubric was developed by analyzing 200 past
              conversations — good and bad — and extracting the patterns that separated them.
            </p>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "1rem" }}>
              Conversations are scored automatically after close. Scores below threshold
              trigger a Slack alert to the team lead with the specific dimension that failed
              and the relevant exchange. Weekly report surfaces the 5 agents with the biggest
              score movement — up or down.
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
              86+ conversations scored. Feedback loop is closed — agents know within the same
              day if a conversation went poorly and why. The rubric has become the shared
              standard the team uses for onboarding new agents.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
