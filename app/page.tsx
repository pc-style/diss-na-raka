import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/header";
import { HeroDashboard } from "@/components/site/hero-dashboard";
import { MilestonesSection } from "@/components/site/milestones";
import { TimelineSection } from "@/components/site/timeline";
import { ContextSection } from "@/components/site/context";
import { SiteFooter } from "@/components/site/footer";
import { getSiteData } from "@/lib/data-store";
import { categoryMeta } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getSiteData();

  return (
    <div className="flex flex-1 flex-col">
      <TopBar dashboard={data.dashboard} />
      <SiteHeader dashboard={data.dashboard} />
      <main className="flex-1">
        <HeroDashboard dashboard={data.dashboard} milestones={data.milestones} />
        <MilestonesSection
          dashboard={data.dashboard}
          milestones={data.milestones}
        />
        <TimelineSection
          timelineEvents={data.timelineEvents}
          categoryMeta={categoryMeta}
        />
        <ContextSection />
      </main>
      <SiteFooter dashboard={data.dashboard} />
    </div>
  );
}
