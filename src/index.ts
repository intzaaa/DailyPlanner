import { OpenAI as LLM } from "openai";
import { from_calendar_to_param } from "./converters/from_calendar_to_param";
import { from_ical_to_calendar } from "./converters/from_ical_to_calendar";
import { deep_check } from "./utils/deep_check";

export const config = {
  llm: {
    base_url: process.env["DP_BASE_URL"]!,
    api_key: process.env["DP_API_KEY"]!,
    model: process.env["DP_MODEL"]!,
  },
  link: process.env["DP_LINK"]!,
  info: {
    owner: process.env["DP_OWNER"]!,
    bio: process.env["DP_BIO"]!,
    goals: process.env["DP_GOALS"]?.split(";")!,
  },
} as const;

{
  const check = deep_check(config);

  if (check.false.length) {
    console.error(`The following values are missing:\n${check.false.join(" ")}`);
    process.exit(1);
  }
}

export const llm = new LLM({
  baseURL: config.llm.base_url,
  apiKey: config.llm.api_key,
});

const ical = await fetch(config.link).then((res) => res.text());

const calendar = from_ical_to_calendar(ical);

const param = from_calendar_to_param({ ...config.info, ...calendar });

llm.chat.completions
  .create({
    model: config.llm.model,
    messages: [param],
  })
  .then(console.log);
