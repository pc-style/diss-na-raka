"use client";

import type { ReactNode } from "react";
import { LiveCounterProvider, type CounterSnapshot } from "@/lib/live-counter";
import type { DashboardState } from "@/lib/site-data";

export function SiteLiveCounterProvider({
  dashboard,
  snapshots,
  children,
}: {
  dashboard: DashboardState;
  snapshots: CounterSnapshot[];
  children: ReactNode;
}) {
  return (
    <LiveCounterProvider dashboard={dashboard} snapshots={snapshots}>
      {children}
    </LiveCounterProvider>
  );
}
