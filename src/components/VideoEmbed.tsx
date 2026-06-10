"use client";
import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Google Drive video embed with a loading placeholder.
 * The iframe stays transparent until its document paints, so without this the
 * area reads as a blank hole on slow connections.
 */
export default function VideoEmbed({ videoId }: { videoId: string }) {
  const [loaded, setLoaded] = useState(false);

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
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          aria-hidden="true"
        >
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
        src={`https://drive.google.com/file/d/${videoId}/preview`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        allow="autoplay; fullscreen"
        onLoad={() => setLoaded(true)}
        title="Automation walkthrough video"
      />
    </div>
  );
}
