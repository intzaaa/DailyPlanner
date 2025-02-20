import { readFile } from "node:fs/promises";
import { error, Maybe, success } from "../maybe.ts";

export const get_ical = async (location: string): Promise<Maybe<string>> => {
  try {
    const url = new URL(location);

    try {
      return success(await fetch(url).then((res) => res.text()));
    } catch (err) {
      return error(err);
    }
  } catch (_) {
    try {
      return success((await readFile(location)).toString());
    } catch (err) {
      return error(err);
    }
  }
};
