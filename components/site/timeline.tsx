"use client";

import { useMemo, useState } from "react";
import {
  timelineEvents,
  categoryMeta,
  type EventCategory,
  type TimelineEvent,
} from "@/lib/data";

const filters: { key: EventCategory | "all"; label: string }[] = [
  { key: "all", label: "Wszystko" },
  { key: "milestone_execution", label: "Cele" },
  { key: "guest_appearance", label: "Goście" },
  { key: "endurance_challenge", label: "Wytrzymałość" },
  { key: "scheduled_appearance", label: "Zaplanowane" },
  { key: "core_event", label: "Rdzeń" },
];

export function TimelineSection() {
  const [active, setActive] = useState<EventCategory | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return timelineEvents.filter((e) => {
      const matchesCat = active === "all" || e.category === active;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        e.description.toLowerCase().includes(q) ||
        e.participants.join(" ").toLowerCase().includes(q) ||
        e.tags.join(" ").toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [active, query]);

  return (
    <section id="os" className="hairline-t relative bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="font-mono text-[10px] tracking-[0.28em] text-paper-dim">
              SEKTOR 03 · OŚ CZASU · VOD INDEKS
            </div>
            <h2 className="mt-2 font-display uppercase text-[clamp(40px,7vw,96px)] leading-[0.85]">
              Kto, kiedy, co
              <br />
              <span className="text-accent">zrobił</span> na streamie.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="font-serif text-base text-paper-dim leading-snug">
              9 dni streamu = ~13 mln sekund VOD-a. Tu masz wyciągnięte momenty
              z timestampami, gośćmi i tagami, żeby nie scrollować na ślepo.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 flex flex-wrap items-center gap-0 hairline-box">
            {filters.map((f, i) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  className={`px-4 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                    i === 0 ? "" : "hairline-l"
                  } ${
                    isActive
                      ? "bg-paper text-ink"
                      : "text-paper-dim hover:text-paper"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <div className="col-span-12 md:col-span-4 hairline-box flex items-center">
            <span className="px-4 font-mono text-[10px] tracking-[0.24em] text-paper-dim">
              ⌕
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="szukaj: bambi, tatuaż, haircut…"
              className="flex-1 bg-transparent font-mono text-sm placeholder:text-paper-dim/60 py-3 pr-4 focus:outline-none"
            />
          </div>
        </div>

        {/* Events list */}
        <ol className="mt-10 relative">
          {/* vertical spine */}
          <div
            aria-hidden
            className="absolute left-[7px] md:left-[14px] top-0 bottom-0 w-px bg-[var(--color-hair-strong)]"
          />
          {filtered.length === 0 && (
            <li className="pl-10 py-6 font-mono text-sm text-paper-dim">
              // brak wpisów dla tego filtra
            </li>
          )}
          {filtered.map((e) => (
            <EventRow key={e.id} e={e} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function EventRow({ e }: { e: TimelineEvent }) {
  const meta = categoryMeta[e.category];
  const isPending = e.category === "scheduled_appearance";
  const isMilestone = e.category === "milestone_execution";

  return (
    <li className="relative pl-10 md:pl-12 py-5 hairline-b card-wipe group">
      <span
        aria-hidden
        className={`absolute left-0 md:left-[7px] top-7 size-4 rounded-full border-2 ${
          isPending
            ? "bg-ink border-accent live-dot"
            : isMilestone
              ? "bg-paper border-paper"
              : "bg-paper-dim border-paper-dim"
        }`}
      />
      <div className="grid grid-cols-12 gap-4 items-start">
        <div className="col-span-12 md:col-span-3 flex flex-col">
          <span className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
            {e.dateLocal}
          </span>
          <span className="font-display uppercase text-base mt-1 leading-tight">
            {e.relativeTime}
          </span>
          <span className="mt-2 inline-flex w-fit items-center gap-2 px-2 py-[3px] hairline-box font-mono text-[9px] tracking-[0.2em] text-paper-dim">
            <span
              className={`size-1.5 rounded-full ${
                isPending
                  ? "bg-accent"
                  : isMilestone
                    ? "bg-paper"
                    : "bg-paper-dim"
              }`}
            />
            {meta.short} · {meta.label}
          </span>
        </div>
        <div className="col-span-12 md:col-span-6">
          <p className="font-serif text-lg leading-snug text-paper">
            {e.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {e.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-widest text-paper-dim hairline-box px-2 py-[2px]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-[10px] tracking-[0.24em] text-paper-dim mb-2">
            UCZESTNICY
          </div>
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {e.participants.map((p) => (
              <li
                key={p}
                className="font-display uppercase text-sm leading-tight"
              >
                {p}
                <span className="text-accent">.</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
