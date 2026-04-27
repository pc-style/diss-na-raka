import { get, put } from "@vercel/blob";
import { updateSiteData, getSiteData } from "./data-store";
import type { CounterHistoryPoint } from "./site-data";

const FUNDRAISER_URL = "https://dissnaraka.cancerfighters.pl/";
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const BLOB_PATHNAME = "tracker/fundraiser-counter.json";
const BLOB_ACCESS = "private";

interface CachedCounterData {
  value: number;
  rawValue: string;
  cachedAt: string;
  expiresAt: string;
  wasUpdated?: boolean;
}

function shouldUseBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readCachedCounter(): Promise<CachedCounterData | null> {
  try {
    const blob = await get(BLOB_PATHNAME, { access: BLOB_ACCESS });
    if (!blob || blob.statusCode !== 200) {
      return null;
    }

    const data = (await new Response(blob.stream).json()) as CachedCounterData;
    
    // Check if cache is still valid
    if (new Date(data.expiresAt) > new Date()) {
      return data;
    }
    
    return null;
  } catch {
    return null;
  }
}

async function writeCachedCounter(data: CachedCounterData) {
  await put(
    BLOB_PATHNAME,
    JSON.stringify(data, null, 2) + "\n",
    {
      access: BLOB_ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json; charset=utf-8",
    },
  );
}

async function fetchCounterFromWebsite(): Promise<{
  value: number;
  rawValue: string;
}> {
  try {
    const response = await fetch(FUNDRAISER_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; CounterBot/1.0; +http://latwo-x-cancerfighters.pcstyle.dev)",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    // Extract the counter value from the elementor-counter-number span
    // Pattern: data-to-value="257549860.32"
    const match = html.match(
      /data-to-value="([\d\s.]+)"/
    );

    if (!match || !match[1]) {
      throw new Error("Could not find counter value in HTML");
    }

    const rawValue = match[1].trim();
    // Remove spaces used as thousand separators
    const cleanedValue = rawValue.replace(/\s/g, "");
    const numericValue = parseFloat(cleanedValue);

    if (isNaN(numericValue)) {
      throw new Error(`Invalid numeric value: ${cleanedValue}`);
    }

    return {
      value: numericValue,
      rawValue,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to scrape counter: ${errorMsg}`);
  }
}

async function updateSiteDataWithCounter(
  newValue: number,
): Promise<boolean> {
  try {
    const siteData = await getSiteData();
    const lastHistoryEntry =
      siteData.counterHistory[siteData.counterHistory.length - 1];
    const currentTotal = siteData.dashboard.totalRaisedPln;

    // Only update if value has actually changed (check both total and last history entry)
    if (currentTotal === newValue) {
      return false;
    }

    // Add to counter history with source marking it as from fundraiser website
    const newHistoryEntry: CounterHistoryPoint = {
      amount: newValue,
      atUtc: new Date().toISOString(),
      source: "fundraiser website scrape (dissnaraka.cancerfighters.pl)",
    };

    // Update site data with new counter value and history
    await updateSiteData({
      dashboard: {
        totalRaisedPln: Math.round(newValue), // Round to nearest integer
      },
      counterHistory: [...siteData.counterHistory, newHistoryEntry],
    });

    console.log(
      `Updated counter from ${currentTotal} to ${newValue}`,
    );

    return true;
  } catch (error) {
    console.error("Failed to update site data with counter:", error);
    return false;
  }
}

export async function getFundraiserCounter(): Promise<CachedCounterData> {
  // Try to get cached value if blob storage is available
  if (shouldUseBlobStorage()) {
    const cached = await readCachedCounter();
    if (cached) {
      return cached;
    }
  }

  // Fetch fresh data
  const { value, rawValue } = await fetchCounterFromWebsite();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + CACHE_DURATION_MS);

  // Try to update site data if value changed
  let wasUpdated = false;
  try {
    wasUpdated = await updateSiteDataWithCounter(value);
  } catch (error) {
    console.error("Failed to update site data:", error);
    // Continue anyway - scraper still returns the value
  }

  const data: CachedCounterData = {
    value,
    rawValue,
    cachedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    wasUpdated,
  };

  // Cache the result if blob storage is available
  if (shouldUseBlobStorage()) {
    try {
      await writeCachedCounter(data);
    } catch (error) {
      console.error("Failed to cache counter data:", error);
      // Continue anyway - just log the error
    }
  }

  return data;
}

export const fundraiserCounterInfo = {
  blobPathname: BLOB_PATHNAME,
  cacheExpireMinutes: CACHE_DURATION_MS / 60000,
  fundraiserUrl: FUNDRAISER_URL,
};
