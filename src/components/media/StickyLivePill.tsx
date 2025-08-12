import { Badge } from "@/components/ui/badge";
import { useNowPlaying } from "@/store/nowPlaying";

const StickyLivePill = () => {
  const np = useNowPlaying();

  if (!np.playing || !np.title) return null;

  const sourceBadge = (() => {
    switch (np.provider) {
      case "podcast":
        return (
          <Badge variant="saffron" className="px-2 py-1 text-[10px] sm:text-xs">NOW PLAYING</Badge>
        );
      case "live":
        return (
          <Badge variant="accent" className="px-2 py-1 text-[10px] sm:text-xs">LIVE</Badge>
        );
      case "youtube":
        return (
          <Badge variant="destructive" className="px-2 py-1 text-[10px] sm:text-xs">YouTube</Badge>
        );
      default:
        return null;
    }
  })();

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(720px,92%)] sm:w-[min(720px,92%)]"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <div className="glass-surface pill h-12 px-3 flex items-center justify-between gap-2 border border-white/60">
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-center sm:justify-start">
          {sourceBadge}
          <div className="text-xs sm:text-sm font-medium text-foreground/90 whitespace-nowrap truncate max-w-[60vw] text-center sm:text-left">
            {np.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyLivePill;
