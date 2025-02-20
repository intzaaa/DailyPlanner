import { readFile } from "node:fs/promises";
import { get_ical } from "./utils/getters/get_ical.ts";
import { parse_ical } from "./parsers/parse_ical.ts";
import { logger } from "./utils/logger.ts";
import { generate_ical } from "./parsers/generate_ical.ts";
import { equals } from "ramda";

const log = logger("TRACE", "Test");

log("INFO", ["Maybe"]);

{
  const ical = await get_ical("___");
  if (ical[0]) {
    log("INFO", [ical[0].reason]);
  } else {
    log("FATAL", ["Error:", ical[1]]);
  }
}

log("INFO", ["Parsers"]);

{
  const raw_ical = (await readFile("./src/parsers/test.ics")).toString();

  const calendar = parse_ical(raw_ical);
  if (calendar[0]) log("FATAL", ["1. Error:", calendar[0].reason]);
  log("INFO", [calendar[1]]);

  const ical = generate_ical(calendar[1]!);
  if (ical[0]) log("FATAL", ["2. Error:", ical[0].reason]);
  log("INFO", [ical[1]]);

  const new_calendar = parse_ical(ical[1]!);
  if (new_calendar[0]) log("FATAL", ["3. Error:", new_calendar[0].reason]);
  log("INFO", [new_calendar[1]]);

  if (equals(calendar[1], new_calendar[1])) {
    log("FATAL", ["4. Error:", "Not equal"]);
  }

  log("INFO", ["Success"]);
}
