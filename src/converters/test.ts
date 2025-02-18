import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { from_ical_to_calendar } from "./from_ical_to_calendar";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

try {

  const filePath = resolve(import.meta.dirname, "test.ics");
  const icsContent = readFileSync(filePath, "utf-8");
  const calendar = from_ical_to_calendar(icsContent);


  console.log("Converted Calendar:", JSON.stringify(calendar, null, 2));

  assert(
    calendar.name === "Sample Calendar!!!",
    `calendar name no "Sample Calendar!!!", got "${calendar.name}"`
  );
  assert(
    calendar.timezone === "America/New_York",
    `timezone no "America/New_York", got "${calendar.timezone}"`
  );
  
 
  assert(
    calendar.events.length === 1,
    `Expected 1 event, got ${calendar.events.length}`
  );
  
  const event = calendar.events[0]!;
  assert(
    event.summary === "Project Kickoff Meeting",
    `event summary no "Project Kickoff Meeting", got "${event.summary}"`
  );
  assert(
    typeof event.start_time === "string" && event.start_time.trim().length > 0,
    "start_time should be a non-empty string"
  );
  assert(
    typeof event.end_time === "string" && event.end_time.trim().length > 0,
    "end_time should be a non-empty string"
  );

  console.log("All tests passed.");
} catch (error) {
  console.error("Test failed:", error);
  process.exit(1);
}
