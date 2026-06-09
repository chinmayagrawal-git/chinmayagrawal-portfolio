"use client";
import { useState, useRef } from "react";

interface TrajectoryCardProps {
  institution: string;
  role: string;
  duration: string;
  back: string;
  forceWidth?: number;
}

export default function TrajectoryCard({ institution, role, duration, back, forceWidth }: TrajectoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [cardPos, setCardPos] = useState({ left: 0, top: 0 });
  const pillRef = useRef<HTMLDivElement>(null);

  const open = () => {
    if (!pillRef.current) return;
    const rect = pillRef.current.getBoundingClientRect();
    const CARD_W = 240;
    const CARD_H = 130;
    const MARGIN = 16;
    setCardPos({
      left: Math.max(MARGIN, Math.min(rect.left + rect.width / 2 - CARD_W / 2, window.innerWidth - CARD_W - MARGIN)),
      top: Math.max(MARGIN, Math.min(rect.top + rect.height / 2 - CARD_H / 2, window.innerHeight - CARD_H - MARGIN)),
    });
    setExpanded(true);
  };

  return (
    <>
      <div
        ref={pillRef}
        data-traj-pill
        className="font-body cursor-pointer select-none rounded-full flex flex-col"
        style={{
          border: "1px solid var(--navy)",
          background: "var(--surface)",
          padding: "8px 16px",
          transition: "opacity 150ms ease",
          opacity: expanded ? 0.55 : 1,
          position: "relative",
          zIndex: 1,
          alignItems: "center",
          textAlign: "center",
          ...(forceWidth ? { width: forceWidth, minWidth: forceWidth, flexShrink: 0 } : {}),
        }}
        onMouseEnter={open}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => (expanded ? setExpanded(false) : open())}
      >
        <span style={{ color: "var(--navy)", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", lineHeight: 1.5 }}>
          {institution}
        </span>
        <span style={{ color: "var(--ink)", fontSize: "11px", whiteSpace: "nowrap", lineHeight: 1.4 }}>
          {role}
        </span>
        <span style={{ color: "var(--muted)", fontSize: "10px", whiteSpace: "nowrap", lineHeight: 1.4 }}>
          {duration}
        </span>
      </div>

      {/* Floating expanded card — position: fixed, edge-clamped to viewport */}
      <div
        style={{
          position: "fixed",
          left: cardPos.left,
          top: cardPos.top,
          width: 240,
          padding: "16px",
          borderRadius: "12px",
          background: "var(--navy)",
          zIndex: 9999,
          opacity: expanded ? 1 : 0,
          transform: `scale(${expanded ? 1 : 0.9})`,
          transformOrigin: "center center",
          transition: "opacity 200ms ease, transform 200ms ease",
          pointerEvents: expanded ? "auto" : "none",
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <p style={{ color: "white", fontSize: "13px", lineHeight: 1.6, textAlign: "left", margin: 0 }}>
          {back}
        </p>
      </div>
    </>
  );
}
