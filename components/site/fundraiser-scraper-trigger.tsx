"use client";

import { useEffect } from "react";

export function FundraiserScraperTrigger() {
  useEffect(() => {
    // Trigger fundraiser counter scrape on page load
    // This ensures fresh data when users visit, complementing the daily cron job
    fetch("/api/fundraiser-counter", {
      method: "GET",
      cache: "no-store",
    }).catch((error) => {
      // Silently fail - the API has its own caching logic
      console.debug("Fundraiser scrape trigger failed:", error);
    });
  }, []);

  return null;
}
