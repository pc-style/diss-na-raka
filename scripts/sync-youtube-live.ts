export {};

function getFlag(name: string) {
  const args = process.argv.slice(2);
  const index = args.indexOf(name);
  if (index === -1) {
    return null;
  }

  return args[index + 1] ?? null;
}

function hasFlag(name: string) {
  return process.argv.slice(2).includes(name);
}

function parsePositiveInt(raw: string, label: string) {
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid ${label}: ${raw}`);
  }

  return value;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSyncUrl() {
  const explicit = process.env.TRACKER_YOUTUBE_SYNC_URL;
  if (explicit) {
    return explicit;
  }

  const updateUrl =
    process.env.TRACKER_UPDATE_URL ??
    "https://latwo-x-cancerfighters.pcstyle.dev/api/data";

  return updateUrl.replace(/\/api\/data\/?$/, "/api/youtube-sync");
}

async function runOnce(syncUrl: string, token: string) {
  const response = await fetch(syncUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Sync failed with ${response.status} ${response.statusText}: ${await response.text()}`,
    );
  }

  const data = (await response.json()) as {
    snapshot: {
      title: string;
      url: string;
      concurrentViewers: number | null;
      viewCount: number | null;
      polledAtUtc: string;
    };
    data: {
      dashboard: {
        engagement: {
          averageConcurrentViewers: number;
          totalViewsGenerated: number;
        };
        metadata: {
          lastUpdatedUtc: string;
          lastYouTubeSyncUtc?: string;
        };
      };
    };
  };

  console.log(`YouTube sync: ${data.snapshot.title}`);
  console.log(`Live URL: ${data.snapshot.url}`);
  console.log(
    `Concurrent viewers: ${(data.snapshot.concurrentViewers ?? data.data.dashboard.engagement.averageConcurrentViewers).toLocaleString("pl-PL")}`,
  );
  console.log(
    `Total views: ${(data.snapshot.viewCount ?? data.data.dashboard.engagement.totalViewsGenerated).toLocaleString("pl-PL")}`,
  );
  console.log(`YouTube polled at: ${data.snapshot.polledAtUtc}`);
  console.log(
    `Money snapshot still anchored at: ${data.data.dashboard.metadata.lastUpdatedUtc}`,
  );
}

async function main() {
  const token = process.env.DATA_UPDATE_TOKEN;
  if (!token) {
    throw new Error("DATA_UPDATE_TOKEN is missing in the environment.");
  }

  const syncUrl = getSyncUrl();
  const watch = hasFlag("--watch");
  const intervalMs = parsePositiveInt(
    getFlag("--interval-ms") ?? "30000",
    "interval",
  );

  console.log(`Sync URL: ${syncUrl}`);

  if (!watch) {
    await runOnce(syncUrl, token);
    return;
  }

  for (;;) {
    try {
      await runOnce(syncUrl, token);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    }

    console.log(`Waiting ${intervalMs}ms before the next YouTube sync...`);
    await sleep(intervalMs);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
