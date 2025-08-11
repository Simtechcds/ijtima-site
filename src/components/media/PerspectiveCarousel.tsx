import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = {
  src: string;
  alt: string;
  title?: string;
};

type Props = {
  slides: Slide[];
  className?: string;
  heightClass?: string; // responsive height
  autoPlay?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
};

function shortestSignedDistance(i: number, active: number, n: number) {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

export default function PerspectiveCarousel({
  slides,
  className,
  heightClass = "h-[420px] md:h-[520px]",
  autoPlay = true,
  intervalMs = 3500,
  pauseOnHover = true,
}: Props) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const count = slides.length;
  const timer = useRef<number | null>(null);

  const ordered = useMemo(() => slides.map((s, i) => ({ ...s, index: i })), [slides]);

  const goPrev = () => setActive((a) => (a - 1 + count) % count);
  const goNext = () => setActive((a) => (a + 1) % count);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;

    const start = () => {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = window.setInterval(() => {
        if (pauseOnHover && hovered) return;
        if (document.visibilityState === "hidden") return;
        setActive((a) => (a + 1) % count);
      }, intervalMs);
    };

    start();
    const visHandler = () => {
      if (document.visibilityState === "visible") start();
    };
    document.addEventListener("visibilitychange", visHandler);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
      document.removeEventListener("visibilitychange", visHandler);
    };
  }, [autoPlay, intervalMs, count, hovered, pauseOnHover]);

  return (
    <section className={cn("w-full py-6 relative overflow-hidden", className)}>
      {/* Stage */}
      <div
        className={cn(
          "relative max-w-5xl mx-auto rounded-2xl px-4 md:px-6 pb-2",
          heightClass,
          "[perspective:1200px]"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Soft stage background to make it neat */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-background/50 to-background/70 backdrop-blur-sm" />
        {/* Side vignettes to tidy edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background/80 to-transparent rounded-l-2xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background/80 to-transparent rounded-r-2xl" />

        {/* Slides */}
        <div className="absolute inset-0 flex items-center justify-center">
          {ordered.map((slide, i) => {
            const d = shortestSignedDistance(i, active, count);

            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (d === 0) {
              zIndex = 50;
            } else if (d === -1) {
              translateX = -190;
              translateZ = -160;
              rotateY = 10;
              scale = 0.94;
              opacity = 0.95;
              zIndex = 45;
            } else if (d === 1) {
              translateX = 190;
              translateZ = -160;
              rotateY = -10;
              scale = 0.94;
              opacity = 0.95;
              zIndex = 45;
            } else if (d === -2) {
              translateX = -300;
              translateZ = -280;
              rotateY = 16;
              scale = 0.86;
              opacity = 0.55;
              zIndex = 40;
            } else if (d === 2) {
              translateX = 300;
              translateZ = -280;
              rotateY = -16;
              scale = 0.86;
              opacity = 0.55;
              zIndex = 40;
            } else {
              opacity = 0;
              zIndex = 20;
            }

            const transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

            return (
              <article
                key={slide.index}
                className={cn(
                  "absolute w-[88%] md:w-[62%] h-[78%] md:h-[80%] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out will-change-transform [transform-style:preserve-3d] bg-card border border-border/60",
                  d === 0 ? "ring-1 ring-foreground/10" : ""
                )}
                style={{ transform, opacity, zIndex }}
                role="group"
                aria-roledescription="slide"
                aria-label={slide.title || slide.alt}
              >
                <div className="relative w-full h-full">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <h3 className="text-white text-base md:text-xl font-medium drop-shadow">{slide.title}</h3>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-[60] grid place-items-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-background/70 text-foreground hover:bg-background transition-colors border border-white/60 shadow"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-[60] grid place-items-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-background/70 text-foreground hover:bg-background transition-colors border border-white/60 shadow"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
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
