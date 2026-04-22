import { TopBar } from "@/components/site/top-bar";
import { SiteHeader } from "@/components/site/header";
import { HeroDashboard } from "@/components/site/hero-dashboard";
import { MilestonesSection } from "@/components/site/milestones";
import { TimelineSection } from "@/components/site/timeline";
import { ContextSection } from "@/components/site/context";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar />
      <SiteHeader />
      <main className="flex-1">
        <HeroDashboard />
        <MilestonesSection />
        <TimelineSection />
        <ContextSection />
      </main>
      <SiteFooter />
    </div>
  );
}
