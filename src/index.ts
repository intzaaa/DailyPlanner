import { OpenAI as LLM } from "openai";
import { from_calendar_to_param } from "./converters/from_calendar_to_param";
import { from_ical_to_calendar } from "./converters/from_ical_to_calendar";

export const llm = new LLM({
  baseURL: process.env["DP_BASE_URL"],
  apiKey: process.env["DP_API_KEY"],
});

export const link = process.env["DP_LINK"]!;

export const model = process.env["DP_MODEL"]!;

export const info = {
  owner: process.env["DP_OWNER"]!,
  bio: process.env["DP_BIO"]!,
  goals: process.env["DP_GOALS"]!.split(";"),
};

const ical = await fetch(link).then((res) => res.text());

const calendar = from_ical_to_calendar(ical);

const param = from_calendar_to_param({ ...info, ...calendar });

llm.chat.completions
  .create({
    model,
    messages: [param],
  })
  .then(console.log);
