import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { logger } from "../utils/logger.ts";
import { parse_ical } from "./parse_ical.ts";

const log = await logger("test", "INFO");

export default async () => {
  log("INFO", `Testing ${parse_ical.name}...`);
  log(
    "INFO",
    parse_ical(
      readFileSync(resolve(import.meta.dirname!, "test.ics")).toString(),
    ),
  );
};
