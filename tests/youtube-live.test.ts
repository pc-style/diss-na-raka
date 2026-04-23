import { describe, expect, test } from "bun:test";
import { seedSiteData } from "@/lib/site-data";
import {
  buildYouTubeLivePatch,
  fetchActiveYouTubeLiveSnapshot,
} from "@/lib/youtube-live";

describe("buildYouTubeLivePatch", () => {
  test("updates YouTube-side metrics without replacing the money snapshot time", () => {
    const patch = buildYouTubeLivePatch(seedSiteData.dashboard, {
      videoId: "live123",
      title: "Fresh live title",
      url: "https://www.youtube.com/watch?v=live123",
      channelId: seedSiteData.dashboard.metadata.channelId,
      concurrentViewers: 42_500,
      viewCount: 3_210_000,
      actualStartTime: "2026-04-17T00:00:00Z",
      actualEndTime: null,
      liveBroadcastContent: "live",
      polledAtUtc: "2026-04-23T12:00:00Z",
    });

    expect(patch.dashboard?.metadata?.lastUpdatedUtc).toBeUndefined();
    expect(patch.dashboard?.metadata?.lastYouTubeSyncUtc).toBe(
      "2026-04-23T12:00:00Z",
    );
    expect(patch.dashboard?.engagement?.averageConcurrentViewers).toBe(42_500);
    expect(patch.dashboard?.engagement?.totalViewsGenerated).toBe(3_210_000);
    expect(patch.dashboard?.metadata?.currentLiveVideoId).toBe("live123");
  });
});

describe("fetchActiveYouTubeLiveSnapshot", () => {
  test("reuses the cached live video id when it is still live", async () => {
    const fetchMock: typeof fetch = (async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();

      if (url.includes("/videos?")) {
        return new Response(
          JSON.stringify({
            items: [
              {
                id: "cached123",
                snippet: {
                  title: "Cached live",
                  liveBroadcastContent: "live",
                  channelId: "channel123",
                },
                liveStreamingDetails: {
                  actualStartTime: "2026-04-17T00:00:00Z",
                  concurrentViewers: "9876",
                },
                statistics: {
                  viewCount: "123456",
                },
              },
            ],
          }),
          { status: 200 },
        );
      }

      throw new Error(`Unexpected URL ${url}`);
    }) as typeof fetch;

    const snapshot = await fetchActiveYouTubeLiveSnapshot(
      {
        apiKey: "yt-key",
        channelId: "channel123",
        currentVideoId: "cached123",
      },
      fetchMock,
    );

    expect(snapshot?.videoId).toBe("cached123");
    expect(snapshot?.concurrentViewers).toBe(9_876);
    expect(snapshot?.viewCount).toBe(123_456);
  });
});
