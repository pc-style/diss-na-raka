#!/usr/bin/env bun

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type AgentStatus = "processing" | "completed" | "failed";
type AgentModel = "spark-1-mini" | "spark-1-pro";

interface CliOptions {
  prompt?: string;
  promptFile?: string;
  schemaFile?: string;
  urls: string[];
  urlsFile?: string;
  output?: string;
  model: AgentModel;
  maxCredits?: number;
  strictConstrainToURLs: boolean;
  pollMs: number;
  timeoutMs: number;
}

interface AgentStartResponse {
  success: boolean;
  id: string;
}

interface AgentStatusResponse {
  success: boolean;
  status: AgentStatus;
  data?: unknown;
  model?: AgentModel;
  error?: string;
  expiresAt?: string;
  creditsUsed?: number;
}

const HELP_TEXT = `Run a Firecrawl Agent job and save the structured result.

Usage:
  bun run scripts/firecrawl-agent.ts [options]

Options:
  --prompt "text"              Inline prompt text
  --prompt-file path           Read prompt text from a file
  --schema-file path           Read JSON schema from a file
  --url https://...            Add one seed URL (repeatable)
  --urls-file path             Read URLs from a newline file or JSON array
  --output path                Write result JSON here
  --model spark-1-mini|spark-1-pro
  --max-credits number
  --strict                     Keep agent constrained to provided URLs
  --poll-ms number             Poll interval in ms (default 3000)
  --timeout-ms number          Total wait budget in ms (default 600000)
  --help                       Show this message

Environment:
  FIRECRAWL_API_KEY            Required. Loaded from process env, .env.local, or .env.

Project defaults:
  If you do not pass a prompt or schema, this script will use:
  - scripts/firecrawl-timeline-sources.prompt.md
  - scripts/firecrawl-timeline-sources.schema.json
  and write to data/firecrawl-timeline-sources.json if those files exist.
`;

const PROJECT_DEFAULT_PROMPT = path.join(
  process.cwd(),
  "scripts/firecrawl-timeline-sources.prompt.md",
);
const PROJECT_DEFAULT_SCHEMA = path.join(
  process.cwd(),
  "scripts/firecrawl-timeline-sources.schema.json",
);
const PROJECT_DEFAULT_OUTPUT = path.join(
  process.cwd(),
  "data/firecrawl-timeline-sources.json",
);

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    urls: [],
    model: "spark-1-mini",
    pollMs: 3_000,
    timeoutMs: 10 * 60 * 1_000,
    strictConstrainToURLs: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--help") {
      console.log(HELP_TEXT);
      process.exit(0);
    }

    if (arg === "--strict") {
      options.strictConstrainToURLs = true;
      continue;
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
      case "--url":
        options.urls.push(next);
        i += 1;
        break;
      case "--urls-file":
        options.urlsFile = next;
        i += 1;
        break;
      case "--output":
        options.output = next;
        i += 1;
        break;
      case "--model":
        if (next !== "spark-1-mini" && next !== "spark-1-pro") {
          throw new Error(`Unsupported model: ${next}`);
        }
        options.model = next;
        i += 1;
        break;
      case "--max-credits":
        options.maxCredits = Number.parseInt(next, 10);
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

  for (const envPath of [
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), ".env"),
  ]) {
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

async function readMaybeJsonArray(filePath: string) {
  const raw = await readFile(filePath, "utf8");
  const trimmed = raw.trim();

  if (trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "string")) {
      throw new Error(`${filePath} must be a JSON array of strings.`);
    }
    return parsed;
  }

  return trimmed
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

async function resolvePrompt(options: CliOptions) {
  if (options.prompt) {
    return options.prompt.trim();
  }

  const promptFile =
    options.promptFile ??
    ((await fileExists(PROJECT_DEFAULT_PROMPT)) ? PROJECT_DEFAULT_PROMPT : undefined);

  if (!promptFile) {
    throw new Error("No prompt provided. Use --prompt or --prompt-file.");
  }

  return (await readFile(promptFile, "utf8")).trim();
}

