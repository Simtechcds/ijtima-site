import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { mockAudioFeeds, mockCollections, mockConfig, mockEvents } from "@/data/mock";
import Seo from "@/components/Seo";

const Index = () => {
  const [tab, setTab] = useState(mockConfig.home_tabs_default);
  const upcoming = useMemo(() => mockEvents.slice(0, 3), []);
  const latestAudio = useMemo(() => mockAudioFeeds.slice(0, 4), []);
  const isLive = mockAudioFeeds[0]?.is_live;

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
            <ul className="space-y-3">
              {upcoming.map((ev) => (
                <li key={ev.id} className="event-card flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="pill px-3 py-2 bg-secondary text-sm font-semibold min-w-[84px] text-center">{ev.dateLabel}</div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">{ev.title}</div>
                        {ev.status === "TBC" ? (
                          <Badge variant="muted" className="uppercase tracking-wide">TBC</Badge>
                        ) : (
                          <Badge variant="accent">Confirmed</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{ev.city}</div>
                    </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/event/${ev.id}`} className="pressable"><Button size="sm" variant="secondary">Details</Button></Link>
                    <a href={ev.calendarUrl} target="_blank" rel="noreferrer" className="pressable"><Button size="sm" variant="outline">Add</Button></a>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="Latest" className="mt-4">
            <div className="space-y-3">
              {isLive && (
                <article aria-live="polite" className="glass-surface p-4">
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Now Playing</h3>
                  <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-semibold">
                        {mockAudioFeeds[0].title}
                        <Badge variant="accent">LIVE</Badge>
                      </div>
                      <Link to="/live"><Button variant="default">Open Full Player</Button></Link>
                  </div>
                </article>
              )}

              <ul className="space-y-2">
                {latestAudio.map((a) => (
                  <li key={a.show_id} className="p-3 rounded-xl bg-secondary/50">
                    <div className="font-medium">{a.title}</div>
                    <div className="text-sm text-muted-foreground">{a.platform}</div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Below the fold: Regions quick-launch */}
      <section className="grid grid-cols-2 gap-3">
        <Link to="/south-africa" className="pressable"><div className="glass-surface p-4 text-center font-semibold">🇿🇦 South Africa</div></Link>
        <Link to="/international" className="pressable"><div className="glass-surface p-4 text-center font-semibold">🌍 International</div></Link>
      </section>

      {/* Featured Collections */}
      <section className="grid gap-3">
        {mockCollections.slice(0, 2).map((c) => (
          <Link to={`/collection/${c.id}`} key={c.id} className="pressable">
            <article className="glass-surface p-3 flex items-center gap-3">
              <img src={c.cover} alt={`${c.title} cover`} className="w-16 h-16 rounded-lg object-cover" loading="lazy" />
              <div className="flex-1 text-left">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>

      <p className="text-xs text-muted-foreground">Dates may change — refer to organisers.</p>
    </main>
  );
};

export default Index;
