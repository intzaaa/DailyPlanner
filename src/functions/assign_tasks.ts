import { get_chat } from "../utils/getters/get_chat.ts";
import { fail, Maybe, succeed } from "@intzaaa/maybe";
import zh_CN from "../chats/zh-CN.ts";
import { Config } from "../types/config.ts";
import type { OpenAI as LLM } from "openai";
import { Tasks, ZodTasks } from "../types/task.ts";

export default async (
  llm: LLM,
  model: Config["llm"]["model"],
  language: Config["language"],
  ...params: Parameters<typeof zh_CN.assign_tasks.request>
): Promise<Maybe<Tasks>> => {
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

  if (!result) return fail("Failed to generate response.");

  return succeed(await ZodTasks.parseAsync(result) as any);
};
