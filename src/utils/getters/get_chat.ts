import { ChatLanguage } from "../../types/languages.ts";
import type chat from "../../chats/zh-CN.ts";

export const get_chat = async (lang: ChatLanguage): Promise<typeof chat> =>
  (await import(`../chats/${lang}.ts`))
    .default;
