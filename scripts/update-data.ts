export {};

function getFlag(name: string) {
  const args = process.argv.slice(2);
  const index = args.indexOf(name);
  if (index === -1) {
    return null;
  }

  return args[index + 1] ?? null;
}

function requireFlag(name: string) {
  const value = getFlag(name);
  if (!value) {
    throw new Error(`Missing required flag: ${name}`);
  }

  return value;
}

function parseAmount(raw: string) {
  const normalized = raw.replace(/[_\s]/g, "");
  const amount = Number(normalized);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(`Invalid amount: ${raw}`);
  }

  return Math.round(amount);
}

function parseUtcTime(raw: string) {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid UTC time: ${raw}`);
  }

  return date.toISOString();
}

function parseGmtPlus2Time(raw: string) {
  const normalized = raw.trim().replace(" ", "T");
  const match = normalized.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/,
  );

  if (!match) {
    throw new Error(
      `Invalid GMT+2 local time: ${raw}. Use "YYYY-MM-DD HH:MM" or "YYYY-MM-DDTHH:MM".`,
    );
  }

  const [, year, month, day, hour, minute, second = "00"] = match;
  const utcMillis = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour) - 2,
    Number(minute),
    Number(second),
  );

  return new Date(utcMillis).toISOString();
}

function formatLocalGmtPlus2(iso: string) {
  const shifted = new Date(new Date(iso).getTime() + 2 * 60 * 60 * 1000);
  const year = shifted.getUTCFullYear();
  const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const day = String(shifted.getUTCDate()).padStart(2, "0");
  const hours = String(shifted.getUTCHours()).padStart(2, "0");
  const minutes = String(shifted.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes} GMT+2`;
}

function getCurrentUtcFromGmtPlus2Clock() {
  return new Date().toISOString();
}

async function main() {
  const amount = parseAmount(requireFlag("--amount"));
  const utcTimeFlag = getFlag("--time");
  const localTimeFlag = getFlag("--time-gmt2");

  if (utcTimeFlag && localTimeFlag) {
    throw new Error("Use only one of --time or --time-gmt2.");
  }

  const lastUpdatedUtc = utcTimeFlag
    ? parseUtcTime(utcTimeFlag)
    : localTimeFlag
      ? parseGmtPlus2Time(localTimeFlag)
      : getCurrentUtcFromGmtPlus2Clock();

  const apiUrl =
    process.env.TRACKER_UPDATE_URL ??
    "https://diss-na-raka.vercel.app/api/data";
  const token = process.env.DATA_UPDATE_TOKEN;

  if (!token) {
    throw new Error("DATA_UPDATE_TOKEN is missing in the environment.");
  }

  const payload = {
    dashboard: {
      totalRaisedPln: amount,
      metadata: {
        lastUpdatedUtc,
      },
    },
  };

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Update failed with ${response.status} ${response.statusText}: ${await response.text()}`,
    );
  }

  const data = (await response.json()) as {
    dashboard: {
      totalRaisedPln: number;
      metadata: { lastUpdatedUtc: string };
    };
  };

  console.log(`Updated tracker: ${data.dashboard.totalRaisedPln.toLocaleString("pl-PL")} PLN`);
  console.log(`Stored UTC: ${data.dashboard.metadata.lastUpdatedUtc}`);
  console.log(
    `Displayed local: ${formatLocalGmtPlus2(data.dashboard.metadata.lastUpdatedUtc)}`,
  );
  console.log(`API: ${apiUrl}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
