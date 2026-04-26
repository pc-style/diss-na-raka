import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Archivo_Black,
  JetBrains_Mono,
  Fraunces,
  Caveat,
} from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin", "latin-ext"],
});

const SITE_URL = "https://latwo-x-cancerfighters.pcstyle.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "DISS NA RAKA · Łatwogang × Cancer Fighters · Tablica Streamu",
    template: "%s · DISS NA RAKA · Łatwogang × Cancer Fighters",
  },
  description:
    "Łatwogang Cancer Fighters (Łatwo x Cancer) — nieoficjalna tablica streamu DISS NA RAKA. Ręcznie zbierane snapshoty zbiórki, kamienie milowe, top darczyńcy i oś czasu gości streamu charytatywnego Latwogang Cancerfighters.",
  applicationName: "DISS NA RAKA · Łatwogang × Cancer Fighters",
  authors: [{ name: "pcstyle", url: "https://pcstyle.dev" }],
  creator: "pcstyle",
  publisher: "pcstyle",
  keywords: [
    "latwogang cancerfighters",
    "łatwogang cancer fighters",
    "łatwogang cancerfighters",
    "latwogang cancer fighters",
    "latwo x cancer",
    "łatwo x cancer",
    "latwo x cancerfighters",
    "łatwo x cancerfighters",
    "latwo cancer fighters",
    "łatwo cancer fighters",
    "latwogang x cancer fighters",
    "łatwogang x cancer fighters",
    "latwogang x cancerfighters",
    "łatwogang x cancerfighters",
    "diss na raka",
    "DISS NA RAKA",
    "diss na raka stream",
    "diss na raka zbiórka",
    "Łatwogang",
    "Latwogang",
    "Cancer Fighters",
    "Cancerfighters",
    "stream charytatywny Łatwogang",
    "stream charytatywny Cancer Fighters",
    "zbiórka Łatwogang",
    "zbiórka Cancer Fighters",
    "Siepomaga Cancer Fighters",
    "Siepomaga Łatwogang",
    "fan tracker Łatwogang",
    "tablica streamu Łatwogang",
    "tracker zbiórki Cancer Fighters",
    "Łatwogang stream 2026",
    "Cancer Fighters stream 2026",
  ],
  category: "charity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "DISS NA RAKA · Łatwogang × Cancer Fighters (Łatwo x Cancer) — Tablica Streamu",
    description:
      "Łatwogang Cancer Fighters (Latwo x Cancer) — fan tracker streamu DISS NA RAKA: zbiórka, top darczyńcy, oś czasu gości.",
    url: SITE_URL,
    siteName: "DISS NA RAKA · Łatwogang × Cancer Fighters",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DISS NA RAKA · Łatwogang × Cancer Fighters — Tablica Streamu",
    description:
      "Łatwogang Cancer Fighters (Łatwo x Cancer) fan tracker: zbiórka DISS NA RAKA, top darczyńcy, oś czasu gości.",
    creator: "@pcstyle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DISS NA RAKA",
    alternateName: [
      "Łatwogang × Cancer Fighters",
      "Łatwogang Cancer Fighters",
      "Latwogang Cancer Fighters",
      "Latwogang Cancerfighters",
      "Łatwo x Cancer",
      "Latwo x Cancer",
      "Łatwo x Cancerfighters",
      "Łatwogang × Cancer Fighters Tracker",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Nieoficjalny fan tracker streamu charytatywnego Łatwogang × Cancer Fighters (Łatwo x Cancer).",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DISS NA RAKA · Łatwogang × Cancer Fighters · Tablica Streamu",
    alternateName: [
      "Łatwogang Cancer Fighters Tracker",
      "Latwogang Cancerfighters Tracker",
      "Łatwo x Cancer Tracker",
    ],
    url: SITE_URL,
    inLanguage: "pl-PL",
    description:
      "Ręcznie aktualizowany fan tracker streamu Łatwogang × Cancer Fighters (Łatwo x Cancer): snapshoty zbiórki, kamienie milowe, top darczyńcy i oś czasu gości.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BroadcastEvent",
    name: "Łatwogang × Cancer Fighters · DISS NA RAKA",
    alternateName: [
      "Łatwo x Cancer",
      "Latwogang Cancerfighters",
      "DISS NA RAKA stream",
    ],
    description:
      "Charytatywny stream Łatwogang × Cancer Fighters (Łatwo x Cancer) wspierający walkę z rakiem.",
    startDate: "2026-04-22T22:00:00+02:00",
    endDate: "2026-04-26T00:00:00+02:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    isAccessibleForFree: true,
    inLanguage: "pl-PL",
    location: {
      "@type": "VirtualLocation",
      url: SITE_URL,
    },
    organizer: {
      "@type": "Organization",
      name: "Łatwogang × Cancer Fighters",
    },
    about: "Zbiórka charytatywna na rzecz walki z rakiem.",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${archivoBlack.variable} ${jetbrains.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper bg-paper-stain selection:bg-accent selection:text-ink">
        {/* Global SVG defs — hand-drawn marker wobble filter */}
        <svg
          aria-hidden
          className="absolute size-0 overflow-hidden"
          focusable="false"
        >
          <defs>
            <filter id="marker-wobble">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.022"
                numOctaves="2"
                seed="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.4"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
