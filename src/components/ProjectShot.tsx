import Image from "next/image";

/**
 * A framed product screenshot used as a "receipt" in project detail pages.
 * Tall phone screenshots are capped by max-height so they stay tasteful in the
 * media column; the frame + caption read as evidence, not decoration.
 */
export default function ProjectShot({
  src,
  alt,
  width,
  height,
  caption,
  maxHeight = 560,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  maxHeight?: number;
}) {
  return (
    <figure className="flex flex-col items-center gap-2 m-0">
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "var(--surface)", maxHeight }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 90vw, 40vw"
          style={{ width: "auto", height: "auto", maxHeight, objectFit: "contain", display: "block" }}
        />
      </div>
      <figcaption
        className="font-body text-center"
        style={{ color: "var(--muted)", fontSize: "11px", lineHeight: 1.5, maxWidth: "280px" }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
