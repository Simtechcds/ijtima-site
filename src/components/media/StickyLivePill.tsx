import { Badge } from "@/components/ui/badge";
import { useNowPlaying } from "@/store/nowPlaying";

const StickyLivePill = () => {
  const np = useNowPlaying();

  if (!np.playing || !np.title) return null;

  const source = (() => {
    switch (np.provider) {
      case "live":
        return { label: "Live", variant: "accent" as const };
      case "youtube":
        return { label: "YouTube", variant: "destructive" as const };
      case "podcast":
        return { label: "Podcast", variant: "secondary" as const };
      default:
        return { label: "", variant: "muted" as const };
    }
  })();

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(720px,92%)] sm:w-[min(720px,92%)]"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <div className="glass-surface pill h-12 px-3 flex items-center justify-between gap-2 border border-white/60">
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-center sm:justify-start">
          <Badge variant="muted" className="px-2 py-1 text-[10px] sm:text-xs">Now Playing</Badge>
          {source.label && (
            <Badge variant={source.variant} className="px-2 py-1 text-[10px] sm:text-xs">{source.label}</Badge>
          )}
          <div className="text-xs sm:text-sm font-medium text-foreground/90 whitespace-nowrap truncate max-w-[60vw] text-center sm:text-left">
            {np.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyLivePill;
