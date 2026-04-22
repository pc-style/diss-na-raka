export function ContextSection() {
  return (
    <section
      id="kontekst"
      className="hairline-t relative bg-ink-2 overflow-hidden"
    >
      <div className="absolute inset-0 bg-graph opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-24 grid grid-cols-12 gap-8 relative">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
            SEKTOR 04 · KONTEKST
          </div>
          <h2 className="mt-2 font-display uppercase text-[clamp(36px,5.6vw,76px)] leading-[0.85]">
            Dlaczego
            <br />
            <span className="text-accent">to działa.</span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-0 hairline-box">
          {cards.map((c, i) => (
            <article
              key={c.title}
              className={`p-6 ${
                i % 2 === 0 ? "md:hairline-r" : ""
              } ${i < cards.length - 2 ? "hairline-b" : ""} flex flex-col gap-3 card-wipe`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
                  NOTA / {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] text-paper-dim">
                  {c.tag}
                </span>
              </div>
              <h3 className="font-display uppercase text-xl leading-tight">
                {c.title}
              </h3>
              <p className="font-serif text-base leading-snug text-paper-dim">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const cards = [
  {
    tag: "diss na raka",
    title: "Format dissu przekierowany na raka",
    body: `Bedoes 2115 użył formatu zbudowanego w hip-hopie — diss tracku — ale
wycelował go w pediatryczną onkologię. Kolaboracja z 11-letnią Mają Mecan,
która walczy z trzecim nawrotem białaczki szpiku, zakotwicza cały event w
realnej historii, nie w abstrakcji.`,
  },
  {
    tag: "gamified philanthropy",
    title: "Donejt jako mikrotransakcja z konsekwencją",
    body: `Każdy kamień milowy zamienia kasę na fizyczną, nieodwracalną akcję:
golenie głowy, tatuaż, pogodzenie się po beefie. To nie pasek postępu — to
kontrakt z publicznością, którego nie da się cofnąć po streamie.`,
  },
  {
    tag: "network effect",
    title: "Pierwsza kostka domina to Bedoes",
    body: `Wejście tier-1 artysty tworzy grawitację. Bambi wchodzi w projekt albumu,
Szpaku obiecuje koncert, Oki × Kinny Zimmer stają się walutą przy 4M PLN.
Każde kolejne nazwisko podbija stawkę dla następnego.`,
  },
  {
    tag: "conditional scarcity",
    title: "Warunkowe wejścia = sztuczna rzadkość",
    body: `White 2115 zażądał +150k PLN do 15:00, żeby w ogóle się pojawić. Ten typ
warunku kompresuje czas decyzji w chacie i lokalnie skokowo przyspiesza
tempo donejtów — tablica powinna pokazywać takie okna live.`,
  },
] as const;
