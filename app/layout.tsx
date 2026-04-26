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
    default: "DISS NA RAKA · Tablica Streamu",
    template: "%s · DISS NA RAKA",
  },
  description:
    "Nieoficjalna tablica sterownicza streamu Łatwogang × Cancer Fighters. Ręcznie zbierane snapshoty zbiórki, harmonogram kamieni milowych i oś czasu gości.",
  applicationName: "DISS NA RAKA",
  authors: [{ name: "pcstyle", url: "https://pcstyle.dev" }],
  creator: "pcstyle",
  publisher: "pcstyle",
  keywords: [
    "Łatwogang",
    "Cancer Fighters",
    "DISS NA RAKA",
    "stream charytatywny",
    "zbiórka",
    "Siepomaga",
    "fan tracker",
    "tablica streamu",
    "Latwogang x Cancer Fighters",
    "diss na raka",
  ],
  category: "charity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DISS NA RAKA · Tablica Streamu",
    description:
      "Ręcznie aktualizowany fan tracker dla streamu Łatwogang × Cancer Fighters.",
    url: SITE_URL,
    siteName: "DISS NA RAKA",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DISS NA RAKA · Tablica Streamu",
    description:
      "Ręcznie aktualizowany fan tracker dla streamu Łatwogang × Cancer Fighters.",
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
    alternateName: "Łatwogang × Cancer Fighters Tracker",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Nieoficjalny fan tracker streamu charytatywnego Łatwogang × Cancer Fighters.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DISS NA RAKA · Tablica Streamu",
    url: SITE_URL,
    inLanguage: "pl-PL",
    description:
      "Ręcznie aktualizowany fan tracker streamu Łatwogang × Cancer Fighters: snapshoty zbiórki, kamienie milowe i oś czasu gości.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BroadcastEvent",
    name: "Łatwogang × Cancer Fighters · DISS NA RAKA",
    description:
      "Charytatywny stream Łatwogang × Cancer Fighters wspierający walkę z rakiem.",
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
