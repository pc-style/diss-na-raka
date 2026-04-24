import { describe, expect, test } from "bun:test";
import {
  estimateGrowthPlnPerSecond,
  estimateRaisedAtTime,
} from "@/lib/live-counter";
import { counterHistory, seedSiteData } from "@/lib/site-data";

describe("live counter estimation", () => {
  test("prefers the most recent timestamped interval", () => {
    const rate = estimateGrowthPlnPerSecond(seedSiteData.dashboard, counterHistory);
    const previous = counterHistory.at(-2);
    const latest = counterHistory.at(-1);

    if (!previous || !latest) {
      throw new Error("Expected at least two counter history snapshots.");
    }

    const expectedRate =
      (latest.amount - previous.amount) /
      ((new Date(latest.atUtc).getTime() -
        new Date(previous.atUtc).getTime()) /
        1000);

    expect(rate).toBeCloseTo(expectedRate, 1);
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
