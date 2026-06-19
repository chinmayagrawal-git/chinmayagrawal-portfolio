import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectShot from "@/components/ProjectShot";

export default function Wishii() {
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
                  Customer-facing ops · Apr 2026
                </span>
              </div>

              <h1
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)", lineHeight: 1.1 }}
              >
                Wishii — CS Chatbot Rebuild
              </h1>

              <p
                className="font-body mb-6"
                style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}
              >
                The chatbot wasn&apos;t the problem. Nobody had built what it needed to know.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["~40% of volume self-resolves", "18,000 convos → taxonomy", "Category-wise rollout"].map((p) => (
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
                  Wishlink&apos;s creator support bot existed but barely worked — it resolved 1 query in 14. Its knowledge was split across five sources that contradicted each other, and 67% of real queries needed live account data a static bot could never reach. The instinct would be to fix the AI layer with better prompts or a better model. That wasn&apos;t the problem.
                </p>
                <p className="font-body leading-relaxed">
                  I started by understanding the problem space. I distilled 18,000 past conversations into a structured query taxonomy — each type tagged with volume, whether it needed live account data, and how complex the resolution path was. Then I wrote the knowledge base from scratch: 63 articles across 8 categories, each one written to both ground the AI&apos;s responses and stand alone as a reference. The KB was the most important piece — without it, the bot can&apos;t reliably resolve anything regardless of the model.
                </p>
                <p className="font-body leading-relaxed">
                  I wired Wishii to live account tools and rolled it out category by category, starting with 750 creators and expanding only where it resolved cleanly with no human in the loop, at a 12-second average first response. Every category added was tested first, not a gamble.
                </p>
                <p className="font-body leading-relaxed">
                  Two query categories — about 40% of all volume — now resolve fully on their own. The new owner runs the expansion framework without me; the handover was clean: decision logic, KB structure, and progression criteria all documented.
                </p>
                <p className="font-body leading-relaxed">
                  Honest reflection: I underestimated how much upfront investment the knowledge base needed. Going breadth-first rather than depth-first left some categories thinner than they should have been at launch. Knowing what I know now, I&apos;d have spent the first week purely on KB depth for the top query types before touching anything else.
                </p>
              </div>
            </div>

            {/* Receipts — two screenshots */}
            <div className="w-full order-1 md:order-2 md:[flex:0_0_40%]">
              <div className="md:sticky md:top-[80px] grid grid-cols-2 gap-3" style={{ height: "fit-content" }}>
                <ProjectShot
                  src="/work/wishii-live-state.jpg"
                  alt="Wishii reading live account state to diagnose a creator's Auto-DM issue"
                  width={466}
                  height={1400}
                  maxHeight={520}
                  caption="Reading live account state to diagnose an Auto-DM issue."
                />
                <ProjectShot
                  src="/work/wishii-escalation.jpg"
                  alt="Wishii resolving an Instagram connection issue, then escalating cleanly to a human"
                  width={526}
                  height={1400}
                  maxHeight={520}
                  caption="Resolving an issue, then escalating cleanly to a human."
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
