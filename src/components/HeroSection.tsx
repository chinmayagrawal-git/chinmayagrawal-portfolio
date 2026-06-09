"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import TrajectoryCard from "./TrajectoryCard";

const trajectoryCards = [
  {
    institution: "IIT Ropar",
    role: "B.Tech, Civil Engineering",
    duration: "2020 – 2024",
    back: "Graduated in 2024. Figured out early that the interesting problems were in how businesses run, not how structures stand.",
  },
  {
    institution: "The Future University",
    role: "Category Manager",
    duration: "Jun '23 – Jul '25",
    back: "Scaled a category from ₹1Cr to ₹2.5Cr monthly revenue. Led 15 people. Learned what it actually means to own a P&L.",
  },
  {
    institution: "Mesa School of Business",
    role: "PGP, Startup Leadership",
    duration: "2025 – Present",
    back: "Left a stable job deliberately. Spent a year building real AI workflows and connecting them to actual business problems.",
  },
  {
    institution: "Wishlink",
    role: "AI Generalist",
    duration: "Mar – May '26",
    back: "Mandate: revamp customer support using AI. No playbook. Figured it out, shipped three systems, one is live in the creator app today.",
  },
];

/*
 * ARROW DESIGN DECISIONS:
 *
 * PLACEMENT: Arrow SVGs sit as flex siblings between pills in a horizontal row.
 *   They span the gap between adjacent pills — the visual connection is implied
 *   (arrow spans its own width), not literally anchored to pill edges.
 *
 * SVG GEOMETRY (viewBox 0 0 44 30, width=44 height=30):
 *   ArrowAbove (1→2, 3→4): M 3 22 Q 22 5 41 22
 *     Starts bottom-left, control point above center, ends bottom-right.
 *     Bows upward, reads as "arc over the gap".
 *   ArrowBelow (2→3): M 3 8 Q 22 25 41 8
 *     Starts top-left, control point below center, ends top-right.
 *     Bows downward, reads as "arc under the gap".
 *
 * ARROWHEAD: <marker id="traj-arrow" orient="auto"> auto-rotates to the path
 *   tangent at the endpoint — no manual angle calculation needed. The marker is
 *   defined once in a hidden <svg> at the section root; all arrows reference it.
 *   Single id "traj-arrow" is safe because there is only one definition per page.
 *
 * SCALING: Fixed-width arrows (44px) visually bridge the flex gap. Pills vary
 *   in width but arrows don't need to span pill edges — the implied connection
 *   reads correctly at any reasonable pill width.
 */

// ArrowAbove: 32px wide, endpoints at y=14 (vertical center), arc bows 11px above
const ArrowAbove = () => (
  <svg width="32" height="28" viewBox="0 0 32 28" fill="none" style={{ flexShrink: 0, alignSelf: "center" }}>
    <path d="M 2 14 Q 16 3 30 14"
      stroke="#1a2e4a" strokeWidth="1.5" strokeOpacity="0.35" fill="none"
      markerEnd="url(#traj-arrow)" />
  </svg>
);

// ArrowBelow: mirror of ArrowAbove — bows 11px below center
const ArrowBelow = () => (
  <svg width="32" height="28" viewBox="0 0 32 28" fill="none" style={{ flexShrink: 0, alignSelf: "center" }}>
    <path d="M 2 14 Q 16 25 30 14"
      stroke="#1a2e4a" strokeWidth="1.5" strokeOpacity="0.35" fill="none"
      markerEnd="url(#traj-arrow)" />
  </svg>
);

// MobileArrow: simple downward line for vertical stacking on mobile
const MobileArrow = () => (
  <svg width="16" height="22" viewBox="0 0 16 22" fill="none" style={{ alignSelf: "center" }}>
    <path d="M 8 2 L 8 18"
      stroke="#1a2e4a" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"
      markerEnd="url(#traj-arrow)" />
  </svg>
);

