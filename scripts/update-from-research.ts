import fs from "fs";
import path from "path";
import { seedSiteData, type Milestone, type TimelineEvent } from "../lib/site-data";

const researchFilePath = "/Users/pcstyle/Downloads/trun_118dbb1c83c34f77bd0846fc4629dea5.json";
const siteDataPath = path.join(process.cwd(), "lib", "site-data.ts");

// Read the research JSON
const researchJson = JSON.parse(fs.readFileSync(researchFilePath, "utf-8"));
const output = researchJson.output;

console.log("Processing research data...");

// Convert research milestones to site-data format
const newMilestones: Milestone[] = output.milestones.map((m: any) => ({
  id: m.id,
  targetAmount: m.target_amount,
  title: m.title,
  description: m.description,
  status: m.status as "achieved" | "pending" | "failed",
  dateAchieved: m.date_achieved,
}));

// Convert research timeline events to site-data format
const newTimelineEvents: TimelineEvent[] = output.timeline_events.map((e: any) => ({
  id: e.id,
  dateLocal: e.date_local,
  relativeTime: e.relative_time,
  sortUtc: e.sort_utc,
  zrodlo: undefined, // Research data doesn't have sources in the same format
  participants: Array.isArray(e.participants) ? e.participants : e.participants.split(", ").map((p: string) => p.trim()),
  category: e.category as any,
  description: e.description,
  tags: Array.isArray(e.tags) ? e.tags : e.tags.split(", ").map((t: string) => t.trim()),
}));

// Merge with existing data
const existingMilestoneIds = new Set(seedSiteData.milestones.map(m => m.id));
const existingTimelineIds = new Set(seedSiteData.timelineEvents.map(e => e.id));

const mergedMilestones = [
  ...seedSiteData.milestones,
  ...newMilestones.filter(m => !existingMilestoneIds.has(m.id))
];

const mergedTimelineEvents = [
  ...seedSiteData.timelineEvents,
  ...newTimelineEvents.filter(e => !existingTimelineIds.has(e.id))
];

// Sort milestones by targetAmount
mergedMilestones.sort((a, b) => a.targetAmount - b.targetAmount);

// Sort timeline events by sortUtc
mergedTimelineEvents.sort((a, b) => {
  const aTime = a.sortUtc || a.dateLocal;
  const bTime = b.sortUtc || b.dateLocal;
  return aTime.localeCompare(bTime);
});

// Update dashboard with patch if available
const updatedDashboard = {
  ...seedSiteData.dashboard,
  ...(output.dashboard_patch || {}),
};

console.log(`Merged milestones: ${mergedMilestones.length} (added ${newMilestones.filter(m => !existingMilestoneIds.has(m.id)).length} new)`);
console.log(`Merged timeline events: ${mergedTimelineEvents.length} (added ${newTimelineEvents.filter(e => !existingTimelineIds.has(e.id)).length} new)`);

// Update the site-data.ts file
const siteDataContent = fs.readFileSync(siteDataPath, "utf-8");

// Create the new milestones array string
const milestonesString = JSON.stringify(mergedMilestones, null, 2)
  .replace(/"id":/g, "id:")
  .replace(/"targetAmount":/g, "targetAmount:")
  .replace(/"title":/g, "title:")
  .replace(/"description":/g, "description:")
  .replace(/"status":/g, "status:")
  .replace(/"dateAchieved":/g, "dateAchieved:");

// Create the new timeline events array string
const timelineEventsString = JSON.stringify(mergedTimelineEvents, null, 2)
  .replace(/"id":/g, "id:")
  .replace(/"dateLocal":/g, "dateLocal:")
  .replace(/"relativeTime":/g, "relativeTime:")
  .replace(/"sortUtc":/g, "sortUtc:")
  .replace(/"participants":/g, "participants:")
  .replace(/"category":/g, "category:")
  .replace(/"description":/g, "description:")
  .replace(/"tags":/g, "tags:");

// Update the file
const newSiteDataContent = siteDataContent
  .replace(/totalRaisedPln: \d+,/, `totalRaisedPln: ${output.dashboard_patch?.total_raised_pln || seedSiteData.dashboard.totalRaisedPln},`)
  .replace(/lastUpdatedUtc: "[^"]+",/, `lastUpdatedUtc: "${output.dashboard_patch?.last_updated_utc || seedSiteData.dashboard.metadata.lastUpdatedUtc}",`)
  .replace(/milestones:\s*\[[\s\S]*?\],\s*timelineEvents:/, `milestones: ${milestonesString},\n  timelineEvents:`)
  .replace(/timelineEvents:\s*\[[\s\S]*?\],/, `timelineEvents: ${timelineEventsString},`);

fs.writeFileSync(siteDataPath, newSiteDataContent, "utf-8");
console.log("✓ Updated lib/site-data.ts");

// Now sync to production blob
const siteUrl = "https://latwo-x-cancerfighters.pcstyle.dev";
const updateToken = process.env.DATA_UPDATE_TOKEN;

if (!updateToken) {
  console.error("DATA_UPDATE_TOKEN environment variable is not set - skipping blob sync");
  process.exit(0);
}

console.log(`Syncing to ${siteUrl}/api/data...`);

// Import the updated data
const { seedSiteData: updatedSeedData } = await import("../lib/site-data");

const response = await fetch(`${siteUrl}/api/data`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${updateToken}`,
  },
  body: JSON.stringify({
    milestones: updatedSeedData.milestones,
    timelineEvents: updatedSeedData.timelineEvents,
    dashboard: {
      totalRaisedPln: output.dashboard_patch?.total_raised_pln,
      metadata: {
        lastUpdatedUtc: output.dashboard_patch?.last_updated_utc,
      },
    },
  }),
});

if (!response.ok) {
  console.error(`Failed to update blob: ${response.status} ${response.statusText}`);
  const error = await response.text();
  console.error(error);
  process.exit(1);
}

console.log("✓ Updated production blob");
console.log("✓ Both local file and blob have been updated");
