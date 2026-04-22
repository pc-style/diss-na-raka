import Link from "next/link";
import type { DashboardState } from "@/lib/site-data";

export function SiteHeader({ dashboard }: { dashboard: DashboardState }) {
  return (
    <header className="hairline-b">
      <div className="mx-auto max-w-[1440px] grid grid-cols-12 items-stretch">
        {/* Brand */}
        <Link
          href="/"
          className="col-span-6 md:col-span-5 hairline-r px-5 py-5 md:py-7 flex flex-col justify-center"
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
            TABLICA STERUJĄCA · EST. D1 / 2026
          </span>
          <span className="font-display text-[28px] md:text-[38px] leading-[0.9] mt-1 uppercase">
            Diss na raka
            <span className="text-accent">.</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex col-span-5 hairline-r items-stretch divide-x divide-[var(--color-hair)]">
          {[
            { n: "01", href: "#tablica", label: "Tablica" },
            { n: "02", href: "#cele", label: "Harmonogram" },
            { n: "03", href: "#os", label: "Oś czasu" },
            { n: "04", href: "#kontekst", label: "Kontekst" },
          ].map((it) => (
            <a
              key={it.n}
              href={it.href}
              className="group relative flex-1 flex flex-col justify-end px-4 pb-3 pt-6 hover:bg-ink-2 transition-colors"
            >
              <span className="font-mono text-[10px] text-paper-dim">
                {it.n}
              </span>
              <span className="font-display uppercase text-sm tracking-wide">
                {it.label}
              </span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="col-span-6 md:col-span-2 flex items-stretch">
          <a
            href={dashboard.metadata.donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-1 flex items-center justify-between gap-3 px-4 py-5 bg-accent text-ink hover:bg-paper hover:text-ink transition-colors"
          >
            <div className="flex flex-col leading-[1.05]">
              <span className="font-mono text-[10px] tracking-[0.28em]">
                WESPRZYJ →
              </span>
              <span className="font-display uppercase text-lg">Donejt</span>
            </div>
            <span className="font-mono text-[10px] tracking-widest opacity-70 group-hover:opacity-100">
              24/7
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
