import "dotenv/config";
import { OpenAI as LLM } from "openai";
import { deep_check } from "./utils/deep_check.ts";
import { logger, LogLevel } from "./utils/logger.ts";
import process from "node:process";

export const dirname: string = import.meta.dirname!;

export const config = {
  lang: process.env["DP_LANG"] ?? "zh",
  llm: {
    base_url: process.env["DP_BASE_URL"] ?? "https://api.openai.com/v1",
    api_key: process.env["DP_API_KEY"]!,
    model: process.env["DP_MODEL"]! ?? "gpt-4o-mini",
  },
  subscription: process.env["DP_SUBSCRIPTION"]!,
  info: {
    owner: process.env["DP_OWNER"]!,
    bio: process.env["DP_BIO"]!,
  },
  log_level: ((process.env["DP_LOG_LEVEL"] as LogLevel | undefined) ??
    "INFO") satisfies LogLevel,
} as const;

const log = await logger("index", config.log_level);

{
  const check = deep_check(config);

  if (check.false.length) {
    log("FATAL", `The following values are missing:\n${check.false.join(" ")}`);
    process.exit(1);
  }
}

export const llm = new LLM({
  baseURL: config.llm.base_url,
  apiKey: config.llm.api_key,
});

log("INFO", `Successfully loaded configuration:`, config);
