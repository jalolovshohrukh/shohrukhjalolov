import Image from "next/image";
import type { Photo } from "@/lib/images";

type Props = {
  photo: Photo;
  title: string;
  label?: string;
  index?: string;
  priority?: boolean;
};

/** Full-bleed warm photo with a centered uppercase overlay title (Halston). */
export function ImagePanel({ photo, title, label, index, priority }: Props) {
  return (
    <div className="group relative h-[58vh] min-h-[380px] w-full overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-ink/30" />

      {label && (
        <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 border border-white/40 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/90">
          <span className="h-1 w-1 rounded-full bg-white" />
          {label}
        </span>
      )}

      <h3 className="overlay-title absolute inset-0 flex items-center justify-center px-6 text-center text-3xl md:text-5xl">
        {title}
      </h3>

      {index && (
        <span className="absolute bottom-5 right-5 font-mono text-xs text-white/70">
          {index}
        </span>
      )}
    </div>
  );
}
