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

export interface TimelineSource {
  label: string;
  url: string;
}

export interface TimelineEvent {
  id: string;
  dateLocal: string;
  relativeTime: string;
  sortUtc?: string;
  zrodlo?: TimelineSource;
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
    lastYouTubeSyncUtc?: string;
    platform: string;
    channelId: string;
    currentLiveVideoId?: string;
    currentLiveVideoTitle?: string;
    currentLiveVideoUrl?: string;
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

export interface SiteData {
  dashboard: DashboardState;
  milestones: Milestone[];
  timelineEvents: TimelineEvent[];
}

export interface SiteConfig {
  repoUrl: string;
  siteUrl: string;
  supportUrl: string;
  supportHandle: string;
}

export interface CounterHistoryPoint {
  amount: number;
  atUtc: string;
  source: string;
}

export interface SiteDataPatch {
  dashboard?: Omit<
    Partial<DashboardState>,
    "metadata" | "engagement" | "velocity"
  > & {
    metadata?: Partial<DashboardState["metadata"]>;
    engagement?: Partial<DashboardState["engagement"]>;
    velocity?: Partial<DashboardState["velocity"]>;
  };
  milestones?: Milestone[];
  timelineEvents?: TimelineEvent[];
}

export const siteConfig: SiteConfig = {
  repoUrl: "https://github.com/pc-style/diss-na-raka",
  siteUrl: "https://latwo-x-cancerfighters.pcstyle.dev",
  supportUrl: "https://x.com/pcstyle53",
  supportHandle: "@pcstyle53",
};

export const counterHistory: CounterHistoryPoint[] = [
  {
    amount: 5_385_000,
    atUtc: "2026-04-22T23:22:26Z",
    source: "initial tracker snapshot",
  },
  {
    amount: 5_715_000,
    atUtc: "2026-04-23T07:57:00Z",
    source: "overlay snapshot",
  },
  {
    amount: 6_065_000,
    atUtc: "2026-04-23T10:11:24Z",
    source: "live update snapshot",
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

export const seedSiteData: SiteData = {
  dashboard: {
    metadata: {
      hostId: "latwogang_official",
      beneficiary: "Fundacja Cancer Fighters",
      startTimestampUtc: "2026-04-17T00:00:00Z",
      lastUpdatedUtc: "2026-04-23T10:11:24Z",
      lastYouTubeSyncUtc: "2026-04-23T10:11:24Z",
      platform: "YouTube Live",
      channelId: "UCjpBbH8NmL4XHVUgJurDPZg",
      currentLiveVideoId: "UNAqqHIPbWA",
      currentLiveVideoTitle: "9 DNI SŁUCHAMY DISSU NA RAKA",
      currentLiveVideoUrl: "https://www.youtube.com/live/UNAqqHIPbWA",
      donationUrl: "https://tipply.pl/@latwogang",
      songUrl: "https://www.youtube.com/watch?v=d-kldWAQBzk",
      trackTitle: "Ciągle tutaj jestem (diss na raka)",
      trackArtists: ["Bedoes 2115", "Maja Mecan", "Cancer Fighters"],
      trackLengthSeconds: 165,
    },
    totalRaisedPln: 6_065_000,
    hoursElapsed: 151,
    estimatedTotalLoops: 3_315,
    engagement: {
      averageConcurrentViewers: 19_000,
      newSubscribersDuringEvent: 17_000,
      totalViewsGenerated: 2_480_000,
    },
    velocity: {
      averagePlnPerHour: 37_611.06,
      milestoneVelocity: [
        { label: "500 000", hours: 48 },
        { label: "1 000 000", hours: 60 },
        { label: "3 000 000", hours: 130 },
        { label: "5 000 000", hours: 143 },
      ],
    },
  },
  milestones: [
    {
      id: "ms_30k_launch",
      targetAmount: 30_000,
      title: "Cel startowy 30k",
      description:
        "Oficjalny cel na starcie 9-dniowego maratonu — 200 godzin streamu pod utwór w pętli. Przekroczony w kilka godzin.",
      status: "achieved",
      dateAchieved: "2026-04-17T04:00:00Z",
    },
    {
      id: "ms_500k_tattoo",
      targetAmount: 500_000,
      title: "Tatuaż Bedoesa + gang łysych",
      description:
        "GlamRap raportował już ponad 400k PLN na wczesnym etapie streamu, a po dobiciu do 500k uruchamia się obiecany trigger: Bedoes robi tatuaż wybrany przez widzów. Dołącza do niego ekipa Brokies i Dajczman — głowy, brody i wąsy idą pod maszynkę w solidarności.",
      status: "achieved",
      dateAchieved: "2026-04-19T14:00:00Z",
    },
    {
      id: "ms_1_5m_gang",
      targetAmount: 1_500_000,
      title: "1,5M — moment „gang łysych”",
      description:
        "Po około 3 dobach na liczniku jest już 1,5M. Bedoes kończy serię tatuaży; w studio powstaje wiral o „gangu łysych\".",
      status: "achieved",
      dateAchieved: "2026-04-20T18:00:00Z",
    },
    {
      id: "ms_2_3m_szpaku",
      targetAmount: 2_300_000,
      title: "Szpaku rzuca warunek 3M",
      description:
        "Po czterech dniach streamu licznik dobija do około 2,3M PLN. Szpaku deklaruje wtedy, że zagra live koncert, ale dopiero kiedy licznik przebije 3 miliony.",
      status: "achieved",
      dateAchieved: "2026-04-21T16:00:00Z",
    },
    {
      id: "ms_2_8m_bambi",
      targetAmount: 2_800_000,
      title: "Bambi wchodzi w album",
      description:
        "Bambi pojawia się w studio, odmawia golenia, ale jej producent Francis zostaje łysy. Deklaruje udział w projekcie albumu „diss na raka\".",
      status: "achieved",
      dateAchieved: "2026-04-22T02:00:00Z",
    },
    {
      id: "ms_3m_szpaku_heads",
      targetAmount: 3_000_000,
      title: "3M · Szpaku + 17 głów i 9 tatuaży",
      description:
        "Licznik przebija 3M PLN — Szpaku realizuje obietnicę koncertu, a w studio zliczają już 17 ogolonych głów i 9 tatuaży zaprojektowanych przez Maję Mecan.",
      status: "achieved",
      dateAchieved: "2026-04-22T10:00:00Z",
    },
    {
      id: "ms_4m_oki",
      targetAmount: 4_000_000,
      title: "Oki × Kinny Zimmer — koniec beefu",
      description:
        "Przy 4M PLN Oki i Kinny Zimmer oficjalnie kończą swój beef live na streamie. Oki zostawia 180k, Merghani 140k, Bedoes 150k, Żabson 70k.",
      status: "achieved",
      dateAchieved: "2026-04-22T22:00:00Z",
    },
    {
      id: "ms_5m_doda",
      targetAmount: 5_000_000,
      title: "5M · Doda pomaga dobić do piątki",
      description:
        "Doda wchodzi do studia i pomaga rozkręcić donejty — licznik przebił 5 milionów PLN i leci dalej. GlamRap raportował potem już ponad 5,5 mln PLN po pięciu dniach streamu. Snapshot z 23 kwietnia 2026, 09:57 GMT+2: ~5 715 000 PLN (overlay na screenie pokazywał dokładnie 5 713 793,30 PLN).",
      status: "achieved",
      dateAchieved: "2026-04-22T23:22:26Z",
    },
    {
      id: "ms_8_75m_dzinold_tomanek",
      targetAmount: 8_750_000,
      title: "8,75M · Dzinold i Tomanek wchodzą do akcji",
      description:
        "Przy 8,75 miliona PLN do streamu ma wejść kolejny duet triggerów: Dzinold i Tomanek odpalają swoją akcję na rzecz zbiórki.",
      status: "achieved",
      dateAchieved: "2026-04-24T00:00:00Z",
    },
    {
      id: "ms_9_2m_gortat_call",
      targetAmount: 9_200_000,
      title: "9,2M · Telefon do Marcina Gortata i zgoda",
      description:
        "Cel 9,2 miliona PLN został już dowieziony: na streamie odpalił się telefon do Marcina Gortata i doszło do zgody.",
      status: "achieved",
      dateAchieved: "2026-04-23T12:00:00Z",
    },
    {
      id: "ms_10m_young_leosia_kacper_b",
      targetAmount: 10_000_000,
      title: "10M · Young Leosia dzwoni do Kacpra B. o dziarę",
      description:
        "Przy 10 milionach PLN Young Leosia ma zadzwonić do Kacpra B. i zapytać go na streamie, czy chce zrobić dziarę.",
      status: "achieved",
      dateAchieved: "2026-04-24T00:00:00Z",
    },
    {
      id: "ms_10m_lewandowski_tiktok",
      targetAmount: 10_000_000,
      title: "10M · Lewandowski nagrywa TikToka do dissu",
      description:
        'Przy 10 milionach PLN ma odpalić się kolejny głośny trigger: Robert Lewandowski nagra TikToka do numeru "Bedoes 2115, Maja Mecan, Cancer Fighters - Ciągle tutaj jestem (diss na raka)".',
      status: "achieved",
      dateAchieved: "2026-04-24T00:00:00Z",
    },
  ],
  timelineEvents: [
    {
      id: "evt_001",
      dateLocal: "2026-04-17",
      relativeTime: "Dzień 1 — Start",
      sortUtc: "2026-04-17T00:00:00Z",
      zrodlo: {
        label: "YouTube Live: 9-dniowy charity stream Łatwoganga",
        url: "https://www.youtube.com/live/UNAqqHIPbWA",
      },
      participants: ["Bedoes 2115", "Maja Mecan"],
      category: "core_event",
      description:
        'Stream rusza. Utwór "Ciągle tutaj jestem (diss na raka)" wchodzi w ciągłą pętlę.',
      tags: ["start", "music", "foundation"],
    },
    {
      id: "evt_002",
      dateLocal: "2026-04-19",
      relativeTime: "Dzień 3 — Popołudnie",
      sortUtc: "2026-04-19T14:00:00Z",
      zrodlo: {
        label: "GlamRap: Bedoes, Brokies i Dajczman robią gang łysych",
        url: "https://glamrap.pl/bedoes-zrobil-tatuaz-zgolil-brode-i-wasy-a-na-streamie-latwogang-pojawil-sie-gang-lysych/",
      },
      participants: ["Bedoes 2115", "Brokies", "Dajczman"],
      category: "milestone_execution",
      description:
        'Cel 500k PLN osiągnięty po wcześniejszym szybkim dojściu do 400k+. Bedoes, Brokies i Dajczman golą głowy — rodzi się "gang łysych". Bedoes tatuuje okładkę singla i logo Cancer Fighters.',
      tags: ["haircut", "tattoo", "milestone"],
    },
    {
      id: "evt_002b",
      dateLocal: "2026-04-19",
      relativeTime: "Dzień 3 — Wczesny impet",
      sortUtc: "2026-04-19T09:00:00Z",
      zrodlo: {
        label: "GlamRap: ponad 400k i zapowiedź tatuażu przy 500k",
        url: "https://glamrap.pl/latwogang-slucha-dissu-na-raka-przez-9-dni-a-bedoes-robi-tatuaz/",
      },
      participants: ["Bedoes 2115"],
      category: "milestone_execution",
      description:
        'GlamRap podbija wczesny momentum streamu: licznik jest już ponad 400k PLN, a zapowiedź tatuażu Bedoesa przy 500k staje się głównym następnym triggerem dla widzów.',
      tags: ["400k", "500k", "tattoo", "momentum"],
    },
    {
      id: "evt_003",
      dateLocal: "2026-04-19",
      relativeTime: "Dzień 3 — Wieczór",
      sortUtc: "2026-04-19T23:30:00Z",
      zrodlo: {
        label: "4INFLU: challenge Disco Karola przy 1,25 mln",
        url: "https://4influ.pl/latwogang-osiagnal-milion-zlotych-na-zbiorce-dla-fundacji-cancer-fighters/",
      },
      participants: ["Disco Karol"],
      category: "endurance_challenge",
      description:
        'Disco Karol zaczyna wyzwanie: "Cancer Fighters" × 100 000 razy po zdobyciu celu 1,25M PLN.',
      tags: ["challenge", "endurance"],
    },
    {
      id: "evt_004",
      dateLocal: "2026-04-21",
      relativeTime: "Dzień 5 — Wieczór",
      sortUtc: "2026-04-21T20:00:00Z",
      zrodlo: {
        label: "GlamRap: Bambi, Francis i ostre sosy na streamie",
        url: "https://glamrap.pl/bambi-nie-ogolila-sie-na-lyso-ale-latwogang-poczestowal-ja-ostrymi-sosami/",
      },
      participants: ["Bambi", "Francis"],
      category: "guest_appearance",
      description:
        'Bambi i producent Francis w studio. Bambi odmawia golenia, Francis akceptuje i zostaje łysy. Testowanie ostrych sosów. Bambi oficjalnie wchodzi w projekt albumu "diss na raka".',
      tags: ["haircut", "food_challenge", "album_announcement", "bambi"],
    },
    {
      id: "evt_005",
      dateLocal: "2026-04-21",
      relativeTime: "Dzień 5 — Wieczór",
      sortUtc: "2026-04-21T21:00:00Z",
      zrodlo: {
        label: "GlamRap: snippet Bambi przy 2,6 mln",
        url: "https://glamrap.pl/bambi-nie-ogolila-sie-na-lyso-ale-latwogang-poczestowal-ja-ostrymi-sosami/",
      },
      participants: ["Bambi"],
      category: "milestone_execution",
      description:
        "Przy 2,6M PLN Bambi odsłania ekskluzywny snippet swojego nadchodzącego utworu.",
      tags: ["music_premiere", "milestone", "bambi"],
    },
    {
      id: "evt_006",
      dateLocal: "2026-04-22",
      relativeTime: "Dzień 6 — Popołudnie",
      sortUtc: "2026-04-22T16:00:00Z",
      zrodlo: {
        label: "YouTube: Wojtek Gola ścina włosy na zero",
        url: "https://www.youtube.com/watch?v=033XANLMIpc",
      },
      participants: ["Wojciech Gola"],
      category: "milestone_execution",
      description:
        "Przy 3,5M PLN Wojciech Gola spełnia wyzwanie społeczności i goli głowę.",
      tags: ["haircut", "milestone", "gola"],
    },
    {
      id: "evt_007",
      dateLocal: "2026-04-22",
      relativeTime: "Dzień 6 — W trakcie",
      sortUtc: "2026-04-22T14:00:00Z",
      zrodlo: {
        label: "Pudelek: Maciek, Kostek, Zoja i challenge Eryka Moczko",
        url: "https://www.pudelek.pl/latwogang-zebral-prawie-3-mln-zl-na-walke-dzieci-z-rakiem-wspieraja-go-bedoes-2115-bambi-zoja-skubis-i-inni-7277957026146592a",
      },
      participants: ["Maciek Dąbrowski", "Kostek", "Zoja Skubis", "Eryk Moczko"],
      category: "guest_appearance",
      description:
        'Pudelek zbiera szerszy recap supportu: do studia wpadają Maciek Dąbrowski, Kostek i Zoja Skubis, a Eryk Moczko deklaruje własny "DissNaRakaChallenge", jeśli licznik przebije 2,4M PLN.',
      tags: ["support", "influencers", "eryk_moczko", "2_4m"],
    },
    {
      id: "evt_008",
      dateLocal: "2026-04-22",
      relativeTime: "Dzień 6 — Wieczór",
      sortUtc: "2026-04-22T18:00:00Z",
      zrodlo: {
        label: "Pudelek: White 2115 ustawia deadline, Oki i Żabson zapowiadają wejście",
        url: "https://www.pudelek.pl/latwogang-zebral-prawie-3-mln-zl-na-walke-dzieci-z-rakiem-wspieraja-go-bedoes-2115-bambi-zoja-skubis-i-inni-7277957026146592a",
      },
      participants: ["White 2115", "Szpaku", "Oki", "Żabson"],
      category: "scheduled_appearance",
      description:
        "Media round-upy łapią kilka głośnych zapowiedzi naraz: White 2115 rzuca deadline +150k PLN do 15:00, a równolegle krążą zapowiedzi supportu od Okiego i Żabsona oraz warunek Szpaka na koncert po 3M.",
      tags: ["white2115", "deadline", "conditional_challenge", "szpaku", "oki", "zabson"],
    },
    {
      id: "evt_009",
      dateLocal: "2026-04-22",
      relativeTime: "Dzień 6 — Noc",
      sortUtc: "2026-04-22T22:30:00Z",
      zrodlo: {
        label: "Plejada: 5,5 mln, Doda i top wpłaty Bedoesa oraz Okiego",
        url: "https://plejada.pl/newsy/bedoes-2115-na-zywo-przekazal-pol-miliona-zlotych-wczesniej-nagral-diss-na-raka/l35s0rh",
      },
      participants: ["Bedoes 2115", "Doda", "Oki", "SVM!R"],
      category: "milestone_execution",
      description:
        "Plejada i GlamRap raportują 5,5 mln PLN po pięciu dniach streamu. Bedoes 2115 ma już 700k+ łącznych wpłat, w tym jednorazowe 500 tys. W czołówce wpłat przewijają się też Oki (180 tys.) i SVM!R (137 tys.), a Doda dalej boostuje finałową fazę streamu.",
      tags: ["5_5m", "bedoes", "doda", "oki", "svmr", "top_donors"],
    },
    {
      id: "evt_012",
      dateLocal: "2026-04-22",
      relativeTime: "Dzień 6 — Wieczór",
      sortUtc: "2026-04-22T21:00:00Z",
      zrodlo: {
        label: "CGM.pl: Oki i Kinny Zimmer kończą beef przy progu 4 mln",
        url: "https://cgm.pl/news/koniec-beefu-oki-i-kinny-zimmer-raperzy-pogodza-sie-dzieki-akcji-charytatywnej/",
      },
      participants: ["Oki", "Kinny Zimmer", "Żabson"],
      category: "milestone_execution",
      description:
        "Przy celu 4M PLN stream dorzuca kolejny osobny beat fabularny: Oki i Kinny Zimmer mają zakończyć swój konflikt na oczach widzów. Artykuł wiąże ten moment z realnymi wpłatami Okiego i Żabsona, więc to więcej niż zwykła zapowiedź supportu z wcześniejszych round-upów.",
      tags: ["oki", "kinny_zimmer", "zabson", "4m", "beef", "reconciliation"],
    },
    {
      id: "evt_013",
      dateLocal: "2026-04-22",
      relativeTime: "Dzień 6 — Noc",
      sortUtc: "2026-04-22T22:45:00Z",
      zrodlo: {
        label: "Dzień Dobry TVN: Doda i Magda Gessler godzą się na żywo",
        url: "https://dziendobry.tvn.pl/gwiazdy/doda-i-magda-gessler-pogodzily-sie-na-zywo-koniec-glosnego-konfliktu-st9012418",
      },
      participants: ["Doda", "Magda Gessler"],
      category: "guest_appearance",
      description:
        "Support Dody przeradza się w osobny viralowy moment: na streamie dochodzi do telefonu i publicznego pogodzenia Dody z Magdą Gessler. To nie jest tylko kolejny recap wpłat, ale wyraźny wydarzeniowy punkt wieczoru z własnym medialnym echem.",
      tags: ["doda", "magda_gessler", "phone_call", "reconciliation", "viral_moment"],
    },
    {
      id: "evt_014",
      dateLocal: "2026-04-22",
      relativeTime: "Dzień 6 — Wieczór",
      sortUtc: "2026-04-22T21:30:00Z",
      zrodlo: {
        label: "Nowy Marketing: Pasibus przeprasza i wpłaca 100 tys. bez warunków",
        url: "https://nowymarketing.pl/9-dni-miliony-zlotych-i-viralowe-momenty-tak-diss-na-raka-urosl-w-polskim-internecie/",
      },
      participants: ["Pasibus", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Wokół akcji pojawia się też osobny wątek brandowy: po krytyce za niefortunną komunikację Pasibus publikuje przeprosiny i deklaruje bezwarunkową wpłatę 100 tys. PLN dla Cancer Fighters. To odrębny epizod kampanii, a nie kolejna kopia newsroomowego podsumowania gości.",
      tags: ["pasibus", "brand", "apology", "100k", "donation", "controversy"],
    },
    {
      id: "evt_011",
      dateLocal: "2026-04-23",
      relativeTime: "Dzień 7 — Live update",
      sortUtc: "2026-04-23T10:11:24Z",
      zrodlo: {
        label: "YouTube Live: bieżący stan streamu",
        url: "https://www.youtube.com/channel/UCjpBbH8NmL4XHVUgJurDPZg/live",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Bieżący live update: licznik dobił do 6 065 000 PLN. To nowszy punkt odniesienia niż wcześniejszy snapshot 5 713 793,30 PLN z tego samego dnia.",
      tags: ["live_update", "manual_update", "6_065m"],
    },
    {
      id: "evt_010",
      dateLocal: "2026-04-23",
      relativeTime: "Dzień 7 — 09:57",
      sortUtc: "2026-04-23T09:57:00Z",
      zrodlo: {
        label: "YouTube Live: publiczny stream z licznikiem wpłat",
        url: "https://www.youtube.com/live/UNAqqHIPbWA",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Ręcznie potwierdzony snapshot z overlayu: 5 713 793,30 PLN wobec celu 6 000 000 PLN. Tracker zaokrągla ten stan do 5 715 000 PLN i oznacza go jako lokalny punkt odniesienia dla dalszych aktualizacji.",
      tags: ["snapshot", "overlay", "manual_update", "5_715m"],
    },
  ],
};

export function authorizeUpdateRequest(
  headers: Headers,
  expectedToken: string | undefined,
) {
  if (!expectedToken) {
    return false;
  }

  const authHeader = headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : null;
  const headerToken = headers.get("x-update-token")?.trim() ?? null;

  return bearerToken === expectedToken || headerToken === expectedToken;
}

export function mergeSiteDataPatch(
  current: SiteData,
  patch: SiteDataPatch,
): SiteData {
  const dashboard = patch.dashboard
    ? {
        ...current.dashboard,
        ...patch.dashboard,
        metadata: {
          ...current.dashboard.metadata,
          ...patch.dashboard.metadata,
        },
        engagement: {
          ...current.dashboard.engagement,
          ...patch.dashboard.engagement,
        },
        velocity: {
          ...current.dashboard.velocity,
          ...patch.dashboard.velocity,
          milestoneVelocity:
            patch.dashboard.velocity?.milestoneVelocity ??
            current.dashboard.velocity.milestoneVelocity,
        },
      }
    : current.dashboard;

  return {
    dashboard,
    milestones: patch.milestones ?? current.milestones,
    timelineEvents: normalizeTimelineEvents(
      patch.timelineEvents ?? current.timelineEvents,
    ),
  };
}

const RELATIVE_TIME_SLOTS: Array<{ pattern: RegExp; minutes: number }> = [
  { pattern: /\bstart\b/i, minutes: 0 },
  { pattern: /\bwczesny impet\b/i, minutes: 8 * 60 },
  { pattern: /\bporanek\b/i, minutes: 9 * 60 },
  { pattern: /\bw trakcie\b/i, minutes: 14 * 60 },
  { pattern: /\bpopołudnie\b/i, minutes: 16 * 60 },
  { pattern: /\bwieczór\b/i, minutes: 20 * 60 },
  { pattern: /\bnoc\b/i, minutes: 23 * 60 },
];

function getTimelineEventSortTime(event: TimelineEvent) {
  if (event.sortUtc) {
    const exact = Date.parse(event.sortUtc);
    if (!Number.isNaN(exact)) {
      return exact;
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.dateLocal)) {
    return Number.NEGATIVE_INFINITY;
  }

  const explicitTime = event.relativeTime.match(/\b(\d{1,2}):(\d{2})\b/);
  const hours = explicitTime ? Number(explicitTime[1]) : null;
  const minutes = explicitTime ? Number(explicitTime[2]) : null;

  if (hours !== null && minutes !== null) {
    return Date.parse(
      `${event.dateLocal}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00Z`,
    );
  }

  for (const slot of RELATIVE_TIME_SLOTS) {
    if (slot.pattern.test(event.relativeTime)) {
      return Date.parse(
        `${event.dateLocal}T00:00:00Z`,
      ) + slot.minutes * 60 * 1000;
    }
  }

  return Date.parse(`${event.dateLocal}T00:00:00Z`);
}

export function normalizeTimelineEvents(timelineEvents: TimelineEvent[]) {
  return [...timelineEvents].sort((left, right) => {
    const delta =
      getTimelineEventSortTime(right) - getTimelineEventSortTime(left);

    if (delta !== 0) {
      return delta;
    }

    return left.id.localeCompare(right.id);
  });
}
