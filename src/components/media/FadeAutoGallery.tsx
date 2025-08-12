import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Slide = {
  src: string;
  alt: string;
  title?: string;
};

type Props = {
  slides: Slide[];
  className?: string;
  heightClass?: string; // e.g. "h-[520px] md:h-[560px]"
  intervalMs?: number;
};

export default function FadeAutoGallery({
  slides,
  className,
  heightClass = "h-[420px] sm:h-[460px] md:h-[520px] lg:h-[560px] xl:h-[600px]",
  intervalMs = 4000,
}: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <section className={cn("w-full py-6 relative", className)}>
      <div className={cn("relative mx-auto max-w-6xl md:max-w-7xl rounded-2xl overflow-hidden bg-muted", heightClass)}>
        {/* Slides */}
        {slides.map((s, i) => (
          <article
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === active ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
            role="group"
            aria-roledescription="slide"
            aria-label={s.title || s.alt}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-6 lg:p-8">
              <img
                src={s.src}
                alt={s.alt}
                className="w-full h-full object-contain"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                {s.title && (
                  <h3 className="text-white text-base md:text-xl font-medium drop-shadow">{s.title}</h3>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-5 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === active ? "bg-primary w-6" : "bg-muted-foreground/30 w-2.5"
            )}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
