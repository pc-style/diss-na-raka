#!/usr/bin/env bun

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

type Mode = "task" | "monitor:create" | "monitor:events";
type Processor = "base" | "core" | "pro";

interface CliOptions {
  mode: Mode;
  prompt?: string;
  promptFile?: string;
  schemaFile?: string;
  output?: string;
  processor: Processor;
  cadence: string;
  frequency?: string;
  monitorId?: string;
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

interface MonitorResponse {
  monitor_id: string;
  query: string;
  status: string;
  cadence?: string;
  frequency?: string;
  created_at?: string;
}

const HELP_TEXT = `Run Parallel research/monitor jobs for Diss na raka.

Usage:
  bun run scripts/parallel-research.ts task [options]
  bun run scripts/parallel-research.ts monitor:create [options]
  bun run scripts/parallel-research.ts monitor:events --monitor-id monitor_...

Options:
  --prompt "text"              Inline prompt text
  --prompt-file path           Prompt file (default: scripts/parallel-diss-research.prompt.md)
  --schema-file path           JSON schema file (default: scripts/parallel-diss-research.schema.json)
  --output path                Output path
  --processor base|core|pro    Task processor (default: core)
  --cadence hourly|daily       Monitor cadence (default: hourly)
  --frequency 1h|1d|1w         Legacy Monitor API frequency alias if your account uses it
  --monitor-id id              Required for monitor:events
  --poll-ms number             Task polling interval ms (default 10000)
  --timeout-ms number          Task wait budget ms (default 1800000)
  --help                       Show this message

Environment:
  PARALLEL_API_KEY             Required. Loaded from env, .env.local, or .env.
`;

const DEFAULT_PROMPT = path.join(process.cwd(), "scripts/parallel-diss-research.prompt.md");
const DEFAULT_SCHEMA = path.join(process.cwd(), "scripts/parallel-diss-research.schema.json");
const DEFAULT_TASK_OUTPUT = path.join(process.cwd(), "research/parallel-diss-research.json");
const DEFAULT_MONITOR_OUTPUT = path.join(process.cwd(), "research/parallel-monitor.json");
const API_BASE = "https://api.parallel.ai";

function parseArgs(argv: string[]): CliOptions {
  const first = argv[0];

  if (first === "--help" || first === "help") {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  if (first !== "task" && first !== "monitor:create" && first !== "monitor:events") {
    throw new Error("First argument must be one of: task, monitor:create, monitor:events");
  }

  const options: CliOptions = {
    mode: first,
    processor: "core",
    cadence: "hourly",
    pollMs: 10_000,
    timeoutMs: 30 * 60 * 1_000,
  };

  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--help") {
      console.log(HELP_TEXT);
      process.exit(0);
    }

    if (!next) {
      throw new Error(`Missing value for ${arg}`);
    }

    switch (arg) {
      case "--prompt":
        options.prompt = next;
        i += 1;
        break;
      case "--prompt-file":
        options.promptFile = next;
        i += 1;
        break;
      case "--schema-file":
        options.schemaFile = next;
        i += 1;
        break;
      case "--output":
        options.output = next;
        i += 1;
        break;
      case "--processor":
        if (next !== "base" && next !== "core" && next !== "pro") {
          throw new Error(`Unsupported processor: ${next}`);
        }
        options.processor = next;
        i += 1;
        break;
      case "--cadence":
        options.cadence = next;
        i += 1;
        break;
      case "--frequency":
        options.frequency = next;
        i += 1;
        break;
      case "--monitor-id":
        options.monitorId = next;
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
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

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
  if (process.env[key]) {
    return process.env[key] ?? null;
  }

  for (const envPath of [path.join(process.cwd(), ".env.local"), path.join(process.cwd(), ".env")]) {
    if (!(await fileExists(envPath))) {
      continue;
    }

    const parsed = parseEnvText(await readFile(envPath, "utf8"));
    if (parsed[key]) {
      return parsed[key];
    }
  }

  return null;
}

async function resolvePrompt(options: CliOptions) {
  if (options.prompt) {
    return options.prompt.trim();
  }

  const promptFile = options.promptFile ?? DEFAULT_PROMPT;
  return (await readFile(path.resolve(process.cwd(), promptFile), "utf8")).trim();
}

async function resolveSchema(options: CliOptions) {
  const schemaFile = options.schemaFile ?? DEFAULT_SCHEMA;
  return JSON.parse(await readFile(path.resolve(process.cwd(), schemaFile), "utf8")) as Record<string, unknown>;
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

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJson(outputPath: string, payload: unknown) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
}

async function runTask(apiKey: string, options: CliOptions) {
  const prompt = await resolvePrompt(options);
  const schema = await resolveSchema(options);
  const outputPath = path.resolve(process.cwd(), options.output ?? DEFAULT_TASK_OUTPUT);

  const started = await parallelFetch<TaskRunResponse>(apiKey, "/v1/tasks/runs", {
    method: "POST",
    body: JSON.stringify({
      input: prompt,
      processor: options.processor,
      task_spec: {
        output_schema: {
          type: "json",
          json_schema: schema,
        },
      },
    }),
  });

  console.log(`Parallel task started: ${started.run_id}`);
  const deadline = Date.now() + options.timeoutMs;
  let lastResult: TaskResultResponse | null = null;

  while (Date.now() <= deadline) {
    const result = await parallelFetch<TaskResultResponse>(
      apiKey,
      `/v1/tasks/runs/${started.run_id}/result`,
      { method: "GET" },
    );
    lastResult = result;

    if (result.error) {
      throw new Error(result.error);
    }

    const status = result.status?.toLowerCase();
    if (!status || ["completed", "complete", "succeeded", "success"].includes(status) || result.output || result.result) {
      await writeJson(outputPath, {
        requestedAt: new Date().toISOString(),
        mode: options.mode,
        runId: started.run_id,
        prompt,
        schema,
        result,
      });
      console.log(`Saved task result to ${outputPath}`);
      return;
    }

    if (["failed", "error", "cancelled", "canceled"].includes(status)) {
      throw new Error(`Parallel task failed with status: ${result.status}`);
    }

    console.log(`Task status: ${result.status}. Waiting ${options.pollMs}ms...`);
    await sleep(options.pollMs);
  }

  throw new Error(`Timed out waiting for task ${started.run_id}. Last result: ${JSON.stringify(lastResult)}`);
}

async function createMonitor(apiKey: string, options: CliOptions) {
  const prompt = await resolvePrompt(options);
  const schema = await resolveSchema(options);
  const outputPath = path.resolve(process.cwd(), options.output ?? DEFAULT_MONITOR_OUTPUT);
  const body: Record<string, unknown> = {
    query: prompt,
    output_schema: {
      type: "json",
      json_schema: schema,
    },
    metadata: {
      project: "diss-na-raka",
      window_start_local: "2026-04-25T18:00:00+02:00",
      window_end_local: "2026-04-26T18:00:00+02:00",
      timezone: "Europe/Warsaw",
    },
  };

  if (options.frequency) {
    body.frequency = options.frequency;
  } else {
    body.cadence = options.cadence;
  }

  const monitor = await parallelFetch<MonitorResponse>(apiKey, "/v1alpha/monitors", {
    method: "POST",
    body: JSON.stringify(body),
  });

  await writeJson(outputPath, {
    requestedAt: new Date().toISOString(),
    mode: options.mode,
    monitor,
    prompt,
    schema,
  });
  console.log(`Created monitor: ${monitor.monitor_id}`);
  console.log(`Saved monitor details to ${outputPath}`);
}

async function getMonitorEvents(apiKey: string, options: CliOptions) {
  if (!options.monitorId) {
    throw new Error("--monitor-id is required for monitor:events");
  }

  const outputPath = path.resolve(
    process.cwd(),
    options.output ?? path.join("research", `parallel-monitor-events-${options.monitorId}.json`),
  );
  const events = await parallelFetch<unknown>(apiKey, `/v1alpha/monitors/${options.monitorId}/events`, {
    method: "GET",
  });

  await writeJson(outputPath, {
    requestedAt: new Date().toISOString(),
    mode: options.mode,
    monitorId: options.monitorId,
    events,
  });
  console.log(`Saved monitor events to ${outputPath}`);
}

async function main() {
  let options: CliOptions;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Invalid CLI arguments.");
    console.error("\n" + HELP_TEXT);
    process.exit(1);
    return;
  }

  const apiKey = await loadEnvKey("PARALLEL_API_KEY");
  if (!apiKey) {
    throw new Error("Missing PARALLEL_API_KEY. Add it to .env.local, .env, or your shell environment.");
  }

  if (options.mode === "task") {
    await runTask(apiKey, options);
    return;
  }

  if (options.mode === "monitor:create") {
    await createMonitor(apiKey, options);
    return;
  }

  await getMonitorEvents(apiKey, options);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
