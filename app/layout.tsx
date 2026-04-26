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

export const metadata: Metadata = {
  metadataBase: new URL("https://latwo-x-cancerfighters.pcstyle.dev"),
  title: "DISS NA RAKA · Tablica Streamu",
  description:
    "Nieoficjalna tablica sterownicza streamu Łatwogang × Cancer Fighters. Ręcznie zbierane snapshoty zbiórki, harmonogram kamieni milowych i oś czasu gości.",
  alternates: {
    canonical: "https://latwo-x-cancerfighters.pcstyle.dev",
  },
  openGraph: {
    title: "DISS NA RAKA · Tablica Streamu",
    description:
      "Ręcznie aktualizowany fan tracker dla streamu Łatwogang × Cancer Fighters.",
    url: "https://latwo-x-cancerfighters.pcstyle.dev",
    siteName: "Diss na raka",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DISS NA RAKA · Tablica Streamu",
    description:
      "Ręcznie aktualizowany fan tracker dla streamu Łatwogang × Cancer Fighters.",
  },
};

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
        <Analytics />
      </body>
    </html>
  );
}
