import { readFile } from "node:fs/promises";
import { get_ical } from "./utils/getters/get_ical.ts";
import { parse_ical } from "./parsers/parse_ical.ts";
import { logger } from "./utils/logger.ts";
import { generate_ical } from "./parsers/generate_ical.ts";
import { equals } from "ramda";
import { getDiff } from "recursive-diff";

const log = logger("TRACE", "Test");
const info = log("INFO");
const fatal = log("FATAL");
const test = async (title: string, fun: () => void | Promise<void>) => {
  info(["Testing", title]);

  await fun();

  info(["Done", title]);
};

await test("maybe", async () => {
  const [error, ical] = await get_ical("___");
  if (error) {
    info([error.timestamp, error.description]);
  } else {
    fatal(["Error:", ical]);
  }
});

await test("parsers", async () => {
  const raw_ical = (await readFile("./src/parsers/test.ics")).toString();

  const calendar = parse_ical(raw_ical).failed(fatal)!;
  info([calendar]);

  const ical = generate_ical(calendar).failed(fatal)!;
  info(["\n" + ical]);

  const new_calendar = parse_ical(ical).failed(fatal)!;
  info([new_calendar]);

  if (!equals(calendar, new_calendar)) {
    fatal(["Not equal", getDiff(calendar, new_calendar)]);
  }
});
