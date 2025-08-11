export interface EventItem { id: string; title: string; region: "SA" | "International"; city: string; venue_map_link: string; start_date: string; end_date?: string; status: "Confirmed" | "TBC"; poster?: string; notes_md?: string; attachments?: string[]; related_audio_show_id?: string; }
export interface AudioFeed { platform: string; show_id: string; title: string; cover: string; is_live: boolean; live_url: string; next_label?: string; }
export interface Collection { id: string; title: string; region: "SA" | "International"; cover: string; description: string; type: string; youtube_playlist_url?: string; years?: number[] }

export const mockEvents: (EventItem & { dateLabel: string; calendarUrl: string })[] = [
  { id: "sa-jor-2025", title: "SA Ulama & 4 Monthers Jor", region: "SA", city: "Gauteng", venue_map_link: "#", start_date: "2025-10-03", end_date: "2025-10-05", status: "TBC", dateLabel: "3–5 Oct 2025", calendarUrl: "#" },
  { id: "wc-ijtima-2025", title: "Western Cape Ijtima", region: "SA", city: "Cape Town", venue_map_link: "https://maps.google.com/?q=721+Springfield+Road,+Philippi+Markaz+Nurul+Huda,+Cape+Town", start_date: "2025-12-12", end_date: "2025-12-14", status: "TBC", dateLabel: "12–14 Dec 2025", calendarUrl: "#" },
  { id: "ec-ijtima-tbc", title: "Eastern Cape Ijtima", region: "SA", city: "Eastern Cape", venue_map_link: "#", start_date: "2025-12-31", status: "TBC", dateLabel: "TBC", calendarUrl: "#" },
];

export const mockAudioFeeds: AudioFeed[] = [
  { platform: "Mixlr", show_id: "mixlr-1", title: "Live Bayaan — Cape Town", cover: "/lovable-uploads/82f80df7-e56d-4b4a-8a87-06bbe9c95483.png", is_live: false, live_url: "https://mixlr.com", next_label: "11 Aug • 14:00" },
  { platform: "Spreaker", show_id: "sp-1", title: "Recording — Durban Program", cover: "/lovable-uploads/82f80df7-e56d-4b4a-8a87-06bbe9c95483.png", is_live: false, live_url: "https://spreaker.com" },
  { platform: "Mixlr", show_id: "mixlr-2", title: "Jumu'ah — Johannesburg", cover: "/lovable-uploads/82f80df7-e56d-4b4a-8a87-06bbe9c95483.png", is_live: false, live_url: "https://mixlr.com" },
  { platform: "Spreaker", show_id: "sp-2", title: "Talk — Port Elizabeth", cover: "/lovable-uploads/82f80df7-e56d-4b4a-8a87-06bbe9c95483.png", is_live: false, live_url: "https://spreaker.com" },
];

export const mockCollections: Collection[] = [
  { id: "sa-ijtima", title: "SA Ijtima Collection", region: "SA", cover: "/lovable-uploads/79e43d92-6f74-4853-9fb4-6100a86bc227.png", description: "A curated set of audios and videos from South Africa's Ijtimas.", type: "Audio+Video", youtube_playlist_url: "https://youtube.com/playlist?list=xyz", years: [2025, 2024, 2023] },
  { id: "old-workers", title: "Old Workers Collection", region: "SA", cover: "/lovable-uploads/79e43d92-6f74-4853-9fb4-6100a86bc227.png", description: "Historic recordings and playlists of Old Workers programs.", type: "Audio", years: [2025, 2024] },
  { id: "raiwind", title: "Raiwind Ijtima", region: "International", cover: "/lovable-uploads/79e43d92-6f74-4853-9fb4-6100a86bc227.png", description: "Raiwind programs and playlists.", type: "Video", years: [2024, 2023] },
];

export const mockConfig = {
  home_tabs_default: "Upcoming" as "Upcoming" | "Latest",
  event_mode: false,
  links: { stats_url: "#", livestream_url: "/live" },
};
