import Image from "next/image";
import type { Img } from "@/lib/site";

type Props = {
  src: Img;
  alt: string;
  /** Shown inside the placeholder when no image is set. */
  label?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Image slot with a fixed aspect set by the caller (via className).
 * Static imports get a blur-up placeholder; a `null` src renders a quiet placeholder frame.
 */
export default function Frame({ src, alt, label, sizes, priority, className = "", imgClassName = "" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 [transform:translateZ(0)] ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          quality={80}
          className={`clean-img object-cover ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-end bg-[radial-gradient(120%_90%_at_80%_10%,var(--sea-soft)_0%,var(--paper-2)_55%,var(--paper-3)_100%)] p-5"
        >
          {label && <span className="label relative text-ink-dim/70">{label}</span>}
        </div>
      )}
    </div>
  );
}
