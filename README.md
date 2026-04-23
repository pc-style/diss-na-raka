# Diss na raka

Fan-made tracker for the Łatwogang × Cancer Fighters stream.

- Production URL: [latwo-x-cancerfighters.pcstyle.dev](https://latwo-x-cancerfighters.pcstyle.dev)
- Repo: [pc-style/diss-na-raka](https://github.com/pc-style/diss-na-raka)
- Support / data help: [x.com/@pcstyle53](https://x.com/pcstyle53)

The PLN total is manually updated. The site serves the current dataset through `GET /api/data`, accepts authenticated manual updates through `PUT /api/data`, and can sync YouTube live stats through `POST /api/youtube-sync`.

## Local development

Install deps and start the app with Bun:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
DATA_UPDATE_TOKEN=your-long-random-token
YOUTUBE_API_KEY=your-youtube-data-api-key
```

Optional for production-like local storage:

```bash
BLOB_READ_WRITE_TOKEN=...
```

Without `BLOB_READ_WRITE_TOKEN`, local updates are written to `data/site-data.json`.

Optional channel override:

```bash
YOUTUBE_CHANNEL_ID=UCjpBbH8NmL4XHVUgJurDPZg
```

## Update API

```bash
curl -X PUT "http://localhost:3000/api/data" \
  -H "Authorization: Bearer $DATA_UPDATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dashboard": {
      "totalRaisedPln": 5000000,
      "metadata": {
        "lastUpdatedUtc": "2026-04-23T08:15:00Z"
      }
    }
  }'
```

Full docs live in [dosc/README.md](./dosc/README.md).

## YouTube live sync

This uses the YouTube Data API for live stream metadata only. It can refresh things like:

- current live video URL/title
- concurrent viewers
- total video views
- derived `hoursElapsed` / `estimatedTotalLoops`

It does not provide the donation total, so `totalRaisedPln` stays on the existing manual update flow.

One-shot sync:

```bash
bun run sync:youtube
```

Continuous polling:

```bash
bun run sync:youtube --watch

# Poll every minute
bun run sync:youtube:minute
```

The default watch interval is 30 seconds. The sync script calls the protected `POST /api/youtube-sync` route using `DATA_UPDATE_TOKEN`, and when Blob is configured those updates are persisted there.

## Quick updater

Instead of hand-writing `curl`, you can run:

```bash
bun run update --amount 5800000

# Optional explicit UTC override
bun run update --amount 5800000 --time "2026-04-23T10:30:00Z"
```

Or pass local Warsaw-style tracker time directly:

```bash
bun run update --amount 5800000 --time-gmt2 "2026-04-23 12:30"
```

The script uses `DATA_UPDATE_TOKEN` and defaults to `https://latwo-x-cancerfighters.pcstyle.dev/api/data`.

## Vercel deployment

1. Create a Vercel project from this repo.
2. Add `DATA_UPDATE_TOKEN`.
3. Create a Vercel Blob store and connect it to the project so `BLOB_READ_WRITE_TOKEN` is provided.
4. Deploy.

Why Blob: Vercel Functions use a read-only filesystem except for temporary `/tmp`, so persisted tracker updates need external storage.
