import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FunnelReceipt from "@/components/FunnelReceipt";

export default function TheFutureUniversity() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-20 pb-16 px-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft size={14} />
            Back
          </Link>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Content */}
            <div className="flex-1 order-2 md:order-1 md:[flex:0_0_55%]">
              <div className="flex gap-2 mb-4">
                <span
                  className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "var(--navy)", color: "#fff", fontSize: "11px" }}
                >
                  The Future University
                </span>
                <span
                  className="font-body text-xs px-3 py-1 rounded-full"
                  style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)", fontSize: "11px" }}
                >
                  Internal ops · 2024
                </span>
              </div>

              <h1
                className="font-display font-bold mb-3"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)", lineHeight: 1.1 }}
              >
                Unified Funnel Dashboard
              </h1>

              <p
                className="font-body mb-6"
                style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.6 }}
              >
                Three teams. Three data cuts. Every Monday, no one agreed on what happened last week.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Internal ops · 2024", "Acquisition → upsell", "4–5 hrs/week saved"].map((p) => (
                  <span
                    key={p}
                    className="font-body text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-5" style={{ color: "var(--ink)", fontSize: "1rem" }}>
                <p className="font-body leading-relaxed">
                  The business was one funnel: get people into the masterclass, convert them to a first purchase, then keep them buying. But each team watched only its own slice — marketing saw acquisition, category saw conversion, ops saw retention. Nobody saw the whole thing, so every Monday review started with an argument about whose number was right.
                </p>
                <p className="font-body leading-relaxed">
                  I built one dashboard that put the entire funnel — acquisition to upsell — in a single view, on definitions every team agreed on. The weekly review stopped being &ldquo;whose number is right&rdquo; and became &ldquo;where is the funnel actually leaking.&rdquo;
                </p>
                <p className="font-body leading-relaxed">
                  4&ndash;5 hours of management time saved every week. I left; the shared view stayed the way the team reads the business.
                </p>
              </div>
            </div>

            {/* Receipt — funnel viz */}
            <div className="w-full order-1 md:order-2 md:[flex:0_0_40%]">
              <div className="md:sticky md:top-[80px]" style={{ height: "fit-content" }}>
                <FunnelReceipt />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
