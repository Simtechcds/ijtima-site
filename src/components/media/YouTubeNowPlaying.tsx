import { useEffect, useRef } from "react";
import { nowPlayingActions } from "@/store/nowPlaying";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytReadyPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (typeof window !== "undefined" && window.YT && window.YT.Player) {
    return Promise.resolve();
  }
  if (!ytReadyPromise) {
    ytReadyPromise = new Promise<void>((resolve) => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = () => resolve();
      document.head.appendChild(tag);
    });
  }
  return ytReadyPromise;
}

export default function YouTubeNowPlaying({ videoId, title }: { videoId: string; title?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let player: any;
    let mounted = true;

    loadYouTubeAPI().then(() => {
      if (!mounted || !containerRef.current) return;
      player = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: { rel: 0, playsinline: 1 },
        events: {
          onStateChange: (e: any) => {
            const state = e?.data;
            const YTPS = window.YT.PlayerState;
            if (state === YTPS.PLAYING) {
              const metaTitle = title || e?.target?.getVideoData?.()?.title || "YouTube";
              nowPlayingActions.play({ provider: "youtube", title: metaTitle, url: `https://www.youtube.com/watch?v=${videoId}`, sourceId: videoId });
            } else if (state === YTPS.PAUSED || state === YTPS.ENDED) {
              nowPlayingActions.pause(videoId);
            }
          },
        },
      });
    });

    return () => {
      mounted = false;
      try {
        player?.destroy?.();
      } catch {}
    };
  }, [videoId, title]);

  return <div ref={containerRef} className="w-full aspect-video rounded-md overflow-hidden" />;
}
