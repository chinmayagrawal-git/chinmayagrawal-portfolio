import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  problem: string;
  steps: string[];
  stack: string[];
}> = {
  "gmail-support": {
    name: "Gmail Support Agent",
    domain: "CX",
    problem: "An EdTech company's support inbox was drowning — agents spent most of their time drafting replies to the same 20 questions. The backlog kept growing. Human attention was going to the easy stuff, not the edge cases.",
    steps: [
      "Incoming email triggers a Gmail webhook via Make.com",
      "Query is classified into one of 12 support categories using an LLM classifier",
      "RAG retrieval pulls the 3 most relevant KB articles for the category",
      "Claude drafts a grounded reply using the retrieved context + email thread",
      "Draft flagged for human review if confidence score < 0.7 or edge-case keywords detected",
    ],
    stack: ["Make.com", "Claude API", "Gmail API", "Pinecone", "Notion KB"],
  },
  "whatsapp-cs": {
    name: "WhatsApp CS + Lead Qual",
    domain: "CX / Sales",
    problem: "Customers were messaging on WhatsApp and getting no response for hours. The same channel was also the first touchpoint for inbound leads who needed quick qualification before a sales call.",
    steps: [
      "WhatsApp message received via Twilio webhook",
      "Intent classifier determines: support query, lead inquiry, or unknown",
      "Support path: retrieves resolution from KB, drafts reply, routes to human if unresolved",
      "Lead path: asks 3 qualifying questions, scores response, books Calendly slot if qualified",
      "All conversations logged to Airtable with intent + resolution status",
    ],
    stack: ["Twilio", "Claude API", "Calendly API", "Airtable", "Make.com"],
  },
  "nps-voice": {
    name: "NPS Voice Agent",
    domain: "Ops",
    problem: "Post-visit NPS surveys sent over SMS had a 4% completion rate. The team was making manual calls to collect feedback but couldn't scale it. The feedback that did come in was thin — a number with no context.",
    steps: [
      "Visit completion event triggers agent via webhook from POS system",
      "Voice agent calls customer using Twilio Voice + ElevenLabs TTS",
      "Conversational NPS collection: score + follow-up questions based on score range",
      "Transcript processed by LLM to extract structured tags (product, staff, wait time)",
      "Structured output written to ops dashboard with actionable summary",
    ],
    stack: ["Twilio Voice", "ElevenLabs", "Claude API", "Google Sheets", "Make.com"],
  },
  "brand-reputation": {
    name: "Brand Reputation Agent",
    domain: "Brand",
    problem: "A D2C brand had reviews coming in across Google, Zomato, and Instagram comments. No one was reading them systematically. CX signals and product bugs were buried in 3-star reviews that no one acted on.",
    steps: [
      "Scheduled scraper pulls new reviews from 4 platforms every 6 hours",
      "Each review classified by sentiment, theme (product / service / delivery), and urgency",
      "Recurring signals aggregated weekly: top complaints, top praise, emerging patterns",
      "Brand-damaging reviews flagged immediately to Slack with suggested response draft",
      "Monthly digest written to Notion with trend lines and recommended actions",
    ],
    stack: ["Apify", "Claude API", "Slack API", "Notion", "Make.com"],
  },
  "push-notifications": {
    name: "Push Notification Agent",
    domain: "Marketing",
    problem: "The team was sending push notifications on a fixed weekly schedule regardless of what was happening. CTR was flat. The content wasn't tied to anything the user had done or what was happening in the world.",
    steps: [
      "Signal sources monitored: user activity events, weather API, local events calendar",
      "LLM generates notification copy conditioned on user segment + active signal",
      "Copy scored on relevance, urgency, and brand voice before approval",
      "Approved notifications queued in FCM with dynamic send-time optimization",
      "Performance data fed back to refine signal weighting each week",
    ],
    stack: ["FCM", "Claude API", "OpenWeather API", "Segment", "Make.com"],
  },
  "outreach": {
    name: "Outreach Automation",
    domain: "GTM",
    problem: "A university partnership program needed to reach 200+ institutions. The team was copying and pasting the same email with minor edits. Response rates were under 3% and it was taking two people two weeks per batch.",
    steps: [
      "Target list enriched with LinkedIn data and university portal scraping",
      "Prospect research: department focus, recent programs, student size pulled per institution",
      "LLM generates personalized first line + value prop tailored to each institution's context",
      "Sequences built in Apollo with 3-touch cadence: email → LinkedIn → follow-up",
      "Replies auto-classified as interested / not interested / bounce for pipeline tracking",
    ],
    stack: ["Apollo.io", "Claude API", "LinkedIn API", "Apify", "Google Sheets"],
  },
  "linkedin-posts": {
    name: "LinkedIn Post Generator",
    domain: "Content",
    problem: "The founder had strong opinions and real stories but no time to turn them into posts. When they did write, it took 45 minutes and the output didn't sound like them.",
    steps: [
      "Founder drops raw voice note or bullet points into a Telegram bot",
      "LLM extracts the core insight, stakes, and supporting evidence",
      "Post structured using a trained template: hook → context → evidence → takeaway",
      "Tone calibrated against a library of 40 approved past posts",
      "Draft returned to Telegram for one-tap edit or approve + schedule via Buffer",
    ],
    stack: ["Telegram Bot API", "Claude API", "Buffer API", "Make.com"],
  },
};

