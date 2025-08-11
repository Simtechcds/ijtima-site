import { memo, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { mockAudioFeeds, mockCollections, mockConfig, mockEvents } from "@/data/mock";
import Seo from "@/components/Seo";

// Month-to-tone mapping (stable, no per-render regex allocations)
const MONTHS = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"] as const;
const TONES = [
  "bg-accent text-accent-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-muted text-muted-foreground",
  "bg-primary text-primary-foreground",
  "bg-destructive text-destructive-foreground",
] as const;
const getMonthClass = (label: string) => {
  const lower = label.toLowerCase();
  const idx = MONTHS.findIndex((m) => lower.includes(m));
  return TONES[(idx >= 0 ? idx : 2) % TONES.length];
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
        <li key={ev.id} className="event-card flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
          <div className={`pill px-3 py-2 ${getMonthClass(ev.dateLabel)} text-sm font-semibold min-w-[84px] text-center`}>
            {ev.dateLabel}
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{ev.title}</div>
              {ev.status === "TBC" ? (
                <Badge variant="muted" className="uppercase tracking-wide">TBC</Badge>
              ) : (
                <Badge variant="accent">Confirmed</Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">DATE: {ev.detailsDate ?? ev.dateLabel}</div>
            <div className="text-sm text-muted-foreground">VENUE: {ev.venue ?? ev.city}</div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/event/${ev.id}`} className="pressable"><Button size="sm" variant="secondary">Details</Button></Link>
            
          </div>
        </li>
      ))}
    </ul>
  );
});
UpcomingList.displayName = "UpcomingList";

const LiveNowCard = memo(({ feed }: { feed: (typeof mockAudioFeeds)[number] | undefined }) => {
  if (!feed?.is_live) return null;
  return (
    <article aria-live="polite" className="glass-surface p-4">
      <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Now Playing</h3>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold">
          {feed.title}
          <Badge variant="accent">LIVE</Badge>
        </div>
        <Link to="/live"><Button variant="default">Open Full Player</Button></Link>
      </div>
    </article>
  );
});
LiveNowCard.displayName = "LiveNowCard";

const LatestAudioList = memo(({ list }: { list: typeof mockAudioFeeds }) => (
  <ul className="space-y-2">
    {list.map((a) => (
      <li key={a.show_id} className="p-3 rounded-xl bg-secondary/50">
        <div className="font-medium">{a.title}</div>
        <div className="text-sm text-muted-foreground">{a.platform}</div>
      </li>
    ))}
  </ul>
));
LatestAudioList.displayName = "LatestAudioList";

const RegionsQuickLaunch = memo(() => (
  <section className="grid grid-cols-2 gap-3">
    <Link to="/south-africa" className="pressable"><div className="glass-surface p-4 text-center font-semibold">🇿🇦 South Africa</div></Link>
    <Link to="/international" className="pressable"><div className="glass-surface p-4 text-center font-semibold">🌍 International</div></Link>
  </section>
));
RegionsQuickLaunch.displayName = "RegionsQuickLaunch";

const FeaturedCollections = memo(() => (
  <section className="grid gap-3">
    {mockCollections.slice(0, 2).map((c) => (
      <Link to={`/collection/${c.id}`} key={c.id} className="pressable">
        <article className="glass-surface p-3 flex items-center gap-3">
          <img src={(c.id === "old-workers" || /ijtima/i.test(c.title)) ? "/lovable-uploads/3b7a5720-d209-4717-b9cf-19529c55872e.png" : c.cover} alt={`${c.title} cover`} className="w-16 h-16 rounded-lg object-cover" loading="lazy" />
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
  const latestAudio = useMemo(() => mockAudioFeeds.slice(0, 4), []);
  const firstFeed = mockAudioFeeds[0];

  return (
    <main className="space-y-6">
      <Seo title="Home — IJTIMA Collection" description="Upcoming events and latest audio streams." canonical="/" />
      <h1 className="sr-only">IJTIMA Collection — Events & Live Audio</h1>

      {/* Main glass card with segmented control */}
      <section className="glass-surface p-4">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "Upcoming" | "Latest")} className="w-full">
          <TabsList className="segmented w-full">
            <TabsTrigger value="Upcoming" className="seg flex-1">Upcoming</TabsTrigger>
            <TabsTrigger value="Latest" className="seg flex-1">Latest Audio</TabsTrigger>
          </TabsList>

          <TabsContent value="Upcoming" className="mt-4">
            <UpcomingList events={upcoming} />
          </TabsContent>

          <TabsContent value="Latest" className="mt-4">
            <div className="glass-surface p-0 overflow-hidden rounded-xl">
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

      {/* Featured Collections */}
      <FeaturedCollections />

      <p className="text-xs text-muted-foreground">Dates may change — refer to organisers.</p>
    </main>
  );
};

export default Index;
