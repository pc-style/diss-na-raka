# Data model

The tracker reads one JSON document with this shape:

```ts
type SiteData = {
  dashboard: DashboardState;
  milestones: Milestone[];
  timelineEvents: TimelineEvent[];
};
```

## `dashboard`

Used by the hero counter, ticker, footer, live clock, and stat blocks.

```ts
type DashboardState = {
  metadata: {
    hostId: string;
    beneficiary: string;
    startTimestampUtc: string;
    lastUpdatedUtc: string;
    platform: string;
    channelId: string;
    donationUrl: string;
    songUrl: string;
    trackTitle: string;
    trackArtists: string[];
    trackLengthSeconds: number;
  };
  totalRaisedPln: number;
  hoursElapsed: number;
  estimatedTotalLoops: number;
  engagement: {
    averageConcurrentViewers: number;
    newSubscribersDuringEvent: number;
    totalViewsGenerated: number;
  };
  velocity: {
    averagePlnPerHour: number;
    milestoneVelocity: { label: string; hours: number }[];
  };
};
```

Core fields:

- `dashboard.totalRaisedPln`
- `dashboard.hoursElapsed`
- `dashboard.estimatedTotalLoops`
- `dashboard.engagement`
- `dashboard.velocity`
- `dashboard.metadata`

Important `metadata` fields:

- `startTimestampUtc`: event start in UTC
- `lastUpdatedUtc`: latest snapshot in UTC
- `beneficiary`: current beneficiary label
- `donationUrl`: donation target link
- `songUrl`: track link

## `milestones`

Ordered roadmap entries shown against the current total.

```ts
type Milestone = {
  id: string;
  targetAmount: number;
  title: string;
  description: string;
  status: "achieved" | "pending" | "failed";
  dateAchieved: string | null;
};
```

Notes:

- `targetAmount` drives progress positioning
- `dateAchieved` should be a UTC ISO string when known
- descriptions can carry source context, guest names, or exact snapshot notes

## `timelineEvents`

Chronological story index for the searchable event timeline.

```ts
type TimelineEvent = {
  id: string;
  dateLocal: string;
  relativeTime: string;
  participants: string[];
  category:
    | "core_event"
    | "milestone_execution"
    | "guest_appearance"
    | "endurance_challenge"
    | "scheduled_appearance";
  description: string;
  tags: string[];
};
```

Notes:

- `dateLocal` is a display label, not a machine timestamp
- `participants` should stay short and readable
- `tags` power text search, so include milestone names, guest names, and key phrases

## Patch schema

The API accepts:

```ts
type SiteDataPatch = {
  dashboard?: Partial<DashboardState> & {
    metadata?: Partial<DashboardState["metadata"]>;
    engagement?: Partial<DashboardState["engagement"]>;
    velocity?: Partial<DashboardState["velocity"]>;
  };
  milestones?: Milestone[];
  timelineEvents?: TimelineEvent[];
};
```

Use `dashboard` for small edits. Replace arrays only when intentionally rewriting them.

Nested object patches merge with the stored object, but array fields are replacement-only.

## Storage behavior

- local development: writes to `data/site-data.json`
- Vercel with Blob configured: writes to private Blob object `tracker/site-data.json`
- no stored file yet: falls back to seed data in `lib/site-data.ts`

That means seed data should still be kept current for new environments, previews, or recovery.
