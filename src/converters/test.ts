import { readFileSync } from "node:fs";
import { from_ical_to_calendar } from "./from_ical_to_calendar";
import { resolve } from "node:path";
import { logger } from "../utils/logger";

const log = logger(import.meta.filename, "INFO");

export default async () => {
  log(`Testing ${from_ical_to_calendar.name}...`);
  log(JSON.stringify(from_ical_to_calendar(readFileSync(resolve(import.meta.dirname, "test.ics")).toString()), null, 2));
};
