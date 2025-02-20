import { Config } from "./config.ts";
import { Maybe, success } from "./utils/maybe.ts";

export const setup = async (config: Config): Promise<Maybe<void>> => {
  // const llm = get_llm(database.llm.base_url, database.llm.api_key);

  return success(undefined);
};
