"use client";

import { useCallback, useEffect, useState } from "react";
import type { DashboardState, Milestone } from "@/lib/site-data";
import { formatMilestoneDateGmtPlus2 } from "@/lib/time";
import { useLiveCounter } from "@/lib/live-counter";
import { parseYouTubeId, youTubeEmbedUrl } from "@/lib/youtube";

function formatPLN(n: number) {
  return n.toLocaleString("pl-PL");
}

type EmbedState = { url: string; title: string } | null;

export function MilestonesSection({
  dashboard,
  milestones,
}: {
  dashboard: DashboardState;
  milestones: Milestone[];
}) {
  const { estimatedRaisedPln } = useLiveCounter(dashboard);
  const raised = estimatedRaisedPln;
  const max = Math.max(...milestones.map((m) => m.targetAmount));
  const progress = Math.min(raised / max, 1);
  const [embed, setEmbed] = useState<EmbedState>(null);

  const closeEmbed = useCallback(() => setEmbed(null), []);

  useEffect(() => {
    if (!embed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEmbed();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [embed, closeEmbed]);

  return (
    <section id="cele" className="hairline-t bg-ink-2 relative">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-24">
        <Header raised={raised} max={max} />

        {/* Horizontal timeline rail — snap scroller */}
        <div className="mt-16 relative -mx-5 md:-mx-10 milestones-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: "thin" }}>
          <ol
            className="relative flex w-max min-w-full px-5 md:px-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-5 right-5 md:left-10 md:right-10 top-[52px] h-px bg-[var(--color-hair-strong)] z-[1]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-5 md:left-10 top-[52px] h-[3px] -mt-[1px] bg-paper z-[2]"
              style={{
                width: `calc((100% - 2.5rem) * ${progress})`,
              }}
            />
            {milestones.map((m, i) => (
              <MilestoneCard
                key={m.id}
                m={m}
                idx={i + 1}
                last={i === milestones.length - 1}
                onEmbed={(state) => setEmbed(state)}
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
      {embed && <ClipEmbedModal embed={embed} onClose={closeEmbed} />}
    </section>
  );
}

function ClipEmbedModal({
  embed,
  onClose,
}: {
  embed: { url: string; title: string };
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={embed.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3">
          <span className="font-mono text-[10px] tracking-[0.22em] text-paper-dim uppercase truncate pr-3">
            ▶ {embed.title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij klip"
            className="font-mono text-[11px] tracking-[0.18em] text-paper-dim hover:text-paper transition-colors"
          >
            ZAMKNIJ ✕
          </button>
        </div>
        <div className="aspect-video w-full bg-ink hairline-box overflow-hidden">
          <iframe
            src={embed.url}
            title={embed.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
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
  onEmbed,
}: {
  m: Milestone;
  idx: number;
  last: boolean;
  onEmbed: (state: { url: string; title: string }) => void;
}) {
  const achieved = m.status === "achieved";
  const ytId = m.clipLink ? parseYouTubeId(m.clipLink) : null;
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
        {m.clipLink && (
          <a
            href={m.clipLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (ytId) {
                e.preventDefault();
                onEmbed({ url: youTubeEmbedUrl(ytId), title: m.title });
              }
            }}
            className="w-fit border border-accent/70 bg-accent/10 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-accent transition-colors hover:bg-accent hover:text-ink"
          >
            ▶ {ytId ? "ZOBACZ KLIP" : "ZOBACZ ŹRÓDŁO"}
          </a>
        )}

        <div className="mt-auto pt-3 hairline-t flex items-center justify-between font-mono text-[10px] tracking-widest text-paper-dim">
          <span>
            {achieved && m.dateAchieved
              ? formatMilestoneDateGmtPlus2(m.dateAchieved)
              : "—"}
          </span>
          <span>{achieved ? "✓ LIVE" : "Δ ROŚNIE"}</span>
        </div>
      </div>
    </li>
  );
}
