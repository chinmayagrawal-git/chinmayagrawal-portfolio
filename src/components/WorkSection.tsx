"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const TABS = ["Projects", "Automations", "Case Studies"] as const;
type Tab = (typeof TABS)[number];

const projects = [
  {
    name: "Content Intelligence",
    colorStrip: "#1a2e4a",
    desc: "A personalised analytics product for creators — built from SQL to React in 8 working days.",
    pills: ["Live product", "8 days, SQL to live", "A/B experiment, 4K+ creators"],
    slug: "content-intelligence",
  },
  {
    name: "Wishii",
    colorStrip: "#2d5a3d",
    desc: "Rebuilt the support chatbot from 7% to 49% self-resolution. Started with a KB audit, ended with a full deployment.",
    pills: ["49% self-res, week 1", "141 query types", "Category-wise rollout"],
    slug: "wishii",
  },
  {
    name: "CS Quality Control Pipeline",
    colorStrip: "#6b2d1a",
    desc: "Designed a 100-point AI evaluation framework for CS agents — feedback loop and Slack alerting.",
    pills: ["100-pt rubric, 5 dimensions", "Auto Slack alerts", "~5 min/day to run"],
    slug: "chatqc",
  },
];

const automations = [
  { name: "Gmail Support Agent", desc: "AI frontline support for EdTech — drafts grounded replies, flags edge cases for humans.", domain: "CX", slug: "gmail-support" },
  { name: "WhatsApp CS + Lead Qual", desc: "First-line support over WhatsApp. Resolves or routes, never ignores.", domain: "CX / Sales", slug: "whatsapp-cs" },
  { name: "NPS Voice Agent", desc: "Calls customers post-visit, collects NPS with context, writes structured output to ops.", domain: "Ops", slug: "nps-voice" },
  { name: "Brand Reputation Agent", desc: "Monitors reviews across platforms, surfaces CX and product signals automatically.", domain: "Brand", slug: "brand-reputation" },
  { name: "Push Notification Agent", desc: "Context-aware notifications triggered by real-world signals, not schedules.", domain: "Marketing", slug: "push-notifications" },
  { name: "Outreach Automation", desc: "Personalized cold outreach at scale for university partnerships.", domain: "GTM", slug: "outreach" },
  { name: "LinkedIn Post Generator", desc: "Turns raw thinking into structured, on-brand posts. End to end.", domain: "Content", slug: "linkedin-posts" },
];

const cases = [
  { name: "SaaS Sector Thesis", problem: "Why activity doesn't always mean progress.", pdf: "/decks/saas-thesis.pdf", tag: "Thesis", logo: null },
  { name: "SuperK", problem: "Making 130+ FOFO grocery stores auditable and data-driven.", pdf: "/decks/superk.pdf", tag: null, logo: "/logos/superk.png" },
  { name: "Firstclub", problem: "A dynamic pricing engine for QComm that can't break customer trust.", pdf: "/decks/firstclub.pdf", tag: null, logo: "/logos/firstclub.png" },
  { name: "Instamart", problem: "A pricing engine for FnV where demand is hyperlocal.", pdf: "/decks/instamart.pdf", tag: null, logo: "/logos/instamart.png" },
  { name: "Optimum Nutrition", problem: "Launching Protein Snacking as a new category in India.", pdf: "/decks/on.pdf", tag: null, logo: "/logos/on.png" },
  { name: "Swiggy", problem: "Reducing restaurant churn by fixing what partners actually see.", pdf: "/decks/swiggy.pdf", tag: null, logo: "/logos/swiggy.png" },
  { name: "Beam Mobility", problem: "Market expansion: identifying where to go and how.", pdf: "/decks/beam.pdf", tag: null, logo: "/logos/beam.jpg" },
  { name: "Scapia", problem: "Travel card positioning — don't put all eggs in one basket.", pdf: "/decks/scapia.pdf", tag: null, logo: "/logos/scapia.png" },
];

