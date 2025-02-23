import { readFile } from "node:fs/promises";
import { fail, Maybe, succeed } from "@intzaaa/maybe";

export const get_ical = async (location: string): Promise<Maybe<string>> => {
  try {
    const url = new URL(location);

    try {
      return succeed(await fetch(url).then((res) => res.text()) as string);
    } catch (err) {
      return fail(err);
    }
  } catch (_) {
    try {
      return succeed((await readFile(location)).toString());
    } catch (err) {
      return fail(err);
    }
  }
};
