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
let done: (() => void) | undefined;
const test = (title: string) => {
  if (done) done();
  done = () => info(["Done", title]);

  info(["Testing", title]);
};

test("maybe");

{
  const ical = await get_ical("___");
  if (ical[0]) {
    info([ical[0].reason]);
  } else {
    fatal(["Error:", ical[1]]);
  }
}

test("parsers");

{
  const raw_ical = (await readFile("./src/parsers/test.ics")).toString();

  const calendar = parse_ical(raw_ical);
  if (calendar[0]) fatal(["1. Error:", calendar[0].reason]);
  info([calendar[1]]);

  const ical = generate_ical(calendar[1]!);
  if (ical[0]) fatal(["2. Error:", ical[0].reason]);
  info(["\n" + ical[1]]);

  const new_calendar = parse_ical(ical[1]!);
  if (new_calendar[0]) fatal(["3. Error:", new_calendar[0].reason]);
  info([new_calendar[1]]);

  if (!equals(calendar[1], new_calendar[1])) {
    fatal(["4. Error:", "Not equal", getDiff(calendar[1], new_calendar[1])]);
  }
}

done!();
