# Handoff: Diss na raka tracker

## Goal
Continue maintaining the Łatwogang × Cancer Fighters fan tracker, including live-ish manual data updates, docs for the API/schema/storage flow, and source-backed timeline/milestone refreshes.

## Context
- The app is a Next 16/Bun project and must stay Bun-first.
- The site now reads and serves its current dataset through `GET /api/data` and accepts authenticated updates through `PUT /api/data`.
- Updates are protected by `DATA_UPDATE_TOKEN`.
- Production persistence uses Vercel Blob, and the store is configured as private. The code must keep using private Blob access consistently.
- The local fallback path writes to `data/site-data.json` when Blob is unavailable.
- There is a helper CLI: `bun run update --amount ... --time ...` or `--time-gmt2 ...`.
- The latest verified live snapshot in the stored dataset is `5 715 000 PLN` at `2026-04-23T07:57:00Z`, displayed as `2026-04-23 09:57 GMT+2`.
- Docs now exist for the API, schema, manual update flow, and storage/deploy behavior.
- Vercel Analytics is installed and mounted in the root layout.
- The app has already been built and deployed successfully to Vercel after the Blob/private-access fix.

## Key Files
- `lib/site-data.ts` - canonical seed dataset, milestone/timeline entries, patch helpers, and source-backed content.
- `lib/data-store.ts` - runtime storage layer for local file fallback and private Vercel Blob reads/writes.
- `app/api/data/route.ts` - authenticated GET/PUT API for reading/updating tracker data.
- `scripts/update-data.ts` - Bun CLI for pushing manual snapshot updates to the API.
- `app/layout.tsx` - root metadata and `@vercel/analytics/next` integration.
- `app/page.tsx` - page composition and server-side loading of the current dataset.
- `components/site/footer.tsx` - footer copy, repo/support links, and timestamp display.
- `components/site/top-bar.tsx` - ticker text that reflects the live snapshot.
- `components/site/live-clock.tsx` - live time/loop display anchored to the stored timestamps.
- `components/site/milestones.tsx` - roadmap rendering and achieved milestone display.
- `components/site/timeline.tsx` - searchable event timeline UI.
- `dosc/README.md` - docs index for API/schema/manual update flow.
- `dosc/update-api.md` - auth, routes, patch semantics, and example requests.
- `dosc/data-model.md` - `SiteData` / `SiteDataPatch` shape and storage behavior.
- `dosc/manual-updates.md` - operator-facing workflow for updating the tracker by hand.
- `README.md` - project overview, quick updater usage, and Vercel deployment notes.

## Next Steps
1. Keep the seed data and the stored Blob copy in sync when new confirmed milestones or totals appear.
2. Use `bun run update --amount <n> --time <utc>` for ordinary snapshots or `--time-gmt2` for local tracker time.
3. If the storage model changes, update `lib/data-store.ts`, the docs in `dosc/`, and the README together.
4. Before claiming completion on new changes, run `bun test tests/site-data.test.ts`, `bun run lint`, and `bun run build`.
5. If new source research is needed, use Firecrawl and keep only source-backed facts in the tracker content.
