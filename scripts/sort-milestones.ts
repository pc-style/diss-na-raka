import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "lib", "site-data.ts");
const content = fs.readFileSync(filePath, "utf-8");

// Extract the milestones array using regex
const milestonesMatch = content.match(/milestones:\s*\[([\s\S]*?)\],\s*timelineEvents:/);
if (!milestonesMatch) {
  console.error("Could not find milestones array");
  process.exit(1);
}

const milestonesStr = milestonesMatch[0];
const milestonesArrayStr = milestonesMatch[0].replace(/milestones:\s*\[/, "[").replace(/],\s*timelineEvents:/, "]");

// Parse the milestones
const milestones = JSON.parse(milestonesArrayStr);

// Sort by targetAmount
milestones.sort((a: { targetAmount: number }, b: { targetAmount: number }) => a.targetAmount - b.targetAmount);

// Convert back to string with proper formatting
const sortedMilestonesStr = JSON.stringify(milestones, null, 2);

// Replace the old milestones array with the sorted one
const newContent = content.replace(
  /milestones:\s*\[[\s\S]*?\],\s*timelineEvents:/,
  `milestones: ${sortedMilestonesStr},\n  timelineEvents:`
);

fs.writeFileSync(filePath, newContent, "utf-8");
console.log("✓ Milestones sorted by targetAmount");
