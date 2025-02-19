import { get_chat } from "../utils/get_chat.ts";
import { get_ical } from "../utils/get_ical.ts";
import { logger } from "../utils/logger.ts";

export default async () => {
  const { config, llm } = await import("../index.ts");

  const log = await logger("describe_icalendar");

  const chats = await get_chat();
  const ical = await get_ical();

  const promise = llm.chat.completions.create({
    model: config.llm.model,
    messages: [
      {
        role: "system",
        content: chats.describe_icalendar.request(config.info.owner, ical),
      },
    ],
  });

  const result = (await promise).choices[0]!.message.content!;

  log("INFO", result);

  return result;
};
