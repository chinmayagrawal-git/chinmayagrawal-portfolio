import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlackQCReceipt from "@/components/SlackQCReceipt";

export default function ChatQC() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-20 pb-16 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft size={14} />
            Back
          </Link>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Content */}
            <div className="flex-1 order-2 md:order-1 md:[flex:0_0_55%]">
              <div className="flex gap-2 mb-4">
                <span
                  className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "var(--navy)", color: "#fff", fontSize: "11px" }}
                >
                  Wishlink
                </span>
                <span
                  className="font-body text-xs px-3 py-1 rounded-full"
                  style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "11px" }}
                >
                  Internal audit / eval · May 2026
                </span>
              </div>

              <h1
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)", lineHeight: 1.1 }}
              >
                CS Quality Control Pipeline
              </h1>

              <p
                className="font-body mb-6"
                style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}
              >
                Quality control was one person, reviewing a sliver, by hand.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["100-pt rubric, 5 dimensions", "Auto Slack alerts", "Runs unattended"].map((p) => (
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
                  Wishlink&apos;s support team had no consistent quality control. A single team lead scored a biased sample — the low-CSAT chats that only fired on 25% of 25% of conversations — with no rubric and no feedback reaching agents. Scores depended on who was looking.
                </p>
                <p className="font-body leading-relaxed">
                  I designed a 100-point rubric across five dimensions: diagnosis of the creator&apos;s issue, resolution quality, empathy and tone, communication style, and closure. The five dimensions were deliberate — &ldquo;you scored 72&rdquo; isn&apos;t actionable; &ldquo;your resolution was directionally right but you opened with no acknowledgment of the creator&apos;s frustration&rdquo; is something an agent can act on.
                </p>
                <p className="font-body leading-relaxed">
                  The pipeline pulls resolved conversations, scores each one in parallel with an LLM loaded with the rubric and a category-specific knowledge base, writes results to a shared Google Sheet, and DMs the agents who failed — with the exact excerpt, what went wrong, and what they should have said.
                </p>
                <p className="font-body leading-relaxed">
                  One decision worth explaining: the knowledge base is separate from the rubric. The rubric is universal — same five dimensions for every category. The KB is category-specific, because a correct resolution for a payout query looks nothing like one for onboarding. Separating them keeps the rubric stable while the KB evolves with the SOPs.
                </p>
                <p className="font-body leading-relaxed">
                  Two implementations exist: one inside an AI desktop environment for an easy start, one fully automated from the terminal with parallel API calls that cut scoring from ~20 minutes to ~5 for a typical day&apos;s volume. Whoever takes it over picks based on their setup.
                </p>
                <p className="font-body leading-relaxed">
                  At handoff, 86 conversations scored across 3 categories — and the infrastructure to expand to any new category by writing one knowledge base file. The pipeline fires on its own: it scores, it writes, it alerts. Nobody runs it.
                </p>
              </div>
            </div>

            {/* Receipt — Slack QC bot DM */}
            <div className="w-full order-1 md:order-2 md:[flex:0_0_40%]">
              <div className="md:sticky md:top-[80px]" style={{ height: "fit-content" }}>
                <SlackQCReceipt />
                <p
                  className="font-body text-center mt-2"
                  style={{ color: "var(--muted)", fontSize: "11px", lineHeight: 1.5 }}
                >
                  A real coaching DM — the excerpt, what went wrong, and the better response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
