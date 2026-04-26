import { redirect } from "next/navigation";
import {
  FUNDRAISER_CLICK_DESTINATION,
  recordFundraiserClick,
} from "@/lib/fundraiser-clicks";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  await recordFundraiserClick(url.searchParams.get("source"));
  redirect(FUNDRAISER_CLICK_DESTINATION);
}
