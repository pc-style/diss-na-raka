import { describe, expect, test } from "bun:test";
import {
  estimateGrowthPlnPerSecond,
  estimateRaisedAtTime,
} from "@/lib/live-counter";
import { counterHistory, seedSiteData } from "@/lib/site-data";

describe("live counter estimation", () => {
  test("prefers the most recent timestamped interval", () => {
    const rate = estimateGrowthPlnPerSecond(seedSiteData.dashboard, counterHistory);

    expect(rate).toBeCloseTo(43.4, 1);
  });

  test("grows forward from the last confirmed snapshot", () => {
    const rate = estimateGrowthPlnPerSecond(seedSiteData.dashboard, counterHistory);
    const tenSecondsLater =
      new Date(seedSiteData.dashboard.metadata.lastUpdatedUtc).getTime() + 10_000;

    expect(
      estimateRaisedAtTime(seedSiteData.dashboard, rate, tenSecondsLater),
    ).toBe(seedSiteData.dashboard.totalRaisedPln + Math.round(rate * 10));
  });
});
