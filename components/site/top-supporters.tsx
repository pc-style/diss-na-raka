import type { TopSupporter } from "@/lib/site-data";

function formatPLN(value: number) {
  return value.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function TopSupportersSection({
  supporters,
}: {
  supporters: TopSupporter[];
}) {
  const podium = supporters.slice(0, 3);
  const rest = supporters.slice(3);
  const total = supporters.reduce((sum, supporter) => sum + supporter.amountPln, 0);

  return (
    <section id="top-supporters" className="hairline-t bg-ink relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(90deg,var(--color-paper)_1px,transparent_1px),linear-gradient(var(--color-paper)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-24 relative">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
              SEKTOR 03 · TOP WPŁACAJĄCY
            </div>
            <h2 className="mt-2 font-display uppercase text-[clamp(40px,7vw,96px)] leading-[0.85]">
              Największe
              <br />
              <span className="text-accent">strzały</span> na licznik.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pl-8 md:border-l md:border-[var(--color-hair)]">
            <p className="font-serif text-lg text-paper-dim leading-snug">
              Ranking największych wpłat odczytany z live overlaya. Sama pierwsza piętnastka dorzuca ponad{" "}
              <span className="font-display text-paper tnum marker-circle">
                {formatPLN(total)} PLN
              </span>
              .
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {podium.map((supporter) => (
            <article
              key={supporter.rank}
              className="hairline-box bg-paper text-ink p-5 md:p-6 min-h-[220px] flex flex-col justify-between card-wipe"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="font-mono text-[11px] tracking-[0.24em] uppercase">
                  miejsce #{supporter.rank}
                </div>
                <div className="font-display text-5xl leading-none text-accent tnum">
                  {supporter.rank}
                </div>
              </div>
              <div>
                <h3 className="font-display uppercase text-3xl md:text-4xl leading-none">
                  {supporter.name}
                </h3>
                <div className="mt-4 font-mono text-xl md:text-2xl font-bold tnum text-accent">
                  {formatPLN(supporter.amountPln)} zł
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 hairline-box bg-ink-2">
          <ol className="divide-y divide-[var(--color-hair)]">
            {rest.map((supporter) => (
              <li
                key={supporter.rank}
                className="grid grid-cols-12 gap-3 px-4 py-4 md:px-6 items-center"
              >
                <div className="col-span-2 md:col-span-1 font-display text-2xl text-paper-dim tnum">
                  {String(supporter.rank).padStart(2, "0")}
                </div>
                <div className="col-span-10 md:col-span-7 font-display uppercase text-xl md:text-3xl leading-none">
                  {supporter.name}
                </div>
                <div className="col-span-12 md:col-span-4 md:text-right font-mono text-sm md:text-lg text-accent tnum">
                  {formatPLN(supporter.amountPln)} zł
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
