import { get_chat } from "../utils/getters/get_chat.ts";
import { get_ical } from "../utils/getters/get_ical.ts";
import { error, Maybe, success } from "../utils/maybe.ts";
import zh_CN from "../chats/zh-CN.ts";
import { OpenAI as LLM } from "openai";

import { ChatLanguage } from "../types/languages.ts";
import { Config } from "../types/config.ts";

export const describe_icalendar = async (
  llm: LLM,
  model: Config["llm"]["model"],
  language: ChatLanguage,
  ical_location: string,
  owner: Parameters<typeof zh_CN.describe_icalendar.request>[0],
): Promise<Maybe<string>> => {
  const chats = await get_chat(language);

  const ical = await get_ical(ical_location);
  console.log(ical[0]?.reason);
  if (ical[0]) return ical;

  const completion = await llm.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: chats.describe_icalendar.request(owner, ical[1]),
      },
    ],
    response_format: chats.describe_icalendar.response,
  });

  const result = completion.choices[0]?.message.content;

  if (!result) return error("Failed to generate response.");

  return success(result);
};
