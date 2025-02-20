import { get_chat } from "../utils/getters/get_chat.ts";
import { error, Maybe, success } from "../utils/maybe.ts";
import zh_CN from "../chats/zh-CN.ts";
import { Config } from "../config.ts";
import type { OpenAI as LLM } from "openai";

export default async (
  llm: LLM,
  model: Config["llm"]["model"],
  language: Config["lang"],
  ...params: Parameters<typeof zh_CN.assign_tasks.request>
): Promise<Maybe<string>> => {
  const chats = await get_chat(language);

  const completion = await llm.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: chats.assign_tasks.request(...params),
      },
    ],
    response_format: chats.assign_tasks.response,
  });

  const result = completion.choices[0]?.message.content;

  if (!result) return error("Failed to generate response.");

  return success(result);
};
