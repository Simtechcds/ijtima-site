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
      // Accept any message from *.spreaker.com (widget or www)
      const isSpreaker = (() => {
        try { return /spreaker\.com$/i.test(new URL(event.origin).hostname); } catch { return false; }
      })();
      if (!isSpreaker) return;

      const data: SpreakerMessage = parseData(event.data);
      const evt = data?.event || data?.type || data?.sp_event || data?.name;
      const episode = data?.episode || data?.payload || data?.data || data?.current_episode || data?.track;
      const epTitle: string | undefined = episode?.title || data?.title || data?.episode_title;
      const epId: string | number | undefined = episode?.id || episode?.episode_id || data?.episode_id;

      if (!evt) return;

      const evtStr = String(evt).toLowerCase();
      if (evtStr.includes("play") || evtStr.includes("resume") || evtStr.includes("episode:changed") || evtStr.includes("track:changed")) {
        nowPlayingActions.play({ provider: "podcast", title: epTitle || "Podcast audio", sourceId: epId ? String(epId) : undefined });
      } else if (evtStr.includes("pause") || evtStr.includes("ended") || evtStr.includes("stop")) {
        nowPlayingActions.pause(epId ? String(epId) : undefined);
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
