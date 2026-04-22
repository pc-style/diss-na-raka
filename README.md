# Diss na raka

Fan-made tracker for the Łatwogang × Cancer Fighters stream.

- Production URL: [latwo-x-cancerfighters.pcstyle.dev](https://latwo-x-cancerfighters.pcstyle.dev)
- Repo: [pc-style/diss-na-raka](https://github.com/pc-style/diss-na-raka)
- Support / data help: [x.com/@pcstyle53](https://x.com/pcstyle53)

The site is manually updated. It serves the current dataset through `GET /api/data` and accepts authenticated manual updates through `PUT /api/data`.

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
```

Optional for production-like local storage:

```bash
BLOB_READ_WRITE_TOKEN=...
```

Without `BLOB_READ_WRITE_TOKEN`, local updates are written to `data/site-data.json`.

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

## Vercel deployment

1. Create a Vercel project from this repo.
2. Add `DATA_UPDATE_TOKEN`.
3. Create a public Vercel Blob store and connect it to the project so `BLOB_READ_WRITE_TOKEN` is provided.
4. Deploy.

Why Blob: Vercel Functions use a read-only filesystem except for temporary `/tmp`, so persisted tracker updates need external storage.
