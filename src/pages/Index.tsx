import { memo, useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { mockCollections, mockConfig, mockEvents } from "@/data/mock";
import Seo from "@/components/Seo";
import zaFlag from "@/assets/flags/za.svg";
import worldGlobe from "@/assets/flags/world.svg";
import { ChevronDown } from "lucide-react";
import FadeAutoGallery from "@/components/media/FadeAutoGallery";
import { nowPlayingActions } from "@/store/nowPlaying";

// Month badge mapping using design tokens (CSS classes)
const MONTH_CLASS_MAP = {
  jan: "month-jan",
  feb: "month-feb",
  mar: "month-mar",
  apr: "month-apr",
  may: "month-may",
  jun: "month-jun",
  jul: "month-jul",
  aug: "month-aug",
  sep: "month-sep",
  oct: "month-oct",
  nov: "month-nov",
  dec: "month-dec",
} as const;
const getMonthClass = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes("tbc")) return "month-tbc";
  const key = (Object.keys(MONTH_CLASS_MAP) as Array<keyof typeof MONTH_CLASS_MAP>).find((m) => lower.includes(m));
  return key ? MONTH_CLASS_MAP[key] : "month-tbc";
};

// Subcomponents (memoized) — keeps Home fast and reliable
const UpcomingList = memo(({ events }: { events: typeof mockEvents }) => {
  if (!events?.length) {
    return (
      <div className="glass-surface p-4 text-sm text-muted-foreground">No upcoming events available.</div>
    );
  }
  return (
    <ul className="space-y-3">
      {events.map((ev) => (
        <li id={`ev-${ev.id}`} key={ev.id} className="event-card flex flex-col md:flex-row items-start md:items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
          <div className={`pill px-3 py-2 border border-foreground/90 ${getMonthClass(ev.dateLabel)} text-sm font-semibold min-w-[84px] text-center self-center md:self-auto`}>
            {ev.dateLabel}
          </div>
          <div className="flex-1 text-left w-full mt-2 md:mt-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="font-semibold">{ev.title}</div>
              {ev.region === "SA" && (
                <img
                  src={zaFlag}
                  alt="South Africa flag"
                  className="h-4 w-4 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <div className="text-sm text-muted-foreground">DATE: {ev.detailsDate ?? ev.dateLabel}</div>
            <div className="text-sm text-muted-foreground">VENUE: {ev.venue ?? ev.city}</div>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0 w-full md:w-auto justify-center md:justify-start">
            <Link to={`/event/${ev.id}`} className="pressable"><Button size="smWide" variant="outlineBright">Details</Button></Link>
            
          </div>
        </li>
      ))}
    </ul>
  );
});
UpcomingList.displayName = "UpcomingList";


const RegionsQuickLaunch = memo(() => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <Link to="/south-africa" className="pressable">
      <div className="glass-surface module-frame p-4 text-center font-semibold">
        <span className="inline-flex items-center justify-center gap-2">
          <img src={zaFlag} alt="South Africa flag" className="h-6 w-6 rounded-full object-cover" loading="lazy" decoding="async" />
          <span>South Africa</span>
        </span>
      </div>
    </Link>
    <Link to="/international" className="pressable">
      <div className="glass-surface module-frame p-4 text-center font-semibold">
        <span className="inline-flex items-center justify-center gap-2">
          <img src={worldGlobe} alt="International world globe" className="h-6 w-6 rounded-full object-cover" loading="lazy" decoding="async" />
          <span>International</span>
        </span>
      </div>
    </Link>
  </section>
));
RegionsQuickLaunch.displayName = "RegionsQuickLaunch";

const FeaturedCollections = memo(() => (
  <section className="grid gap-3">
    {mockCollections.slice(0, 2).map((c) => (
      <Link to={`/collection/${c.id}`} key={c.id} className="pressable">
        <article className="glass-surface module-frame p-3 flex items-center gap-3">
          <img src={(c.id === "old-workers" || /ijtima/i.test(c.title)) ? "/lovable-uploads/3b7a5720-d209-4717-b9cf-19529c55872e.png" : c.cover} alt={`${c.title} cover`} className="w-16 h-16 rounded-lg object-cover" loading="lazy" decoding="async" />
          <div className="flex-1 text-left">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.description}</p>
          </div>
        </article>
      </Link>
    ))}
  </section>
));
FeaturedCollections.displayName = "FeaturedCollections";

