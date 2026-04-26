export interface VideoClip {
  id: string;
  title: string;
  description: string;
  videoId: string;
  sourceUrl: string;
  channelTitle: string;
  publishedAt: string;
  relatedEventIds: string[];
  tags: string[];
  confidence: "high" | "medium" | "low";
}

export const featuredVideoClips: VideoClip[] = [
  {
    id: "clip_main_livestream",
    title: "Pełny stream: Diss na raka",
    description:
      "Główna transmisja Łatwoganga z licznikiem wpłat i większością wydarzeń opisanych w trackerze.",
    videoId: "UNAqqHIPbWA",
    sourceUrl: "https://www.youtube.com/live/UNAqqHIPbWA",
    channelTitle: "Łatwogang",
    publishedAt: "2026-04-17T00:00:00Z",
    relatedEventIds: ["evt_001"],
    tags: ["pełny_stream", "licznik", "fundacja"],
    confidence: "high",
  },
  {
    id: "clip_lewandowski_diss_na_raka",
    title: "Robert Lewandowski i Diss na Raka",
    description:
      "Krótki materiał związany z viralowym wątkiem Roberta Lewandowskiego i akcją Diss na raka.",
    videoId: "HG5POBYH5VQ",
    sourceUrl: "https://www.youtube.com/watch?v=HG5POBYH5VQ",
    channelTitle: "Igor Bartelik",
    publishedAt: "2026-04-24T13:40:28Z",
    relatedEventIds: ["evt_015", "evt_017b"],
    tags: ["lewandowski", "tiktok", "piłka_nożna"],
    confidence: "medium",
  },
  {
    id: "clip_60m_recap",
    title: "60 milionów zł dla dzieci z rakiem",
    description:
      "YouTube recap opisujący impet akcji w okolicach progu 60 mln PLN i medialne poruszenie wokół streamu.",
    videoId: "4gyB7DWh8q8",
    sourceUrl: "https://www.youtube.com/watch?v=4gyB7DWh8q8",
    channelTitle: "Inny Punkt",
    publishedAt: "2026-04-25T19:52:02Z",
    relatedEventIds: ["evt_048"],
    tags: ["60m", "recap", "viral"],
    confidence: "medium",
  },
  {
    id: "clip_ogien_serc",
    title: "Ogień Serc — fanowski utwór akcji",
    description:
      "Fanowski materiał muzyczny inspirowany akcją Cancer Fighters i piosenką Diss na raka, znaleziony przez YouTube API.",
    videoId: "m2fW_Ufxqco",
    sourceUrl: "https://www.youtube.com/watch?v=m2fW_Ufxqco",
    channelTitle: "Dzix-ON",
    publishedAt: "2026-04-26T14:52:13Z",
    relatedEventIds: [],
    tags: ["fan_video", "muzyka", "cancer_fighters"],
    confidence: "low",
  },
];
