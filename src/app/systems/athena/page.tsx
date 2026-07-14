import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AthenaCallWidget from "@/components/AthenaCallWidget";

const GROUNDING = [
  {
    h: "It states only what the system returns",
    p: "Every doctor, slot, and fee comes from a live API call. Ask for a slot that isn't open and it tells you. It won't invent a time or a person who isn't there.",
  },
  {
    h: "A booking that isn't real gets rejected",
    p: "Even if the model slips, the booking layer is the last check. A slot that's already gone comes back as an error, so a made-up appointment never becomes a confirmed one.",
  },
];

export default function Athena() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-20 pb-16 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-body text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              <ChevronLeft size={14} />
              Back
            </Link>
          </div>

          <div className="max-w-[760px]">
            <div className="flex gap-2 mb-4 flex-wrap">
              <span
                className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "var(--navy)", color: "#fff", fontSize: "11px" }}
              >
                AI System
              </span>
              <span
                className="font-body text-xs px-3 py-1 rounded-full inline-flex items-center gap-1.5"
                style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "11px" }}
              >
                <span className="live-dot" aria-hidden="true" />
                Live · callable
              </span>
            </div>

            <h1
              className="font-display font-bold mb-3"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)", lineHeight: 1.1 }}
            >
              Athena — Voice Booking Agent
            </h1>

            <p className="font-body mb-6" style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}>
              Most voice bots can hold a conversation. Almost none can <em>finish</em> one.
            </p>

            <p className="font-body leading-relaxed" style={{ color: "var(--ink)", fontSize: "1rem" }}>
              Athena is an inbound voice agent that books a real medical appointment end to end. It finds the doctor, pulls live availability, reads the details back, confirms, and returns a booking reference. No human picks up. The interesting part isn&rsquo;t that it talks — it&rsquo;s that it&rsquo;s built so it <em>can&rsquo;t</em> confirm something that isn&rsquo;t real.
            </p>
          </div>

          {/* Grounding cards */}
          <div className="grid gap-4 md:grid-cols-2 mt-8 mb-8">
            {GROUNDING.map((g) => (
              <div
                key={g.h}
                className="rounded-xl p-5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <h4 className="font-body font-semibold text-sm mb-1.5" style={{ color: "var(--ink)" }}>
                  {g.h}
                </h4>
                <p className="font-body text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {g.p}
                </p>
              </div>
            ))}
          </div>

          {/* Live widget */}
          <AthenaCallWidget />
        </div>
      </main>
      <Footer />
    </>
  );
}
