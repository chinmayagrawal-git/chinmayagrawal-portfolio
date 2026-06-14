import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const automations = [
  {
    name: "Gmail Support Agent",
    desc: "AI frontline support for EdTech — drafts grounded replies, flags edge cases for humans.",
    domain: "CX",
    slug: "gmail-support",
    stack: ["Gmail API", "Claude AI", "Pinecone", "Google Sheets"],
  },
  {
    name: "WhatsApp CS + Lead Qual",
    desc: "First-line support over WhatsApp. Resolves or routes, never ignores.",
    domain: "CX / Sales",
    slug: "whatsapp-cs",
    stack: ["WhatsApp Business API", "Claude AI", "Pinecone", "Google Sheets"],
  },
  {
    name: "NPS Voice Agent",
    desc: "Calls customers post-visit, collects NPS with context, writes structured output to ops.",
    domain: "Ops",
    slug: "nps-voice",
    stack: ["ElevenLabs", "Claude AI", "n8n", "Google Sheets"],
  },
  {
    name: "Brand Reputation Agent",
    desc: "Monitors reviews across platforms, surfaces CX and product signals automatically.",
    domain: "Brand",
    slug: "brand-reputation",
    stack: ["Amazon Scraping", "Claude AI", "n8n", "Slack"],
  },
  {
    name: "Push Notification Agent",
    desc: "Context-aware notifications triggered by real-world signals, not schedules.",
    domain: "Marketing",
    slug: "push-notifications",
    stack: ["External APIs", "Claude AI", "n8n", "Firebase"],
  },
  {
    name: "Outreach Automation",
    desc: "Personalized cold outreach at scale for university partnerships.",
    domain: "GTM",
    slug: "outreach",
    stack: ["Gmail API", "Claude AI", "n8n", "Google Sheets"],
  },
  {
    name: "LinkedIn Post Generator",
    desc: "Turns raw thinking into structured, on-brand posts. End to end.",
    domain: "Content",
    slug: "linkedin-posts",
    stack: ["LinkedIn API", "Claude AI", "DALL-E", "n8n"],
  },
];

const CARD_STYLE: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  textDecoration: "none",
};

export default function AutomationsIndexPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-dvh pt-20 pb-16 px-6 md:px-16"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Back to home */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-sm mb-10 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft size={14} />
            Back to home
          </Link>

          {/* Header */}
          <h1
            className="font-display font-bold mb-3"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            AI Automations
          </h1>

          {/* Subtext */}
          <p
            className="font-body mb-12"
            style={{
              color: "var(--muted)",
              fontSize: "1.05rem",
              lineHeight: 1.65,
              maxWidth: "600px",
            }}
          >
            Working agents built for real business problems across CX, ops, GTM, and content.
            Each one has a video walkthrough — click any card to see how it runs.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {automations.map((a) => (
              <Link
                key={a.slug}
                href={`/automations/${a.slug}`}
                className="card-lift rounded-xl p-5 flex flex-col cursor-pointer"
                style={CARD_STYLE}
              >
                {/* Domain tag */}
                <span
                  className="font-body text-xs font-semibold px-2.5 py-0.5 rounded-full self-start mb-3"
                  style={{
                    background: "var(--navy)",
                    color: "#fff",
                    fontSize: "10px",
                  }}
                >
                  {a.domain}
                </span>

                <h2
                  className="font-body font-semibold text-sm mb-2"
                  style={{ color: "var(--ink)" }}
                >
                  {a.name}
                </h2>

                <p
                  className="font-body text-xs leading-relaxed flex-1 mb-4"
                  style={{ color: "var(--muted)" }}
                >
                  {a.desc}
                </p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {a.stack.map((tool) => (
                    <span
                      key={tool}
                      className="font-body text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--bg)",
                        color: "var(--muted)",
                        border: "1px solid var(--border)",
                        fontSize: "10px",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <span
                  className="font-body text-xs font-medium"
                  style={{ color: "var(--navy)" }}
                >
                  Watch demo →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
