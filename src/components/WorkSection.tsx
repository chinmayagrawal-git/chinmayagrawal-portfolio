"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const TABS = ["AI Systems", "Shipped Projects"] as const;
type Tab = (typeof TABS)[number];

// Right-aligned secondary destinations — navigate to their own screens.
const SECONDARY_LINKS = [
  { label: "Automations", href: "/automations" },
  { label: "Case Studies", href: "/case-studies" },
];

// Self-built, production-grade agentic systems — the interactive tier.
const systems = [
  {
    name: "Client OS",
    desc: "Never walk into a call cold. Every client's context rebuilt overnight — dormancy flagged, briefed to your inbox.",
    pills: ["Reads calls + email", "Dormancy alerts + daily brief"],
    slug: "client-os",
    cue: "See how it works",
    live: false,
  },
  {
    name: "Athena — Voice Booking Agent",
    desc: "A voice agent that finishes the booking. Finds the doctor, pulls live availability, confirms, returns a reference. No human picks up.",
    pills: ["Live, callable", "Grounded in real data"],
    slug: "athena",
    cue: "Live · call it",
    live: true,
  },
  {
    name: "Deal Handoff + Bug Triage",
    desc: "Two n8n workflows that route deals and triage bugs — dispatcher/processor split, human gate, nothing acts without approval.",
    pills: ["Dispatcher / processor split", "Human-in-the-loop"],
    slug: "deal-handoff-triage",
    cue: "Watch it run",
    live: false,
  },
];

// Company-deployed work — real users, real product.
const projects = [
  {
    name: "Content Intelligence",
    desc: "Creators could see their earnings move — but not why. A personalised analytics page, vibe-coded SQL to React in 8 days.",
    pills: ["8 days, SQL to live", "1,200+ creators"],
    slug: "content-intelligence",
  },
  {
    name: "Wishii",
    desc: "The chatbot wasn't the problem — nobody had built what it needed to know. Rebuilt from a knowledge base up.",
    pills: ["~40% of volume self-resolves", "18,000 convos → taxonomy"],
    slug: "wishii",
  },
  {
    name: "CS Quality Control Pipeline",
    desc: "QC was one person reviewing a sliver by hand. Built a 100-point pipeline that scores every conversation and coaches agents automatically.",
    pills: ["100-pt rubric, 5 dimensions", "Runs unattended"],
    slug: "chatqc",
  },
  {
    name: "Unified Funnel Dashboard",
    desc: "Three teams, three data cuts, no agreement on what happened last week. Built the one funnel view everyone now trusts.",
    pills: ["The Future University · 2024", "4–5 hrs/week saved"],
    slug: "the-future-university",
  },
];

const CARD_STYLE: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  textDecoration: "none",
};

function SystemCard({ s }: { s: typeof systems[0] }) {
  return (
    <Link href={`/systems/${s.slug}`} className="card-lift rounded-xl p-6 flex flex-col cursor-pointer" style={CARD_STYLE}>
      <h3 className="font-body font-semibold text-base mb-2" style={{ color: "var(--ink)" }}>
        {s.name}
      </h3>
      <p className="font-body text-[13px] leading-relaxed mb-4 flex-1" style={{ color: "var(--muted)" }}>
        {s.desc}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {s.pills.map((pill) => (
          <span
            key={pill}
            className="font-body text-xs px-2.5 py-1 rounded-full"
            style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}
          >
            {pill}
          </span>
        ))}
      </div>
      <span className="font-body text-xs font-medium inline-flex items-center gap-2" style={{ color: "var(--navy)" }}>
        {s.live && <span className="live-dot" aria-hidden="true" />}
        {s.cue} →
      </span>
    </Link>
  );
}

function ProjectCard({ p }: { p: typeof projects[0] }) {
  return (
    <Link href={`/work/${p.slug}`} className="card-lift rounded-xl p-5 flex flex-col cursor-pointer" style={CARD_STYLE}>
      <h3 className="font-body font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>
        {p.name}
      </h3>
      <p className="font-body text-xs leading-relaxed mb-3 flex-1" style={{ color: "var(--muted)" }}>
        {p.desc}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.pills.map((pill) => (
          <span
            key={pill}
            className="font-body text-xs px-2.5 py-1 rounded-full"
            style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}
          >
            {pill}
          </span>
        ))}
      </div>
      <span className="font-body text-xs font-medium" style={{ color: "var(--navy)" }}>
        View details →
      </span>
    </Link>
  );
}

export default function WorkSection({ initialTab }: { initialTab?: string | null }) {
  const [activeTab, setActiveTab] = useState<Tab>("AI Systems");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initialTab && (TABS as readonly string[]).includes(initialTab)) {
      setActiveTab(initialTab as Tab);
    }
  }, [initialTab]);

  // One-time scroll reveal for the heading block
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    el.querySelectorAll(".reveal").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  const contextLine =
    activeTab === "AI Systems"
      ? "Production-grade agentic systems I built and run — self-authored, end to end"
      : "Shipped at companies, to real users — internal ops to customer-facing product"; // Shipped Projects tab

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-8 px-6 md:px-16 relative z-10 scroll-mt-[72px]"
      style={{ background: "var(--bg)" }}
    >
      <hr style={{ border: 0, borderTop: "1px solid #e8e0d0", marginBottom: "2rem" }} />

      <div className="reveal">
        <h2
          className="font-display font-bold text-center mb-6"
          style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)", color: "var(--ink)" }}
        >
          Proof of work
        </h2>

        {/* Tab bar: primary toggle centered, secondary links pushed to the right end */}
        <div className="relative flex flex-col md:block items-center mb-8">
          <div className="flex justify-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-body text-sm font-medium px-5 py-2 rounded-full transition-all duration-200"
                style={
                  activeTab === tab
                    ? { background: "var(--navy)", color: "#fff" }
                    : { background: "transparent", color: "var(--muted)", border: "1px solid var(--border)" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
            {SECONDARY_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-[13px] inline-flex items-center gap-1 transition-opacity hover:opacity-70"
                style={{ color: "#2c5fb3", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                {l.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Keyed by tab so the fade + card stagger re-run on every switch */}
      <div className="tab-content" key={activeTab}>
        <p
          className="text-center font-body mb-6"
          style={{ color: "var(--muted)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          {contextLine}
        </p>

        {activeTab === "AI Systems" && (
          <div className="tab-grid grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {systems.map((s) => <SystemCard key={s.slug} s={s} />)}
          </div>
        )}

        {activeTab === "Shipped Projects" && (
          <div className="tab-grid grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
