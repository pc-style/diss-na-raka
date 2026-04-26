import Link from "next/link";
import { SiteFooter } from "@/components/site/footer";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { SiteHeader } from "@/components/site/header";
import { SiteLiveCounterProvider } from "@/components/site/live-counter-provider";
import { TopBar } from "@/components/site/top-bar";
import { getSiteData } from "@/lib/data-store";
import { counterHistory } from "@/lib/site-data";
import { featuredVideoClips } from "@/lib/video-clips";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const data = await getSiteData();

  return (
    <div className="flex flex-1 flex-col">
      <SiteLiveCounterProvider dashboard={data.dashboard} snapshots={counterHistory}>
        <TopBar dashboard={data.dashboard} />
        <SiteHeader dashboard={data.dashboard} />
        <main className="flex-1">
          <section className="relative overflow-hidden bg-ink hairline-b">
            <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
              <div className="grid grid-cols-12 gap-6 items-end">
                <div className="col-span-12 md:col-span-8">
                  <div className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
                    SEKTOR 05 · GALERIA VOD · YOUTUBE API
                  </div>
                  <h1 className="mt-2 font-display uppercase text-[clamp(48px,9vw,132px)] leading-[0.82]">
                    Najlepsze
                    <br />
                    <span className="text-accent">klipy</span> streamu.
                  </h1>
                </div>
                <div className="col-span-12 md:col-span-4 md:border-l md:border-[var(--color-hair)] md:pl-8">
                  <p className="font-serif text-lg text-paper-dim leading-snug">
                    Osadzone materiały znalezione przez YouTube API i ręcznie
                    przefiltrowane pod wydarzenia z osi czasu. Część klipów to
                    recapy lub fanowskie materiały, więc każdy wpis ma poziom
                    pewności.
                  </p>
                  <Link
                    href="/"
                    className="mt-5 inline-flex font-display uppercase text-base text-accent hover:text-paper transition-colors"
                  >
                    ← Wróć do trackera
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-ink-2">
            <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
              <GalleryGrid clips={featuredVideoClips} />
            </div>
          </section>
        </main>
        <SiteFooter dashboard={data.dashboard} />
      </SiteLiveCounterProvider>
    </div>
  );
}
