#!/usr/bin/env bun

/**
 * Post-event Parallel orchestrator.
 *
 * Fans out multiple Parallel Task API runs in parallel (Promise.all) covering
 * all the angles we want for the Diss na raka recap once the stream is over:
 *
 *   1. final-recap          - definitive final total, official end-of-stream
 *                             statements, foundation post-mortem.
 *   2. milestones           - full list of declared milestones (achieved /
 *                             failed) with execution evidence.
 *   3. timeline-events      - source-backed timeline events for the last day
 *                             of the stream, ready to merge into site-data.
 *   4. donations            - corporate / celebrity / major individual
 *                             donations with amounts.
 *   5. celebrity-guests     - every confirmed celebrity / public figure
 *                             appearance, call-in, head-shave, tattoo etc.
 *   6. media-coverage       - news article index across PL outlets.
 *   7. shorts-clips         - viral short-form clips (YouTube Shorts / TikTok
 *                             / IG Reels / Twitter) with direct URLs and
 *                             view counts.
 *   8. engagement-records   - peak / average viewers, total views, new subs,
 *                             total hours, Guinness / world-record claims.
 *
 * Usage:
 *   bun run scripts/parallel-postevent.ts                # all topics, processor=pro
 *   bun run scripts/parallel-postevent.ts --processor core
 *   bun run scripts/parallel-postevent.ts --only shorts-clips,donations
 *   bun run scripts/parallel-postevent.ts --resume       # poll existing run ids
 *
 * Each run is persisted to research/postevent/<topic>.json. A combined
 * research/postevent/_index.json is written summarising all run ids + status.
 *
 * Env: PARALLEL_API_KEY (loaded from env, .env.local, or .env).
 */

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

type Processor = "base" | "core" | "pro" | "ultra";

interface Topic {
  id: string;
  description: string;
  processor: Processor;
  input: string;
  output_schema: Record<string, unknown>;
}

interface CliOptions {
  processor?: Processor;
  only?: string[];
  resume: boolean;
  pollMs: number;
  timeoutMs: number;
}

interface TaskRunResponse {
  run_id: string;
  status?: string;
}

interface TaskResultResponse {
  status?: string;
  output?: unknown;
  result?: unknown;
  error?: string;
}

interface IndexEntry {
  topic: string;
  runId: string;
  status: "completed" | "failed" | "timeout";
  outputPath: string;
  error?: string;
  durationMs: number;
}

const API_BASE = "https://api.parallel.ai";
const OUT_DIR = path.join(process.cwd(), "research", "postevent");
const INDEX_PATH = path.join(OUT_DIR, "_index.json");

const WINDOW_DESC =
  "Polish charity livestream 'Diss na raka' / 'Łatwogang' / Fundacja Cancer Fighters - " +
  "9-day stream that ended on or around Sunday 26 April 2026 (Europe/Warsaw). " +
  "User screenshot evidence at 2026-04-26 17:53-17:55 CEST shows ~188,571,160 PLN on the Tipply overlay. " +
  "Treat that as a checkpoint, not necessarily final.";

const COMMON_RULES = `
Important rules:
- Every fact MUST include at least one source URL.
- Prefer original sources over syndications. Deduplicate identical articles.
- Use Europe/Warsaw local times for human-readable labels and UTC ISO timestamps for sortable fields.
- Separate confirmed facts from rumours / unverified claims.
- Polish descriptions where field is meant for the public site (description, title, relativeTime).
- Project field names to reuse: targetAmount, dateAchieved, dateLocal, relativeTime, sortUtc, zrodlo, participants, category, description, tags.
- Search across: TVN24, Onet, Plejada, Przegląd Sportowy Onet, WP, RMF FM, Polskie Radio, Bankier, Pudelek, GlamRap, Gazeta Wrocławska, TVP, MMA.pl, CGM, NowyMarketing, Antyradio, Press.pl, Wirtualne Media, Eurosport.pl, Goal.pl, Wykop, Reddit r/Polska, official Cancer Fighters channels, Łatwogang YouTube live pages, X/Twitter, TikTok, Instagram Reels.
`.trim();

