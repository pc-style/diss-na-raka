import { get } from "@vercel/blob";

const FUNDRAISER_CLICK_BLOB_PATHNAME = "tracker/fundraiser-clicks.json";
const FUNDRAISER_CLICK_BLOB_ACCESS = "private";

interface FundraiserClickStats {
  totalClicks: number;
  bySource: Record<string, number>;
  lastClickedAtUtc: string | null;
  destinationUrl: string;
}

function shouldUseBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readStats() {
  if (!shouldUseBlobStorage()) {
    console.log("⚠️  BLOB_READ_WRITE_TOKEN not set - no stats available");
    return null;
  }

  try {
    const blob = await get(FUNDRAISER_CLICK_BLOB_PATHNAME, {
      access: FUNDRAISER_CLICK_BLOB_ACCESS,
      useCache: false,
    });

    if (!blob || blob.statusCode !== 200) {
      console.log("⚠️  No click stats found");
      return null;
    }

    return (await new Response(blob.stream).json()) as FundraiserClickStats;
  } catch (error) {
    console.log("⚠️  Failed to read stats:", error);
    return null;
  }
}

async function main() {
  const stats = await readStats();

  if (!stats) {
    return;
  }

  console.log("\n📊 Fundraiser Click Stats");
  console.log("========================");
  console.log(`Total clicks: ${stats.totalClicks}`);
  console.log(`Destination: ${stats.destinationUrl}`);
  
  if (stats.lastClickedAtUtc) {
    const lastClick = new Date(stats.lastClickedAtUtc);
    console.log(`Last clicked: ${lastClick.toLocaleString()} (${stats.lastClickedAtUtc})`);
  }

  if (Object.keys(stats.bySource).length > 0) {
    console.log("\nClicks by source:");
    const sortedSources = Object.entries(stats.bySource).sort((a, b) => b[1] - a[1]);
    for (const [source, count] of sortedSources) {
      console.log(`  ${source}: ${count}`);
    }
  }
  console.log();
}

main();
