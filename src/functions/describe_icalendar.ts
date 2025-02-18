import type chat from "../chats/zh-CN";
import { fetch_ical } from "../utils/fetch_ical";

export default async () => {
  const { config, llm } = await import("..");

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

  return (await promise).choices[0]!.message.content!;
};
