import { get_chat } from "../utils/get_chat.ts";
import { get_ical } from "../utils/get_ical.ts";
import { logger } from "../utils/logger.ts";
import { Error, Maybe } from "../utils/maybe.ts";

export default async (): Promise<Maybe<string>> => {
  const { config, llm } = await import("../index.ts");

  const l = await logger("describe_icalendar");

  const chats = await get_chat();
  const ical = await get_ical();

  const completion = await llm.chat.completions.create({
    model: config.llm.model,
    messages: [
      {
        role: "system",
        content: chats.describe_icalendar.request(config.info.owner, ical),
      },
    ],
    response_format: chats.describe_icalendar.response,
  });

  const result = completion.choices[0]?.message.content;

  if (!result) {
    l("ERROR", "Failed to generate response.");
    return Error;
  }

  l("INFO", result);
  return result;
};
