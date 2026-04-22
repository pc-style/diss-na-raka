// Seed data hydrated from research/ai-studio-export-2026-04-22.md
// Initial UI state. Later: swap for server/WS-backed source
// (OCR worker -> NoSQL -> SSE/WebSocket).

export type MilestoneStatus = "achieved" | "pending" | "failed";

export interface Milestone {
  id: string;
  targetAmount: number;
  title: string;
  description: string;
  status: MilestoneStatus;
  dateAchieved: string | null;
}

export type EventCategory =
  | "core_event"
  | "milestone_execution"
  | "guest_appearance"
  | "endurance_challenge"
  | "scheduled_appearance";

export interface TimelineEvent {
  id: string;
  dateLocal: string;
  relativeTime: string;
  participants: string[];
  category: EventCategory;
  description: string;
  tags: string[];
}

export interface DashboardState {
  metadata: {
    hostId: string;
    beneficiary: string;
    startTimestampUtc: string;
    lastUpdatedUtc: string;
    platform: string;
    channelId: string;
    donationUrl: string;
    songUrl: string;
    trackTitle: string;
    trackArtists: string[];
    trackLengthSeconds: number;
  };
  totalRaisedPln: number;
  hoursElapsed: number;
  estimatedTotalLoops: number;
  engagement: {
    averageConcurrentViewers: number;
    newSubscribersDuringEvent: number;
    totalViewsGenerated: number;
  };
  velocity: {
    averagePlnPerHour: number;
    milestoneVelocity: { label: string; hours: number }[];
  };
}

export const dashboard: DashboardState = {
  metadata: {
    hostId: "latwogang_official",
    beneficiary: "Fundacja Cancer Fighters",
    startTimestampUtc: "2026-04-17T00:00:00Z",
    lastUpdatedUtc: "2026-04-22T22:00:00Z",
    platform: "YouTube Live",
    channelId: "UCjpBbH8NmL4XHVUgJurDPZg",
    donationUrl: "https://tipply.pl/@latwogang",
    songUrl: "https://www.youtube.com/watch?v=d-kldWAQBzk",
    trackTitle: "Ciągle tutaj jestem (diss na raka)",
    trackArtists: ["Bedoes 2115", "Maja Mecan", "Cancer Fighters"],
    trackLengthSeconds: 165,
  },
  // Approaching 5M — Doda helping push toward the piątka. Will be
  // overwritten by the real OCR feed once that pipeline is live.
  totalRaisedPln: 4_850_000,
  hoursElapsed: 142,
  estimatedTotalLoops: 3_098,
  engagement: {
    averageConcurrentViewers: 19_000,
    newSubscribersDuringEvent: 17_000,
    totalViewsGenerated: 2_480_000,
  },
  velocity: {
    averagePlnPerHour: 24_647.88,
    milestoneVelocity: [
      { label: "500 000", hours: 48 },
      { label: "1 000 000", hours: 60 },
      { label: "3 000 000", hours: 130 },
    ],
  },
};

