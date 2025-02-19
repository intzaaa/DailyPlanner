import { get_chat } from "../utils/get_chat.ts";
import { logger } from "../utils/logger.ts";

export default async () => {
  const { config, llm } = await import("../index.ts");

  const l = await logger("assign_task");

  const chats = await get_chat();

  const promise = llm.chat.completions.create({
    model: config.llm.model,
    messages: [
      {
        role: "system",
        content: chats.assign_tasks.request(config.info.owner, config.info.bio),
      },
    ],
    response_format: chats.assign_tasks.response,
  });

  const result = (await promise).choices[0]!.message.content!;

  l("INFO", result);

  return result;
};
