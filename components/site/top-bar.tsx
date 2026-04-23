"use client";

import type { DashboardState } from "@/lib/site-data";
import { formatDateTimeGmtPlus2 } from "@/lib/time";
import { useLiveCounter } from "@/lib/live-counter";

const fillerGlyphs = ["◆", "◇", "✶", "×", "◉", "▲"];

function buildTickerSegmentsFromDashboard(
  dashboard: DashboardState,
  estimatedRaisedPln: number,
) {
  const now = formatDateTimeGmtPlus2(dashboard.metadata.lastUpdatedUtc);
  const raw = [
    `NA ŻYWO · ŁATWOGANG × CANCER FIGHTERS`,
    `DZIEŃ ${Math.floor(dashboard.hoursElapsed / 24) + 1} / 9`,
    `PĘTLA ${dashboard.estimatedTotalLoops.toLocaleString("pl-PL")}`,
    `UTWÓR: ${dashboard.metadata.trackTitle.toUpperCase()}`,
    `BEDOES 2115 × MAJA MECAN`,
    `ZEBRANE: ${estimatedRaisedPln.toLocaleString("pl-PL")} PLN`,
    `OSTATNI SNAPSHOT ${now}`,
  ];
  return raw;
}

export function TopBar({ dashboard }: { dashboard: DashboardState }) {
  const { estimatedRaisedPln } = useLiveCounter(dashboard);
  const segments = buildTickerSegmentsFromDashboard(dashboard, estimatedRaisedPln);
  // Duplicate so the -50% keyframe loops seamlessly
  const loop = [...segments, ...segments];
  return (
    <div className="relative hairline-b overflow-hidden bg-ink-2">
      <div className="flex items-stretch">
        <div className="shrink-0 hairline-r px-3 py-2 flex items-center gap-2">
          <span className="live-dot block size-2 rounded-full bg-accent" />
          <span className="font-mono text-[10px] tracking-[0.24em] text-accent">
            NA ŻYWO
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker-track whitespace-nowrap py-2 text-paper-dim">
            {loop.map((seg, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 pr-8 font-mono text-[11px] tracking-[0.14em]"
              >
                <span className="text-accent/80">
                  {fillerGlyphs[i % fillerGlyphs.length]}
                </span>
                <span>{seg}</span>
              </span>
            ))}
          </div>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink-2 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink-2 to-transparent" />
        </div>
        <div className="hidden sm:block shrink-0 hairline-l px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-paper-dim">
          TAPE · 07
        </div>
      </div>
    </div>
  );
}