export const milestones: Milestone[] = [
  {
    id: "ms_30k_launch",
    targetAmount: 30_000,
    title: "Cel startowy 30k",
    description: `Oficjalny cel na starcie 9-dniowego maratonu — 200 godzin streamu pod utwór w pętli. Przekroczony w kilka godzin.`,
    status: "achieved",
    dateAchieved: "2026-04-17T04:00:00Z",
  },
  {
    id: "ms_500k_tattoo",
    targetAmount: 500_000,
    title: "Tatuaż Bedoesa + gang łysych",
    description: `Bedoes robi tatuaż wybrany przez widzów. Dołącza do niego ekipa Brokies i Dajczman — głowy, brody i wąsy idą pod maszynkę w solidarności.`,
    status: "achieved",
    dateAchieved: "2026-04-19T14:00:00Z",
  },
  {
    id: "ms_1_5m_gang",
    targetAmount: 1_500_000,
    title: `1,5M — moment „gang łysych”`,
    description: `Po około 3 dobach na liczniku jest już 1,5M. Bedoes kończy serię tatuaży; w studio powstaje wiral o „gangu łysych".`,
    status: "achieved",
    dateAchieved: "2026-04-20T18:00:00Z",
  },
  {
    id: "ms_2_3m_szpaku",
    targetAmount: 2_300_000,
    title: "Szpaku rzuca warunek 3M",
    description: `Przy 2,3M PLN Szpaku deklaruje: zagra live koncert, ale dopiero kiedy licznik przebije 3 miliony.`,
    status: "achieved",
    dateAchieved: "2026-04-21T16:00:00Z",
  },
  {
    id: "ms_2_8m_bambi",
    targetAmount: 2_800_000,
    title: "Bambi wchodzi w album",
    description: `Bambi pojawia się w studio, odmawia golenia, ale jej producent Francis zostaje łysy. Deklaruje udział w projekcie albumu „diss na raka".`,
    status: "achieved",
    dateAchieved: "2026-04-22T02:00:00Z",
  },
  {
    id: "ms_3m_szpaku_heads",
    targetAmount: 3_000_000,
    title: "3M · Szpaku + 17 głów i 9 tatuaży",
    description: `Licznik przebija 3M PLN — Szpaku realizuje obietnicę koncertu, a w studio zliczają już 17 ogolonych głów i 9 tatuaży zaprojektowanych przez Maję Mecan.`,
    status: "achieved",
    dateAchieved: "2026-04-22T10:00:00Z",
  },
  {
    id: "ms_4m_oki",
    targetAmount: 4_000_000,
    title: "Oki × Kinny Zimmer — koniec beefu",
    description: `Przy 4M PLN Oki i Kinny Zimmer oficjalnie kończą swój beef live na streamie. Oki zostawia 180k, Merghani 140k, Bedoes 150k, Żabson 70k.`,
    status: "achieved",
    dateAchieved: "2026-04-22T22:00:00Z",
  },
  {
    id: "ms_5m_doda",
    targetAmount: 5_000_000,
    title: "5M · Doda pomaga dobić do piątki",
    description: `Doda wchodzi do studia i pomaga rozkręcić donejty — licznik dochodzi do 5 milionów PLN. (Obserwacja live, do potwierdzenia oficjalnym snapshotem.)`,
    status: "pending",
    dateAchieved: null,
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "evt_001",
    dateLocal: "2026-04-17",
    relativeTime: "Dzień 1 — Start",
    participants: ["Bedoes 2115", "Maja Mecan"],
    category: "core_event",
    description: `Stream rusza. Utwór "Ciągle tutaj jestem (diss na raka)" wchodzi w ciągłą pętlę.`,
    tags: ["start", "music", "foundation"],
  },
  {
    id: "evt_002",
    dateLocal: "2026-04-19",
    relativeTime: "Dzień 3 — Popołudnie",
    participants: ["Bedoes 2115", "Brokies", "Dajczman"],
    category: "milestone_execution",
    description: `Cel 500k PLN osiągnięty. Bedoes, Brokies i Dajczman golą głowy — rodzi się "gang łysych". Bedoes tatuuje okładkę singla i logo Cancer Fighters.`,
    tags: ["haircut", "tattoo", "milestone"],
  },
  {
    id: "evt_003",
    dateLocal: "2026-04-19",
    relativeTime: "Dzień 3 — Wieczór",
    participants: ["Disco Karol"],
    category: "endurance_challenge",
    description: `Disco Karol zaczyna wyzwanie: "Cancer Fighters" × 100 000 razy po zdobyciu celu 1,25M PLN.`,
    tags: ["challenge", "endurance"],
  },
  {
    id: "evt_004",
    dateLocal: "2026-04-21",
    relativeTime: "Dzień 5 — Wieczór",
    participants: ["Bambi", "Francis"],
    category: "guest_appearance",
    description: `Bambi i producent Francis w studio. Bambi odmawia golenia, Francis akceptuje i zostaje łysy. Testowanie ostrych sosów. Bambi oficjalnie wchodzi w projekt albumu "diss na raka".`,
    tags: ["haircut", "food_challenge", "album_announcement", "bambi"],
  },
  {
    id: "evt_005",
    dateLocal: "2026-04-21",
    relativeTime: "Dzień 5 — Wieczór",
    participants: ["Bambi"],
    category: "milestone_execution",
    description: `Przy 2,6M PLN Bambi odsłania ekskluzywny snippet swojego nadchodzącego utworu.`,
    tags: ["music_premiere", "milestone", "bambi"],
  },
  {
    id: "evt_006",
    dateLocal: "2026-04-22",
    relativeTime: "Dzień 6 — Popołudnie",
    participants: ["Wojciech Gola"],
    category: "milestone_execution",
    description: `Przy 3,5M PLN Wojciech Gola spełnia wyzwanie społeczności i goli głowę.`,
    tags: ["haircut", "milestone", "gola"],
  },
  {
    id: "evt_007",
    dateLocal: "2026-04-22",
    relativeTime: "Dzień 6 — W trakcie",
    participants: ["Maciek Dąbrowski", "Kostek", "Zoja Skubis"],
    category: "guest_appearance",
    description: `Influencerzy wpadają do studia, żeby dać support i napędzić donejty.`,
    tags: ["support", "influencers"],
  },
  {
    id: "evt_008",
    dateLocal: "TBD",
    relativeTime: "Oczekujące",
    participants: ["Szpaku", "Oki", "Żabson", "Doda", "White 2115"],
    category: "scheduled_appearance",
    description: `Artyści zapowiedziani. White 2115 rzuca wyzwanie: +150k PLN do 15:00, żeby potwierdzić wejście. Szpaku obiecał koncert po przekroczeniu 3M PLN.`,
    tags: ["upcoming", "conditional_challenge"],
  },
];

export const categoryMeta: Record<
  EventCategory,
  { label: string; short: string }
> = {
  core_event: { label: "Rdzeń", short: "CORE" },
  milestone_execution: { label: "Cel zrealizowany", short: "GOAL" },
  guest_appearance: { label: "Gość", short: "GST" },
  endurance_challenge: { label: "Wytrzymałość", short: "END" },
  scheduled_appearance: { label: "Zaplanowane", short: "NXT" },
};
