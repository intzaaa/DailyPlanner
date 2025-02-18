import { OpenAI as LLM } from "openai";

export const llm = new LLM({
  baseURL: process.env["DP_BASE_URL"],
  apiKey: process.env["DP_API_KEY"],
});
