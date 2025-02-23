import { Config } from "./types/config.ts";
import { Function } from "./types/function.ts";
import { Maybe, succeed } from "@intzaaa/maybe";

export const setup = async (config: Config): Promise<Maybe<Function>> => {
  return succeed();
};
