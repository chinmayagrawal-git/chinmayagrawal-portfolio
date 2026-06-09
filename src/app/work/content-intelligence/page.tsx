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
              href="https://ai-content-insights-wishlink-one.lovable.app/?uid=18_fashionablepooja_135"
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
              style={{ background: "#1a2e4a", color: "#fff", fontSize: "11px" }}
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
            className="font-display font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", lineHeight: 1.1 }}
          >
            Content Intelligence
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {["109K+ events tracked", "4,357 creators", "Live A/B experiment"].map((p) => (
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
              Creators on Wishlink had no way to understand what content was actually driving
              sales. They could see their total revenue, but the link between a specific post
              and a conversion was invisible. Without that signal, they were posting on instinct
              — no way to know what to double down on or what to stop making.
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
              A personalised analytics dashboard that shows each creator which content drives
              conversions, what their audience engages with, and how their performance compares
              to peers in the same category. Built from SQL queries to a live React product in
              8 working days — solo.
            </p>
            <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "1rem" }}>
              The event tracking layer captures 109K+ interactions. The recommendation engine
              surfaces the top 3 content optimizations each creator should make based on their
              own data. An A/B experiment is live testing whether surfacing these insights
              changes posting frequency and revenue.
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
              Product is live. 4,357 creators have access. The A/B experiment is running — early
              data is being collected on whether analytics visibility changes behavior. The stack
              is lightweight enough that any change in data model takes under an hour to ship.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
