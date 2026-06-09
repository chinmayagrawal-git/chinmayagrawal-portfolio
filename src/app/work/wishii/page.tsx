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
            className="font-display font-bold mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", lineHeight: 1.1 }}
          >
            Wishii — CS Chatbot Rebuild
          </h1>

          <p
            className="font-body mb-8"
            style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            Rebuilt Wishlink&apos;s support chatbot from near-zero effectiveness to 49% self-resolution — starting with a knowledge base, not a model.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {["49% self-res, week 1", "141 query types", "Category-wise rollout"].map((p) => (
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
              Wishlink&apos;s creator support chatbot existed but wasn&apos;t working. Most conversations escalated to human agents almost immediately. The instinct might be to fix the AI layer — better prompts, better model. I didn&apos;t start there.
            </p>
            <p className="font-body leading-relaxed">
              The first thing I did was understand the problem space. I mapped every type of creator support query into a structured taxonomy — 141 query types, each with volume estimates, whether it needed live account data, and how complex the resolution path was. This took time, but it meant every decision after it was grounded in what creators actually asked, not assumptions.
            </p>
            <p className="font-body leading-relaxed">
              From there I built the knowledge base — 63+ articles across every major platform feature and support scenario. Each article was written to serve two purposes: ground the AI&apos;s responses accurately, and be readable as a standalone reference. The KB was the most important piece. Without it, the chatbot can&apos;t resolve anything reliably regardless of how good the model is.
            </p>
            <p className="font-body leading-relaxed">
              Deployment was category-by-category. Rather than enabling the chatbot across all query types at once, I picked the categories where the KB was complete, test cases were written, and escalation logic was defined — then expanded from there. This meant every category added was well-tested, not a risk.
            </p>
            <p className="font-body leading-relaxed">
              In the first week on a test set of creators, the chatbot hit 49% self-resolution with a 12-second average first response. The remaining conversations were escalated — expected at this stage, as the categories with highest escalation rates were intentionally held back pending better KB coverage.
            </p>
            <p className="font-body leading-relaxed">
              Honest reflection: I underestimated how much upfront investment the knowledge base needed. Building KB coverage breadth-first rather than depth-first meant some categories were thinner than they should have been at deployment. Knowing what I know now, I&apos;d have spent the first week exclusively on KB depth for the top 3 query types before touching anything else.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
