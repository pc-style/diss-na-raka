"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DashboardState } from "./site-data";

export interface CounterSnapshot {
  amount: number;
  atUtc: string;
  source: string;
}

interface LiveCounterValue {
  estimatedRaisedPln: number;
  growthPlnPerSecond: number;
}

const LiveCounterContext = createContext<LiveCounterValue | null>(null);

const MAX_HISTORY_POINTS = 4;

function toMillis(utc: string) {
  return new Date(utc).getTime();
}

export function estimateGrowthPlnPerSecond(
  dashboard: DashboardState,
  snapshots: CounterSnapshot[],
) {
  const currentPoint: CounterSnapshot = {
    amount: dashboard.totalRaisedPln,
    atUtc: dashboard.metadata.lastUpdatedUtc,
    source: "dashboard",
  };

  const points = [...snapshots, currentPoint]
    .filter((point) => Number.isFinite(toMillis(point.atUtc)))
    .sort((a, b) => toMillis(a.atUtc) - toMillis(b.atUtc));

  const uniquePoints = points.filter((point, index, arr) => {
    const previous = arr[index - 1];
    return !previous || previous.atUtc !== point.atUtc || previous.amount !== point.amount;
  });

  const recentPoints = uniquePoints.slice(-MAX_HISTORY_POINTS);
  const intervals = recentPoints
    .slice(1)
    .map((point, index) => {
      const previous = recentPoints[index];
      const elapsedSeconds = Math.round(
        (toMillis(point.atUtc) - toMillis(previous.atUtc)) / 1000,
      );
      const delta = point.amount - previous.amount;

      if (elapsedSeconds <= 0 || delta <= 0) {
        return null;
      }

      return delta / elapsedSeconds;
    })
    .filter((rate): rate is number => rate !== null);

  if (intervals.length > 0) {
    return intervals[intervals.length - 1] ?? 0;
  }

  return dashboard.velocity.averagePlnPerHour / 3600;
}

export function estimateRaisedAtTime(
  dashboard: DashboardState,
  growthPlnPerSecond: number,
  nowMs: number,
) {
  const anchorMs = toMillis(dashboard.metadata.lastUpdatedUtc);
  const elapsedSeconds = Math.max(0, Math.floor((nowMs - anchorMs) / 1000));
  return Math.max(
    dashboard.totalRaisedPln,
    Math.round(dashboard.totalRaisedPln + elapsedSeconds * growthPlnPerSecond),
  );
}

export function LiveCounterProvider({
  dashboard,
  children,
}: {
  dashboard: DashboardState;
  snapshots: CounterSnapshot[];
  children: ReactNode;
}) {
  const anchorMs = toMillis(dashboard.metadata.lastUpdatedUtc);
  const [nowMs, setNowMs] = useState(anchorMs);

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Disabled live extrapolation for the night
  const growthPlnPerSecond = 100;

  const value = useMemo(
    () => ({
      estimatedRaisedPln: estimateRaisedAtTime(dashboard, growthPlnPerSecond, nowMs),
      growthPlnPerSecond,
    }),
    [dashboard, growthPlnPerSecond, nowMs],
  );

  return (
    <LiveCounterContext.Provider value={value}>
      {children}
    </LiveCounterContext.Provider>
  );
}

export function useLiveCounter(dashboard: DashboardState) {
  const context = useContext(LiveCounterContext);
  if (!context) {
    return {
      estimatedRaisedPln: dashboard.totalRaisedPln,
      growthPlnPerSecond: dashboard.velocity.averagePlnPerHour / 3600,
    };
  }

  return context;
}
