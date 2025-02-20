import "dotenv/config";
import { Config } from "./types/config.ts";
import { Maybe, success } from "./utils/maybe.ts";

export const setup = async (database: Config): Promise<Maybe<void>> => {
  // const llm = get_llm(database.llm.base_url, database.llm.api_key);

  return success();
};
