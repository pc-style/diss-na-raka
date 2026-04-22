# Update API

The app exposes a manual update endpoint so the tracker can be refreshed without Playwright or scraping jobs.

## Endpoint

`PUT /api/data`

## Auth

Set `DATA_UPDATE_TOKEN` in the environment, then send one of:

- `Authorization: Bearer <token>`
- `x-update-token: <token>`

If the token is missing or wrong, the API returns `401`.

## Payload

The request body is a partial patch. Omitted top-level collections are left unchanged.

```json
{
  "dashboard": {
    "totalRaisedPln": 5000000,
    "metadata": {
      "lastUpdatedUtc": "2026-04-23T08:15:00Z"
    }
  }
}
```

You can also replace `milestones` or `timelineEvents` by sending full arrays.

## Example

```bash
curl -X PUT "https://latwo-x-cancerfighters.pcstyle.dev/api/data" \
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

## Read current data

`GET /api/data` returns the full currently served dataset.
