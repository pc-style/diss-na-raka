import { NextResponse } from "next/server";
import { getSiteData, updateSiteData } from "@/lib/data-store";
import { authorizeUpdateRequest } from "@/lib/site-data";
import {
  buildYouTubeLivePatch,
  fetchActiveYouTubeLiveSnapshot,
} from "@/lib/youtube-live";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const updateToken = process.env.DATA_UPDATE_TOKEN;

    if (!updateToken) {
      return NextResponse.json(
        { error: "DATA_UPDATE_TOKEN is not configured." },
        { status: 500 },
      );
    }

    if (!authorizeUpdateRequest(request.headers, updateToken)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const current = await getSiteData();
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId =
      process.env.YOUTUBE_CHANNEL_ID ?? current.dashboard.metadata.channelId;

    if (!apiKey) {
      return NextResponse.json(
        { error: "YOUTUBE_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const snapshot = await fetchActiveYouTubeLiveSnapshot({
      apiKey,
      channelId,
      currentVideoId: current.dashboard.metadata.currentLiveVideoId,
    });

    if (!snapshot) {
      return NextResponse.json(
        { error: "No active live video found for this channel." },
        { status: 404 },
      );
    }

    const data = await updateSiteData(
      buildYouTubeLivePatch(current.dashboard, snapshot),
    );

    return NextResponse.json({
      ok: true,
      snapshot,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "YouTube sync failed.",
      },
      { status: 500 },
    );
  }
}
