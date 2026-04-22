# Data model

The site reads one JSON document with this top-level shape:

```ts
type SiteData = {
  dashboard: DashboardState;
  milestones: Milestone[];
  timelineEvents: TimelineEvent[];
};
```

## `dashboard`

Used for the hero counter, ticker, live clock, footer metadata, and milestone progress.

Important fields:

- `dashboard.metadata.lastUpdatedUtc`: latest manual snapshot timestamp in UTC.
- `dashboard.totalRaisedPln`: main visible counter.
- `dashboard.hoursElapsed`: coarse summary number for the ticker.
- `dashboard.estimatedTotalLoops`: summary number for the ticker.
- `dashboard.engagement.*`: sidebar metrics.
- `dashboard.velocity.*`: sidebar pace module.

## `milestones`

Ordered list of fundraising thresholds shown in the horizontal roadmap.

Important fields:

- `status`: `achieved`, `pending`, or `failed`.
- `dateAchieved`: UTC ISO string or `null`.
- `targetAmount`: value used for the progress rail and sorting.

## `timelineEvents`

Chronological event index for the searchable VOD/timeline block.

Important fields:

- `category`: one of `core_event`, `milestone_execution`, `guest_appearance`, `endurance_challenge`, `scheduled_appearance`.
- `participants`: rendered as the participant list.
- `tags`: used by free-text search in the UI.

## Storage behavior

- Local development: updates are written to `data/site-data.json`.
- Vercel: updates are written to `tracker/site-data.json` in Vercel Blob when `BLOB_READ_WRITE_TOKEN` is available.
- If no stored file exists yet, the app falls back to the seed dataset in `lib/site-data.ts`.
