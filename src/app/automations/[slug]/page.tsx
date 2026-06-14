import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";

const videoIds: Record<string, string> = {
  "brand-reputation":    "1ak6x_SnNCO6pMzXGIo4GxrH8o210NTKe",
  "gmail-support":       "1b52r3avnEDY-S0U1blBedMU3X8CZEfuN",
  "linkedin-posts":      "1bkaFTvpUBviXK34J7zwPvTjKkKIPZg24",
  "nps-voice":           "1ho838MItnP9WQymZTCVVgTbXcGEMbWtn",
  "outreach":            "17tOjaUv_f3tJj67CYa471tZcVtkXMIoP",
  "push-notifications":  "1wfEPrZWglosJ55V1HmUtDr4urukoLRmb",
  "whatsapp-cs":         "1Sa-l7sgSKKj_fqc01gBiODRv9cuQxJvX",
};

const automationData: Record<string, {
  name: string;
  domain: string;
  subtitle: string;
  body: string[];
  stack: string[];
}> = {
  "gmail-support": {
    name: "Gmail Customer Support Agent",
    domain: "CX",
    subtitle: "An AI frontline support system that drafts accurate replies grounded in company knowledge and flags edge cases for human review.",
    body: [
      "Support breaks at scale — inbox volume grows but response quality can't keep pace without proportionally more headcount. The deeper problem is that institutional knowledge lives in scattered documents and people's heads, making consistent responses nearly impossible.",
      "This agent sits between the inbox and the human team. When a support email arrives, it retrieves relevant information from a structured knowledge base, classifies the query, drafts a response grounded in verified company knowledge, and either sends it directly or routes it to a human with full context attached. Edge cases never fall through — they escalate with the draft and classification already done.",
      "The result: routine queries handled immediately and consistently. Human agents receive only the genuinely complex ones, with context prepared.",
    ],
    stack: ["Gmail API", "Claude AI", "Pinecone", "Google Sheets"],
  },
  "whatsapp-cs": {
    name: "WhatsApp CS + Lead Qualification Agent",
    domain: "CX / Sales",
    subtitle: "First-line support over WhatsApp — resolves what it can, qualifies leads, and routes everything else with context.",
    body: [
      "WhatsApp inboxes become operationally chaotic at scale. Messages are unsearchable, knowledge is copy-pasted from documents, and lead intent gets lost in unstructured chat.",
      "This agent receives incoming WhatsApp messages, queries a live knowledge base for verified answers, diagnoses whether the message is a support query or a sales signal, and responds accordingly — resolving support queries or qualifying leads before escalation. Every conversation is logged to a structured sheet, turning an informal channel into a reliable intake layer.",
    ],
    stack: ["WhatsApp Business API", "Claude AI", "Pinecone", "Google Sheets"],
  },
  "nps-voice": {
    name: "NPS Collection Voice Agent",
    domain: "Ops",
    subtitle: "Calls customers after a store visit, collects NPS and verbatim feedback, writes structured output back to ops.",
    body: [
      "NPS surveys sent over text get ignored. Phone calls get answered — but calling customers manually doesn't scale.",
      "This agent makes outbound calls to customers who recently visited a store, conducts a short structured conversation to capture their rating and primary feedback, and writes a summary back to a sheet — NPS score, verbatim reason, and an ops-level classification of whether the issue is an execution gap, product gap, or pricing issue. The output is immediately actionable: not a dashboard, a signal with a diagnosis already attached.",
    ],
    stack: ["ElevenLabs", "Claude AI", "n8n", "Google Sheets"],
  },
  "brand-reputation": {
    name: "Brand Reputation Agent",
    domain: "Brand",
    subtitle: "Continuously monitors product reviews, distills customer sentiment into signals, and surfaces what's actually changing.",
    body: [
      "Review feedback is fragmented across products and buried under volume. Teams rely on delayed summaries or manual scraping. Critical patterns — packaging defects, recurring complaints — get missed until they become crises.",
      "This agent scrapes reviews from Amazon product URLs, runs LLM-based sentiment and theme extraction, aggregates patterns across products, and pushes a structured summary with notable shifts to a Slack channel and Google Sheet. The output is time-aware — what changed this week, not just the overall rating.",
    ],
    stack: ["Amazon Scraping", "Claude AI", "n8n", "Slack", "Google Sheets"],
  },
  "push-notifications": {
    name: "Push Notification Automation",
    domain: "Marketing",
    subtitle: "Context-aware push notifications triggered by real-world signals — not campaign schedules.",
    body: [
      "Generic notifications become noise. Users tune them out because they're not relevant to what's happening in their world right now.",
      "This agent monitors live external signals — weather, sports results, cultural events — maps them to relevant product use cases, generates short human-sounding notification copy, and formats it for deployment. A rainy evening triggers comfort food nudges. A big match triggers snack recommendations. The notification arrives at the right moment, not because someone scheduled it.",
    ],
    stack: ["External APIs", "Claude AI", "n8n", "Firebase"],
  },
  "outreach": {
    name: "Outreach Automation Agent",
    domain: "GTM",
    subtitle: "Personalized cold outreach at scale for university partnerships — relevant to each institution, not a mail merge.",
    body: [
      "Academic outreach is context-dependent. Generic bulk emails hurt brand credibility and get ignored. Manual research per institution doesn't scale.",
      "This agent identifies relevant universities, scrapes and formats contact data, scores leads for fit, and generates personalized outreach emails grounded in each institution's specific programs and geography. Emails are sent via Gmail and tracked. The result: partnership outreach that reads like individual research, running at the scale of a bulk tool.",
    ],
    stack: ["Gmail API", "Claude AI", "n8n", "Google Sheets"],
  },
  "linkedin-posts": {
    name: "LinkedIn Post Generator",
    domain: "Content",
    subtitle: "Turns raw thinking into structured, on-brand LinkedIn posts — written, designed, and published without platform switching.",
    body: [
      "Content consistency fails because converting a thought into a publishable post takes more effort than it's worth on most days. Professionals overthink tone and structure, leading to procrastination or templated output that loses authenticity.",
      "This agent takes raw notes or ideas as input, analyzes the creator's posting history and profile for voice calibration, drafts a post with a clear hook and structured body, generates a matching visual asset, and publishes directly to LinkedIn. Every post sounds like the person, not like AI.",
    ],
    stack: ["LinkedIn API", "Claude AI", "DALL-E", "n8n"],
  },
};

