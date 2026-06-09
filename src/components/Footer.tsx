import { Link2, FileDown } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="px-8 md:px-16 py-4 flex flex-row flex-wrap items-center justify-between gap-3 relative z-10"
      style={{ background: "var(--navy)" }}
    >
      <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        © 2026 Chinmay Agrawal
      </span>
      <span
        className="font-display italic text-center"
        style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem" }}
      >
        Built to own the next messy problem.
      </span>
      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/chinmay-agrawal-ca02/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-body text-sm transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <Link2 size={14} />
          LinkedIn
        </a>
        <a
          href="https://drive.google.com/file/d/1u7NVto13puwl3Q1s2BmHUVFEVQzBFKW8/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-body text-sm transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <FileDown size={14} />
          Resume
        </a>
      </div>
    </footer>
  );
}
