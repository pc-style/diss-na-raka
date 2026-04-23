# Storage and deploy

The app persists tracker data in one of two places:

- local development: `data/site-data.json`
- Vercel production: private Blob object `tracker/site-data.json`

If neither exists yet, the app falls back to the seed data in `lib/site-data.ts`.

## Required env vars

### `DATA_UPDATE_TOKEN`

Required for `PUT /api/data`.

- local: add it to `.env.local`
- Vercel: add it in `Project -> Settings -> Environment Variables`

Clients must send the same value in either:

- `Authorization: Bearer <token>`
- `x-update-token: <token>`

### `BLOB_READ_WRITE_TOKEN`

Optional for local development, recommended for production.

- create or connect a Blob store in `Project -> Storage`
- Vercel injects `BLOB_READ_WRITE_TOKEN` into the project
- this app writes with private access, not public access

## Vercel checklist

1. Import the repo into Vercel.
2. Connect a Blob store in the project `Storage` tab.
3. Add `DATA_UPDATE_TOKEN`.
4. Redeploy once so the runtime picks up both env vars.

After that:

- `GET /api/data` reads the stored dataset
- `PUT /api/data` writes updates into Blob

## Local workflow

```bash
bun install
bun dev
```

Without `BLOB_READ_WRITE_TOKEN`, local writes go to `data/site-data.json`.

If you want local commands to use Vercel env vars too:

```bash
vercel env pull
```
