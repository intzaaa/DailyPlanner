import "dotenv/config";
import { Config } from "./types/config.ts";
import { Maybe, success } from "./utils/maybe.ts";

export default async (database: Config): Promise<Maybe<0>> => {
  // const llm = get_llm(database.llm.base_url, database.llm.api_key);

  return success(0);
};