export default function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [pillWidth, setPillWidth] = useState<number | undefined>(undefined);

  // Measure natural pill widths across whichever layout is currently visible.
  // Hidden layouts (display:none) return width=0 and are filtered out.
  useLayoutEffect(() => {
    const pills = document.querySelectorAll<HTMLElement>("[data-traj-pill]");
    const widths = Array.from(pills).map((p) => p.getBoundingClientRect().width).filter((w) => w > 0);
    if (widths.length > 0) setPillWidth(Math.max(...widths));
  }, []);

  useEffect(() => {
    async function initGSAP() {
      const gsapMod = await import("gsap");
      const STMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.gsap;
      const ScrollTrigger = STMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Word reveal on name
      if (nameRef.current) {
        const text = nameRef.current.innerText;
        const words = text.split(" ");
        nameRef.current.innerHTML = words
          .map((w) => `<span class="word-span" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span style="display:inline-block">${w}</span></span>`)
          .join(" ");
        const spans = nameRef.current.querySelectorAll<HTMLSpanElement>(".word-span > span");
        gsap.set(spans, { y: 48, opacity: 0.01, skewX: 6 });
        gsap.to(spans, {
          y: 0,
          opacity: 1,
          skewX: 0,
          stagger: 0.045,
          ease: "power3.out",
          duration: 0.6,
          delay: 0.1,
        });
      }

      // Photo parallax
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }

    initGSAP();
  }, []);

  return (
    <section className="flex" style={{ paddingTop: "60px" }}>
      {/* Hidden marker definition — referenced by ArrowAbove, ArrowBelow, MobileArrow */}
      <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <marker id="traj-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill="#1a2e4a" fillOpacity="0.4" />
          </marker>
        </defs>
      </svg>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div className="md:hidden w-full flex flex-col items-center px-6 pt-12 pb-10 gap-4">
        {/* Hi I'm */}
        <p className="font-hand text-center" style={{ fontSize: "20px", color: "var(--muted)", lineHeight: 1 }}>
          Hi, I&apos;m
        </p>

        {/* Name */}
        <h1
          className="font-display font-bold tracking-tight text-center"
          style={{ fontSize: "40px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.05, marginTop: "-4px" }}
        >
          Chinmay Agrawal
        </h1>

        {/* Trajectory pills — single column with down arrows on mobile */}
        <div className="flex flex-col items-center gap-1 mt-2">
          <TrajectoryCard {...trajectoryCards[0]} forceWidth={pillWidth} />
          <MobileArrow />
          <TrajectoryCard {...trajectoryCards[1]} forceWidth={pillWidth} />
          <MobileArrow />
          <TrajectoryCard {...trajectoryCards[2]} forceWidth={pillWidth} />
          <MobileArrow />
          <TrajectoryCard {...trajectoryCards[3]} forceWidth={pillWidth} />
        </div>

        {/* One-liner */}
        <p
          className="font-display italic text-center"
          style={{ color: "var(--muted)", fontSize: "16px", marginTop: "4px" }}
        >
          Currently looking for the next messy problem to own.
        </p>

        {/* Contact nudge */}
        <p className="font-body text-center" style={{ color: "var(--muted)", fontSize: "12px" }}>
          Open to conversations →{" "}
          <a
            href="mailto:chinmay_agrawal@pg26.mesaschool.co"
            className="underline underline-offset-2"
            style={{ color: "var(--navy)" }}
          >
            chinmay_agrawal@pg26.mesaschool.co
          </a>
        </p>

        {/* Scroll teaser */}
        <p
          className="font-body text-center"
          style={{ color: "var(--muted)", opacity: 0.55, fontSize: "11px", letterSpacing: "0.04em" }}
        >
          Below — three Wishlink systems I shipped, AI agents I built across industries, and strategy work across sectors.
        </p>
      </div>

      {/* ── DESKTOP LAYOUT (md+) ── */}
      {/* Left column */}
      <div className="hidden md:flex flex-1 items-center px-16 py-14" style={{ maxWidth: "62%" }}>
        <div className="w-full">
          {/* Hi I'm */}
          <p
            className="font-hand mb-2"
            style={{ fontSize: "28px", color: "var(--muted)", lineHeight: 1 }}
          >
            Hi, I&apos;m
          </p>

          {/* Name */}
          <h1
            ref={nameRef}
            className="font-display leading-none tracking-tight mb-8"
            style={{
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              fontWeight: 700,
              color: "var(--ink)",
              marginTop: "8px",
            }}
          >
            Chinmay Agrawal
          </h1>

          {/* Single row — xl+ (≥1280px) */}
          <div className="hidden xl:flex items-center gap-2 mb-6" id="trajectory-cards">
            <TrajectoryCard {...trajectoryCards[0]} forceWidth={pillWidth} />
            <ArrowAbove />
            <TrajectoryCard {...trajectoryCards[1]} forceWidth={pillWidth} />
            <ArrowBelow />
            <TrajectoryCard {...trajectoryCards[2]} forceWidth={pillWidth} />
            <ArrowAbove />
            <TrajectoryCard {...trajectoryCards[3]} forceWidth={pillWidth} />
          </div>

          {/* Two rows — below xl: 2+2 with equal widths, clean wrapping, no orphaned arrows */}
          <div className="xl:hidden mb-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TrajectoryCard {...trajectoryCards[0]} forceWidth={pillWidth} />
              <ArrowAbove />
              <TrajectoryCard {...trajectoryCards[1]} forceWidth={pillWidth} />
            </div>
            <div className="flex items-center gap-2">
              <TrajectoryCard {...trajectoryCards[2]} forceWidth={pillWidth} />
              <ArrowBelow />
              <TrajectoryCard {...trajectoryCards[3]} forceWidth={pillWidth} />
            </div>
          </div>

          {/* One-liner */}
          <p
            className="font-display italic mb-3"
            style={{ color: "var(--muted)", fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
          >
            Currently looking for the next messy problem to own.
          </p>

          {/* Contact nudge */}
          <p className="font-body text-sm mb-6" style={{ color: "var(--muted)" }}>
            Open to conversations →{" "}
            <a
              href="mailto:chinmay_agrawal@pg26.mesaschool.co"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: "var(--navy)" }}
            >
              chinmay_agrawal@pg26.mesaschool.co
            </a>
          </p>

          {/* Scroll teaser */}
          <p
            className="font-body"
            style={{ color: "var(--muted)", opacity: 0.55, fontSize: "12px", letterSpacing: "0.04em" }}
          >
            Below — three Wishlink systems I shipped, AI agents I built across industries, and strategy work across sectors.
          </p>
        </div>
      </div>

      {/* Right column — sticky photo, desktop only, 38% width */}
      <div
        className="hidden md:flex flex-col"
        style={{
          width: "38%",
          position: "sticky",
          top: "60px",
          alignSelf: "stretch",
          overflow: "hidden",
        }}
      >
        <div ref={photoRef} className="relative w-full" style={{ minHeight: "320px", height: "100%" }}>
          <Image
            src="/chinmay.png"
            alt="Chinmay Agrawal"
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, 38vw"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </section>
  );
}
