import { NextResponse } from "next/server";
import { getFundraiserCounter } from "@/lib/fundraiser-counter-scraper";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // 30 second timeout for fetching

export async function GET() {
  try {
    const counterData = await getFundraiserCounter();

    return NextResponse.json(
      {
        success: true,
        data: counterData,
      },
      {
        headers: {
          "Cache-Control": "private, max-age=60", // Cache in browser for 60s to avoid too frequent calls
        },
      },
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Fundraiser counter API error:", errorMsg);

    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 },
    );
  }
}
