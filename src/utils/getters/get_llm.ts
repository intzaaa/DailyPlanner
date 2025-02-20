import { OpenAI as LLM } from "openai";
import { Config } from "../../config.ts";
import { error, Maybe, success } from "../maybe.ts";

export const get_llm = (
  base_url: Config["llm"]["base_url"],
  api_key: Config["llm"]["api_key"],
): Maybe<LLM> => {
  try {
    return success(
      new LLM({
        baseURL: base_url,
        apiKey: api_key,
      }),
    );
  } catch (err) {
    return error(err);
  }
};
