import { get, put } from "@vercel/blob";

const FUNDRAISER_CLICK_BLOB_PATHNAME = "tracker/fundraiser-clicks.json";
const FUNDRAISER_CLICK_BLOB_ACCESS = "private";

export const FUNDRAISER_CLICK_DESTINATION = "https://www.siepomaga.pl/latwogang";

export interface FundraiserClickStats {
  totalClicks: number;
  bySource: Record<string, number>;
  lastClickedAtUtc: string | null;
  destinationUrl: string;
}

function shouldUseBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function createEmptyStats(): FundraiserClickStats {
  return {
    totalClicks: 0,
    bySource: {},
    lastClickedAtUtc: null,
    destinationUrl: FUNDRAISER_CLICK_DESTINATION,
  };
}

function sanitizeSource(source: string | null) {
  const normalized = source?.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  return normalized || "unknown";
}

async function readStats() {
  if (!shouldUseBlobStorage()) {
    return createEmptyStats();
  }

  try {
    const blob = await get(FUNDRAISER_CLICK_BLOB_PATHNAME, {
      access: FUNDRAISER_CLICK_BLOB_ACCESS,
      useCache: false,
    });

    if (!blob || blob.statusCode !== 200) {
      return createEmptyStats();
    }

    return (await new Response(blob.stream).json()) as FundraiserClickStats;
  } catch {
    return createEmptyStats();
  }
}

async function writeStats(stats: FundraiserClickStats) {
  if (!shouldUseBlobStorage()) {
    return;
  }

  await put(
    FUNDRAISER_CLICK_BLOB_PATHNAME,
    JSON.stringify(stats, null, 2) + "\n",
    {
      access: FUNDRAISER_CLICK_BLOB_ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json; charset=utf-8",
    },
  );
}

export async function recordFundraiserClick(source: string | null) {
  const sourceKey = sanitizeSource(source);
  const stats = await readStats();
  const nextStats: FundraiserClickStats = {
    totalClicks: stats.totalClicks + 1,
    bySource: {
      ...stats.bySource,
      [sourceKey]: (stats.bySource[sourceKey] ?? 0) + 1,
    },
    lastClickedAtUtc: new Date().toISOString(),
    destinationUrl: FUNDRAISER_CLICK_DESTINATION,
  };

  await writeStats(nextStats);
  return nextStats;
}

export function buildFundraiserClickUrl(source: string) {
  return `/api/fundraiser-click?source=${encodeURIComponent(source)}`;
}
