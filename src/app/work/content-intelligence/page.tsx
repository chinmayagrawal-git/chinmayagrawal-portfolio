import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectShot from "@/components/ProjectShot";

const LIVE_URL = "https://ai-content-insights-wishlink-one.lovable.app/?uid=18_creator_analytics";

export default function ContentIntelligence() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-20 pb-16 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-body text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              <ChevronLeft size={14} />
              Back
            </Link>
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium px-5 py-2.5 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "var(--navy)", color: "#fff" }}
            >
              <ExternalLink size={14} />
              View live product
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            {/* Content — second on mobile, left on desktop */}
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
                  Customer-facing product · May 2026
                </span>
              </div>

              <h1
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)", lineHeight: 1.1 }}
              >
                Content Intelligence
              </h1>

              <p
                className="font-body mb-6"
                style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}
              >
                Creators could see their earnings move. Nobody could tell them why.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Live since May 11", "8 days, SQL to live", "1,200+ creators · 1.5L+ events"].map((p) => (
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
                  Wishlink creators earn through affiliate links, and they could watch their GMV move after every post — but nothing connected content decisions to earnings. They chased trends or personal taste, with no way to know which categories actually drove their income, or what similar creators were already winning with. The platform had the data; it was surfaced nowhere useful.
                </p>
                <p className="font-body leading-relaxed">
                  The mandate was open-ended: make creators more effective. I spent two days first figuring out what &ldquo;effective&rdquo; meant in data — what signals existed, what was queryable, what a creator could realistically act on. That scoping saved weeks of building the wrong thing. The product became a personalised analytics page for every creator: their niche, top-earning categories ranked by GMV, what similar creators are selling now split by reach and clicks, and the patterns in their highest-earning videos. Every creator gets a private URL with pre-computed data specific to them.
                </p>
                <p className="font-body leading-relaxed">
                  Vibe-coded end to end: Databricks SQL → Python → LLM copywriting → static JSON on a GitHub CDN → React/Tailwind. Shipped in 8 working days, zero infrastructure cost by design — no server, no per-request compute. Static JSON over a real-time API was the right call for a 30-day experiment; a live backend would have added weeks of setup for no meaningful user benefit at that scale.
                </p>
                <p className="font-body leading-relaxed">
                  The trickiest moment was a regression during a redesign. A build session changed category granularity and silently dropped quality filters — fashion creators were getting recommended completely unrelated categories. I caught it in a QA pass, rewrote the SQL from the pre-regression baseline, restored the filters, and reapplied the new architecture. The lesson: on a fast-moving data pipeline, quality gates have to be explicit checkpoints, not assumptions.
                </p>
                <p className="font-body leading-relaxed">
                  Live since May 11. 1.5L+ events from 1,200+ creators in the first 12 days, with video pattern cards driving the highest engagement — creators found content-format signals more actionable than category recommendations alone. The data on GitHub refreshes biweekly without anyone touching it.
                </p>
              </div>
            </div>

            {/* Receipt — first on mobile, sticky right on desktop */}
            <div className="w-full order-1 md:order-2 md:[flex:0_0_40%]">
              <div className="md:sticky md:top-[80px] flex justify-center" style={{ height: "fit-content" }}>
                <ProjectShot
                  src="/work/content-intelligence.png"
                  alt="The live Content Intelligence page: personalised top-selling categories for a creator"
                  width={320}
                  height={700}
                  maxHeight={600}
                  caption="The live Content Intelligence page — personalised top-selling categories for a creator."
                />
              </div>
            </div>
          </div>

          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-medium px-6 py-3 rounded-full transition-opacity hover:opacity-80"
            style={{ background: "var(--navy)", color: "#fff" }}
          >
            <ExternalLink size={14} />
            View live product →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