export async function generateStaticParams() {
  return Object.keys(automationData).map((slug) => ({ slug }));
}

export default function AutomationPage({ params }: { params: { slug: string } }) {
  const data = automationData[params.slug];

  return (
    <>
      <Navbar />
      <main
        className="min-h-dvh pt-20 pb-16 px-6"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-[760px] mx-auto">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 font-body text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft size={14} />
            Back
          </Link>

          {data ? (
            <>
              {/* Tags */}
              <div className="flex gap-2 mb-4">
                <span
                  className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "var(--navy)", color: "#fff", fontSize: "11px" }}
                >
                  {data.domain}
                </span>
                <span
                  className="font-body text-xs px-3 py-1 rounded-full"
                  style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "11px" }}
                >
                  Automation
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-display font-bold mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink)", lineHeight: 1.1 }}
              >
                {data.name}
              </h1>

              {/* Problem */}
              <section className="mb-10">
                <h2
                  className="font-body font-semibold uppercase mb-3"
                  style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}
                >
                  The Problem
                </h2>
                <p
                  className="font-body leading-relaxed"
                  style={{ color: "var(--ink)", fontSize: "1rem" }}
                >
                  {data.problem}
                </p>
              </section>

              {/* How it works */}
              <section className="mb-10">
                <h2
                  className="font-body font-semibold uppercase mb-4"
                  style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}
                >
                  How it works
                </h2>
                <ol className="flex flex-col gap-3">
                  {data.steps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        className="flex-shrink-0 font-body font-semibold text-xs w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: "var(--navy)", color: "#fff", fontSize: "11px" }}
                      >
                        {i + 1}
                      </span>
                      <p className="font-body text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Video walkthrough */}
              <section className="mb-10">
                <h2
                  className="font-body font-semibold uppercase mb-4"
                  style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}
                >
                  Walkthrough
                </h2>
                {videoIds[params.slug] ? (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "12px" }}>
                    <iframe
                      src={`https://drive.google.com/file/d/${videoIds[params.slug]}/preview`}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div
                    className="w-full rounded-xl flex items-center justify-center"
                    style={{ aspectRatio: "16/9", background: "#e8e4dc", border: "1px solid var(--border)" }}
                  >
                    <p className="font-body text-sm" style={{ color: "var(--muted)" }}>Walkthrough coming soon</p>
                  </div>
                )}
              </section>

              {/* Tech stack */}
              <section>
                <h2
                  className="font-body font-semibold uppercase mb-4"
                  style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}
                >
                  Stack
                </h2>
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
              </section>
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
