"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const TABS = ["Projects", "Automations", "Case Studies"] as const;
type Tab = (typeof TABS)[number];

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
  { name: "Why AI Agents Stall in Production", problem: "Model capability determines pilot success. Coordination maturity determines production scalability.", pdf: "/decks/ai-deployment-thesis.pdf", tag: "Thesis", logo: null },
  { name: "SuperK", problem: "Making 130+ FOFO grocery stores auditable and data-driven.", pdf: "/decks/superk.pdf", tag: null, logo: "/logos/superk.png" },
  { name: "Firstclub", problem: "A dynamic pricing engine for QComm that can't break customer trust.", pdf: "/decks/firstclub.pdf", tag: null, logo: "/logos/firstclub.png" },
  { name: "Instamart", problem: "A pricing engine for FnV where demand is hyperlocal.", pdf: "/decks/instamart.pdf", tag: null, logo: "/logos/instamart.png" },
  { name: "Optimum Nutrition", problem: "Launching Protein Snacking as a new category in India.", pdf: "/decks/on.pdf", tag: null, logo: "/logos/on.png" },
  { name: "Swiggy", problem: "Reducing restaurant churn by fixing what partners actually see.", pdf: "/decks/swiggy.pdf", tag: null, logo: "/logos/swiggy.png" },
  { name: "Beam Mobility", problem: "Market expansion: identifying where to go and how.", pdf: "/decks/beam.pdf", tag: null, logo: "/logos/beam.png" },
  { name: "Scapia", problem: "Business model breakdown and growth levers for a zero-forex travel card.", pdf: "/decks/scapia.pdf", tag: null, logo: "/logos/scapia.png" },
];

const CARD_STYLE: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  textDecoration: "none",
};

/**
 * Continuous infinite auto-scroll carousel.
 * - Time-based speed (frame-rate independent: same px/s on 60Hz and 120Hz)
 * - Pauses on hover (desktop) and on touch+hold (mobile), resumes shortly after release
 */
function InfiniteCarousel({ children }: { children: React.ReactNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0); // float accumulator — scrollLeft truncates to int
  const singleSetWidthRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        singleSetWidthRef.current = scrollRef.current.scrollWidth / 2;
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [children]);

  useEffect(() => {
    const SPEED = 64; // px per second
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1); // clamp tab-switch jumps
      last = now;
      const el = scrollRef.current;
      if (el && !pausedRef.current) {
        posRef.current += SPEED * dt;
        if (singleSetWidthRef.current > 0 && posRef.current >= singleSetWidthRef.current) {
          posRef.current -= singleSetWidthRef.current;
        }
        el.scrollLeft = posRef.current;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const pause = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    pausedRef.current = true;
  };
  const resumeSoon = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 400);
  };

  /*
   * Pointer events only, gated by pointerType. Plain mouseenter/mouseleave
   * breaks on touch devices: after touchend the browser fires a synthesized
   * compat mouseenter (pausing again) but never a mouseleave — so the
   * carousel stayed paused forever. Touch compat events do NOT re-fire
   * pointerenter, so gating by pointerType avoids the cross-talk entirely.
   */
  return (
    <div
      ref={scrollRef}
      className="flex gap-4 pb-2"
      style={{ overflowX: "hidden" }}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") pause(); }}
      onPointerLeave={(e) => { resumeSoon(); }}
      onPointerDown={(e) => { if (e.pointerType !== "mouse") pause(); }}
      onPointerUp={(e) => { if (e.pointerType !== "mouse") resumeSoon(); }}
      onPointerCancel={() => resumeSoon()}
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
      tabIndex={ariaHidden ? -1 : undefined}
      className="card-lift flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer"
      style={{ width: "260px", ...CARD_STYLE }}
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
          View deck →
        </span>
      </div>
    </a>
  );
}

function ProjectCard({ p, ariaHidden }: { p: typeof projects[0]; ariaHidden?: boolean }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      aria-hidden={ariaHidden}
      tabIndex={ariaHidden ? -1 : undefined}
      className="card-lift flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer"
      style={{ width: "240px", ...CARD_STYLE }}
    >
      <div className="flex flex-col flex-1">
        <h3
          className="font-body font-semibold text-sm mb-2"
          style={{ color: "var(--ink)" }}
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
  );
}

export default function WorkSection({ initialTab }: { initialTab?: string | null }) {
  const [activeTab, setActiveTab] = useState<Tab>("Projects");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initialTab && TABS.includes(initialTab as Tab)) {
      setActiveTab(initialTab as Tab);
    }
  }, [initialTab]);

  // One-time scroll reveal
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

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-8 px-6 md:px-16 relative z-10 scroll-mt-[72px]"
      style={{ background: "var(--bg)" }}
    >
      {/* Thin separator above section heading */}
      <hr style={{ border: 0, borderTop: "1px solid #e8e0d0", marginBottom: "2rem" }} />

      <div className="reveal">
        {/* Section heading */}
        <h2
          className="font-display font-bold text-center mb-6"
          style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)", color: "var(--ink)" }}
        >
          Proof of work
        </h2>

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
      </div>

      {/* Keyed by tab so the fade re-runs on every switch */}
      <div className="tab-content" key={activeTab}>
        {/* Context line */}
        <p
          className="text-center font-body mb-6"
          style={{ color: "var(--muted)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          {activeTab === "Projects" && "Four systems shipped solo — internal ops to customer-facing product"}
          {activeTab === "Automations" && "Working agents built for real problems — CX, ops, GTM, content"}
          {activeTab === "Case Studies" && "Strategy and ops problems diagnosed across sectors"}
        </p>

        {/* PROJECTS — carousel on all viewports */}
        {activeTab === "Projects" && (
          <div className="max-w-5xl mx-auto">
            <InfiniteCarousel>
              {[
                ...projects.map((p, i) => <ProjectCard key={`a-${i}`} p={p} />),
                ...projects.map((p, i) => <ProjectCard key={`b-${i}`} p={p} ariaHidden />),
              ]}
            </InfiniteCarousel>
          </div>
        )}

        {/* AUTOMATIONS */}
        {activeTab === "Automations" && (
          <div className="max-w-5xl mx-auto">
            <InfiniteCarousel>
              {[
                ...automations.map((a, i) => (
                  <Link
                    key={`a-${i}`}
                    href={`/automations/${a.slug}`}
                    className="card-lift flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer"
                    style={{ width: "260px", ...CARD_STYLE }}
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
                    tabIndex={-1}
                    className="card-lift flex-shrink-0 rounded-xl p-5 flex flex-col cursor-pointer"
                    style={{ width: "260px", ...CARD_STYLE }}
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
