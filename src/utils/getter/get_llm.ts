import { OpenAI as LLM } from "openai";
import { Config } from "../../types/config.ts";

export const get_llm = (
  base_url: Config["llm"]["base_url"],
  api_key: Config["llm"]["api_key"],
) => {
  return new LLM({
    baseURL: base_url,
    apiKey: api_key,
  });
};
