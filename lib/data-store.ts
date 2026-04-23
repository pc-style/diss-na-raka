import { get, put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  mergeSiteDataPatch,
  seedSiteData,
  type SiteData,
  type SiteDataPatch,
} from "./site-data";

const DATA_BLOB_PATHNAME = "tracker/site-data.json";
const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "site-data.json");
const DATA_BLOB_ACCESS = "private";

function shouldUseBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readLocalData() {
  try {
    const raw = await readFile(LOCAL_DATA_PATH, "utf8");
    return JSON.parse(raw) as SiteData;
  } catch {
    return null;
  }
}

async function writeLocalData(data: SiteData) {
  await mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  await writeFile(LOCAL_DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function readBlobData() {
  try {
    const blob = await get(DATA_BLOB_PATHNAME, { access: DATA_BLOB_ACCESS });
    if (!blob || blob.statusCode !== 200) {
      return null;
    }

    return (await new Response(blob.stream).json()) as SiteData;
  } catch {
    return null;
  }
}

async function writeBlobData(data: SiteData) {
  await put(
    DATA_BLOB_PATHNAME,
    JSON.stringify(data, null, 2) + "\n",
    {
      access: DATA_BLOB_ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json; charset=utf-8",
    },
  );
}

export async function getSiteData() {
  if (shouldUseBlobStorage()) {
    return (await readBlobData()) ?? seedSiteData;
  }

  return (await readLocalData()) ?? seedSiteData;
}

export async function updateSiteData(patch: SiteDataPatch) {
  const current = await getSiteData();
  const next = mergeSiteDataPatch(current, patch);

  if (shouldUseBlobStorage()) {
    await writeBlobData(next);
  } else {
    await writeLocalData(next);
  }

  return next;
}

export const dataStoreInfo = {
  blobPathname: DATA_BLOB_PATHNAME,
  localPath: LOCAL_DATA_PATH,
};
