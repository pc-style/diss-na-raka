# Update API

The app exposes a small manual API so the tracker can be refreshed without Playwright or automated scraping.

## Routes

- `GET /api/data`
- `PUT /api/data`

## Auth

Set `DATA_UPDATE_TOKEN` in the environment. `PUT` accepts either:

- `Authorization: Bearer <token>`
- `x-update-token: <token>`

Responses:

- `200` when the update succeeds
- `401` when the token is missing or wrong
- `500` when `DATA_UPDATE_TOKEN` is not configured on the server
- `400` when the request body is not valid JSON

`GET` is public and returns the currently served dataset.

## Patch semantics

`PUT` accepts a partial `SiteDataPatch`.

- omitted top-level keys stay unchanged
- `dashboard` is merged shallowly, with nested merges for `metadata`, `engagement`, and `velocity`
- `dashboard.velocity.milestoneVelocity` is replaced only if you send it
- `milestones` and `timelineEvents` are full-array replacements

## Minimal money update

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

## Example `curl`

```bash
curl -X PUT "https://latwo-x-cancerfighters.pcstyle.dev/api/data" \
  -H "Authorization: Bearer $DATA_UPDATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dashboard": {
      "totalRaisedPln": 5715000,
      "metadata": {
        "lastUpdatedUtc": "2026-04-23T07:57:00Z"
      }
    }
  }'
```

## Local example with alternate header

```bash
curl -X PUT "http://localhost:3000/api/data" \
  -H "x-update-token: $DATA_UPDATE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dashboard": {
      "totalRaisedPln": 5800000,
      "metadata": {
        "lastUpdatedUtc": "2026-04-23T10:30:00Z"
      }
    }
  }'
```

## Example response shape

Both `GET` and successful `PUT` return the full stored `SiteData` document:

```json
{
  "dashboard": {
    "totalRaisedPln": 5715000,
    "metadata": {
      "lastUpdatedUtc": "2026-04-23T07:57:00Z"
    }
  },
  "milestones": [],
  "timelineEvents": []
}
```

The real response includes the full dashboard, milestones, and timeline arrays.
