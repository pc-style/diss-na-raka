import { seedSiteData, type Milestone } from "../lib/site-data";

async function syncMilestonesToProduction() {
  const siteUrl = "https://latwo-x-cancerfighters.pcstyle.dev";
  const updateToken = process.env.DATA_UPDATE_TOKEN;

  if (!updateToken) {
    console.error("DATA_UPDATE_TOKEN environment variable is not set");
    process.exit(1);
  }

  console.log(`Syncing milestones to ${siteUrl}/api/data...`);
  console.log(`Seed data has ${seedSiteData.milestones.length} milestones`);

  // Sort milestones by targetAmount
  const sortedMilestones = [...seedSiteData.milestones].sort(
    (a: Milestone, b: Milestone) => a.targetAmount - b.targetAmount
  );

  console.log(`Sorted ${sortedMilestones.length} milestones by targetAmount`);

  const response = await fetch(`${siteUrl}/api/data`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${updateToken}`,
    },
    body: JSON.stringify({
      milestones: sortedMilestones,
    }),
  });

  if (!response.ok) {
    console.error(`Failed to update: ${response.status} ${response.statusText}`);
    const error = await response.text();
    console.error(error);
    process.exit(1);
  }

  const data = await response.json();
  console.log(`✓ Updated! Production now has ${data.milestones.length} milestones`);
  console.log(`✓ Milestones are now sorted by targetAmount`);
}

syncMilestonesToProduction().catch(console.error);
