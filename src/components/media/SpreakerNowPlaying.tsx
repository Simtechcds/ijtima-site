import { useEffect, useRef } from "react";
import { nowPlayingActions } from "@/store/nowPlaying";

type SpreakerMessage = any;

function parseData(raw: any): any {
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return raw; }
  }
  return raw;
}

export default function SpreakerNowPlaying({ src, height = 350 }: { src: string; height?: number }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!iframeRef.current) return;
      const fromIframe = event.source === iframeRef.current.contentWindow;
      const fromSpreaker = typeof event.origin === "string" && /spreaker\.com$/i.test(new URL(event.origin).hostname);
      if (!fromIframe || !fromSpreaker) return;

      const data: SpreakerMessage = parseData(event.data);
      const evt = data?.event || data?.type || data?.sp_event;
      const episode = data?.episode || data?.payload || data?.data;
      const epTitle = episode?.title || data?.title;
      const epId = episode?.id || episode?.episode_id || data?.episode_id;

      if (!evt) return;

      if (evt === "play" || evt === "resume" || evt === "episode:changed" || evt === "track:changed") {
        nowPlayingActions.play({ provider: "podcast", title: epTitle || "Podcast", sourceId: epId ?? undefined });
      } else if (evt === "pause" || evt === "ended" || evt === "stop") {
        nowPlayingActions.pause(epId ?? undefined);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      width="100%"
      height={height}
      title="Spreaker Podcast Player"
      frameBorder={0}
      loading="lazy"
    />
  );
}
