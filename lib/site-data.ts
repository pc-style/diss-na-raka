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

export interface TopSupporter {
  rank: number;
  name: string;
  amountPln: number;
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
  {
    amount: 13_000_000,
    atUtc: "2026-04-24T09:40:00Z",
    source: "Rzeczpospolita / sukces.rp.pl report",
  },
  {
    amount: 14_000_000,
    atUtc: "2026-04-24T12:46:00Z",
    source: "Dzien Dobry TVN report",
  },
  {
    amount: 16_000_000,
    atUtc: "2026-04-24T13:15:00Z",
    source: "TVP3 Wroclaw report",
  },
  {
    amount: 19_500_000,
    atUtc: "2026-04-24T15:55:00Z",
    source: "Medonet report",
  },
  {
    amount: 20_000_000,
    atUtc: "2026-04-24T16:12:00Z",
    source: "Onet / Plejada report",
  },
  {
    amount: 23_000_000,
    atUtc: "2026-04-24T18:15:00Z",
    source: "Polskie Radio 24 report",
  },
  {
    amount: 25_000_000,
    atUtc: "2026-04-24T19:30:00Z",
    source: "Cancer Fighters Instagram report",
  },
  {
    amount: 26_000_000,
    atUtc: "2026-04-24T20:00:00Z",
    source: "Plejada report",
  },
  {
    amount: 28_000_000,
    atUtc: "2026-04-24T20:40:00Z",
    source: "updated Plejada report",
  },
  {
    amount: 30_000_000,
    atUtc: "2026-04-24T21:55:00Z",
    source: "TVP3 Wroclaw report",
  },
  {
    amount: 31_000_000,
    atUtc: "2026-04-25T04:00:00Z",
    source: "TVN24 report",
  },
  {
    amount: 31_000_000,
    atUtc: "2026-04-25T07:40:00Z",
    source: "Plotek report",
  },
  {
    amount: 36_000_000,
    atUtc: "2026-04-25T09:40:00Z",
    source: "Plejada/Onet report",
  },
  {
    amount: 40_600_000,
    atUtc: "2026-04-25T12:12:00Z",
    source: "live counter update",
  },
  {
    amount: 41_000_000,
    atUtc: "2026-04-25T12:19:00Z",
    source: "Plejada report",
  },
  {
    amount: 41_800_000,
    atUtc: "2026-04-25T13:29:00Z",
    source: "unverified live stream counter",
  },
  {
    amount: 42_200_000,
    atUtc: "2026-04-25T13:31:00Z",
    source: "live counter update",
  },
  {
    amount: 71_000_000,
    atUtc: "2026-04-25T20:35:00Z",
    source: "Plejada report",
  },
  {
    amount: 73_000_000,
    atUtc: "2026-04-25T21:00:00Z",
    source: "Plejada report",
  },
  {
    amount: 84_000_000,
    atUtc: "2026-04-26T06:00:00Z",
    source: "RMF FM report",
  },
  {
    amount: 100_000_000,
    atUtc: "2026-04-26T08:00:00Z",
    source: "TVN24 report",
  },
  {
    amount: 122_000_000,
    atUtc: "2026-04-26T10:26:00Z",
    source: "Bankier.pl report",
  },
  {
    amount: 138_000_000,
    atUtc: "2026-04-26T12:00:00Z",
    source: "Official final total",
  },
];

