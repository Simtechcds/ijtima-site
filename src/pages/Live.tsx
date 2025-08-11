import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";

const Live = () => {
  return (
    <main className="space-y-6">
      <Seo title="Live — IJTIMA Collection" description="Live stream player for events and programs." canonical="/live" />
      <h1 className="sr-only">IJTIMA Live Audio Stream</h1>
      <section className="glass-surface p-4">
        <div className="rounded-xl overflow-hidden">
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
        <small className="block mt-2 text-xs text-muted-foreground">
          <a href="https://mixlr.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
            IJTIMA.SITE is on Mixlr
          </a>
        </small>
        <div className="flex items-center justify-end mt-3">
          <Button variant="secondary">Continue in background</Button>
        </div>
      </section>
    </main>
  );
};

export default Live;
