"use client";
import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Loom video embed with a loading placeholder, matched to VideoEmbed's look.
 * `start` optionally trims the opening seconds (Loom honours ?t=<seconds>).
 */
export default function LoomEmbed({
  loomId,
  start,
  title = "System walkthrough",
}: {
  loomId: string;
  start?: number;
  title?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.loom.com/embed/${loomId}${start ? `?t=${start}` : ""}`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/10",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#e8e4dc",
        border: "1px solid var(--border)",
      }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" aria-hidden="true">
          <div
            className="embed-pulse flex items-center justify-center rounded-full"
            style={{ width: 48, height: 48, background: "rgba(26,46,74,0.12)" }}
          >
            <Play size={20} style={{ color: "var(--navy)", marginLeft: 2 }} />
          </div>
          <p className="font-body text-xs" style={{ color: "var(--muted)", letterSpacing: "0.04em" }}>
            Loading walkthrough…
          </p>
        </div>
      )}
      <iframe
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        allowFullScreen
        onLoad={() => setLoaded(true)}
        title={title}
      />
    </div>
  );
}
