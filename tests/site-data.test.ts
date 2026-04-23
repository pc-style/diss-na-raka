import { describe, expect, test } from "bun:test";
import {
  authorizeUpdateRequest,
  mergeSiteDataPatch,
  normalizeTimelineEvents,
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
    expect(next.timelineEvents).toEqual(
      normalizeTimelineEvents(seedSiteData.timelineEvents),
    );
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
    expect(next.timelineEvents).toEqual(
      normalizeTimelineEvents(seedSiteData.timelineEvents),
    );
  });

  test("sorts replacement timeline events into reverse chronological order", () => {
    const next = mergeSiteDataPatch(seedSiteData, {
      timelineEvents: [
        {
          id: "pending",
          dateLocal: "TBD",
          relativeTime: "Oczekujące",
          participants: [],
          category: "scheduled_appearance",
          description: "Pending guest slot.",
          tags: ["upcoming"],
        },
        {
          id: "older",
          dateLocal: "2026-04-22",
          relativeTime: "Dzień 6 — Wieczór",
          participants: [],
          category: "guest_appearance",
          description: "Older event.",
          tags: ["older"],
        },
        {
          id: "newer-late",
          dateLocal: "2026-04-23",
          relativeTime: "Dzień 7 — Noc",
          participants: [],
          category: "endurance_challenge",
          description: "Newest late event.",
          tags: ["newer"],
        },
        {
          id: "newer-early",
          dateLocal: "2026-04-23",
          relativeTime: "Dzień 7 — 07:55",
          participants: [],
          category: "milestone_execution",
          description: "Earlier event on the newest day.",
          tags: ["newer"],
        },
      ],
    });

    expect(next.timelineEvents.map((event) => event.id)).toEqual([
      "newer-late",
      "newer-early",
      "older",
      "pending",
    ]);
  });
});

describe("normalizeTimelineEvents", () => {
  test("prefers explicit sortUtc when it is available", () => {
    const events = normalizeTimelineEvents([
      {
        id: "fallback",
        dateLocal: "2026-04-23",
        relativeTime: "Dzień 7 — Wieczór",
        participants: [],
        category: "guest_appearance",
        description: "Fallback event.",
        tags: ["fallback"],
      },
      {
        id: "exact",
        dateLocal: "2026-04-23",
        relativeTime: "Dzień 7 — Poranek",
        sortUtc: "2026-04-23T23:45:00Z",
        participants: [],
        category: "milestone_execution",
        description: "Exact timestamp event.",
        tags: ["exact"],
      },
    ]);

    expect(events.map((event) => event.id)).toEqual(["exact", "fallback"]);
  });
});
