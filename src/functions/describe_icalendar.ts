import type chat from "../chats/zh-CN";
import { fetch_ical } from "../utils/fetch_ical";
import { logger } from "../utils/logger";

export default async () => {
  const { config, llm } = await import("..");

  const log = logger(import.meta.filename, config.log_level);

  const chats: typeof chat = (await import(`../chats/${config.lang}`)).default;
  const ical = await fetch_ical();

  const promise = llm.chat.completions.create({
    model: config.llm.model,
    messages: [
      {
        role: "system",
        content: chats.describe_icalendar(config.info.owner, ical),
      },
    ],
  });

  const result = (await promise).choices[0]!.message.content!;

  log(result);

  return result;
};
