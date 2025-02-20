import { Config } from "./types/config.ts";
import { Exports } from "./types/exports.ts";
import { Maybe, success } from "./utils/maybe.ts";

export const setup = async (config: Config): Promise<Maybe<Exports>> => {
  return success({});
};
