# YouTube sync

This tracker can poll YouTube Data API live metadata without exposing the API key to the browser.

## Required env

```bash
DATA_UPDATE_TOKEN=...
YOUTUBE_API_KEY=...
```

Optional:

```bash
YOUTUBE_CHANNEL_ID=UCjpBbH8NmL4XHVUgJurDPZg
```

If `YOUTUBE_CHANNEL_ID` is omitted, the app falls back to `dashboard.metadata.channelId`.

## Route

Protected server route:

```text
POST /api/youtube-sync
```

Auth headers:

- `Authorization: Bearer <DATA_UPDATE_TOKEN>`
- `x-update-token: <DATA_UPDATE_TOKEN>`

## What it syncs

- active live video ID
- active live video title
- active live video URL
- concurrent viewers
- total views
- `hoursElapsed`
- `estimatedTotalLoops`
- `lastYouTubeSyncUtc`

## What it does not sync

The YouTube Data API does not expose the donation total from the stream overlay or Tipply, so `dashboard.totalRaisedPln` still has to be updated through the normal manual flow.

## CLI

One-shot:

```bash
bun run sync:youtube
```

Polling loop:

```bash
bun run sync:youtube --watch
```

The default polling interval is 30 seconds. Override it when needed:

```bash
bun run sync:youtube --watch --interval-ms 45000
```