const Index = () => {
  const [tab, setTab] = useState(mockConfig.home_tabs_default);
  const upcoming = useMemo(() => mockEvents.slice(0, 3), []);
  const [liveOpen, setLiveOpen] = useState(false);
  const slides = useMemo(
    () => [
      {
        src: "/lovable-uploads/52e60509-f8e2-4dfc-ae17-627c6a5fc34a.png",
        alt: "Quote: The purpose of ijtima...",
        title: "Awakening Hearts",
      },
      {
        src: "/lovable-uploads/4ef2493c-e68d-4a99-a15f-5cf41bfcc9b5.png",
        alt: "Quote banner - purpose of ijtima",
        title: "Purpose of Ijtima",
      },
      {
        src: "/lovable-uploads/d6a843b3-c1ec-48f4-a83e-54dc4ab4d047.png",
        alt: "Ijtima is a spiritual gathering...",
        title: "Spiritual Gathering",
      },
      {
        src: "/lovable-uploads/7b1ded13-79f6-4e14-b861-f0156905ba69.png",
        alt: "Sincerity is the cornerstone...",
        title: "Sincerity & Barakah",
      },
      {
        src: "/lovable-uploads/6f779a33-58ec-4871-9017-30dc5969d926.png",
        alt: "Ijtima gathering of hearts...",
        title: "Gathering of Hearts",
      },
    ],
    []
  );

  useEffect(() => {
    if (location.hash && location.hash.startsWith("#ev-")) {
      setTab("Upcoming");
      requestAnimationFrame(() => {
        const el = document.querySelector(location.hash) as HTMLElement | null;
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <main className="space-y-6">
      <Seo title="Home — IJTIMA Collection" description="Upcoming events and latest audio streams." canonical="/" />
      <h1 className="sr-only">IJTIMA Collection — Events & Live Audio</h1>

      {/* Live stream embed (collapsible) */}
      <section className="glass-surface module-frame p-4">
        <div className="flex justify-center md:justify-start">
          <div
            role="button"
            aria-expanded={liveOpen}
            aria-controls="live-embed"
            onClick={() => setLiveOpen((v) => !v)}
            className="inline-flex items-center justify-center gap-2 pill px-3 py-2 module-frame bg-secondary/60 hover:bg-secondary/70 cursor-pointer select-none transition-colors"
          >
            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-semibold">
              LIVE
            </span>
            <span className="text-sm text-foreground/90 font-medium">Stream</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${liveOpen ? "rotate-180" : "rotate-0"}`}
              aria-hidden="true"
            />
          </div>
        </div>
        {liveOpen && (
          <div id="live-embed" className="mt-3 rounded-xl overflow-hidden" onPointerDown={() => nowPlayingActions.play({ provider: "live", title: "Live stream", url: "https://ijtima.mixlr.com/embed" })}>
            <iframe
              src="https://ijtima.mixlr.com/embed"
              width="100%"
              height="200"
              title="IJTIMA Live Audio — Mixlr Player"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
            />
          </div>
        )}
        <small className="block mt-2 text-xs text-muted-foreground text-center md:text-left">
          <a href="https://mixlr.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            IJTIMA.SITE is on Mixlr
          </a>
        </small>
      </section>

      {/* Main glass card with segmented control */}
      <section className="glass-surface module-frame p-4">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "Upcoming" | "Latest")} className="w-full">
          <TabsList className="segmented w-full">
            <TabsTrigger value="Upcoming" className="seg flex-1">Upcoming</TabsTrigger>
            <TabsTrigger value="Latest" className="seg flex-1">Latest Audio</TabsTrigger>
          </TabsList>

          <TabsContent value="Upcoming" className="mt-4">
            <UpcomingList events={upcoming} />
            <p className="mt-3 text-xs text-muted-foreground"> ** Dates are subject to change — please verify closer to the time</p>
          </TabsContent>

          <TabsContent value="Latest" className="mt-4">
            <div className="glass-surface p-0 overflow-hidden rounded-xl" onPointerDown={() => nowPlayingActions.play({ provider: "podcast", title: "Latest audio — Spreaker", url: "https://widget.spreaker.com/player?show_id=6705342" })}>
              <iframe
                src="https://widget.spreaker.com/player?show_id=6705342&theme=light&playlist=show&playlist-continuous=false&chapters-image=true&episode_image_position=right&hide-logo=false&hide-likes=false&hide-comments=false&hide-sharing=false&hide-download=true"
                width="100%"
                height="350"
                title="Overport Ijtima 2025"
                frameBorder="0"
                loading="lazy"
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Below the fold: Regions quick-launch */}
      <RegionsQuickLaunch />

      <FadeAutoGallery slides={slides} heightClass="h-[260px] sm:h-[360px] md:h-[480px] lg:h-[540px] xl:h-[580px]" />

      {/* Featured Collections */}
      <FeaturedCollections />

      
    </main>
  );
};

export default Index;
