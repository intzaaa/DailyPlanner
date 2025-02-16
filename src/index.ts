import { OpenAI as LLM } from "openai";
import { from_calendar_to_param } from "./converters/from_calendar_to_param";

const llm = new LLM({
  baseURL: process.env["DP_BASE_URL"],
  apiKey: process.env["DP_API_KEY"],
});

const completion = await llm.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "developer",
      content: from_calendar_to_param(),
    },
    {
      role: "user",
      content: "",
    },
  ],
});

console.log(completion.choices[0]?.message);
