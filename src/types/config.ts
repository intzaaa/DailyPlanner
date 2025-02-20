import { ChatLanguage } from "../chats/languages.ts";
import { LogLevel } from "../utils/logger.ts";

export type Config = {
  lang: ChatLanguage;
  llm: {
    base_url: string; // "https://api.openai.com/v1"
    api_key: string;
    model: string; // "gpt-4o-mini",
  };
  user: {
    owner: string;
    bio: string;
    ical: string;
  };
  log_level: LogLevel;
};