/** Continuous infinite auto-scroll carousel — pauses on hover */
function InfiniteCarousel({ children }: { children: React.ReactNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const singleSetWidthRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        singleSetWidthRef.current = scrollRef.current.scrollWidth / 2;
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [children]);

  useEffect(() => {
    const step = () => {
      const el = scrollRef.current;
      if (el && !pausedRef.current) {
        el.scrollLeft += 1.125;
        if (singleSetWidthRef.current > 0 && el.scrollLeft >= singleSetWidthRef.current) {
          el.scrollLeft = 0;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 pb-2"
      style={{ overflowX: "hidden" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {children}
    </div>
  );
}

function CaseCard({ c, ariaHidden }: { c: typeof cases[0]; ariaHidden?: boolean }) {
  return (
    <a
      href={c.pdf}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={ariaHidden}
      className="flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer transition-opacity hover:opacity-90"
      style={{ width: "260px", background: "#e8edf5", border: "1px solid #c8d4e8", textDecoration: "none" }}
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          {c.logo ? (
            <div style={{ height: "28px", display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}>
              <Image
                src={c.logo}
                alt={c.name}
                height={28}
                width={120}
                style={{ height: "28px", width: "auto", maxWidth: "120px", objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          ) : (
            <h3 className="font-body font-semibold text-sm" style={{ color: "var(--ink)" }}>{c.name}</h3>
          )}
          {c.tag && (
            <span
              className="font-body text-xs px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "var(--navy)", color: "#fff", fontSize: "10px" }}
            >
              {c.tag}
            </span>
          )}
        </div>
        <p className="font-body text-xs leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{c.problem}</p>
        <span className="font-body text-xs font-medium mt-4" style={{ color: "var(--navy)" }}>
          View details →
        </span>
      </div>
    </a>
  );
}

export default function WorkSection({ initialTab }: { initialTab?: string | null }) {
  const [activeTab, setActiveTab] = useState<Tab>("Projects");

  useEffect(() => {
    if (initialTab && TABS.includes(initialTab as Tab)) {
      setActiveTab(initialTab as Tab);
    }
  }, [initialTab]);

  return (
    <section id="work" className="py-8 px-6 md:px-16 relative z-10" style={{ background: "var(--bg)" }}>
      {/* Thin separator above toggle pills */}
      <hr style={{ border: 0, borderTop: "1px solid #e8e0d0", marginBottom: "2rem" }} />
      {/* Tab pills */}
      <div className="flex justify-center gap-2 mb-8">
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

      {/* Context line */}
      <p
        className="text-center font-body mb-6"
        style={{ color: "var(--muted)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        {activeTab === "Projects" && "Wishlink · 3 months · 3 systems · individual contributor"}
        {activeTab === "Automations" && "AI built to automate real problems across functions and industries"}
        {activeTab === "Case Studies" && "Strategy and ops problems diagnosed across sectors"}
      </p>

      <div className="tab-content">
        {/* PROJECTS — grid on desktop, carousel on mobile */}
        {activeTab === "Projects" && (
          <>
            {/* Desktop grid (md+) */}
            <div className="hidden md:grid grid-cols-3 gap-5 max-w-5xl mx-auto">
              {projects.map((p) => (
                <Link
                  key={p.name}
                  href={`/work/${p.slug}`}
                  className="flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer transition-opacity hover:opacity-90"
                  style={{ background: "#e8edf5", border: "1px solid #c8d4e8", textDecoration: "none", position: "relative" }}
                >
                  {p.slug === "content-intelligence" && (
                    <span style={{
                      position: "absolute", top: 14, right: 12,
                      transform: "rotate(-12deg)",
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--navy)",
                      border: "1.5px solid var(--navy)",
                      borderRadius: "3px",
                      padding: "2px 6px",
                      lineHeight: 1.4,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}>
                      Live Product
                    </span>
                  )}
                  <div className="flex flex-col flex-1">
                    <h3
                      className="font-body font-semibold text-sm mb-2"
                      style={{ color: "var(--ink)", paddingRight: p.slug === "content-intelligence" ? "52px" : undefined }}
                    >
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
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden">
              <InfiniteCarousel>
                {[
                  ...projects.map((p, i) => (
                    <Link
                      key={`a-${i}`}
                      href={`/work/${p.slug}`}
                      className="flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer transition-opacity hover:opacity-90"
                      style={{ width: "260px", background: "#e8edf5", border: "1px solid #c8d4e8", textDecoration: "none", position: "relative" }}
                    >
                      {p.slug === "content-intelligence" && (
                        <span style={{
                          position: "absolute", top: 14, right: 12,
                          transform: "rotate(-12deg)",
                          fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--navy)",
                          border: "1.5px solid var(--navy)",
                          borderRadius: "3px",
                          padding: "2px 6px",
                          lineHeight: 1.4,
                          pointerEvents: "none",
                          userSelect: "none",
                        }}>
                          Live Product
                        </span>
                      )}
                      <div className="flex flex-col flex-1">
                        <h3
                          className="font-body font-semibold text-sm mb-2"
                          style={{ color: "var(--ink)", paddingRight: p.slug === "content-intelligence" ? "52px" : undefined }}
                        >
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
                      </div>
                    </Link>
                  )),
                  ...projects.map((p, i) => (
                    <Link
                      key={`b-${i}`}
                      href={`/work/${p.slug}`}
                      aria-hidden="true"
                      className="flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer transition-opacity hover:opacity-90"
                      style={{ width: "260px", background: "#e8edf5", border: "1px solid #c8d4e8", textDecoration: "none", position: "relative" }}
                    >
                      <div className="flex flex-col flex-1">
                        <h3 className="font-body font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>{p.name}</h3>
                        <p className="font-body text-xs leading-relaxed mb-3 flex-1" style={{ color: "var(--muted)" }}>{p.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.pills.map((pill) => (
                            <span key={pill} className="font-body text-xs px-2.5 py-1 rounded-full"
                              style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                              {pill}
                            </span>
                          ))}
                        </div>
                        <span className="font-body text-xs font-medium" style={{ color: "var(--navy)" }}>View details →</span>
                      </div>
                    </Link>
                  )),
                ]}
              </InfiniteCarousel>
            </div>
          </>
        )}

        {/* AUTOMATIONS — no domain tag pill */}
        {activeTab === "Automations" && (
          <div className="max-w-5xl mx-auto">
            <InfiniteCarousel>
              {[
                ...automations.map((a, i) => (
                  <Link
                    key={`a-${i}`}
                    href={`/automations/${a.slug}`}
                    className="flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer transition-opacity hover:opacity-90"
                    style={{ width: "260px", background: "#e8edf5", border: "1px solid #c8d4e8", textDecoration: "none" }}
                  >
                    <div className="flex flex-col flex-1">
                      <h3 className="font-body font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>{a.name}</h3>
                      <p className="font-body text-xs leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{a.desc}</p>
                      <span className="font-body text-xs font-medium mt-4" style={{ color: "var(--navy)" }}>
                        Watch demo →
                      </span>
                    </div>
                  </Link>
                )),
                ...automations.map((a, i) => (
                  <Link
                    key={`b-${i}`}
                    href={`/automations/${a.slug}`}
                    aria-hidden="true"
                    className="flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer transition-opacity hover:opacity-90"
                    style={{ width: "260px", background: "#e8edf5", border: "1px solid #c8d4e8", textDecoration: "none" }}
                  >
                    <h3 className="font-body font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>{a.name}</h3>
                    <p className="font-body text-xs leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{a.desc}</p>
                    <span className="font-body text-xs font-medium mt-4" style={{ color: "var(--navy)" }}>
                      Watch demo →
                    </span>
                  </Link>
                )),
              ]}
            </InfiniteCarousel>
          </div>
        )}

        {/* CASE STUDIES — logos replacing company names */}
        {activeTab === "Case Studies" && (
          <div className="max-w-5xl mx-auto">
            <InfiniteCarousel>
              {[
                ...cases.map((c, i) => <CaseCard key={`a-${i}`} c={c} />),
                ...cases.map((c, i) => <CaseCard key={`b-${i}`} c={c} ariaHidden />),
              ]}
            </InfiniteCarousel>
          </div>
        )}
      </div>
    </section>
  );
}
