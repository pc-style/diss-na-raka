import { put } from "@vercel/blob";

// Create an expired cache entry to force fresh fetch
await put("tracker/fundraiser-counter.json", JSON.stringify({
  value: 0,
  rawValue: "0",
  cachedAt: "2020-01-01T00:00:00Z",
  expiresAt: "2020-01-01T00:00:00Z",
}), {
  access: "private",
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log("Cache invalidated - next API call will fetch fresh data");
