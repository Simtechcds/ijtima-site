import { useMemo, useState } from "react";
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
  heightClass?: string; // e.g. "h-[500px]"
  heading?: string;
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
  heightClass = "h-[500px]",
  heading,
}: Props) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  const ordered = useMemo(() => slides.map((s, i) => ({ ...s, index: i })), [slides]);

  const goPrev = () => setActive((a) => (a - 1 + count) % count);
  const goNext = () => setActive((a) => (a + 1) % count);

  return (
    <section className={cn("w-full py-8 relative overflow-hidden", className)} aria-label={heading || "3D Perspective Gallery"}>
      {heading && (
        <h2 className="text-2xl font-bold mb-6 text-center">{heading}</h2>
      )}

      <div className={cn("relative max-w-5xl mx-auto", heightClass, "[perspective:1200px]")}>        
        <div className="absolute inset-0 flex items-center justify-center">
          {ordered.map((slide, i) => {
            const d = shortestSignedDistance(i, active, count);

            // Positioning for 3D depth
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (d === 0) {
              translateX = 0;
              translateZ = 0;
              rotateY = 0;
              scale = 1;
              opacity = 1;
              zIndex = 50;
            } else if (d === -1) {
              translateX = -220;
              translateZ = -180;
              rotateY = 12;
              scale = 0.92;
              opacity = 0.9;
              zIndex = 45;
            } else if (d === 1) {
              translateX = 220;
              translateZ = -180;
              rotateY = -12;
              scale = 0.92;
              opacity = 0.9;
              zIndex = 45;
            } else if (d === -2) {
              translateX = -360;
              translateZ = -320;
              rotateY = 18;
              scale = 0.86;
              opacity = 0.6;
              zIndex = 40;
            } else if (d === 2) {
              translateX = 360;
              translateZ = -320;
              rotateY = -18;
              scale = 0.86;
              opacity = 0.6;
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
                  "absolute w-[72%] md:w-[60%] h-[80%] rounded-xl overflow-hidden shadow-xl transition-all duration-700 ease-out will-change-transform [transform-style:preserve-3d]",
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
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white text-xl font-medium drop-shadow">{slide.title}</h3>
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
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors border border-white/60"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors border border-white/60"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
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
