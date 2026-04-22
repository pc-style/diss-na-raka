import { describe, expect, test } from "bun:test";
import {
  authorizeUpdateRequest,
  mergeSiteDataPatch,
  seedSiteData,
} from "../lib/site-data";

describe("authorizeUpdateRequest", () => {
  test("accepts bearer authorization header", () => {
    const headers = new Headers({
      authorization: "Bearer super-secret",
    });

    expect(authorizeUpdateRequest(headers, "super-secret")).toBe(true);
  });

  test("accepts x-update-token header", () => {
    const headers = new Headers({
      "x-update-token": "side-channel-token",
    });

    expect(authorizeUpdateRequest(headers, "side-channel-token")).toBe(true);
  });

  test("rejects when the env token is missing", () => {
    const headers = new Headers({
      authorization: "Bearer super-secret",
    });

    expect(authorizeUpdateRequest(headers, "")).toBe(false);
  });
});

describe("mergeSiteDataPatch", () => {
  test("merges partial dashboard updates and refreshes the timestamp", () => {
    const next = mergeSiteDataPatch(seedSiteData, {
      dashboard: {
        totalRaisedPln: 5_000_000,
        metadata: {
          lastUpdatedUtc: "2026-04-23T08:15:00Z",
        },
      },
    });

    expect(next.dashboard.totalRaisedPln).toBe(5_000_000);
    expect(next.dashboard.metadata.lastUpdatedUtc).toBe("2026-04-23T08:15:00Z");
    expect(next.milestones).toEqual(seedSiteData.milestones);
    expect(next.timelineEvents).toEqual(seedSiteData.timelineEvents);
  });

  test("replaces collections only when they are provided", () => {
    const next = mergeSiteDataPatch(seedSiteData, {
      milestones: [
        {
          ...seedSiteData.milestones[0],
          status: "pending",
          dateAchieved: null,
        },
      ],
    });

    expect(next.milestones).toHaveLength(1);
    expect(next.milestones[0]?.status).toBe("pending");
    expect(next.timelineEvents).toEqual(seedSiteData.timelineEvents);
  });
});