export async function generateStaticParams() {
  return Object.keys(automationData).map((slug) => ({ slug }));
}

export default function AutomationPage({ params }: { params: { slug: string } }) {
  const data = automationData[params.slug];
  const videoId = videoIds[params.slug];

  return (
    <>
      <Navbar />
      <main
        className="min-h-dvh pt-20 pb-16 px-6"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/automations"
              className="inline-flex items-center gap-1.5 font-body text-sm font-medium px-4 py-1.5 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "var(--navy)", color: "#fff" }}
            >
              <ChevronLeft size={14} />
              All automations
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-body text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              Home
            </Link>
          </div>

          {data ? (
            <>
              {/* Mobile: video first, text below. Desktop: content left, sticky video right. */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12">
                {/* Content — second on mobile, left on desktop */}
                <div className="flex-1 order-2 md:order-1 md:max-w-[55%]">
                  {/* Domain tag */}
                  <div className="flex gap-2 mb-4">
                    <span
                      className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: "var(--navy)", color: "#fff", fontSize: "11px" }}
                    >
                      {data.domain}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className="font-display font-bold mb-3"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--ink)", lineHeight: 1.15 }}
                  >
                    {data.name}
                  </h1>

                  {/* Subtitle */}
                  <p
                    className="font-body mb-8"
                    style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}
                  >
                    {data.subtitle}
                  </p>

                  {/* Body prose */}
                  <div className="flex flex-col gap-5">
                    {data.body.map((para, i) => (
                      <p key={i} className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "1rem" }}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Video — first on mobile, sticky right on desktop */}
                <div className="w-full order-1 md:order-2 md:max-w-[42%] md:[flex:0_0_42%]">
                  <div className="md:sticky md:top-[80px]" style={{ height: "fit-content" }}>
                    {videoId ? (
                      <VideoEmbed videoId={videoId} />
                    ) : (
                      <div
                        className="w-full rounded-xl flex items-center justify-center"
                        style={{ aspectRatio: "16/10", background: "#e8e4dc", border: "1px solid var(--border)" }}
                      >
                        <p className="font-body text-sm" style={{ color: "var(--muted)" }}>Walkthrough coming soon</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {data.stack.map((tool) => (
                  <span
                    key={tool}
                    className="font-body text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="pt-16 text-center">
              <h1
                className="font-display font-bold mb-4"
                style={{ fontSize: "2rem", color: "var(--ink)" }}
              >
                Automation not found
              </h1>
              <p className="font-body" style={{ color: "var(--muted)" }}>
                This walkthrough doesn&apos;t exist yet.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