async function resolveSchema(options: CliOptions) {
  const schemaFile =
    options.schemaFile ??
    ((await fileExists(PROJECT_DEFAULT_SCHEMA)) ? PROJECT_DEFAULT_SCHEMA : undefined);

  if (!schemaFile) {
    return undefined;
  }

  return JSON.parse(await readFile(schemaFile, "utf8")) as Record<string, unknown>;
}

async function resolveUrls(options: CliOptions) {
  const resolved = [...options.urls];

  if (options.urlsFile) {
    resolved.push(...(await readMaybeJsonArray(options.urlsFile)));
  }

  return [...new Set(resolved)];
}

async function resolveOutputPath(options: CliOptions) {
  if (options.output) {
    return path.resolve(process.cwd(), options.output);
  }

  if (await fileExists(PROJECT_DEFAULT_PROMPT)) {
    return PROJECT_DEFAULT_OUTPUT;
  }

  return path.join(process.cwd(), "data/firecrawl-agent-output.json");
}

async function firecrawlFetch<T>(
  token: string,
  pathname: string,
  init?: RequestInit,
) {
  const response = await fetch(`https://api.firecrawl.dev/v2${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Firecrawl ${pathname} failed (${response.status}): ${body}`);
  }

  return (await response.json()) as T;
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  let options: CliOptions;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Invalid CLI arguments.",
    );
    console.error("\n" + HELP_TEXT);
    process.exit(1);
    return;
  }

  const apiKey = await loadEnvKey("FIRECRAWL_API_KEY");
  if (!apiKey) {
    console.error(
      "Missing FIRECRAWL_API_KEY. Add it to .env.local, .env, or your shell environment.",
    );
    process.exit(1);
  }

  const prompt = await resolvePrompt(options);
  const schema = await resolveSchema(options);
  const urls = await resolveUrls(options);
  const outputPath = await resolveOutputPath(options);

  const body: Record<string, unknown> = {
    prompt,
    model: options.model,
  };

  if (schema) {
    body.schema = schema;
  }

  if (urls.length > 0) {
    body.urls = urls;
  }

  if (typeof options.maxCredits === "number" && !Number.isNaN(options.maxCredits)) {
    body.maxCredits = options.maxCredits;
  }

  if (options.strictConstrainToURLs && urls.length > 0) {
    body.strictConstrainToURLs = true;
  }

  console.log(`Starting Firecrawl Agent with model ${options.model}...`);
  const started = await firecrawlFetch<AgentStartResponse>(apiKey, "/agent", {
    method: "POST",
    body: JSON.stringify(body),
  });

  console.log(`Job started: ${started.id}`);
  const deadline = Date.now() + options.timeoutMs;
  let lastStatus: AgentStatusResponse | null = null;

  while (Date.now() <= deadline) {
    const status = await firecrawlFetch<AgentStatusResponse>(
      apiKey,
      `/agent/${started.id}`,
      { method: "GET" },
    );
    lastStatus = status;

    if (status.status === "completed") {
      await mkdir(path.dirname(outputPath), { recursive: true });
      const payload = {
        requestedAt: new Date().toISOString(),
        prompt,
        urls,
        schema,
        jobId: started.id,
        result: status.data,
        raw: status,
      };

      await writeFile(
        outputPath,
        JSON.stringify(payload, null, 2) + "\n",
        "utf8",
      );
      console.log(`Completed. Credits used: ${status.creditsUsed ?? "unknown"}`);
      console.log(`Saved result to ${outputPath}`);
      return;
    }

    if (status.status === "failed") {
      throw new Error(status.error || "Firecrawl Agent job failed.");
    }

    console.log(`Still processing... waiting ${options.pollMs}ms`);
    await sleep(options.pollMs);
  }

  throw new Error(
    `Timed out waiting for Firecrawl Agent job ${started.id}. Last status: ${
      lastStatus?.status ?? "unknown"
    }`,
  );
}

await main();
