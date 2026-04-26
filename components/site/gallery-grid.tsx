"use client";

import { useMemo, useState } from "react";
import type { VideoClip, VideoClipType } from "@/lib/video-clips";

const filterOptions: Array<{ value: VideoClipType | "all"; label: string }> = [
  { value: "all", label: "Wszystko" },
  { value: "reportaz", label: "Reportaż" },
  { value: "news", label: "News" },
  { value: "klip", label: "Klip" },
  { value: "koncert", label: "Koncert" },
  { value: "stream", label: "Stream" },
  { value: "utwor", label: "Utwór" },
];

export function GalleryGrid({ clips }: { clips: VideoClip[] }) {
  const [activeType, setActiveType] = useState<VideoClipType | "all">("all");
  const filteredClips = useMemo(
    () => clips.filter((clip) => activeType === "all" || clip.type === activeType),
    [activeType, clips],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const count =
            option.value === "all"
              ? clips.length
              : clips.filter((clip) => clip.type === option.value).length;
          const isActive = activeType === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setActiveType(option.value)}
              className={`hairline-box px-3 py-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors ${
                isActive
                  ? "bg-accent text-ink"
                  : "bg-ink text-paper-dim hover:bg-paper hover:text-ink"
              }`}
            >
              {option.label} · {count}
            </button>
          );
        })}
      </div>

      <div className="mb-5 font-mono text-[10px] tracking-[0.22em] text-paper-dim uppercase">
        Pokazuję {filteredClips.length} z {clips.length} materiałów
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredClips.map((clip, index) => (
          <article key={clip.id} className="hairline-box bg-ink card-wipe">
            <div className="aspect-video bg-paper/10 hairline-b">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${clip.videoId}`}
                title={clip.title}
                className="h-full w-full"
                loading={index === 0 ? "eager" : "lazy"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="grid grid-cols-12 gap-4 p-5 md:p-6">
              <div className="col-span-12 md:col-span-3">
                <div className="font-mono text-[10px] tracking-[0.24em] text-paper-dim">
                  #{String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 inline-flex hairline-box px-2 py-1 font-mono text-[9px] tracking-[0.2em] uppercase text-paper-dim">
                  {clip.type}
                </div>
                <div className="mt-2 inline-flex hairline-box px-2 py-1 font-mono text-[9px] tracking-[0.2em] uppercase text-paper-dim">
                  {clip.confidence}
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-display uppercase text-2xl leading-none md:text-3xl">
                  {clip.title}
                </h2>
                <p className="mt-3 font-serif text-base leading-snug text-paper-dim">
                  {clip.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {clip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="hairline-box px-2 py-[2px] font-mono text-[10px] tracking-widest text-paper-dim"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.16em] text-paper-dim">
                  <span>{clip.channelTitle}</span>
                  <a
                    href={clip.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:text-paper transition-colors"
                  >
                    YOUTUBE ↗
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
