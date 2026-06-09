"use client";

export default function Navbar() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
      style={{
        height: "60px",
        background: "rgba(245,240,232,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(232,224,208,0.8)",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "1px solid rgba(232,224,208,0.8)",
      }}
    >
      <span
        className="font-display font-bold text-navy text-lg tracking-tight"
        style={{ color: "var(--navy)" }}
      >
        Chinmay Agrawal
      </span>

      <div className="flex items-center gap-3">
        <a
          href="https://drive.google.com/file/d/1u7NVto13puwl3Q1s2BmHUVFEVQzBFKW8/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-body font-medium px-4 py-1.5 rounded-full transition-colors whitespace-nowrap"
          style={{
            border: "1px solid var(--navy)",
            color: "var(--navy)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,46,74,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }}
        >
          Resume
        </a>
        <button
          onClick={scrollToContact}
          className="text-sm font-body font-medium px-4 py-1.5 rounded-full text-white transition-opacity hover:opacity-90 whitespace-nowrap"
          style={{ background: "var(--navy)" }}
        >
          Contact Me
        </button>
      </div>
    </nav>
  );
}
