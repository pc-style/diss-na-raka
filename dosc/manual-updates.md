# Manual updates

This tracker is intentionally maintained by hand. The source of truth is the current stored JSON document served by `GET /api/data`.

## What to update most often

For a normal money snapshot, only these fields usually need changing:

```json
{
  "dashboard": {
    "totalRaisedPln": 5715000,
    "metadata": {
      "lastUpdatedUtc": "2026-04-23T07:57:00Z"
    }
  }
}
```

Use UTC in the payload. The UI shifts timestamps to `GMT+2` for display.

## Bun updater

Preferred shortcut:

```bash
bun run update --amount 5715000 --time "2026-04-23T07:57:00Z"
```

Or pass the local display time directly:

```bash
bun run update --amount 5715000 --time-gmt2 "2026-04-23 09:57"
```

The script:

- reads `DATA_UPDATE_TOKEN`
- sends a `PUT` request to `TRACKER_UPDATE_URL` or `https://diss-na-raka.vercel.app/api/data`
- prints the stored UTC timestamp and the derived `GMT+2` display time

## When to replace full arrays

Send full `milestones` or `timelineEvents` arrays only when you are intentionally editing the roadmap or timeline. Array patches are replacements, not item-level merges.

Typical examples:

- new guest appearance worth preserving in the timeline
- milestone status/date correction
- improved wording after a better source appears

## Storage behavior

- local dev without Blob: writes to `data/site-data.json`
- Vercel with `BLOB_READ_WRITE_TOKEN`: writes to private Blob object `tracker/site-data.json`
- no stored file yet: falls back to `lib/site-data.ts`

## Practical workflow

1. Check the live amount and exact time.
2. Run `bun run update ...` for the basic snapshot.
3. If the event history changed, update `lib/site-data.ts` and redeploy so the seed data stays in sync with the stored copy.
4. Use `GET /api/data` to confirm the server is returning the expected amount and timestamp.
