import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContentIntelligence() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-dvh pt-20 pb-16 px-6"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-[760px] mx-auto">
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
              href="https://ai-content-insights-wishlink-one.lovable.app/?uid=18_creator_analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium px-5 py-2.5 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "var(--navy)", color: "#fff" }}
            >
              <ExternalLink size={14} />
              View live product
            </a>
          </div>

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
              Data Product
            </span>
          </div>

          <h1
            className="font-display font-bold mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", lineHeight: 1.1 }}
          >
            Content Intelligence
          </h1>

          <p
            className="font-body mb-8"
            style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            A personalised analytics product for Wishlink creators — built and shipped end-to-end in 8 working days.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {["Live product", "8 days, SQL to live", "A/B experiment, 4K+ creators"].map((p) => (
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
              Wishlink creators earn through affiliate links — but had no reliable way to know what to post next. GMV went up or down after a post with no layer connecting content decisions to earnings patterns. The platform had the data; it just wasn&apos;t surfaced anywhere useful.
            </p>
            <p className="font-body leading-relaxed">
              The mandate was open-ended: make creators more effective. I started by figuring out what &ldquo;effective&rdquo; meant in terms of data — what signals existed, what was queryable, and what a creator could realistically act on. That scoping took two days and saved weeks of building the wrong thing.
            </p>
            <p className="font-body leading-relaxed">
              The product ended up with four personalised sections per creator: top-earning categories ranked by GMV, trending categories from similar creators split by reach and clicks signals, a niche label derived from their category and price mix, and video pattern analysis of their highest-earning content. Every creator gets their own private URL with pre-computed data specific to them.
            </p>
            <p className="font-body leading-relaxed">
              The key architecture decision: static JSON hosted on GitHub over a real-time API. Zero infrastructure cost, instant page loads, data freshness handled by a manual re-run. For a 30-day A/B experiment, this was the right call — a live backend would have added weeks of setup for no meaningful user benefit at that scale.
            </p>
            <p className="font-body leading-relaxed">
              The trickiest moment was a regression during a redesign. A build session changed category granularity and silently dropped quality filters — fashion creators were being recommended completely unrelated categories. Caught it during a QA pass, rewrote the SQL from the pre-regression baseline, restored all filters, reapplied the new architecture. The lesson: when iterating fast on a data pipeline, quality gates need to be explicit checkpoints, not assumptions.
            </p>
            <p className="font-body leading-relaxed">
              The experiment went live in May 2026. In the first 12 days, video pattern cards drove the highest engagement — suggesting creators found content format signals more actionable than category recommendations alone.
            </p>
          </div>

          <div className="mt-10">
            <a
              href="https://ai-content-insights-wishlink-one.lovable.app/?uid=18_creator_analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium px-6 py-3 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "var(--navy)", color: "#fff" }}
            >
              <ExternalLink size={14} />
              View live product →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
