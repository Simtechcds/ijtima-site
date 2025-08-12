import { useSyncExternalStore } from "react";

export type NowPlayingProvider = "live" | "youtube" | "podcast";

export type NowPlayingState = {
  playing: boolean;
  provider: NowPlayingProvider | null;
  title: string | null;
  url?: string | null;
  sourceId?: string | null;
  startedAt?: number | null;
};

const state: NowPlayingState = {
  playing: false,
  provider: null,
  title: null,
  url: null,
  sourceId: null,
  startedAt: null,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export const nowPlayingActions = {
  play(input: { provider: NowPlayingProvider; title: string; url?: string | null; sourceId?: string | null }) {
    state.playing = true;
    state.provider = input.provider;
    state.title = input.title;
    state.url = input.url ?? null;
    state.sourceId = input.sourceId ?? null;
    state.startedAt = Date.now();
    notify();
  },
  pause(sourceId?: string | null) {
    // Only pause if no sourceId provided or it matches the current one
    if (!sourceId || state.sourceId === sourceId) {
      state.playing = false;
      notify();
    }
  },
  clear() {
    state.playing = false;
    state.provider = null;
    state.title = null;
    state.url = null;
    state.sourceId = null;
    state.startedAt = null;
    notify();
  },
  setTitle(title: string) {
    state.title = title;
    notify();
  },
};

function getSnapshot(): NowPlayingState {
  return { ...state };
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function useNowPlaying() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
