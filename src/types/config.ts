import { ChatLanguage } from "./languages.ts";
import { LogLevel } from "../utils/logger.ts";

export type Config = {
  language: ChatLanguage;
  llm: {
    base_url: string;
    api_key: string;
    model: string;
  };
  user: {
    owner: string;
    bio: string;
    ical: string;
  };
  log_level: LogLevel;
};
