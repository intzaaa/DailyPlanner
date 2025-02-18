import { readFileSync } from "node:fs";
import { from_ical_to_calendar } from "./from_ical_to_calendar";
import { resolve } from "node:path";

export default () => {
  console.log(JSON.stringify(from_ical_to_calendar(readFileSync(resolve(import.meta.dirname, "test.ics")).toString()), null, 2));
};
