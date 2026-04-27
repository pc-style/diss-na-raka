"use client";

import { useEffect, useState } from "react";
import type { DashboardState } from "@/lib/site-data";
import { formatDateTimeGmtPlus2 } from "@/lib/time";

/**
 * Hours elapsed + loop counter computed client-side from startTimestampUtc
 * so it visibly ticks without needing server refresh. When a real WS feed is
 * wired up, total counter will overwrite these derived values.
 */
export function LiveClock({ dashboard }: { dashboard: DashboardState }) {
  const start = new Date(dashboard.metadata.startTimestampUtc).getTime();
  const end = dashboard.metadata.endTimestampUtc
    ? new Date(dashboard.metadata.endTimestampUtc).getTime()
    : null;
  const trackSec = dashboard.metadata.trackLengthSeconds;

  // Initial state MUST be deterministic on server + first client render to
  // avoid hydration mismatch. We anchor to `lastUpdatedUtc` from the seed
  // data, then switch to real time once mounted.
  const anchor = new Date(dashboard.metadata.lastUpdatedUtc).getTime();
  const [tick, setTick] = useState(anchor);
  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // If stream has ended, cap elapsed time at the end timestamp
  const effectiveNow = end && tick > end ? end : tick;
  const elapsedMs = Math.max(0, effectiveNow - start);
  const totalSec = Math.floor(elapsedMs / 1000);
  const days = Math.floor(totalSec / 86_400);
  const hours = Math.floor((totalSec % 86_400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const loops = Math.floor(totalSec / trackSec);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const hasEnded = end && tick >= end;

  return (
    <div className="grid grid-cols-1 gap-0 hairline-box divide-y divide-[var(--color-hair)]">
      <div className="p-4">
        <div className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
          {hasEnded ? "CZAS NA ANTENIE · ZAKOŃCZONE" : "CZAS NA ANTENIE"}
        </div>
        <div className="mt-2 font-display tnum leading-none text-[clamp(22px,2.1vw,30px)] whitespace-nowrap">
          {days}
          <span className="text-paper-dim">d </span>
          {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
        <div className="mt-2 font-mono text-[10px] text-paper-dim">
          od {formatDateTimeGmtPlus2(dashboard.metadata.startTimestampUtc)}
        </div>
      </div>
      <div className="p-4 relative">
        <div className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
          LICZNIK PĘTLI · {Math.floor(trackSec / 60)}:
          {String(trackSec % 60).padStart(2, "0")}
        </div>
        <div className="mt-2 font-display tnum leading-none text-paper text-[clamp(22px,2.1vw,30px)] whitespace-nowrap">
          {loops.toLocaleString("pl-PL")}×
        </div>
        <div className="mt-2 font-mono text-[10px] text-paper-dim line-clamp-1">
          „Ciągle tutaj jestem (diss na raka)”
        </div>
      </div>
    </div>
  );
}
