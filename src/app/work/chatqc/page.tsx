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
            className="font-display font-bold mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", lineHeight: 1.1 }}
          >
            CS Quality Control Pipeline
          </h1>

          <p
            className="font-body mb-8"
            style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            An automated AI pipeline that evaluates customer support conversations against a structured rubric — and sends coaching reports directly to agents.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {["100-pt rubric, 5 dimensions", "Auto Slack alerts", "~5 min/day to run"].map((p) => (
              <span
                key={p}
                className="font-body text-xs px-3 py-1.5 rounded-full"
                style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}
              >
                {p}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-5" style={{ color: "var(--ink)", fontSize: "1rem" }}>
            <p className="font-body leading-relaxed">
              Wishlink&apos;s customer support team had no consistent quality control process. Conversations were reviewed manually and sporadically, or not at all. Manual QC doesn&apos;t scale, different reviewers apply different standards, and batch reviews are too slow to be useful for coaching agents on active issues.
            </p>
            <p className="font-body leading-relaxed">
              I designed a 100-point scoring rubric across five dimensions: diagnosis of the creator&apos;s issue, resolution quality, empathy and tone, communication style, and closure. The five-dimension structure was deliberate — &ldquo;you scored 72&rdquo; is not actionable. &ldquo;Your resolution was directionally correct but you opened with no acknowledgment of the creator&apos;s frustration&rdquo; is something an agent can actually do something with.
            </p>
            <p className="font-body leading-relaxed">
              The pipeline pulls resolved conversations from the support system, scores each one using an AI model loaded with the rubric and a category-specific knowledge base, assembles results into a shared Google Sheet, and sends Slack DMs directly to agents who failed QC — with the specific transcript excerpt, what went wrong, and what a good response would have looked like.
            </p>
            <p className="font-body leading-relaxed">
              One design decision worth explaining: the knowledge base files are separate from the rubric. The rubric is universal — same five dimensions, same scoring logic for every category. The knowledge base is category-specific — what counts as a correct resolution for a payout query is completely different from a platform onboarding issue. Separating them means the rubric stays stable while the knowledge base evolves as SOPs change.
            </p>
            <p className="font-body leading-relaxed">
              Two pipeline implementations were built: one running inside an AI desktop environment for easier startup, one fully automated from the terminal using parallel API calls that cut scoring time from ~20 minutes to ~5 minutes for a typical day&apos;s volume. Whoever takes this over can pick based on their setup.
            </p>
            <p className="font-body leading-relaxed">
              At handoff: 86 conversations scored across 3 support categories, with the infrastructure to expand to any new category by writing one knowledge base file.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