const SOURCES_DEF = {
  type: "array",
  items: {
    type: "object",
    properties: {
      label: { type: "string" },
      url: { type: "string" },
      source_type: {
        type: "string",
        enum: ["news", "official", "social", "youtube", "tiktok", "instagram", "twitter", "other"],
      },
      published_at_local: { type: ["string", "null"] },
      published_at_utc: { type: ["string", "null"] },
      quote: { type: "string" },
    },
    required: ["label", "url", "source_type", "published_at_local", "published_at_utc", "quote"],
    additionalProperties: false,
  },
} as const;

const TOPICS: Topic[] = [
  {
    id: "final-recap",
    description: "Definitive final fundraising total + official end-of-stream statements + foundation post-mortem.",
    processor: "pro",
    input: `${WINDOW_DESC}

Find the DEFINITIVE FINAL fundraising total (in PLN) for the Diss na raka stream as announced after the stream ended.

Track:
- The exact final on-stream / Tipply counter when the stream finished.
- The official Cancer Fighters foundation announcement of the final amount (post-event).
- Any later-recorded "true final" total after late donations were counted.
- The exact local Europe/Warsaw timestamp the stream ended (last frame of the live).
- Total stream duration (hours / days) and total loops of the song.
- Any official statements from Łatwogang members and from Cancer Fighters about how funds will be used (DKMS, hospitals, beneficiaries).
- Whether organisers explicitly used the word "koniec" / "zakończenie zbiórki".

${COMMON_RULES}`,
    output_schema: {
      type: "object",
      properties: {
        final_total_pln: { type: ["number", "null"] },
        final_total_label_pl: { type: "string" },
        announced_at_local: { type: ["string", "null"] },
        announced_at_utc: { type: ["string", "null"] },
        announced_by: { type: "string" },
        stream_ended_at_local: { type: ["string", "null"] },
        stream_ended_at_utc: { type: ["string", "null"] },
        total_duration_hours: { type: ["number", "null"] },
        total_song_loops: { type: ["number", "null"] },
        beneficiaries_pl: { type: "array", items: { type: "string" } },
        official_quotes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              speaker: { type: "string" },
              quote_pl: { type: "string" },
              source: { type: "string" },
              source_url: { type: "string" },
            },
            required: ["speaker", "quote_pl", "source", "source_url"],
            additionalProperties: false,
          },
        },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        notes_pl: { type: "array", items: { type: "string" } },
        sources: SOURCES_DEF,
      },
      required: [
        "final_total_pln",
        "final_total_label_pl",
        "announced_at_local",
        "announced_at_utc",
        "announced_by",
        "stream_ended_at_local",
        "stream_ended_at_utc",
        "total_duration_hours",
        "total_song_loops",
        "beneficiaries_pl",
        "official_quotes",
        "confidence",
        "notes_pl",
        "sources",
      ],
      additionalProperties: false,
    },
  },
  {
    id: "milestones",
    description: "Full list of declared milestones (achieved + failed) with execution evidence.",
    processor: "pro",
    input: `${WINDOW_DESC}

Produce the COMPLETE catalogue of fundraising milestones declared during the Diss na raka stream:
each PLN target the team or guests promised something for, whether it was reached, who executed
the dare, and when.

Include head-shaves, tattoos, drinking-hot-sauce, sleep-deprivation, song additions, MMA / sports
challenges, etc. For each milestone tag whether it was achieved before the stream ended.

${COMMON_RULES}`,
    output_schema: {
      type: "object",
      properties: {
        milestones: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              targetAmount: { type: "number" },
              title: { type: "string" },
              description: { type: "string" },
              status: { type: "string", enum: ["achieved", "pending", "failed"] },
              dateAchieved: { type: ["string", "null"] },
              executor: { type: "string" },
              category: {
                type: "string",
                enum: [
                  "head_shave",
                  "tattoo",
                  "endurance",
                  "food_drink",
                  "physical_challenge",
                  "appearance",
                  "donation_match",
                  "other",
                ],
              },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              sources: SOURCES_DEF,
            },
            required: [
              "id",
              "targetAmount",
              "title",
              "description",
              "status",
              "dateAchieved",
              "executor",
              "category",
              "confidence",
              "sources",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["milestones"],
      additionalProperties: false,
    },
  },
  {
    id: "timeline-events",
    description: "Source-backed timeline events for the final 24h, ready to merge into site-data.",
    processor: "pro",
    input: `${WINDOW_DESC}

Produce a TIMELINE of source-backed events from 2026-04-25 18:00 CEST through the end of the stream.

Categories: core_event, milestone_execution, guest_appearance, endurance_challenge, scheduled_appearance.

Polish 1-2 sentence description per event. Use the exact field names below so the JSON can be merged
directly into lib/site-data.ts.

${COMMON_RULES}`,
    output_schema: {
      type: "object",
      properties: {
        timelineEvents: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              dateLocal: { type: "string" },
              relativeTime: { type: "string" },
              sortUtc: { type: ["string", "null"] },
              zrodlo: {
                type: "object",
                properties: {
                  label: { type: "string" },
                  url: { type: "string" },
                },
                required: ["label", "url"],
                additionalProperties: false,
              },
              participants: { type: "array", items: { type: "string" } },
              category: {
                type: "string",
                enum: [
                  "core_event",
                  "milestone_execution",
                  "guest_appearance",
                  "endurance_challenge",
                  "scheduled_appearance",
                ],
              },
              description: { type: "string" },
              tags: { type: "array", items: { type: "string" } },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              sources: SOURCES_DEF,
            },
            required: [
              "id",
              "dateLocal",
              "relativeTime",
              "sortUtc",
              "zrodlo",
              "participants",
              "category",
              "description",
              "tags",
              "confidence",
              "sources",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["timelineEvents"],
      additionalProperties: false,
    },
  },
  {
    id: "donations",
    description: "Corporate / celebrity / major individual donations with amounts.",
    processor: "pro",
    input: `${WINDOW_DESC}

Find every NOTABLE single donation publicly attributed to a corporate sponsor, brand, celebrity,
public figure, content-creator, sports team, club or significant individual. Sort highest amount first.

Include the donor name, donation amount in PLN (null if undisclosed), donor type, when they donated
(local + UTC), and a 1-sentence Polish description suitable for site copy.

${COMMON_RULES}`,
    output_schema: {
      type: "object",
      properties: {
        donations: {
          type: "array",
          items: {
            type: "object",
            properties: {
              donor: { type: "string" },
              amount_pln: { type: ["number", "null"] },
              type: {
                type: "string",
                enum: ["corporate", "individual", "celebrity", "creator", "sports_club", "brand", "unknown"],
              },
              observed_at_local: { type: ["string", "null"] },
              observed_at_utc: { type: ["string", "null"] },
              description_pl: { type: "string" },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              sources: SOURCES_DEF,
            },
            required: [
              "donor",
              "amount_pln",
              "type",
              "observed_at_local",
              "observed_at_utc",
              "description_pl",
              "confidence",
              "sources",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["donations"],
      additionalProperties: false,
    },
  },
  {
    id: "celebrity-guests",
    description: "Every confirmed celebrity / public-figure appearance with what they did.",
    processor: "pro",
    input: `${WINDOW_DESC}

Catalogue every CONFIRMED celebrity, athlete, musician, actor, politician, content-creator
or public figure that appeared on the Diss na raka stream (in person, video call, phone,
TikTok / Instagram reaction, song dedication, etc.) over the entire 9-day campaign.

For each: name, the role they took (in_studio, video_call, phone_call, social_post, reaction_video,
performance, head_shave, tattoo, donation, other), Polish 1-2 sentence description, when, and source URLs.

${COMMON_RULES}`,
    output_schema: {
      type: "object",
      properties: {
        guests: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              field: { type: "string" },
              role: {
                type: "string",
                enum: [
                  "in_studio",
                  "video_call",
                  "phone_call",
                  "social_post",
                  "reaction_video",
                  "performance",
                  "head_shave",
                  "tattoo",
                  "donation",
                  "other",
                ],
              },
              description_pl: { type: "string" },
              observed_at_local: { type: ["string", "null"] },
              observed_at_utc: { type: ["string", "null"] },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              sources: SOURCES_DEF,
            },
            required: [
              "name",
              "field",
              "role",
              "description_pl",
              "observed_at_local",
              "observed_at_utc",
              "confidence",
              "sources",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["guests"],
      additionalProperties: false,
    },
  },
  {
    id: "media-coverage",
    description: "Index of Polish news articles covering the stream.",
    processor: "core",
    input: `${WINDOW_DESC}

Produce an INDEX of Polish-language news / media articles, blog posts, podcast episodes and
TV / radio reports about Diss na raka. Cover the entire 9-day campaign and post-event recaps.

For each article: outlet, headline (Polish, original casing), URL, published_at, 1-2 sentence
Polish summary of what is unique about the article, and which topics it confirms (final total,
guest appearance, milestone, donation, foundation, controversy, etc).

${COMMON_RULES}`,
    output_schema: {
      type: "object",
      properties: {
        articles: {
          type: "array",
          items: {
            type: "object",
            properties: {
              outlet: { type: "string" },
              headline_pl: { type: "string" },
              url: { type: "string" },
              published_at_local: { type: ["string", "null"] },
              published_at_utc: { type: ["string", "null"] },
              summary_pl: { type: "string" },
              topics: { type: "array", items: { type: "string" } },
              source_type: {
                type: "string",
                enum: ["news", "tabloid", "music_press", "sports_press", "podcast", "tv", "radio", "blog", "other"],
              },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
            },
            required: [
              "outlet",
              "headline_pl",
              "url",
              "published_at_local",
              "published_at_utc",
              "summary_pl",
              "topics",
              "source_type",
              "confidence",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["articles"],
      additionalProperties: false,
    },
  },
  {
    id: "shorts-clips",
    description: "Viral short-form clips: YouTube Shorts / TikTok / IG Reels / X video posts.",
    processor: "core",
    input: `${WINDOW_DESC}

Find the MOST RELEVANT viral SHORT-FORM clips from the Diss na raka stream:
- YouTube Shorts (URL must be youtube.com/shorts/<id> or youtu.be/<id> with vertical aspect)
- TikTok videos (URL must be tiktok.com/@user/video/<id>)
- Instagram Reels (URL must be instagram.com/reel/<id>)
- X / Twitter native video posts (URL must be x.com/<user>/status/<id>)

Skip ordinary 16:9 long-form videos. We only want short / vertical content.

For each: platform, URL, creator handle, title or first-frame caption, what moment from the
stream it captures (Polish), approximate view count if visible, published_at, why it is notable.

Sort by approximate virality (view count desc, fallback to publication recency).
Aim for >= 30 clips when possible. Be specific about which guest / milestone / moment is shown.

${COMMON_RULES}`,
    output_schema: {
      type: "object",
      properties: {
        clips: {
          type: "array",
          items: {
            type: "object",
            properties: {
              platform: {
                type: "string",
                enum: ["youtube_shorts", "tiktok", "instagram_reels", "x_video", "other_short"],
              },
              url: { type: "string" },
              creator_handle: { type: "string" },
              title_or_caption: { type: "string" },
              moment_pl: { type: "string" },
              participants: { type: "array", items: { type: "string" } },
              approx_view_count: { type: ["number", "null"] },
              published_at_local: { type: ["string", "null"] },
              published_at_utc: { type: ["string", "null"] },
              why_notable_pl: { type: "string" },
              tags: { type: "array", items: { type: "string" } },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
            },
            required: [
              "platform",
              "url",
              "creator_handle",
              "title_or_caption",
              "moment_pl",
              "participants",
              "approx_view_count",
              "published_at_local",
              "published_at_utc",
              "why_notable_pl",
              "tags",
              "confidence",
            ],
            additionalProperties: false,
          },
        },
      },
      required: ["clips"],
      additionalProperties: false,
    },
  },
  {
    id: "engagement-records",
    description: "Peak / average viewers, total views, new subs, total hours, world-record claims.",
    processor: "pro",
    input: `${WINDOW_DESC}

Compile the final ENGAGEMENT and RECORDS metrics for the Diss na raka stream.

Track:
- Peak concurrent viewers (peak_ccu) and when (local + UTC).
- Average concurrent viewers across the entire stream.
- Total views accumulated on the live VOD.
- Net new subscribers gained during the campaign.
- Total unique viewers if reported.
- Total hours streamed and total song loops.
- Any Guinness or unofficial world-record claims that were filed, attempted, or rejected
  (longest charity stream, most money raised on a Polish charity stream, etc).
- Any cross-platform reach (TikTok hashtag views, X mentions, news mentions).

${COMMON_RULES}`,
    output_schema: {
      type: "object",
      properties: {
        peak_ccu: { type: ["number", "null"] },
        peak_ccu_at_local: { type: ["string", "null"] },
        peak_ccu_at_utc: { type: ["string", "null"] },
        average_ccu: { type: ["number", "null"] },
        total_views: { type: ["number", "null"] },
        new_subscribers: { type: ["number", "null"] },
        unique_viewers: { type: ["number", "null"] },
        total_hours_streamed: { type: ["number", "null"] },
        total_song_loops: { type: ["number", "null"] },
        records: {
          type: "array",
          items: {
            type: "object",
            properties: {
              record_pl: { type: "string" },
              status: { type: "string", enum: ["claimed", "filed", "verified", "rejected", "rumoured"] },
              body: { type: "string" },
              evidence_pl: { type: "string" },
              sources: SOURCES_DEF,
            },
            required: ["record_pl", "status", "body", "evidence_pl", "sources"],
            additionalProperties: false,
          },
        },
        cross_platform_reach: {
          type: "array",
          items: {
            type: "object",
            properties: {
              platform: { type: "string" },
              metric_pl: { type: "string" },
              value: { type: ["number", "string", "null"] },
              source_url: { type: "string" },
            },
            required: ["platform", "metric_pl", "value", "source_url"],
            additionalProperties: false,
          },
        },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        notes_pl: { type: "array", items: { type: "string" } },
        sources: SOURCES_DEF,
      },
      required: [
        "peak_ccu",
        "peak_ccu_at_local",
        "peak_ccu_at_utc",
        "average_ccu",
        "total_views",
        "new_subscribers",
        "unique_viewers",
        "total_hours_streamed",
        "total_song_loops",
        "records",
        "cross_platform_reach",
        "confidence",
        "notes_pl",
        "sources",
      ],
      additionalProperties: false,
    },
  },
];

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    resume: false,
    pollMs: 15_000,
    timeoutMs: 60 * 60 * 1_000,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--help" || arg === "-h") {
      console.log(`Usage: bun run scripts/parallel-postevent.ts [options]

Options:
  --processor base|core|pro|ultra   Override processor for ALL topics
  --only id1,id2                    Run only the listed topic ids
  --resume                          Reuse run ids from research/postevent/_index.json
                                    if a previous invocation is still pending
  --poll-ms n                       Polling interval per task (default 15000)
  --timeout-ms n                    Per-task timeout budget ms (default 3600000)
  --help                            Show this help

Topics:
${TOPICS.map((t) => `  ${t.id.padEnd(22)} ${t.description}`).join("\n")}
`);
      process.exit(0);
    }

    if (arg === "--resume") {
      options.resume = true;
      continue;
    }

    if (!next) {
      throw new Error(`Missing value for ${arg}`);
    }

    switch (arg) {
      case "--processor":
        if (!["base", "core", "pro", "ultra"].includes(next)) {
          throw new Error(`Unsupported processor: ${next}`);
        }
        options.processor = next as Processor;
        i += 1;
        break;
      case "--only":
        options.only = next.split(",").map((s) => s.trim()).filter(Boolean);
        i += 1;
        break;
      case "--poll-ms":
        options.pollMs = Number.parseInt(next, 10);
        i += 1;
        break;
      case "--timeout-ms":
        options.timeoutMs = Number.parseInt(next, 10);
        i += 1;
        break;
      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseEnvText(raw: string) {
  const env: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

async function loadEnvKey(key: string) {
  if (process.env[key]) return process.env[key] ?? null;
  for (const envPath of [
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), ".env"),
  ]) {
    if (!(await fileExists(envPath))) continue;
    const parsed = parseEnvText(await readFile(envPath, "utf8"));
    if (parsed[key]) return parsed[key];
  }
  return null;
}

async function parallelFetch<T>(apiKey: string, pathname: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE}${pathname}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Parallel ${pathname} failed (${response.status}): ${await response.text()}`);
  }
  return (await response.json()) as T;
}

async function writeJson(outputPath: string, payload: unknown) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
}

async function loadResumeIndex(): Promise<Record<string, string>> {
  if (!(await fileExists(INDEX_PATH))) return {};
  try {
    const raw = JSON.parse(await readFile(INDEX_PATH, "utf8")) as { entries?: IndexEntry[] };
    const map: Record<string, string> = {};
    for (const e of raw.entries ?? []) {
      if (e.runId) map[e.topic] = e.runId;
    }
    return map;
  } catch {
    return {};
  }
}

async function runTopic(
  apiKey: string,
  topic: Topic,
  options: CliOptions,
  resumeRunId: string | undefined,
): Promise<IndexEntry> {
  const startedAt = Date.now();
  const outputPath = path.join(OUT_DIR, `${topic.id}.json`);
  const processor = options.processor ?? topic.processor;

  let runId = resumeRunId;
  if (!runId) {
    const created = await parallelFetch<TaskRunResponse>(apiKey, "/v1/tasks/runs", {
      method: "POST",
      body: JSON.stringify({
        input: topic.input,
        processor,
        task_spec: {
          output_schema: {
            type: "json",
            json_schema: topic.output_schema,
          },
        },
      }),
    });
    runId = created.run_id;
    console.log(`[${topic.id}] started run ${runId} (processor=${processor})`);
  } else {
    console.log(`[${topic.id}] resuming run ${runId}`);
  }

  const deadline = Date.now() + options.timeoutMs;
  let lastResult: TaskResultResponse | null = null;

  while (Date.now() <= deadline) {
    try {
      const pollSeconds = Math.max(1, Math.ceil(options.pollMs / 1000));
      const result = await parallelFetch<TaskResultResponse>(
        apiKey,
        `/v1/tasks/runs/${runId}/result?timeout=${pollSeconds}`,
        { method: "GET" },
      );
      lastResult = result;
      if (result.error) throw new Error(result.error);

      const status = result.status?.toLowerCase();
      const finished =
        !status ||
        ["completed", "complete", "succeeded", "success"].includes(status) ||
        result.output ||
        result.result;

      if (finished) {
        await writeJson(outputPath, {
          requestedAt: new Date().toISOString(),
          topic: topic.id,
          processor,
          runId,
          input: topic.input,
          schema: topic.output_schema,
          result,
        });
        console.log(`[${topic.id}] saved -> ${outputPath}`);
        return {
          topic: topic.id,
          runId,
          status: "completed",
          outputPath,
          durationMs: Date.now() - startedAt,
        };
      }

      if (["failed", "error", "cancelled", "canceled"].includes(status ?? "")) {
        throw new Error(`status=${status}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!/timed out|timeout|processing|not yet complete|not complete/i.test(message)) {
        console.error(`[${topic.id}] failed: ${message}`);
        return {
          topic: topic.id,
          runId,
          status: "failed",
          outputPath,
          error: message,
          durationMs: Date.now() - startedAt,
        };
      }
    }

    await new Promise((r) => setTimeout(r, options.pollMs));
  }

  console.warn(`[${topic.id}] timed out after ${options.timeoutMs}ms (run ${runId})`);
  return {
    topic: topic.id,
    runId,
    status: "timeout",
    outputPath,
    error: `Timed out. Last status: ${JSON.stringify(lastResult)}`,
    durationMs: Date.now() - startedAt,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const apiKey = await loadEnvKey("PARALLEL_API_KEY");
  if (!apiKey) {
    throw new Error("Missing PARALLEL_API_KEY. Add it to .env.local, .env, or your shell environment.");
  }

  const selected = options.only
    ? TOPICS.filter((t) => options.only!.includes(t.id))
    : TOPICS;

  if (selected.length === 0) {
    throw new Error(`No matching topics. Valid ids: ${TOPICS.map((t) => t.id).join(", ")}`);
  }

  const resumeMap = options.resume ? await loadResumeIndex() : {};

  console.log(
    `Dispatching ${selected.length} Parallel task${selected.length === 1 ? "" : "s"} concurrently:`,
  );
  for (const t of selected) console.log(`  - ${t.id}`);

  const results = await Promise.all(
    selected.map((topic) => runTopic(apiKey, topic, options, resumeMap[topic.id])),
  );

  await writeJson(INDEX_PATH, {
    generatedAt: new Date().toISOString(),
    entries: results,
  });

  const ok = results.filter((r) => r.status === "completed").length;
  const failed = results.length - ok;
  console.log(
    `\nDone. ${ok} completed, ${failed} not completed. Index: ${INDEX_PATH}`,
  );

  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
