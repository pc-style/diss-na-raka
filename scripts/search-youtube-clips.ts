#!/usr/bin/env bun

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

interface YouTubeSearchItem {
  id?: { videoId?: string };
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: { url?: string };
      medium?: { url?: string };
      default?: { url?: string };
    };
  };
}

interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[];
  error?: { message?: string };
}

const queries = [
  "Diss na raka Łatwogang",
  "DissNaRaka Łatwogang",
  "Łatwogang Cancer Fighters",
  "Słucham 9 dni dissu na raka żeby pomóc dzieciom",
  "Łatwogang stream charytatywny",
  "Łatwogang najlepsze momenty",
  "Łatwogang highlights",
  "Łatwogang shorts diss na raka",
  "diss na raka shorts",
  "diss na raka reakcja",
  "diss na raka rekord Guinnessa",
  "diss na raka 100 milionów",
  "diss na raka 188 milionów",
  "Łatwogang 188 571 160",
  "Łatwogang 163 858 527",
  "Łatwogang diss na raka Maffashion ogoliła głowę",
  "Maffashion Łatwogang",
  "Maffashion diss na raka",
  "Łatwogang diss na raka Edyta Pazura ogoliła głowę",
  "Edyta Pazura Łatwogang",
  "Edyta Pazura diss na raka",
  "Łatwogang diss na raka Katarzyna Nosowska ogoliła głowę",
  "Nosowska Łatwogang",
  "Katarzyna Nosowska diss na raka",
  "Łatwogang diss na raka Aleksandra Domańska ogoliła głowę",
  "Aleksandra Domańska Łatwogang",
  "Łatwogang diss na raka Jan Błachowicz ogolił głowę",
  "Jan Błachowicz Łatwogang",
  "Kubańczyk Gawronek tatuaż Łatwogang",
  "Blanka Lipińska Łatwogang ogoliła głowę",
  "Grzegorz Hyży Łatwogang",
  "Siles Łatwogang DKMS",
  "Łatwogang diss na raka Robert Lewandowski TikTok",
  "Robert Lewandowski Łatwogang",
  "Łatwogang diss na raka Bambi Francis ostre sosy",
  "Bambi Łatwogang Francis",
  "Łatwogang diss na raka Michał Wiśniewski stream",
  "Michał Wiśniewski Łatwogang",
  "Łatwogang diss na raka Mrozu Golec uOrkiestra",
  "Mrozu Łatwogang",
  "Golec uOrkiestra Łatwogang",
  "Łatwogang diss na raka Siles DKMS ogolił głowę",
  "Łatwogang diss na raka Grzegorz Hyży ogolił głowę",
  "Łatwogang diss na raka Adam Małysz Patec",
  "Adam Małysz Łatwogang Patec",
  "Doda Łatwogang Magda Gessler",
  "Kasix Łatwogang ogoliła głowę",
  "Michał Pol Łatwogang ogolony",
  "Wojtek Gola Łatwogang włosy",
  "Disco Karol Łatwogang Cancer Fighters 100000",
];

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseEnvText(raw: string) {
  const env: Record<string, string> = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

async function loadEnvKey(key: string) {
  if (process.env[key]) {
    return process.env[key] ?? null;
  }

  for (const envPath of [path.join(process.cwd(), ".env.local"), path.join(process.cwd(), ".env")]) {
    if (!(await fileExists(envPath))) {
      continue;
    }

    const parsed = parseEnvText(await readFile(envPath, "utf8"));
    if (parsed[key]) {
      return parsed[key];
    }
  }

  return null;
}

async function searchYouTube(apiKey: string, query: string) {
  const params = new URLSearchParams({
    key: apiKey,
    part: "snippet",
    type: "video",
    maxResults: "10",
    q: query,
    relevanceLanguage: "pl",
    safeSearch: "none",
    order: "relevance",
  });
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  const data = (await response.json()) as YouTubeSearchResponse;

  if (!response.ok || data.error) {
    throw new Error(data.error?.message ?? `YouTube search failed for ${query}`);
  }

  return (data.items ?? [])
    .filter((item) => item.id?.videoId)
    .map((item) => ({
      query,
      videoId: item.id?.videoId ?? "",
      title: item.snippet?.title ?? "",
      description: item.snippet?.description ?? "",
      channelTitle: item.snippet?.channelTitle ?? "",
      publishedAt: item.snippet?.publishedAt ?? "",
      thumbnailUrl:
        item.snippet?.thumbnails?.high?.url ??
        item.snippet?.thumbnails?.medium?.url ??
        item.snippet?.thumbnails?.default?.url ??
        "",
      url: `https://www.youtube.com/watch?v=${item.id?.videoId ?? ""}`,
    }));
}

async function main() {
  const apiKey = await loadEnvKey("YOUTUBE_API_KEY");
  if (!apiKey) {
    throw new Error("Missing YOUTUBE_API_KEY.");
  }

  const results = [];
  for (const query of queries) {
    console.log(`Searching: ${query}`);
    results.push(...(await searchYouTube(apiKey, query)));
  }

  const unique = Array.from(new Map(results.map((item) => [item.videoId, item])).values());
  const outputPath = path.join(process.cwd(), "research/youtube-clips.json");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    JSON.stringify({ requestedAt: new Date().toISOString(), queries, results: unique }, null, 2) + "\n",
    "utf8",
  );
  console.log(`Saved ${unique.length} candidates to ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
