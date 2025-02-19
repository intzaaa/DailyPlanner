import type chat from "../chats/zh-CN.ts";

export const get_chat = async (): Promise<typeof chat> => (await import(`../chats/${(await import("../index.ts")).config.lang}.ts`)).default;
