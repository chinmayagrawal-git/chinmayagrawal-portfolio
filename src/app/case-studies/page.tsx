import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function CaseStudiesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-20 pb-16 px-6 md:px-16" style={{ background: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-sm mb-10 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft size={14} />
            Back to home
          </Link>

          <h1
            className="font-display font-bold mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", lineHeight: 1.1 }}
          >
            Case Studies
          </h1>

          <p
            className="font-body mb-12"
            style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.65, maxWidth: "600px" }}
          >
            Strategy and ops problems diagnosed across sectors — pricing, retention, market expansion, category launches. Click any card to open the deck.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {cases.map((c) => (
              <a
                key={c.name}
                href={c.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift rounded-xl p-5 flex flex-col cursor-pointer"
                style={CARD_STYLE}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  {c.logo ? (
                    <div style={{ height: "28px", display: "flex", alignItems: "center" }}>
                      <Image src={c.logo} alt={c.name} height={28} width={120} style={{ height: "28px", width: "auto", maxWidth: "120px", objectFit: "contain" }} />
                    </div>
                  ) : (
                    <h2 className="font-body font-semibold text-sm" style={{ color: "var(--ink)" }}>{c.name}</h2>
                  )}
                  {c.tag && (
                    <span className="font-body px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "var(--navy)", color: "#fff", fontSize: "10px" }}>
                      {c.tag}
                    </span>
                  )}
                </div>
                <p className="font-body text-xs leading-relaxed flex-1 mb-4" style={{ color: "var(--muted)" }}>
                  {c.problem}
                </p>
                <span className="font-body text-xs font-medium" style={{ color: "var(--navy)" }}>
                  View deck →
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
