"use client";
import Image from "next/image";
import { Mail, Link2, MessageCircle, FileDown } from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1u7NVto13puwl3Q1s2BmHUVFEVQzBFKW8/view?usp=drive_link";
const LINKEDIN_URL = "https://www.linkedin.com/in/chinmay-agrawal-ca02/";
const EMAIL = "chinmay_agrawal@pg26.mesaschool.co";
const WHATSAPP_URL = "https://wa.me/917889041637";

export default function BeyondSection() {
  return (
    <section
      id="contact"
      className="py-8 px-6 md:px-16 relative z-10"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="max-w-5xl mx-auto rounded-2xl p-6 md:p-8"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: "3px solid var(--navy)",
        }}
      >
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Left */}
          <div className="flex-1" style={{ flex: "0 0 55%" }}>
            <h2
              className="font-display font-bold mb-5"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--ink)" }}
            >
              Beyond the work
            </h2>
            <p
              className="font-body leading-relaxed mb-5"
              style={{ color: "var(--ink)", fontSize: "0.95rem" }}
            >
              I&apos;m drawn to problems where the answer isn&apos;t obvious upfront — where you have to
              get close to the system before you can say what&apos;s wrong. I don&apos;t have a fixed
              function. I&apos;ve owned revenue, built products, designed frameworks, and automated
              workflows — whatever the problem needed. What stays constant is the instinct to
              understand before acting.
            </p>
            <p
              className="font-body leading-relaxed mb-8"
              style={{ color: "var(--muted)", fontSize: "0.9rem" }}
            >
              Obsessive chai drinker. Taught myself Japanese through anime. Gym is non-negotiable.
              Will always have an opinion on food.
            </p>

            {/* Photo — mobile centered */}
            <div className="md:hidden flex justify-center mb-8">
              <div
                className="rounded-full overflow-hidden"
                style={{ width: 160, height: 160, border: "2px solid var(--border)" }}
              >
                <Image
                  src="/chinmay_bg.jpg"
                  alt="Chinmay Agrawal"
                  width={160}
                  height={160}
                  sizes="160px"
                  quality={85}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>

            {/* Desktop photo */}
            <div className="hidden md:flex">
              <div
                className="rounded-full overflow-hidden"
                style={{ width: 160, height: 160, border: "2px solid var(--border)" }}
              >
                <Image
                  src="/chinmay_bg.jpg"
                  alt="Chinmay Agrawal"
                  width={160}
                  height={160}
                  sizes="160px"
                  quality={85}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 flex flex-col justify-center">
            <p
              className="font-body font-medium mb-2"
              style={{
                color: "var(--muted)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Currently open to
            </p>
            <p
              className="font-display font-bold mb-8 leading-snug"
              style={{ color: "var(--ink)", fontSize: "1.15rem" }}
            >
              Founder&apos;s Office, BizOps, and AI Generalist roles at Series A–B startups.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 font-body text-sm font-medium px-4 py-3 rounded-xl transition-colors"
                style={{ background: "var(--bg)", color: "var(--ink)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ede8de"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)"; }}
              >
                <Mail size={15} style={{ color: "var(--navy)", flexShrink: 0 }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Email me</span>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm font-medium px-4 py-3 rounded-xl transition-colors"
                style={{ background: "var(--bg)", color: "var(--ink)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ede8de"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)"; }}
              >
                <Link2 size={15} style={{ color: "var(--navy)", flexShrink: 0 }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>LinkedIn</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm font-medium px-4 py-3 rounded-xl transition-colors"
                style={{ background: "var(--bg)", color: "var(--ink)", border: "1px solid var(--border)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ede8de"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)"; }}
              >
                <MessageCircle size={15} style={{ color: "var(--navy)", flexShrink: 0 }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>+91 78890 41637</span>
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm font-medium px-4 py-3 rounded-xl transition-colors"
                style={{ background: "var(--navy)", color: "#fff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                <FileDown size={15} style={{ flexShrink: 0 }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>View Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
