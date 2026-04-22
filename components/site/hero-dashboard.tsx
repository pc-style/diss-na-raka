import { dashboard, milestones } from "@/lib/data";
import { LiveClock } from "./live-clock";
import { CrabMascot } from "./crab-mascot";

function formatPLN(n: number) {
  return n.toLocaleString("pl-PL");
}

export function HeroDashboard() {
  // Find next pending milestone for mini progress meter
  const nextGoal = milestones.find((m) => m.status === "pending");
  const raised = dashboard.totalRaisedPln;
  const target = nextGoal?.targetAmount ?? raised;
  const previousTarget =
    [...milestones]
      .filter((m) => m.status === "achieved")
      .sort((a, b) => b.targetAmount - a.targetAmount)[0]?.targetAmount ?? 0;
  const localProgress = Math.min(
    1,
    Math.max(
      0,
      (raised - previousTarget) / Math.max(1, target - previousTarget),
    ),
  );

  const formatted = formatPLN(raised);

  return (
    <section
      id="tablica"
      className="relative bg-ink bg-graph bg-grain overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] grid grid-cols-12 gap-0 relative">
        {/* Serial number rail, left */}
        <aside className="hidden lg:flex col-span-1 hairline-r flex-col justify-between px-3 py-10 font-mono text-[10px] tracking-[0.2em] text-paper-dim">
          <div className="rotate-180 [writing-mode:vertical-rl] whitespace-nowrap">
            SEKTOR 01 · TABLICA
          </div>
          <div className="flex flex-col items-center gap-4">
            <span>◆</span>
            <span>◆</span>
            <span>◆</span>
          </div>
          <div className="[writing-mode:vertical-rl] whitespace-nowrap">
            S/N 2026-04-22-A
          </div>
        </aside>

        {/* Main counter block */}
        <div className="col-span-12 lg:col-span-8 hairline-r px-5 md:px-10 py-10 md:py-16">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-paper-dim rise" style={{ animationDelay: "40ms" }}>
            <span className="live-dot block size-2 rounded-full bg-accent" />
            LIVE · ZBIÓRKA W TOKU · FUNDACJA CANCER FIGHTERS
          </div>

          <h1
            className="mt-6 font-display uppercase leading-[0.82] text-[clamp(64px,12vw,184px)] rise relative"
            style={{ animationDelay: "80ms" }}
          >
            Ciągle
            <br />
            <span className="marker-circle">tutaj</span>{" "}
            <span className="relative inline-block">
              jestem
              <span className="text-accent">.</span>
            </span>
            <CrabMascot className="pointer-events-none absolute -top-6 right-0 md:-top-2 md:-right-6 w-[140px] md:w-[220px] rotate-[8deg]" />
          </h1>

          <p
            className="mt-8 max-w-xl font-serif text-lg md:text-xl leading-snug text-paper-dim rise"
            style={{ animationDelay: "160ms" }}
          >
            Nieoficjalna tablica 9-dniowego streamu{" "}
            <span className="text-paper">łatwogang</span>, na którym utwór
            Bedoesa 2115 i Mai Mecan leci w pętli, a środki lecą do{" "}
            <span className="text-paper">Cancer Fighters</span>. Tu jest
            licznik, cele i oś czasu — żeby chat przestał pytać „ile jeszcze".
          </p>

          {/* Massive total */}
          <div
            className="mt-14 rise"
            style={{ animationDelay: "240ms" }}
          >
            <div className="flex items-end justify-between gap-4 hairline-b pb-2">
              <span className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
                ZEBRANO · ŁĄCZNIE
              </span>
              <span className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
                PLN
              </span>
            </div>
            <div className="mt-2 relative">
              <span className="font-hand text-accent text-2xl md:text-3xl rotate-[-3deg] inline-block">
                każda złotówka na raka ↓
              </span>
            </div>
            <div className="mt-1 tnum overflow-hidden">
              <div className="font-display leading-[0.82] text-paper whitespace-nowrap tracking-tight text-[clamp(44px,10.5vw,168px)] marker-underline pb-2">
                {formatted}
              </div>
            </div>

            {/* mini progress to next goal */}
            {nextGoal && (
              <div className="mt-8 hairline-box p-4 md:p-5 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
                    NASTĘPNY CEL
                  </span>
                  <span className="font-display uppercase text-lg leading-tight">
                    {nextGoal.title}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="h-3 w-full relative bg-ink-2 hairline-box overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-accent"
                      style={{ width: `${localProgress * 100}%` }}
                    />
                    {/* tick marks */}
                    <div className="absolute inset-0 flex">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 border-r border-ink/40 last:border-r-0"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[10px] tracking-widest text-paper-dim">
                    <span>{formatPLN(previousTarget)} PLN</span>
                    <span>Δ {formatPLN(target - raised)} PLN</span>
                    <span className="text-paper">
                      {formatPLN(target)} PLN
                    </span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 text-right font-display text-3xl tnum">
                  {Math.round(localProgress * 100)}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side metrics rail */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col divide-y divide-[var(--color-hair)]">
          <div className="p-5">
            <LiveClock />
          </div>
          <MetricRow
            label="ŚREDNIA / GODZ"
            value={`${formatPLN(Math.round(dashboard.velocity.averagePlnPerHour))}`}
            suffix="PLN"
          />
          <MetricRow
            label="ŚREDNIA OGLĄDALNOŚĆ"
            value={formatPLN(dashboard.engagement.averageConcurrentViewers)}
            suffix="LIVE"
          />
          <MetricRow
            label="NOWI SUBSKRYBENCI"
            value={`+${formatPLN(dashboard.engagement.newSubscribersDuringEvent)}`}
            suffix="KANAŁ"
          />
          <MetricRow
            label="WYŚWIETLENIA"
            value={formatPLN(dashboard.engagement.totalViewsGenerated)}
            suffix="ŁĄCZNIE"
          />
          <div className="p-5 bg-ink-2">
            <div className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
              TEMPO ZBIÓRKI
            </div>
            <ul className="mt-3 font-mono text-xs space-y-1 tnum">
              {dashboard.velocity.milestoneVelocity.map((m) => (
                <li
                  key={m.label}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-[var(--color-hair)] pb-1"
                >
                  <span className="text-paper-dim">→ {m.label} PLN</span>
                  <span>{m.hours}h</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function MetricRow({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="p-5 flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
          {label}
        </span>
        {suffix && (
          <span className="font-mono text-[9px] tracking-widest text-paper-dim">
            {suffix}
          </span>
        )}
      </div>
      <span className="font-display text-3xl tnum leading-none">{value}</span>
    </div>
  );
}
