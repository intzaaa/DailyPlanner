import "dotenv/config";
import { OpenAI as LLM } from "openai";
import { deep_check } from "./utils/deep_check";
import { execute_defaults } from "./utils/execute_defaults";
import { logger, LogLevel } from "./utils/logger";

export const dirname = import.meta.dirname;

export const config = {
  lang: process.env["DP_LANG"] ?? "zh",
  llm: {
    base_url: process.env["DP_BASE_URL"] ?? "https://api.openai.com/v1",
    api_key: process.env["DP_API_KEY"]!,
    model: process.env["DP_MODEL"]! ?? "gpt-4o-turbo",
  },
  subscription: process.env["DP_LINK"]!,
  info: {
    owner: process.env["DP_OWNER"]!,
    bio: process.env["DP_BIO"]!,
  },
  log_level: (process.env["DP_LOG_LEVEL"] ?? "info") as LogLevel,
} as const;

export const log = logger(import.meta.filename, config.log_level);

{
  const check = deep_check(config);

  if (check.false.length) {
    log(`The following values are missing:\n${check.false.join(" ")}`, "ERROR");
    process.exit(1);
  }
}

export const llm = new LLM({
  baseURL: config.llm.base_url,
  apiKey: config.llm.api_key,
});

log(`Successfully loaded configuration: ${JSON.stringify(config)}`);

execute_defaults(import("./functions/describe_icalendar"));
