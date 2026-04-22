import type { DashboardState, Milestone } from "@/lib/site-data";

function formatPLN(n: number) {
  return n.toLocaleString("pl-PL");
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pl-PL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MilestonesSection({
  dashboard,
  milestones,
}: {
  dashboard: DashboardState;
  milestones: Milestone[];
}) {
  const raised = dashboard.totalRaisedPln;
  const max = Math.max(...milestones.map((m) => m.targetAmount));

  return (
    <section id="cele" className="hairline-t bg-ink-2 relative">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-24">
        <Header raised={raised} max={max} />

        {/* Horizontal timeline rail — snap scroller */}
        <div className="mt-16 relative -mx-5 md:-mx-10">
          {/* base line */}
          <div
            aria-hidden
            className="absolute left-5 right-5 md:left-10 md:right-10 top-[52px] h-px bg-[var(--color-hair-strong)]"
          />
          {/* achieved fill */}
          <div
            aria-hidden
            className="absolute left-5 md:left-10 top-[52px] h-[3px] -mt-[1px] bg-paper"
            style={{
              width: `calc((100% - 2.5rem) * ${raised / max})`,
            }}
          />

          <ol
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 md:px-10"
            style={{ scrollbarWidth: "thin" }}
          >
            {milestones.map((m, i) => (
              <MilestoneCard
                key={m.id}
                m={m}
                idx={i + 1}
                last={i === milestones.length - 1}
              />
            ))}
          </ol>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink-2 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink-2 to-transparent" />
        </div>

        <div className="mt-6 font-mono text-[10px] tracking-[0.24em] text-paper-dim flex items-center gap-3">
          <span>← PRZESUŃ →</span>
          <span className="h-px flex-1 bg-[var(--color-hair)]" />
          <span className="tnum">
            {milestones.filter((m) => m.status === "achieved").length}/
            {milestones.length} ZAKLEPANE
          </span>
        </div>
      </div>
    </section>
  );
}

function Header({ raised, max }: { raised: number; max: number }) {
  return (
    <div className="grid grid-cols-12 gap-6 items-end">
      <div className="col-span-12 md:col-span-7">
        <div className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
          SEKTOR 02 · HARMONOGRAM CELÓW
        </div>
        <h2 className="mt-2 font-display uppercase text-[clamp(40px,7vw,96px)] leading-[0.85]">
          Co <span className="text-accent">odblokowuje</span>
          <br />
          kolejna kasa.
        </h2>
      </div>
      <div className="col-span-12 md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-hair)]">
        <p className="font-serif text-lg text-paper-dim leading-snug">
          Każdy próg to nie pasek postępu, tylko realna konsekwencja: głowa
          idzie pod maszynkę, tatuaż ląduje na skórze, beef zostaje
          pogrzebany. Czarna krecha niżej pokazuje, ile z drogi do{" "}
          <span className="text-paper">
            {formatPLN(max)} PLN
          </span>{" "}
          już przerobiliśmy — na dziś{" "}
          <span className="font-display text-paper tnum marker-circle">
            {Math.round((raised / max) * 100)}%
          </span>
          .
        </p>
      </div>
    </div>
  );
}

function MilestoneCard({
  m,
  idx,
  last,
}: {
  m: Milestone;
  idx: number;
  last: boolean;
}) {
  const achieved = m.status === "achieved";
  return (
    <li
      className={`group relative flex flex-col shrink-0 snap-start w-[260px] md:w-[280px] ${
        last ? "" : "hairline-r"
      } card-wipe`}
    >
      {/* Amount + node */}
      <div className="px-4 pt-4 pb-6 relative min-h-[108px] hairline-b">
        <div className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
          #{String(idx).padStart(2, "0")} ·{" "}
          {achieved ? "OSIĄGNIĘTE" : "OCZEKUJE"}
        </div>
        <div className="mt-1 font-display text-2xl md:text-3xl tnum leading-none">
          {formatPLN(m.targetAmount)}
          <span className="text-paper-dim text-base ml-1">PLN</span>
        </div>

        {/* node on the rail */}
        <span
          aria-hidden
          className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 -bottom-[10px] size-5 rounded-full grid place-items-center ${
            achieved
              ? "bg-paper text-ink"
              : "bg-ink border-2 border-accent text-accent live-dot"
          }`}
        >
          <span className="block size-1.5 rounded-full bg-current" />
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1 relative">
        {achieved && (
          <span className="absolute -top-1 right-3 stamp wobble text-[10px] text-paper pointer-events-none select-none">
            OSIĄGNIĘTE
          </span>
        )}
        {!achieved && (
          <span className="absolute -top-1 right-3 stamp wobble text-[10px] text-accent pointer-events-none select-none">
            OCZEKUJE
          </span>
        )}

        <h3 className="font-display uppercase text-lg leading-[1.05] max-w-[22ch]">
          {m.title}
        </h3>
        <p className="font-serif text-sm text-paper-dim leading-snug">
          {m.description}
        </p>

        <div className="mt-auto pt-3 hairline-t flex items-center justify-between font-mono text-[10px] tracking-widest text-paper-dim">
          <span>{achieved && m.dateAchieved ? formatDate(m.dateAchieved) : "—"}</span>
          <span>{achieved ? "✓ LIVE" : "Δ ROŚNIE"}</span>
        </div>
      </div>
    </li>
  );
}
