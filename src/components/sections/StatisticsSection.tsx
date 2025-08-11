import React, { useEffect, useMemo, useRef, useState } from "react";

// Reusable count-up component that triggers when visible
function useOnScreen<T extends Element>(ref: React.RefObject<T>, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin, threshold: 0.2 }
    );
    observer.observe(current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

const CountUp: React.FC<{ end: number; duration?: number; className?: string }> = ({ end, duration = 1600, className }) => {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const visible = useOnScreen(nodeRef);

  useEffect(() => {
    if (started.current || !visible) return;
    started.current = true;
    const start = performance.now();
    const startVal = 0;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = Math.round(startVal + (end - startVal) * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, visible]);

  const formatted = useMemo(() => value.toLocaleString(), [value]);
  return (
    <span ref={nodeRef} className={className} aria-live="polite">
      {formatted}
    </span>
  );
};

const StatisticsSection: React.FC = () => {
  const stats = [
    { value: 50, label: "Deep Brown Legacy", bg: "stat-brown" },
    { value: 109, label: "Olive Khaki Milestones", bg: "stat-olive" },
    { value: 7108, label: "Slate Gray Gatherings", bg: "stat-slate" },
    { value: 26743, label: "Plum Hours of Service", bg: "stat-plum" },
  ];

  return (
    <section aria-labelledby="stats-title" className="relative isolate w-full overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/lovable-uploads/8d46ab27-2599-4203-9df2-e51015e29b6c.png"
          alt="Historic world map silhouette used as Ijtima background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/60" aria-hidden="true" />
      </div>

      <div className="container py-12 md:py-14 lg:py-16">
        <header className="mb-6 md:mb-8 text-center">
          <h2 id="stats-title" className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-xl">
            Ijtima Overview Insights
          </h2>
          <p className="mt-2 max-w-3xl mx-auto text-base md:text-lg text-muted-foreground drop-shadow">
            Preserving the Heritage and Legacy of Ijtimas in South Africa and Beyond
          </p>
        </header>

        {/* Stats grid in rounded panel */}
        <div className="mx-auto w-[min(1100px,92%)]">
          <div className="glass-surface hairline rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {stats.map((s) => (
                <article
                  key={s.label}
                  className={`${s.bg} hairline rounded-2xl backdrop-blur-md shadow-lg p-4 sm:p-6 lg:p-8 text-center animate-fade-in`}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground">
                    <CountUp end={s.value} />
                  </div>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-foreground/90">
                    {s.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