export const topSupporters: TopSupporter[] = [
  { rank: 1, name: "Budimex", amountPln: 2_563_174.13 },
  { rank: 2, name: "Dobro wraca Zen.com", amountPln: 2_555_570.15 },
  { rank: 3, name: "Tymbark", amountPln: 2_510_159.68 },
  { rank: 4, name: "Kuchnia Vikinga", amountPln: 1_870_020.67 },
  { rank: 5, name: "Wizi", amountPln: 1_410_061.37 },
  { rank: 6, name: "Wydawnictwo Niezwykłe", amountPln: 1_300_021.37 },
  { rank: 7, name: "Pitbull", amountPln: 1_201_989 },
  { rank: 8, name: "Eveline Cosmetics", amountPln: 1_200_260 },
  { rank: 9, name: "Erste Bank Polska — Wierz w siebie", amountPln: 1_111_111.11 },
  { rank: 10, name: "OnlyBio & Stars.Space", amountPln: 1_007_777.77 },
  { rank: 11, name: "Apart", amountPln: 1_002_005.31 },
  { rank: 12, name: "XTB", amountPln: 1_001_300.99 },
  { rank: 13, name: "Bedoes 2115", amountPln: 1_001_189.02 },
  { rank: 14, name: "NEBOA", amountPln: 1_000_455.67 },
  { rank: 15, name: "Anna i Robert Lewandowscy", amountPln: 1_000_037.69 },
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
      startTimestampUtc: "2026-04-17T14:00:00Z",
      lastUpdatedUtc: "2026-04-26T10:26:00Z",
      lastYouTubeSyncUtc: "2026-04-26T10:26:00Z",
      platform: "YouTube Live",
      channelId: "UCjpBbH8NmL4XHVUgJurDPZg",
      currentLiveVideoId: "UNAqqHIPbWA",
      currentLiveVideoTitle: "Słucham 9 dni dissu na raka żeby pomóc dzieciom z Fundacji Cancer Fighters",
      currentLiveVideoUrl: "https://www.youtube.com/live/UNAqqHIPbWA",
      donationUrl: "https://www.siepomaga.pl/latwogang",
      songUrl: "https://www.youtube.com/watch?v=d-kldWAQBzk",
      trackTitle: "Ciągle tutaj jestem (diss na raka)",
      trackArtists: ["Bedoes 2115", "Maja Mecan", "Cancer Fighters"],
      trackLengthSeconds: 165,
    },
    totalRaisedPln: 201_300_000,
    hoursElapsed: 216,
    estimatedTotalLoops: 4_718,
    engagement: {
      averageConcurrentViewers: 497_542,
      newSubscribersDuringEvent: 340_000,
      totalViewsGenerated: 3_320_833,
    },
    velocity: {
      averagePlnPerHour: 564_814.81,
      milestoneVelocity: [
        { label: "500 000", hours: 48 },
        { label: "1 000 000", hours: 60 },
        { label: "3 000 000", hours: 130 },
        { label: "5 000 000", hours: 143 },
        { label: "10 000 000", hours: 167 },
        { label: "13 000 000", hours: 178 },
        { label: "14 000 000", hours: 181 },
        { label: "16 000 000", hours: 181 },
        { label: "19 500 000", hours: 184 },
        { label: "20 000 000", hours: 184 },
        { label: "23 000 000", hours: 186 },
        { label: "25 000 000", hours: 187 },
        { label: "26 000 000", hours: 188 },
        { label: "28 000 000", hours: 189 },
        { label: "30 000 000", hours: 190 },
        { label: "31 000 000", hours: 196 },
        { label: "36 000 000", hours: 201 },
        { label: "40 600 000", hours: 204 },
        { label: "41 000 000", hours: 204 },
        { label: "41 800 000", hours: 207 },
        { label: "42 200 000", hours: 207 },
        { label: "71 000 000", hours: 212 },
        { label: "73 000 000", hours: 213 },
        { label: "100 000 000", hours: 214 },
        { label: "122 000 000", hours: 215 },
        { label: "138 000 000", hours: 216 },
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
      dateAchieved: "2026-04-17T18:00:00Z",
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
      title: "10M · Young Leosia dzwoni do Kacpra B.",
      description:
        "Po przekroczeniu 10 mln PLN Young Leosia odpaliła zapowiadany telefon do Kacpra B. i zapytała go na streamie o dziarę.",
      status: "achieved",
      dateAchieved: "2026-04-24T00:00:00Z",
    },
    {
      id: "ms_7m_litewka_dedication",
      targetAmount: 7_000_000,
      title: "7M · Dedykacja dla Łukasza Litewki",
      description:
        "Łatwogang dowiaduje się podczas streamu o śmierci Łukasza Litewki i publicznie dedykuje jego pamięci przekroczenie progu 7 mln PLN.",
      status: "achieved",
      dateAchieved: "2026-04-23T14:00:00Z",
    },
    {
      id: "ms_10m_lewandowski_tiktok",
      targetAmount: 10_000_000,
      title: "10M · Lewandowski dołącza do akcji",
      description:
        "Połączenie z Robertem Lewandowskim staje się jednym z najmocniejszych mainstreamowych momentów streamu. Kapitan reprezentacji Polski zapowiada podpisane koszulki FC Barcelony na licytację, chęć spotkania z dziećmi wspieranymi przez fundację, a po przebiciu 10 mln publikuje obiecany TikTok do utworu.",
      status: "achieved",
      dateAchieved: "2026-04-23T17:18:00Z",
    },
    {
      id: "ms_13m_kasix",
      targetAmount: 13_000_000,
      title: "13M · Kasix goli głowę na wizji",
      description:
        "Po przekroczeniu progu 13 milionów PLN streamerka Kasix realizuje zapowiedź i ścina włosy na żywo. Rzeczpospolita odnotowała, że cel pękł po 11:40 lokalnego czasu 24 kwietnia.",
      status: "achieved",
      dateAchieved: "2026-04-24T09:40:00Z",
    },
    {
      id: "ms_14m_midday_surge",
      targetAmount: 14_000_000,
      title: "14M · Licznik przyspiesza po Kasix",
      description:
        "Po goleniu Kasix licznik szybko idzie dalej: Dzień Dobry TVN raportuje już ponad 14 mln PLN w piątkowe popołudnie.",
      status: "achieved",
      dateAchieved: "2026-04-24T12:46:00Z",
    },
    {
      id: "ms_16m_tvp_snapshot",
      targetAmount: 16_000_000,
      title: "16M · Snapshot TVP3 Wrocław",
      description:
        "TVP3 Wrocław podaje, że 24 kwietnia o 15:15 czasu lokalnego licznik zbiórki wskazywał już 16 mln PLN.",
      status: "achieved",
      dateAchieved: "2026-04-24T13:15:00Z",
    },
    {
      id: "ms_19_5m_medonet_snapshot",
      targetAmount: 19_500_000,
      title: "19,5M · Popołudniowy screenshot licznika",
      description:
        "Medonet opisuje zrzut licznika z 24 kwietnia, godz. 17:55 czasu lokalnego, na którym zbiórka dobija do 19,5 mln PLN.",
      status: "achieved",
      dateAchieved: "2026-04-24T15:55:00Z",
    },
    {
      id: "ms_20m_evening_surge",
      targetAmount: 20_000_000,
      title: "20M · Wieczorny skok licznika",
      description:
        "24 kwietnia o 18:12 czasu lokalnego licznik przekracza 20 mln PLN. Wieczorna faza streamu zaczyna gwałtownie przyspieszać.",
      status: "achieved",
      dateAchieved: "2026-04-24T16:12:00Z",
    },
    {
      id: "ms_25m_cancer_fighters",
      targetAmount: 25_000_000,
      title: "25M · Potwierdzenie Cancer Fighters",
      description:
        "Fundacja Cancer Fighters potwierdza na Instagramie, że zbiórka przekroczyła 25 mln PLN. To ważny oficjalny punkt pośredni między raportami 23M i 26M.",
      status: "achieved",
      dateAchieved: "2026-04-24T19:30:00Z",
    },
    {
      id: "ms_23m_evening_surge",
      targetAmount: 23_000_000,
      title: "23M · Kolejny rekord po 20:15",
      description:
        "Polskie Radio 24 raportuje, że 24 kwietnia po 20:15 czasu lokalnego licznik zbiórki przekracza 23 mln PLN.",
      status: "achieved",
      dateAchieved: "2026-04-24T18:15:00Z",
    },
    {
      id: "ms_26m_late_evening",
      targetAmount: 26_000_000,
      title: "26M · Nocny punkt odniesienia",
      description:
        "Plejada raportuje, że 24 kwietnia po 22:00 czasu lokalnego licznik pokazuje już ponad 26 mln PLN. To ostatni mocny snapshot przed późniejszą aktualizacją ponad 28 mln.",
      status: "achieved",
      dateAchieved: "2026-04-24T20:00:00Z",
    },
    {
      id: "ms_28m_late_evening",
      targetAmount: 28_000_000,
      title: "28M · Licznik eksploduje po 22:40",
      description:
        "Plejada aktualizuje wcześniejszy raport o 11 milionach: 24 kwietnia po 22:40 lokalnego czasu licznik pokazuje już ponad 28 milionów PLN. To najnowszy twardy punkt odniesienia w danych trackera.",
      status: "achieved",
      dateAchieved: "2026-04-24T20:40:00Z",
    },
    {
      id: "ms_30m_tvp_late_night",
      targetAmount: 30_000_000,
      title: "30M · Tuż przed północą",
      description:
        "TVP3 Wrocław raportuje, że w piątek 24 kwietnia, kilka minut przed północą, zbiórka osiągnęła 30 mln PLN. To najnowszy punkt danych w seedzie, ale nadal nie finalna kwota streamu.",
      status: "achieved",
      dateAchieved: "2026-04-24T21:55:00Z",
    },
    {
      id: "ms_31m_overnight",
      targetAmount: 31_000_000,
      title: "31M · Nocny przyspieszenie",
      description:
        "TVN24 raportuje, że 25 kwietnia około godziny 06:00 rano licznik przekroczył 31 mln PLN. Wzrost stymulowany przez pojawienie się gości oraz akty solidarności, w szczególności ogolenie głowy na żywo przez influencerkę Kasix.",
      status: "achieved",
      dateAchieved: "2026-04-25T04:00:00Z",
    },
    {
      id: "ms_36m_morning_surge",
      targetAmount: 36_000_000,
      title: "36M · Poranny skok ponad 35 mln",
      description:
        "Plejada/Onet raportuje, że 25 kwietnia około 11:40 licznik przekroczył 36 mln PLN. Ciągły napływ darowizn był efektem obecności licznych gości, dużych wpłat od firm (m.in. XTB, NEBOA 1 mln PLN każda) oraz indywidualnych darczyńców (Bedoes 2115: 1 mln PLN).",
      status: "achieved",
      dateAchieved: "2026-04-25T09:40:00Z",
    },
    {
      id: "ms_40_6m_latest",
      targetAmount: 40_600_000,
      title: "40,6M · Najnowszy stan licznika",
      description:
        "Live counter update shows 40,6 mln PLN as of April 25, 2026, around 12:12 CEST. Campaign continues to accelerate with sustained donor engagement.",
      status: "achieved",
      dateAchieved: "2026-04-25T12:12:00Z",
    },
    {
      id: "ms_41m_plejada",
      targetAmount: 41_000_000,
      title: "41M · Plejada raportuje kolejny próg",
      description:
        "Plejada raportuje, że 25 kwietnia około 14:19 CEST licznik streamu przekroczył 41 mln PLN. Raport traktuje tę kwotę jako medialny snapshot licznika na żywo, nie jako finalną kwotę rozliczoną przez fundację.",
      status: "achieved",
      dateAchieved: "2026-04-25T12:19:00Z",
    },
    {
      id: "ms_41_8m_live_unverified",
      targetAmount: 41_800_000,
      title: "41,8M · Niepotwierdzony licznik live",
      description:
        "Research wskazuje 41,8 mln PLN jako wartość widoczną na liczniku podczas transmisji. Kwota pozostaje niepotwierdzona przez Siepomaga.pl lub oficjalny komunikat Fundacji Cancer Fighters i może obejmować zagregowane kanały wpłat brutto.",
      status: "achieved",
      dateAchieved: "2026-04-25T13:29:00Z",
    },
    {
      id: "ms_42_2m_latest",
      targetAmount: 42_200_000,
      title: "42,2M · Najnowszy stan licznika",
      description:
        "Licznik streamu pokazuje 42,2 mln PLN w sobotę 25 kwietnia około 15:31 CEST.",
      status: "achieved",
      dateAchieved: "2026-04-25T13:31:00Z",
    },
    {
      id: "ms_71m_celebrity_wave",
      targetAmount: 71_000_000,
      title: "71M · Fala celebrytów i golenie głów",
      description:
        "Significant surge linked to a wave of celebrity visits and head-shaving gestures by figures such as Julia 'Maffashion' Kuczyńska, Edyta Pazura, Katarzyna Nosowska, and Aleksandra Domańska, plus high-value corporate donations.",
      status: "achieved",
      dateAchieved: "2026-04-25T20:35:00Z",
    },
    // Duplicate entry removed - see ms_73m_blanka_lipinska below for the full 73M milestone entry for Blanka Lipińska.
    {
      id: "ms_100m_milestone",
      targetAmount: 100_000_000,
      title: "100M · Przekroczenie 100 milionów",
      description:
        "This major threshold was crossed as a result of the campaign's peak momentum, fueled by a continuous cascade of celebrity acts, reconciliations, and significant corporate donations from companies like Budimex, Tymbark, and XTB.",
      status: "achieved",
      dateAchieved: "2026-04-26T08:00:00Z",
    },
    {
      id: "ms_122m_peak",
      targetAmount: 122_000_000,
      title: "122M · Szczyt medialny",
      description:
        "Bankier.pl raportuje szczytową kwotę zbiórki: 122 mln PLN. To najwyższy zweryfikowany medialnie wynik. Kwota 124 mln PLN krążąca w social media pozostaje niepotwierdzona.",
      status: "achieved",
      dateAchieved: "2026-04-26T10:26:00Z",
    },
    {
      id: "ms_200m_estimated",
      targetAmount: 200_000_000,
      title: "200M · Przebite na żywo",
      description:
        "Licznik dobił do 200 mln PLN, gdy akcja była relacjonowana na żywo w TVN. Dalszy wynik traktujemy jako estymację 200M+.",
      status: "achieved",
      dateAchieved: "2026-04-26T17:00:00Z",
    },
    {
      id: "ms_161m_checkpoint",
      targetAmount: 161_000_000,
      title: "161M · Checkpoint",
      description:
        "Checkpoint raportowany przez media. Późniejsza estymacja wyniku przekracza 200 mln PLN.",
      status: "achieved",
      dateAchieved: "2026-04-26T14:00:00Z",
    },
    {
      id: "ms_138m_checkpoint",
      targetAmount: 138_000_000,
      title: "138M · Checkpoint",
      description:
        "Wcześniejszy checkpoint raportowany przez media.",
      status: "achieved",
      dateAchieved: "2026-04-26T12:00:00Z",
    },
    // Note: ms_42m_kubanczyk_tattoo and other 40-80M milestones should be moved
    // to appear before ms_100m_milestone to maintain ascending order by targetAmount.
    // This is a larger reorganization that may be needed separately.
    {
      id: "ms_42m_kubanczyk_tattoo",
      targetAmount: 42_000_000,
      title: "42M · Tatuaż Kubańczyka i Gawronka",
      description:
        "Przy kwocie 42 mln zł raper Kubańczyk i influencer Gawronek zadeklarowali i wykonali tatuaż z obrazkiem stworzonym przez podopieczną fundacji.",
      status: "achieved",
      dateAchieved: "2026-04-25T13:00:00Z",
    },
    {
      id: "ms_45m_blachowicz",
      targetAmount: 45_000_000,
      title: "45M · Golenie głowy: Jan Błachowicz",
      description:
        "Czołowy polski zawodnik MMA, były mistrz UFC związany niegdyś z federacją KSW, zgolił włosy po dobiciu do 45 mln zł w geście solidarności z pacjentami onkologicznymi.",
      status: "achieved",
      dateAchieved: "2026-04-25T14:00:00Z",
    },
    {
      id: "ms_46_25m_maffashion",
      targetAmount: 46_250_000,
      title: "46,25M · Golenie głowy: Maffashion",
      description:
        "Influencerka modowa Julia 'Maffashion' Kuczyńska, przebywając w Marbelli, zdalnie ogoliła głowę na łyso po osiągnięciu progu 46,25 mln zł.",
      status: "achieved",
      dateAchieved: "2026-04-25T15:20:00Z",
    },
    {
      id: "ms_50m_edyta_pazura",
      targetAmount: 50_000_000,
      title: "50M · Golenie głowy: Edyta Pazura",
      description:
        "Po obietnicy złożonej przez męża Cezarego Pazurę, przy 50 mln zł Edyta Pazura ogoliła głowę na łyso, z pomocą Roksany Węgiel i Kevina Mgleja.",
      status: "achieved",
      dateAchieved: "2026-04-25T16:20:00Z",
    },
    {
      id: "ms_55m_nosowska",
      targetAmount: 55_000_000,
      title: "55M · Golenie głowy: Katarzyna Nosowska",
      description:
        "Ikona polskiej muzyki Katarzyna Nosowska ogoliła głowę przy wsparciu przyjaciółki, wybitnej aktorki Agaty Kuleszy, która wcieliła się w rolę fryzjerki.",
      status: "achieved",
      dateAchieved: "2026-04-25T18:30:00Z",
    },
    {
      id: "ms_60m_aleksandra_domanska",
      targetAmount: 60_000_000,
      title: "60M · Golenie głowy: Aleksandra Domańska",
      description:
        "W geście solidarności i po przemowie o wewnętrznym pięknie, aktorka Aleksandra Domańska pozbyła się włosów, ogolona przez Katarzynę Nosowską i Agatę Kuleszę.",
      status: "achieved",
      dateAchieved: "2026-04-25T19:30:00Z",
    },
    {
      id: "ms_66m_peszko",
      targetAmount: 66_000_000,
      title: "66M · Połączenie: Sławomir Peszko",
      description:
        "Obiecano i zrealizowano telefoniczne połączenie ze Sławomirem Peszką przy kwocie 66 mln PLN.",
      status: "achieved",
      dateAchieved: "2026-04-25T20:30:00Z",
    },
    {
      id: "ms_68m_jan_urban",
      targetAmount: 68_000_000,
      title: "68M · Połączenie: Jan Urban",
      description:
        "Zrealizowano połączenie z legendarnym trenerem i piłkarzem Janem Urbanem.",
      status: "achieved",
      dateAchieved: "2026-04-25T21:00:00Z",
    },
    {
      id: "ms_73m_blanka_lipinska",
      targetAmount: 73_000_000,
      title: "73M · Golenie głowy: Blanka Lipińska",
      description:
        "Pisarka Blanka Lipińska ogoliła włosy za pomocą maszynki obsługiwanej przez jej partnera Pawła Baryłę.",
      status: "achieved",
      dateAchieved: "2026-04-25T22:30:00Z",
    },
    {
      id: "ms_80m_tatuaz_peszki",
      targetAmount: 80_000_000,
      title: "80M · Tatuaż Sławomira Peszki",
      description:
        "Łatwogang obiecał wykonanie tatuażu z wizerunkiem Sławomira Peszki po osiągnięciu pułapu 80 milionów złotych.",
      status: "achieved",
      dateAchieved: "2026-04-26T00:30:00Z",
    },
    {
      id: "ms_97m_borys_szyc",
      targetAmount: 97_000_000,
      title: "97M · Pokaz muskulatury: Borys Szyc",
      description:
        "Borys Szyc po przekroczeniu kwoty 97 milionów żartobliwie zaprezentował przed kamerą swoją muskulaturę.",
      status: "achieved",
      dateAchieved: "2026-04-26T08:00:00Z",
    },
    {
      id: "ms_130m_koncert",
      targetAmount: 130_000_000,
      title: "130M · Festiwal muzyczny w kawalerce",
      description:
        "Po wybiciu 130 mln PLN na żywo wystąpili Mrozu ('Jak nie my to kto') oraz zespół Golec uOrkiestra ('Ściernisko').",
      status: "achieved",
      dateAchieved: "2026-04-26T11:00:00Z",
    },
  ],
  timelineEvents: [
    {
      id: "evt_200m_tvn_live",
      dateLocal: "2026-04-26",
      relativeTime: "Dzień 10 — 19:00 CEST",
      sortUtc: "2026-04-26T17:00:00Z",
      zrodlo: {
        label: "Obserwacja live: 200M i wejście TVN",
        url: "https://www.youtube.com/live/UNAqqHIPbWA",
      },
      participants: ["Łatwogang", "Cancer Fighters", "TVN"],
      category: "milestone_execution",
      description:
        "Licznik przekracza 200 mln PLN w momencie, gdy akcja jest pokazywana na żywo w TVN. Tracker zapisuje to jako user-observed live checkpoint i traktuje dalszy wynik jako estymację 200M+.",
      tags: ["200m", "tvn", "live_tv", "checkpoint", "estimated"],
    },
    {
      id: "evt_036",
      dateLocal: "2026-04-26",
      relativeTime: "Dzień 10 — 12:26 CEST",
      sortUtc: "2026-04-26T10:26:00Z",
      zrodlo: {
        label: "Bankier.pl: 122 mln zł",
        url: "https://www.bankier.pl/wiadomosc/Wyjatkowy-stream-influencera-Latwogang-Zebral-miliony-na-walke-dzieci-z-rakiem-9122911.html",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Bankier.pl raportuje szczytową kwotę zbiórki: 122 mln PLN. To najwyższy zweryfikowany medialnie wynik. Kwota 124 mln PLN krążąca w social media pozostaje niepotwierdzona.",
      tags: ["122m", "bankier", "media_peak"],
    },
    {
      id: "evt_035",
      dateLocal: "2026-04-26",
      relativeTime: "Dzień 10 — Przed południem",
      sortUtc: "2026-04-26T08:00:00Z",
      zrodlo: {
        label: "TVN24: ponad 100 mln zł",
        url: "https://tvn24.pl/polska/dziewieciodniowy-stream-zebrane-ponad-100-milionow-zlotych-i-rekord-guinnessa-to-jest-jeden-wielki-cud-st9017459",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "TVN24 raportuje przekroczenie 100 mln PLN. To historyczny kamień milowy polskiego charytatywnego streamingu.",
      tags: ["100m", "tvn24", "milestone"],
    },
    {
      id: "evt_034",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Wieczór",
      sortUtc: "2026-04-25T21:00:00Z",
      zrodlo: {
        label: "Plejada: Blanka Lipińska ogolona",
        url: "https://www.onet.pl/styl-zycie/plejada/latwogang-zebral-juz-ponad-100-mln-zl-nie-tylko-blanka-lipinska-ogolila-glowe/xj15p9c,0898b825",
      },
      participants: ["Blanka Lipińska", "Łatwogang"],
      category: "milestone_execution",
      description:
        "Blanka Lipińska goli głowę na wizji przy około 73 mln PLN. To kolejny symboliczny gest solidarności.",
      tags: ["73m", "lipinska", "haircut"],
    },
    {
      id: "evt_033",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Wieczór",
      sortUtc: "2026-04-25T20:35:00Z",
      zrodlo: {
        label: "Plejada: Fala celebrytów",
        url: "https://plejada.pl/newsy/latwogang-zebral-juz-ponad-71-mln-zl/0hs6hsz",
      },
      participants: ["Maffashion", "Edyta Pazura", "Katarzyna Nosowska", "Aleksandra Domańska"],
      category: "guest_appearance",
      description:
        "Fala celebrytów goli głowy w geście solidarności przy około 71 mln PLN. Do akcji dołączają Maffashion, Edyta Pazura, Katarzyna Nosowska i Aleksandra Domańska.",
      tags: ["71m", "celebrities", "haircut", "solidarity"],
    },
    {
      id: "evt_031",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Około 14:19",
      sortUtc: "2026-04-25T12:19:00Z",
      zrodlo: {
        label: "Plejada: ponad 41 mln zł",
        url: "https://plejada.pl/newsy/latwogang-zebral-juz-ponad-41-mln-zl-kubanczyk-wyciagnal-gitare/0hs6hsz",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Plejada raportuje przekroczenie 41 mln PLN na liczniku streamu. To szybki medialny snapshot aktualizowany niemal na żywo, przy utrzymującej się wysokiej dynamice ostatnich godzin transmisji.",
      tags: ["41m", "plejada", "live_counter", "media_snapshot"],
    },
    {
      id: "evt_032",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Późny ranek",
      sortUtc: "2026-04-25T09:59:00Z",
      zrodlo: {
        label: "Pudelek: Friz, Wardęga i Wersow",
        url: "https://www.pudelek.pl/friz-i-wardega-pogodzili-sie-na-streamie-u-latwoganga-chwile-pozniej-wersow-ogolila-bylemu-nemezis-glowe-wideo-7278996588222464a",
      },
      participants: ["Sylwester Wardęga", "Friz", "Wersow"],
      category: "guest_appearance",
      description:
        "Na streamie dochodzi do publicznego pojednania Wardęgi, Friza i Wersow. Wersow symbolicznie goli głowę Wardędze na żywo, łącząc wiralowy moment pojednania z gestem solidarnościowym kampanii.",
      tags: ["wardega", "friz", "wersow", "reconciliation", "haircut"],
    },
    {
      id: "evt_033",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Rano",
      sortUtc: "2026-04-25T08:54:00Z",
      zrodlo: {
        label: "Eska: obsada Rodzinki.pl na streamie",
        url: "https://www.eska.pl/rozrywka/gwiazdy/aktorzy-z-serialu-rodzinkapl-na-streamie-latwoganga-karolak-zdrojkowski-i-pawlowski-zaskoczyli-widzow-aa-Lz9g-6n1c-hhck.html",
      },
      participants: ["Tomasz Karolak", "Mateusz Pawłowski", "Adam Zdrójkowski", "Julia Wieniawa"],
      category: "guest_appearance",
      description:
        "Aktorzy znani z serialu Rodzinka.pl pojawiają się na streamie i wykonują akustyczną wersję piosenki przewodniej. Wątek dodatkowo wzmacnia szeroki, mainstreamowy zasięg akcji.",
      tags: ["rodzinka_pl", "karolak", "zdrojkowski", "pawlowski", "wieniawa"],
    },
    {
      id: "evt_034",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — W ciągu dnia",
      sortUtc: "2026-04-25T10:30:00Z",
      zrodlo: {
        label: "Plejada/Onet: Fabijański i Quebonafide",
        url: "https://plejada.pl/newsy/latwogang-zebral-juz-ponad-31-mln-zl-wsrod-gosci-sebastian-fabijanski/0hs6hsz",
      },
      participants: ["Sebastian Fabijański", "Quebonafide"],
      category: "guest_appearance",
      description:
        "W ramach serii publicznych pojednań Sebastian Fabijański i Quebonafide kończą medialny spór, utrzymując uwagę widzów wokół streamu i jego charytatywnego celu.",
      tags: ["fabijanski", "quebonafide", "reconciliation"],
    },
    {
      id: "evt_022",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Tuż przed północą",
      sortUtc: "2026-04-24T21:55:00Z",
      zrodlo: {
        label: "TVP3 Wrocław: 30 mln kilka minut przed północą",
        url: "https://wroclaw.tvp.pl/92870227/tego-jeszcze-nie-bylo-latwogang-prowadzi-9-dniowy-stream-charytatywny-by-pomoc-chorym-na-nowotwor-dzieciom",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Najświeższy checkpoint z pliku researchowego: TVP3 Wrocław raportuje, że kilka minut przed północą 24 kwietnia licznik osiągnął 30 mln PLN. Tracker traktuje to jako nowszy snapshot, nie jako kwotę finałową.",
      tags: ["30m", "tvp3", "latest_counter", "not_final"],
    },
    {
      id: "evt_023",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Około 06:00",
      sortUtc: "2026-04-25T04:00:00Z",
      zrodlo: {
        label: "TVN24: ponad 31 mln",
        url: "https://tvn24.pl/polska/latwogang-zbiera-srodki-na-rzecz-podopiecznych-fundacji-cancer-fighters-st9014748",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "TVN24 raportuje, że około godziny 06:00 rano licznik przekroczył 31 mln PLN. Wzrost stymulowany przez pojawienie się gości oraz akty solidarności, w szczególności ogolenie głowy na żywo przez influencerkę Kasix.",
      tags: ["31m", "tvn24", "counter", "overnight"],
    },
    {
      id: "evt_024",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Około 11:40",
      sortUtc: "2026-04-25T09:40:00Z",
      zrodlo: {
        label: "Plejada/Onet: ponad 36 mln",
        url: "https://plejada.pl/newsy/latwogang-zebral-juz-ponad-31-mln-zl-wsrod-gosci-sebastian-fabijanski/0hs6hsz",
      },
      participants: ["Łatwogang", "Cancer Fighters", "Bedoes 2115", "XTB", "NEBOA"],
      category: "milestone_execution",
      description:
        "Plejada/Onet raportuje, że około 11:40 licznik przekroczył 36 mln PLN. Ciągły napływ darowizn był efektem obecności licznych gości, dużych wpłat od firm (m.in. XTB, NEBOA po 1 mln PLN) oraz indywidualnych darczyńców (Bedoes 2115: 1 mln PLN).",
      tags: ["36m", "plejada", "onet", "counter", "major_donors"],
    },
    {
      id: "evt_030",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Około 12:12",
      sortUtc: "2026-04-25T12:12:00Z",
      zrodlo: {
        label: "Live counter: 40,6 mln",
        url: "https://www.siepomaga.pl/latwogang",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Live counter update shows 40,6 mln PLN. Campaign continues to accelerate with sustained donor engagement.",
      tags: ["40_6m", "live_counter", "latest"],
    },
    {
      id: "evt_025",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — 09:00-13:00",
      sortUtc: "2026-04-25T07:00:00Z",
      zrodlo: {
        label: "Plejada: Robert Lewandowski cameo",
        url: "https://plejada.pl/newsy/latwogang-zebral-juz-ponad-31-mln-zl-wsrod-gosci-sebastian-fabijanski/0hs6hsz",
      },
      participants: ["Robert Lewandowski", "Łatwogang"],
      category: "guest_appearance",
      description:
        "Niespodziewane pojawienie się najpopularniejszego polskiego piłkarza jako krótkie cameo zdalne, co zapewniło ogromną widoczność i gwałtowny wzrost uwagi oraz darowizn.",
      tags: ["lewandowski", "celebrity", "remote", "mainstream"],
    },
    {
      id: "evt_026",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Ranek",
      sortUtc: "2026-04-24T06:00:00Z",
      zrodlo: {
        label: "Eurosport TVN24: Jan Bednarek",
        url: "https://eurosport.tvn24.pl/pilka-nozna/charytatywny-lajw-latwoganga-dla-podopiecznych-fundacji-cancer-fighters.-jan-bednarek-wsparl-akcje-taka-wiadomosc-wyslal-youtuberowi_sto23293076/story.shtml",
      },
      participants: ["Jan Bednarek", "Fundacja Cancer Fighters"],
      category: "guest_appearance",
      description:
        "Piłkarz Jan Bednarek skontaktował się ze streamem zdalnie, obiecując zaproszenie podopiecznych Fundacji Cancer Fighters na mecze reprezentacji Polski.",
      tags: ["bednarek", "football", "remote", "tickets"],
    },
    {
      id: "evt_027",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Wieczór",
      sortUtc: "2026-04-24T20:00:00Z",
      zrodlo: {
        label: "Spidersweb: Szpaku w studio",
        url: "https://rozrywka.spidersweb.pl/bedoes-fundacja-cancer-fighters-zbiorka-pol-miliona-zlotych-diss-na-raka-latwogang",
      },
      participants: ["Szpaku", "Natalka"],
      category: "guest_appearance",
      description:
        "Raper Szpaku pojawił się na streamie wieczorem wraz z podopieczną fundacji Natalką, wspierając akcję swoją obecnością.",
      tags: ["szpaku", "rapper", "in-studio"],
    },
    {
      id: "evt_028",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — 10:00-18:00",
      sortUtc: "2026-04-24T08:00:00Z",
      zrodlo: {
        label: "Moda.pl: Oliwka Brazil",
        url: "https://moda.pl/kto-byl-dzis-na-streamie-latwogang-dla-fundacji-cancer-fighters-24-04-2026/",
      },
      participants: ["Oliwka Brazil"],
      category: "guest_appearance",
      description:
        "Popularna raperka Oliwka Brazil pojawiła się w studio, co przyciągnęło jej fanów i pomogło zwiększyć darowizny.",
      tags: ["oliwka_brazil", "rapper", "in-studio"],
    },
    {
      id: "evt_029",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — W ciągu dnia",
      sortUtc: "2026-04-24T12:00:00Z",
      zrodlo: {
        label: "Moda.pl: Grupa influencerów",
        url: "https://moda.pl/kto-byl-dzis-na-streamie-latwogang-dla-fundacji-cancer-fighters-24-04-2026/",
      },
      participants: ["Nowciax", "Medusa", "AJ The Polish American"],
      category: "guest_appearance",
      description:
        "Grupa influencerów, dziennikarzy i twórców internetowych pojawiła się na streamie, aby wesprzeć akcję, zwiększyć jej zasięgi i zachęcić do wpłat.",
      tags: ["influencers", "group", "in-studio"],
    },
    {
      id: "evt_021",
      dateLocal: "2026-04-26",
      relativeTime: "Dzień 10 — Finał o 20:00",
      sortUtc: "2026-04-26T18:00:00Z",
      zrodlo: {
        label: "Szacunek końcowy: 200M+ PLN",
        url: "https://www.bankier.pl/wiadomosc/Wyjatkowy-stream-influencera-Latwogang-Zebral-miliony-na-walke-dzieci-z-rakiem-9122911.html",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "core_event",
      description:
        "Stream został przedłużony do 20:00 CEST. Na podstawie obserwacji licznika wynik końcowy jest szacowany na ponad 200 mln PLN; traktujemy to jako estymację, nie precyzyjny oficjalny komunikat.",
      tags: ["final", "200m_plus", "estimated", "26_kwietnia"],
    },
    {
      id: "evt_020",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — 22:40",
      sortUtc: "2026-04-24T20:40:00Z",
      zrodlo: {
        label: "Plejada: ponad 28 mln po 22:40",
        url: "https://plejada.pl/newsy/latwogang-zebral-juz-ponad-28-mln-zl-na-streamie-tyle-wplacily-gwiazdy/v3z3rtv",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Najnowszy medialny snapshot przebija wcześniejsze raporty: po 22:40 licznik streamu jest już powyżej 28 mln PLN. Plejada zbiera też listę dużych wpłat, m.in. Bedoes 2115, NEBOA i XTB po 1 mln PLN.",
      tags: ["28m", "latest_counter", "top_donors", "plejada"],
    },
    {
      id: "evt_020b",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Około 21:30",
      sortUtc: "2026-04-24T19:30:00Z",
      zrodlo: {
        label: "Cancer Fighters: oficjalne 25 mln",
        url: "https://www.instagram.com/p/DXhWmq9DB_Z",
      },
      participants: ["Fundacja Cancer Fighters", "Łatwogang"],
      category: "milestone_execution",
      description:
        "Oficjalny profil Fundacji Cancer Fighters potwierdza przekroczenie 25 mln PLN. Ze względu na rozjazd czasu publikacji i późniejsze raporty 23M/26M tracker umieszcza ten punkt orientacyjnie między nimi.",
      tags: ["25m", "official", "cancer_fighters", "instagram"],
    },
    {
      id: "evt_019",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — 22:00",
      sortUtc: "2026-04-24T20:00:00Z",
      zrodlo: {
        label: "Plejada: ponad 26 mln po 22:00",
        url: "https://plejada.pl/newsy/latwogang-zebral-juz-ponad-26-mln-zl-na-streamie-tyle-wplacily-gwiazdy/v3z3rtv",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Nocna aktualizacja Plejady potwierdza ponad 26 mln PLN po 22:00. To ostatni punkt z przygotowanego researchu przed późniejszym redirectem Plejady do wersji z wynikiem ponad 28 mln.",
      tags: ["26m", "media_summary", "final_stretch"],
    },
    {
      id: "evt_019b",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — 20:15",
      sortUtc: "2026-04-24T18:15:00Z",
      zrodlo: {
        label: "Polskie Radio 24: ponad 23 mln po 20:15",
        url: "https://polskieradio24.pl/artykul/3678438,9-dni-jedna-piosenka-i-miliony-zlotych-latwogang-jednym-streamem-rozpalil-polske",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Polskie Radio 24 podaje kolejny skok: 24 kwietnia po 20:15 licznik streamu jest już powyżej 23 mln PLN.",
      tags: ["23m", "polskie_radio", "counter"],
    },
    {
      id: "evt_019a",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — 18:12",
      sortUtc: "2026-04-24T16:12:00Z",
      zrodlo: {
        label: "Onet/Plejada: ponad 20 mln o 18:12",
        url: "https://www.onet.pl/styl-zycia/plejada/latwogang-zebral-juz-ponad-20-mln-zl-na-streamie-tyle-wplacily-gwiazdy/v3z3rtv,0898b825",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Wieczorny rajd zaczyna się od kolejnego okrągłego progu: 24 kwietnia o 18:12 licznik przekracza 20 mln PLN.",
      tags: ["20m", "onet", "plejada", "counter"],
    },
    {
      id: "evt_019aa",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — 17:55",
      sortUtc: "2026-04-24T15:55:00Z",
      zrodlo: {
        label: "Medonet: screenshot 19,5 mln",
        url: "https://www.medonet.pl/choroby-od-a-do-z/choroby-nowotworowe,zbiorka-latwoganga-na-chore-dzieci-bije-rekordy-popularnosci--zaczelo-sie-od-piosenki,artykul,35147744.html",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Medonet opisuje popołudniowy zrzut ekranu z licznika: 24 kwietnia o 17:55 czasu lokalnego zbiórka miała już 19,5 mln PLN.",
      tags: ["19_5m", "medonet", "screenshot", "counter"],
    },
    {
      id: "evt_019z",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — 15:15",
      sortUtc: "2026-04-24T13:15:00Z",
      zrodlo: {
        label: "TVP3 Wrocław: 16 mln o 15:15",
        url: "https://wroclaw.tvp.pl/92870227/tego-jeszcze-nie-bylo-latwogang-prowadzi-9-dniowy-stream-charytatywny-by-pomoc-chorym-na-nowotwor-dzieciom",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "TVP3 Wrocław notuje kolejne popołudniowe przyspieszenie: 24 kwietnia o 15:15 na liczniku jest już 16 mln PLN.",
      tags: ["16m", "tvp3", "counter"],
    },
    {
      id: "evt_019y",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Popołudnie",
      sortUtc: "2026-04-24T12:46:00Z",
      zrodlo: {
        label: "Dzień Dobry TVN: ponad 14 mln",
        url: "https://dziendobry.tvn.pl/gorace-tematy/kasix-ogolila-glowe-na-streamie-latwoganga-wszystko-dla-chorych-dzieci-st9014905",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Po przekroczeniu 13 mln tempo wpłat nie siada: Dzień Dobry TVN raportuje już ponad 14 mln PLN w piątkowe popołudnie.",
      tags: ["14m", "ddtvn", "counter"],
    },
    {
      id: "evt_019x",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Południe",
      sortUtc: "2026-04-24T12:00:00Z",
      zrodlo: {
        label: "CześćGiżycko: telefony Dody i pojednanie",
        url: "https://czescgizycko.pl/polski-internet-slucha-dissu-na-raka-stream-latwoganga-zebral-juz-miliony-dla-dzieci-chorych-onkologicznie/",
      },
      participants: ["Doda", "Magda Gessler", "Michał Wiśniewski"],
      category: "guest_appearance",
      description:
        "Kolejne źródło podbija viralowy wątek Dody: telefony do znanych osób, w tym pojednanie z Magdą Gessler i próby angażowania następnych gwiazd.",
      tags: ["doda", "magda_gessler", "michal_wisniewski", "phone_call"],
    },
    {
      id: "evt_018",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Po 11:40",
      sortUtc: "2026-04-24T09:40:00Z",
      zrodlo: {
        label: "Rzeczpospolita: Kasix goli głowę przy 13 mln",
        url: "https://sukces.rp.pl/internet/art44229281-13-milionow-zlotych-od-internautow-fenomen-zbiorki-latwoganga-na-walke-z-rakiem",
      },
      participants: ["Kasix", "Łatwogang"],
      category: "milestone_execution",
      description:
        "Po przekroczeniu 13 mln PLN Kasix spełnia obietnicę i goli głowę na transmisji. Ten moment domyka kolejny etap solidarnościowych wyzwań związanych z utratą włosów podczas leczenia onkologicznego.",
      tags: ["13m", "kasix", "haircut", "solidarity"],
    },
    {
      id: "evt_018b",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Po goleniu",
      sortUtc: "2026-04-24T10:00:00Z",
      zrodlo: {
        label: "Plejada: Kasix ogoliła głowę na streamie",
        url: "https://plejada.pl/newsy/kasix-ogolila-glowe-na-streamie-latwoganga-przed-laty-dostala-udaru-na-wizji/l2tvyb2",
      },
      participants: ["Kasix", "Łatwogang"],
      category: "milestone_execution",
      description:
        "Osobny materiał Plejady opisuje Kasix po wykonaniu wyzwania i dodaje, że po goleniu licznik był już w okolicach 13,5 mln PLN.",
      tags: ["kasix", "13_5m", "haircut", "plejada"],
    },
    {
      id: "evt_018a",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Przedpołudnie",
      sortUtc: "2026-04-24T10:42:00Z",
      zrodlo: {
        label: "Gol24: Michał Pol ogolony na łyso",
        url: "https://gol24.pl/michal-pol-spelnil-obietnice-latwogang-ogolil-go-na-lyso-wideo/ar/c2-19133877",
      },
      participants: ["Michał Pol", "Łatwogang"],
      category: "milestone_execution",
      description:
        "Dziennikarz sportowy Michał Pol spełnia obietnicę i zostaje ogolony na łyso podczas transmisji. To kolejny medialny moment solidarnościowego golenia głów.",
      tags: ["michal_pol", "haircut", "gol24", "solidarity"],
    },
    {
      id: "evt_017",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Poranek",
      sortUtc: "2026-04-24T07:00:00Z",
      zrodlo: {
        label: "TVP World: 11,2 mln o 09:00",
        url: "https://tvpworld.com/92886782/latwogangs-cancer-fighters-livestream-tops-25-million",
      },
      participants: ["Łatwogang", "Cancer Fighters"],
      category: "milestone_execution",
      description:
        "Anglojęzyczne podsumowanie TVP World notuje 11,2 mln PLN o 09:00 w piątek i podaje, że w akcję weszły m.in. Doda, Robert Lewandowski, Mateusz Ponitka, Magda Gessler i Bambi.",
      tags: ["11_2m", "international_summary", "tvp_world"],
    },
    {
      id: "evt_017b",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Rano",
      sortUtc: "2026-04-24T09:20:21Z",
      zrodlo: {
        label: "Transfery.info: Lewandowski dotrzymał słowa",
        url: "https://transfery.info/aktualnosci/robert-lewandowski-dotrzymal-slowa-wielki-powrot-w-szczytnym-celu-wideo/271111",
      },
      participants: ["Robert Lewandowski"],
      category: "milestone_execution",
      description:
        "Po przebiciu 10 mln PLN Robert Lewandowski publikuje obiecany TikTok do 'Ciągle tutaj jestem (diss na raka)', domykając zapowiedź z wcześniejszego połączenia na streamie.",
      tags: ["lewandowski", "tiktok", "10m", "promise_fulfilled"],
    },
    {
      id: "evt_017a",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Rano",
      sortUtc: "2026-04-24T06:40:00Z",
      zrodlo: {
        label: "Gol24: Jan Bednarek wspiera akcję",
        url: "https://gol24.pl/lewy-wsparl-akcje-latwogang-jestescie-prawdziwymi-bohaterami/ar/c2-19133849",
      },
      participants: ["Jan Bednarek", "Fundacja Cancer Fighters"],
      category: "guest_appearance",
      description:
        "Jan Bednarek publicznie wspiera akcję i zaprasza podopiecznych Fundacji Cancer Fighters na mecze reprezentacji Polski.",
      tags: ["bednarek", "football", "support", "cancer_fighters"],
    },
    {
      id: "evt_016",
      dateLocal: "2026-04-23",
      relativeTime: "Dzień 7 — Noc",
      sortUtc: "2026-04-23T21:27:00Z",
      zrodlo: {
        label: "wPolsce24: ponad 10 mln i rekordowy stream",
        url: "https://wpolsce24.tv/rozrywka/latwogang-zebral-10-milionow-zl-na-raka-u-dzieci,75525",
      },
      participants: ["Łatwogang", "Bedoes 2115", "Bambi", "Doda", "Robert Lewandowski"],
      category: "milestone_execution",
      description:
        "Media raportują przebicie 10 mln PLN i opisują akcję jako największy stream charytatywny w historii polskiego YouTube. Artykuł notuje też frustrację Łatwoganga po słabym materiale TVP bez kodu QR do zbiórki.",
      tags: ["10m", "record", "tvp", "media"],
    },
    {
      id: "evt_015",
      dateLocal: "2026-04-23",
      relativeTime: "Dzień 7 — Wieczór",
      sortUtc: "2026-04-23T17:18:00Z",
      zrodlo: {
        label: "SportoweFakty: Robert i Anna Lewandowscy na streamie",
        url: "https://sportowefakty.wp.pl/pilka-nozna/1246870/zebrali-ponad-75-mln-zl-podczas-transmisji-nagle-pojawil-sie-lewandowski",
      },
      participants: ["Robert Lewandowski", "Anna Lewandowska", "Mikołaj Bagiński", "Łatwogang"],
      category: "guest_appearance",
      description:
        "Bagi organizuje połączenie z Robertem Lewandowskim. Na streamie pojawia się też Anna Lewandowska, a piłkarz zapowiada wsparcie fundacji, podpisane koszulki FC Barcelony na licytację i spotkanie z podopiecznymi.",
      tags: ["lewandowski", "bagi", "auction", "7_5m"],
    },
    {
      id: "evt_015b",
      dateLocal: "2026-04-24",
      relativeTime: "Dzień 8 — Podsumowanie darczyńców",
      sortUtc: "2026-04-24T11:27:00Z",
      zrodlo: {
        label: "Polskie Radio 24: najwięksi darczyńcy",
        url: "https://polskieradio24.pl/artykul/3678438,9-dni-jedna-piosenka-i-miliony-zlotych-latwogang-jednym-streamem-rozpalil-polske",
      },
      participants: ["Bedoes 2115", "OKI", "Dawid Podsiadło", "Young Leosia", "InPost", "Omenaa Mensah", "NEBOA"],
      category: "core_event",
      description:
        "Media składają listę dużych wpłat: Bedoes 2115 ok. 720 tys. PLN, OKI 180 tys. PLN, Dawid Podsiadło ok. 200 tys. PLN, Young Leosia ok. 113 tys. PLN, InPost i Omenaa Mensah ok. 300 tys. PLN oraz NEBOA 1 mln PLN.",
      tags: ["major_donors", "bedoes", "oki", "podsiadlo", "young_leosia", "neboa"],
    },
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
        "Plejada i GlamRap raportują 5,5 mln PLN po pięciu dniach streamu. Późniejsze podsumowania aktualizują wkład Bedoesa do ok. 720 tys. PLN łącznie, a w czołówce wpłat przewijają się też Oki (180 tys.) i SVM!R (137 tys.).",
      tags: ["5_5m", "bedoes", "720k", "oki", "180k", "svmr", "top_donors"],
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
        label: "Nowy Marketing: telefony Dody na streamie",
        url: "https://nowymarketing.pl/9-dni-miliony-zlotych-i-viralowe-momenty-tak-diss-na-raka-urosl-w-polskim-internecie/",
      },
      participants: ["Doda", "Magda Gessler", "Justyna Steczkowska", "Zenek Martyniuk"],
      category: "guest_appearance",
      description:
        "Support Dody przeradza się w serię viralowych telefonów: rozmowa z Magdą Gessler, kontakt z Justyną Steczkowską i śpiewanie z Zenkiem Martyniukiem przez telefon. To wyraźny wydarzeniowy punkt wieczoru z własnym medialnym echem.",
      tags: ["doda", "magda_gessler", "steczkowska", "zenek", "phone_call", "viral_moment"],
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
      id: "evt_011b",
      dateLocal: "2026-04-23",
      relativeTime: "Dzień 7 — Dedykacja",
      sortUtc: "2026-04-23T14:00:00Z",
      zrodlo: {
        label: "Pudelek: 7 mln zadedykowane Łukaszowi Litewce",
        url: "https://www.pudelek.pl/latwogang-dowiedzial-sie-o-smierci-lukasza-litewki-podczas-streama-wczoraj-ze-soba-rozmawiali-7278439918823840a",
      },
      participants: ["Łatwogang", "Łukasz Litewka"],
      category: "core_event",
      description:
        "Podczas streamu Łatwogang dowiaduje się o śmierci Łukasza Litewki, z którym rozmawiał dzień wcześniej. Przekroczenie 7 mln PLN dedykuje jego pamięci.",
      tags: ["litewka", "dedication", "7m", "emotional_moment"],
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
    {
      id: "evt_038",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Ok. 13:46",
      sortUtc: "2026-04-25T11:46:00Z",
      zrodlo: {
        label: "Plejada: Piniata i przejęcie streamu",
        url: "https://www.onet.pl/styl-zycia/plejada/latwogang-zebral-juz-ponad-31-mln-zl-wsrod-gosci-sebastian-fabijanski/0hs6hsz,0898b825",
      },
      participants: ["Łatwogang", "Maciej Karaś", "Marcel 'Gawronek' Gawroński"],
      category: "core_event",
      description:
        "Zaraz po przekroczeniu 40 mln złotych, Łatwogang symbolicznie roztrzaskał piniatę w kształcie raka. Następnie stream został 'przejęty' przez Macieja Karasia i Marcela 'Gawronka' Gawrońskiego.",
      tags: ["40M", "symbolika", "piniata"],
    },
    {
      id: "evt_039",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Południe",
      sortUtc: "2026-04-25T12:00:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Wpłata Onet-RASP",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Grupa Onet-RASP"],
      category: "core_event",
      description:
        "Oficjalna wpłata korporacyjna: 50 000 PLN od grupy Onet i RASP. W trakcie transmisji odbył się wywiad na żywo dla Onetu.",
      tags: ["wpłata", "media", "50k"],
    },
    {
      id: "evt_040",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Popołudnie",
      sortUtc: "2026-04-25T12:15:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Wpłata Roksany Węgiel",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Roksana Węgiel"],
      category: "core_event",
      description:
        "Prywatna wpłata gwiazdy: 20 000 PLN od wokalistki Roksany Węgiel.",
      tags: ["wpłata", "gwiazdy", "20k"],
    },
    {
      id: "evt_041",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Przy 43 mln",
      sortUtc: "2026-04-25T12:30:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Ekipa Fantasy",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Kamyk", "Koza"],
      category: "guest_appearance",
      description:
        "Na streamie pojawiają się 'Kamyk' i 'Koza' reprezentujący Ekipa Fantasy. Przekazują na oficjalną aukcję charytatywną Puchar Fantasy.",
      tags: ["aukcja", "youtube", "ekipa_fantasy"],
    },
    {
      id: "evt_042",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Przed 44,2 mln",
      sortUtc: "2026-04-25T13:10:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Wpłata Zbyszko",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Zbyszko"],
      category: "core_event",
      description:
        "Oficjalna wpłata korporacyjna: 333 000 PLN od firmy produkującej napoje 'Zbyszko'.",
      tags: ["wpłata", "biznes", "333k"],
    },
    {
      id: "evt_043",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Po 45,3 mln",
      sortUtc: "2026-04-25T13:45:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Maciej Musiał",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Maciej Musiał"],
      category: "guest_appearance",
      description:
        "Na streamie osobiście zjawia się wybitny aktor młodego pokolenia, Maciej Musiał. Chwycił za odkurzacz i pomagał w sprzątaniu kawalerki w trakcie akcji.",
      tags: ["wizyta", "humor", "akt"],
    },
    {
      id: "evt_044",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Przed 57,2 mln",
      sortUtc: "2026-04-25T17:30:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Wpłata Allegro",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Allegro"],
      category: "core_event",
      description:
        "Oficjalna wpłata korporacyjna: 550 000 PLN od giganta e-commerce, firmy Allegro.",
      tags: ["wpłata", "biznes", "550k"],
    },
    {
      id: "evt_045",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Ok. 54,4 mln",
      sortUtc: "2026-04-25T18:15:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Kevin Mglej golony",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Kevin Mglej", "Roksana Węgiel"],
      category: "milestone_execution",
      description:
        "Mąż Roksany Węgiel, Kevin Mglej, dołącza do akcji i na żywo goli głowę na łyso, solidaryzując się z chorymi.",
      tags: ["golenie_głowy", "solidarność"],
    },
    {
      id: "evt_046",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Przy 55,3 mln",
      sortUtc: "2026-04-25T18:40:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Adam Małysz",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Adam Małysz", "Patec"],
      category: "guest_appearance",
      description:
        "Zdalne połączenie ze słynnym polskim skoczkiem narciarskim Adamem Małyszem. Rozmowę prowadził obecny w studiu youtuber 'Patec'.",
      tags: ["sport", "połączenie", "skoki"],
    },
    {
      id: "evt_047",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Przy 56 mln",
      sortUtc: "2026-04-25T18:55:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Michał Wiśniewski",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Michał Wiśniewski"],
      category: "guest_appearance",
      description:
        "Na streamie pojawia się ikona muzyki pop, lider zespołu Ich Troje, Michał Wiśniewski i wykonuje utwór porywając zgromadzonych.",
      tags: ["koncert", "muzyka", "ich_troje"],
    },
    {
      id: "evt_048",
      dateLocal: "2026-04-25",
      relativeTime: "Dzień 9 — Ok. 61,6 mln",
      sortUtc: "2026-04-25T19:40:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Eveline Cosmetics",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Eveline Cosmetics"],
      category: "core_event",
      description:
        "Oficjalna wpłata korporacyjna: 1 000 000 PLN od firmy kosmetycznej Eveline Cosmetics.",
      tags: ["wpłata", "biznes", "1m"],
    },
    {
      id: "evt_049",
      dateLocal: "2026-04-25",
      relativeTime: "Noc Dnia 9 — Przy 80 mln",
      sortUtc: "2026-04-25T23:30:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Grzegorz Hyży",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Grzegorz Hyży"],
      category: "milestone_execution",
      description:
        "Popularny wokalista popowy Grzegorz Hyży dołącza do 'gangu łysych', goląc głowę na zero na znak solidarności.",
      tags: ["golenie_głowy", "solidarność", "muzyka"],
    },
    {
      id: "evt_050",
      dateLocal: "2026-04-26",
      relativeTime: "Dzień 10 — Poranek",
      sortUtc: "2026-04-26T07:00:00Z",
      zrodlo: {
        label: "Przegląd Sportowy Onet: Siles i DKMS",
        url: "https://przegladsportowy.onet.pl/esportmania/influencerzy/na-zywo-spektakularna-akcja-latwoganga-sa-kolejne-gwiazdy-relacja-live/ppymzyx",
      },
      participants: ["Siles", "Fundacja DKMS"],
      category: "core_event",
      description:
        "Czołowy polski komentator CS2 'Siles' ogolił głowę na żywo. Na streamie pojawiła się drużyna Fundacji DKMS, wspierająca akcję.",
      tags: ["golenie_głowy", "fundacja", "esport"],
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
