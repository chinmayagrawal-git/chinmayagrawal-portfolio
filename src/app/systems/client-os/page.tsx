import Link from "next/link";
import { ChevronLeft, Code2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoomEmbed from "@/components/LoomEmbed";
import RunsGrid from "@/components/RunsGrid";

const REPO_URL = "https://github.com/chinmayagrawal-git/client-memory-vault-gtm";
const LOOM_ID = "8e7416eec4d54a95ae660a085ae28a33";

export default function AccountOS() {
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
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium px-5 py-2.5 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "var(--navy)", color: "#fff" }}
            >
              <Code2 size={14} />
              View the code
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            {/* Prose — second on mobile, left on desktop */}
            <div className="flex-1 order-2 md:order-1 md:[flex:0_0_55%]">
              <div className="flex gap-2 mb-4 flex-wrap">
                <span
                  className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "var(--navy)", color: "#fff", fontSize: "11px" }}
                >
                  AI System
                </span>
                <span
                  className="font-body text-xs px-3 py-1 rounded-full"
                  style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "11px" }}
                >
                  Local-first · self-built
                </span>
              </div>

              <h1
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)", lineHeight: 1.1 }}
              >
                Client OS
              </h1>

              <p className="font-body mb-6" style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
                Never walk into a call cold — every account&rsquo;s context rebuilt overnight, dormancy flagged, briefed to your inbox.
              </p>

              <div className="flex flex-col gap-5" style={{ color: "var(--ink)", fontSize: "1rem" }}>
                <p className="font-body leading-relaxed">
                  Run enough accounts and the prep eats your morning. Before every call you rebuild context by hand: what is this account, where&rsquo;s the deal, what&rsquo;s open, what changed. It sits scattered across call transcripts, email, chat, a CRM, and your own head. Ten accounts in, the day&rsquo;s gone before it started.
                </p>
                <p className="font-body leading-relaxed">
                  So I built the thing that does it for me. It reads every call transcript from Fireflies and every email from Gmail, files each under the right account, and keeps a living overview of the relationship: current stage, open issues, last contact. The vault stays the single source of truth — plain markdown, local, scriptable, no proprietary format and no data leaving the machine.
                </p>
                <p className="font-body leading-relaxed">
                  The part that matters is that it stays <em>current</em>. A daily pass re-reads everything new under an account and rewrites the summary you&rsquo;d actually read first, so it never freezes on day-one context. Anything that goes quiet past a threshold you set gets flagged as dormant, and a brief lands in your inbox each morning: what moved in the last 24 hours, what&rsquo;s open, who went cold.
                </p>
                <p className="font-body leading-relaxed">
                  In plain terms: the prep you&rsquo;d do by hand before every meeting, done overnight, for every account, while you sleep. It de-bottlenecks the one person who otherwise has to hold all of it in their head — which is the real point once a team is scaling past what memory can carry.
                </p>
              </div>
            </div>

            {/* Loom — first on mobile, sticky right on desktop */}
            <div className="w-full order-1 md:order-2 md:[flex:0_0_40%]">
              <div className="md:sticky md:top-[80px]" style={{ height: "fit-content" }}>
                <LoomEmbed loomId={LOOM_ID} title="Client OS — walkthrough" />
              </div>
            </div>
          </div>

          {/* How it runs */}
          <div className="mb-10">
            <div
              className="font-body font-semibold mb-4"
              style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}
            >
              How it runs
            </div>
            <RunsGrid />
          </div>

          {/* Roadmap note + repo */}
          <div className="flex flex-col md:flex-row gap-5 md:items-center">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-medium px-6 py-3 rounded-full transition-opacity hover:opacity-80 flex-shrink-0"
              style={{ background: "var(--navy)", color: "#fff" }}
            >
              <Code2 size={14} />
              View the code →
            </a>
            <p
              className="font-body text-[13px] leading-relaxed"
              style={{ color: "var(--muted)", borderLeft: "2px solid var(--border)", paddingLeft: "16px" }}
            >
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Roadmap:</strong> next is a suggested-actions file per account — the next move, which you approve or reject and it learns from. Runs on local open-weight models, so no account data leaves the machine.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
