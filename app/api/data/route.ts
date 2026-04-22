import { NextResponse } from "next/server";
import { getSiteData, updateSiteData } from "@/lib/data-store";
import {
  authorizeUpdateRequest,
  type SiteDataPatch,
} from "@/lib/site-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const updateToken = process.env.DATA_UPDATE_TOKEN;

  if (!updateToken) {
    return NextResponse.json(
      { error: "DATA_UPDATE_TOKEN is not configured." },
      { status: 500 },
    );
  }

  if (!authorizeUpdateRequest(request.headers, updateToken)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let patch: SiteDataPatch;

  try {
    patch = (await request.json()) as SiteDataPatch;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const data = await updateSiteData(patch);
  return NextResponse.json(data);
}
