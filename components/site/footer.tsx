import { buildFundraiserClickUrl } from "@/lib/fundraiser-clicks";
import { siteConfig, type DashboardState } from "@/lib/site-data";
import { formatDateOnlyGmtPlus2, formatDateTimeGmtPlus2 } from "@/lib/time";

export function SiteFooter({ dashboard }: { dashboard: DashboardState }) {
  return (
    <footer className="hairline-t bg-ink">
      {/* Giant wordmark */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16">
        <div className="font-display uppercase leading-[0.82] text-[clamp(84px,18vw,280px)] text-paper select-none">
          <span className="text-paper-dim">diss</span>{" "}
          <span>
            na <span className="text-accent">raka</span>
          </span>
          <span className="text-accent">.</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pb-10 pt-10 grid grid-cols-12 gap-6 hairline-t">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
          <span className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
            STOPKA · FAN TRACKER
          </span>
          <p className="font-serif text-base text-paper-dim max-w-prose leading-snug">
            Nieoficjalna tablica fanowska do streamu{" "}
            <span className="text-paper">łatwogang × Cancer Fighters</span>.
            Nie jestem afiliowany — ręcznie zbieram dane, żeby łatwiej śledzić,
            co się dzieje. Jeśli chcesz pomóc z update&apos;ami lub snapshotami,
            odezwij się na{" "}
            <a
              className="text-paper underline decoration-accent underline-offset-4"
              href={siteConfig.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.supportHandle}
            </a>
            . Prawdziwe donejty idą do oficjalnej zbiórki Fundacji Cancer
            Fighters.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3 flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
            ŹRÓDŁO
          </span>
          <a
            className="font-display uppercase text-base hover:text-accent transition-colors"
            href={
              dashboard.metadata.currentLiveVideoUrl ??
              `https://youtube.com/channel/${dashboard.metadata.channelId}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube · łatwogang ↗
          </a>
          <a
            className="font-display uppercase text-base hover:text-accent transition-colors"
            href="https://www.cancerfighters.pl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cancer Fighters ↗
          </a>
          <a
            className="font-display uppercase text-base hover:text-accent transition-colors"
            href={buildFundraiserClickUrl("footer")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Siepomaga · Donejt ↗
          </a>
          <a
            className="font-display uppercase text-base hover:text-accent transition-colors"
            href={dashboard.metadata.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Utwór na YouTube ↗
          </a>
          <a
            className="font-display uppercase text-base hover:text-accent transition-colors"
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Repo ↗
          </a>
        </div>

        <div className="col-span-6 md:col-span-4 flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
            META
          </span>
          <ul className="font-mono text-xs space-y-1 text-paper-dim">
            <li>
              Ostatni snapshot danych:{" "}
              <span className="text-paper">
                {formatDateTimeGmtPlus2(dashboard.metadata.lastUpdatedUtc)}
              </span>
            </li>
            {dashboard.metadata.lastYouTubeSyncUtc ? (
              <li>
                Ostatni sync YouTube API:{" "}
                <span className="text-paper">
                  {formatDateTimeGmtPlus2(dashboard.metadata.lastYouTubeSyncUtc)}
                </span>
              </li>
            ) : null}
            <li>
              Start streamu:{" "}
              <span className="text-paper">
                {formatDateOnlyGmtPlus2(dashboard.metadata.startTimestampUtc)}
              </span>
            </li>
            <li>Platforma: {dashboard.metadata.platform}</li>
            <li>Beneficjent: {dashboard.metadata.beneficiary}</li>
            <li>
              URL:{" "}
              <a
                className="text-paper hover:text-accent transition-colors"
                href={siteConfig.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.siteUrl}
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-12 flex items-center justify-between pt-6 hairline-t font-mono text-[10px] tracking-[0.2em] text-paper-dim">
          <span>◆ BUILT FOR THE CHAT · NOT FOR PROFIT</span>
          <span>v0.2 · API-READY · 2026</span>
        </div>
      </div>
    </footer>
  );
}
