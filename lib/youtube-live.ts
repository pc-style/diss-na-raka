import type { DashboardState, SiteDataPatch } from "@/lib/site-data";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

interface YouTubeSearchResponse {
  items?: Array<{
    id?: {
      videoId?: string;
    };
    snippet?: {
      title?: string;
      liveBroadcastContent?: string;
    };
  }>;
}

interface YouTubeVideosResponse {
  items?: Array<{
    id?: string;
    snippet?: {
      title?: string;
      liveBroadcastContent?: string;
      channelId?: string;
    };
    liveStreamingDetails?: {
      actualStartTime?: string;
      actualEndTime?: string;
      scheduledStartTime?: string;
      concurrentViewers?: string;
    };
    statistics?: {
      viewCount?: string;
    };
  }>;
}

export interface YouTubeLiveSnapshot {
  videoId: string;
  title: string;
  url: string;
  channelId: string;
  concurrentViewers: number | null;
  viewCount: number | null;
  actualStartTime: string | null;
  actualEndTime: string | null;
  liveBroadcastContent: string | null;
  polledAtUtc: string;
}

function parseCount(value: string | undefined) {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

async function youtubeFetch<T>(
  pathname: string,
  params: Record<string, string | number | undefined>,
  apiKey: string,
  fetchImpl: typeof fetch,
) {
  const url = new URL(`${YOUTUBE_API_BASE}${pathname}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  url.searchParams.set("key", apiKey);

  const response = await fetchImpl(url, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `YouTube API request failed with ${response.status} ${response.statusText}: ${await response.text()}`,
    );
  }

  return (await response.json()) as T;
}

async function fetchVideoDetails(
  videoId: string,
  apiKey: string,
  fetchImpl: typeof fetch,
) {
  const response = await youtubeFetch<YouTubeVideosResponse>(
    "/videos",
    {
      id: videoId,
      part: "snippet,liveStreamingDetails,statistics",
      maxResults: 1,
    },
    apiKey,
    fetchImpl,
  );

  return response.items?.[0] ?? null;
}

async function findLiveVideoId(
  channelId: string,
  apiKey: string,
  fetchImpl: typeof fetch,
) {
  const response = await youtubeFetch<YouTubeSearchResponse>(
    "/search",
    {
      channelId,
      eventType: "live",
      maxResults: 1,
      order: "date",
      part: "snippet",
      type: "video",
    },
    apiKey,
    fetchImpl,
  );

  return response.items?.[0]?.id?.videoId ?? null;
}

export async function fetchActiveYouTubeLiveSnapshot(
  {
    apiKey,
    channelId,
    currentVideoId,
  }: {
    apiKey: string;
    channelId: string;
    currentVideoId?: string;
  },
  fetchImpl: typeof fetch = fetch,
) {
  let selectedVideoId = currentVideoId ?? null;
  let video = selectedVideoId
    ? await fetchVideoDetails(selectedVideoId, apiKey, fetchImpl)
    : null;

  const cachedVideoStillLive =
    video &&
    !video.liveStreamingDetails?.actualEndTime &&
    (video.snippet?.liveBroadcastContent === "live" ||
      Boolean(video.liveStreamingDetails?.concurrentViewers));

  if (!cachedVideoStillLive) {
    selectedVideoId = await findLiveVideoId(channelId, apiKey, fetchImpl);
    if (!selectedVideoId) {
      return null;
    }

    video = await fetchVideoDetails(selectedVideoId, apiKey, fetchImpl);
  }

  if (!video?.id) {
    return null;
  }

  return {
    videoId: video.id,
    title: video.snippet?.title ?? "YouTube Live",
    url: `https://www.youtube.com/watch?v=${video.id}`,
    channelId: video.snippet?.channelId ?? channelId,
    concurrentViewers: parseCount(video.liveStreamingDetails?.concurrentViewers),
    viewCount: parseCount(video.statistics?.viewCount),
    actualStartTime: video.liveStreamingDetails?.actualStartTime ?? null,
    actualEndTime: video.liveStreamingDetails?.actualEndTime ?? null,
    liveBroadcastContent: video.snippet?.liveBroadcastContent ?? null,
    polledAtUtc: new Date().toISOString(),
  } satisfies YouTubeLiveSnapshot;
}

function getElapsedHours(startTimestampUtc: string, nowUtc: string) {
  const elapsedMs =
    new Date(nowUtc).getTime() - new Date(startTimestampUtc).getTime();

  return Math.max(0, Math.floor(elapsedMs / (60 * 60 * 1000)));
}

function getEstimatedTotalLoops(
  hoursElapsed: number,
  trackLengthSeconds: number,
) {
  if (trackLengthSeconds <= 0) {
    return 0;
  }

  return Math.floor((hoursElapsed * 60 * 60) / trackLengthSeconds);
}

function getAveragePlnPerHour(totalRaisedPln: number, hoursElapsed: number) {
  if (hoursElapsed <= 0) {
    return totalRaisedPln;
  }

  return Number((totalRaisedPln / hoursElapsed).toFixed(2));
}

export function buildYouTubeLivePatch(
  dashboard: DashboardState,
  snapshot: YouTubeLiveSnapshot,
): SiteDataPatch {
  const hoursElapsed = getElapsedHours(
    dashboard.metadata.startTimestampUtc,
    snapshot.polledAtUtc,
  );

  return {
    dashboard: {
      hoursElapsed,
      estimatedTotalLoops: getEstimatedTotalLoops(
        hoursElapsed,
        dashboard.metadata.trackLengthSeconds,
      ),
      metadata: {
        lastYouTubeSyncUtc: snapshot.polledAtUtc,
        currentLiveVideoId: snapshot.videoId,
        currentLiveVideoTitle: snapshot.title,
        currentLiveVideoUrl: snapshot.url,
      },
      engagement: {
        averageConcurrentViewers:
          snapshot.concurrentViewers ?? dashboard.engagement.averageConcurrentViewers,
        totalViewsGenerated:
          snapshot.viewCount ?? dashboard.engagement.totalViewsGenerated,
      },
      velocity: {
        averagePlnPerHour: getAveragePlnPerHour(
          dashboard.totalRaisedPln,
          hoursElapsed,
        ),
      },
    },
  };
}
