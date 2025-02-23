import { OpenAI as LLM } from "openai";
import { Config } from "../../types/config.ts";
import { fail, Maybe, succeed } from "@intzaaa/maybe";

export const get_llm = (
  base_url: Config["llm"]["base_url"],
  api_key: Config["llm"]["api_key"],
): Maybe<LLM> => {
  try {
    return succeed(
      new LLM({
        baseURL: base_url,
        apiKey: api_key,
      }),
    );
  } catch (err) {
    return fail(err);
  }
};
