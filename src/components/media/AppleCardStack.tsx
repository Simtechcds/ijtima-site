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
  heightClass?: string; // e.g. "h-[460px] md:h-[520px]"
  autoPlay?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
};

export default function AppleCardStack({
  slides,
  className,
  heightClass = "h-[460px] md:h-[520px]",
  autoPlay = true,
  intervalMs = 4000,
  pauseOnHover = true,
}: Props) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const timer = useRef<number | null>(null);
  const count = slides.length;

  const order = useMemo(() => Array.from({ length: Math.min(count, 4) }, (_, i) => (active + i) % count), [active, count]);

  const next = () => setActive((a) => (a + 1) % count);
  const prev = () => setActive((a) => (a - 1 + count) % count);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const start = () => {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = window.setInterval(() => {
        if (pauseOnHover && hovered) return;
        if (document.visibilityState === "hidden") return;
        next();
      }, intervalMs);
    };
    start();
    const visHandler = () => document.visibilityState === "visible" && start();
    document.addEventListener("visibilitychange", visHandler);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
      document.removeEventListener("visibilitychange", visHandler);
    };
  }, [autoPlay, count, hovered, intervalMs, pauseOnHover]);

  // Simple swipe
  const onPointerDown = (e: React.PointerEvent) => setDragStartX(e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX == null) return;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    setDragStartX(null);
  };

  return (
    <section className={cn("w-full py-6 relative overflow-hidden", className)}>
      <div
        className={cn(
          "relative max-w-3xl md:max-w-4xl mx-auto",
          heightClass,
          "rounded-2xl"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Stack area */}
        <div
          className="absolute inset-0 select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {order.map((slideIndex, stackPos) => {
            const slide = slides[slideIndex];
            // stackPos: 0 (front), 1, 2, 3 (back / faint)
            const translateY = stackPos * 16; // 0,16,32,48
            const scale = 1 - stackPos * 0.03; // 1, .97, .94, .91
            const zIndex = 50 - stackPos * 5;
            const opacity = stackPos === 3 ? 0.65 : 1;

            return (
              <article
                key={`${slideIndex}-${stackPos}`}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-[92%] md:w-[75%] h-[82%] md:h-[85%] rounded-2xl overflow-hidden bg-card border border-border/60 shadow-2xl transition-all duration-500 ease-out",
                  stackPos === 0 ? "ring-1 ring-foreground/10" : ""
                )}
                style={{
                  transform: `translate(-50%, ${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  top: `calc(50% - ${Math.max(150 - stackPos * 10, 120)}px)`,
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={slide.title || slide.alt}
                onClick={() => stackPos === 0 && next()}
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

        {/* Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground border border-white/60 shadow hover:bg-background"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground shadow hover:opacity-90"
          >
            Next
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground border border-white/60 shadow hover:bg-background"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
