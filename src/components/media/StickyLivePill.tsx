import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { mockAudioFeeds } from "@/data/mock";

const StickyLivePill = () => {
  const feed = mockAudioFeeds[0];
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(feed.is_live);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(720px,92%)] sm:w-[min(720px,92%)]" style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}>
      <div className="glass-surface pill h-12 px-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`pill px-2 py-1 text-xs font-bold ${feed.is_live ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
            {feed.is_live ? "LIVE" : "Next"}
          </span>
          <div className="text-sm">
            {feed.is_live ? feed.title : `Next Live: ${feed.next_label}`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
            {playing ? "Pause" : "Play"}
          </Button>
          <Button size="sm" onClick={() => setOpen(true)}>Open Full Player</Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[70vh]">
          <SheetHeader>
            <SheetTitle>Live Player</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="aspect-video w-full bg-secondary rounded-md grid place-items-center">Stream Embed</div>
            <div className="flex items-center justify-between">
              <Button variant="secondary" onClick={() => setOpen(false)}>Continue in background</Button>
              <a href={feed.live_url} target="_blank" rel="noreferrer">
                <Button>Open External</Button>
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default StickyLivePill;
