"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Expand } from "lucide-react";

/**
 * Wraps any thumbnail in a click-to-expand lightbox. Reused everywhere images
 * appear as content so the behaviour is identical site-wide: click to open a
 * full-size modal, Escape / click-outside / close-button to dismiss, body
 * scroll locked while open.
 */
export default function Zoomable({
  src,
  alt,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand image: ${alt}`}
        className={`group relative block p-0 bg-transparent border-0 cursor-zoom-in ${className}`}
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ width: 26, height: 26, background: "rgba(12,12,16,0.72)", color: "#fff" }}
        >
          <Expand size={13} />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(12,12,16,0.86)", backdropFilter: "blur(2px)", zIndex: 200 }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ width: 40, height: 40, background: "rgba(255,255,255,0.12)", color: "#fff" }}
          >
            <X size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="cursor-zoom-out"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              borderRadius: 8,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </>
  );
}
