import { readFileSync } from "node:fs";
import { from_ical_to_calendar } from "./from_ical_to_calendar.ts";
import { resolve } from "node:path";
import { logger } from "../utils/logger.ts";

const log = logger("test", "INFO");

export default async () => {
  log("INFO", `Testing ${from_ical_to_calendar.name}...`);
  log("INFO", from_ical_to_calendar(readFileSync(resolve(import.meta.dirname!, "test.ics")).toString()));
};
