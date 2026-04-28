import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/header";
import { HeroDashboard } from "@/components/site/hero-dashboard";
import { MilestonesSection } from "@/components/site/milestones";
import { TimelineSection } from "@/components/site/timeline";
import { TopSupportersSection } from "@/components/site/top-supporters";
import { ContextSection } from "@/components/site/context";
import { SiteFooter } from "@/components/site/footer";
import { SiteLiveCounterProvider } from "@/components/site/live-counter-provider";
import { FundraiserScraperTrigger } from "@/components/site/fundraiser-scraper-trigger";
import { getSiteData } from "@/lib/data-store";
import { categoryMeta, counterHistory, topSupporters } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getSiteData();

  return (
    <div className="flex flex-1 flex-col">
      <SiteLiveCounterProvider
        dashboard={data.dashboard}
        snapshots={counterHistory}
      >
        <FundraiserScraperTrigger />
        <TopBar dashboard={data.dashboard} />
        <SiteHeader dashboard={data.dashboard} />
        <main className="flex-1">
          <HeroDashboard dashboard={data.dashboard} milestones={data.milestones} />
          <MilestonesSection
            dashboard={data.dashboard}
            milestones={data.milestones}
          />
          <TopSupportersSection supporters={topSupporters} />
          <TimelineSection
            timelineEvents={data.timelineEvents}
            categoryMeta={categoryMeta}
          />
          <ContextSection />
        </main>
        <SiteFooter dashboard={data.dashboard} />
      </SiteLiveCounterProvider>
    </div>
  );
}
