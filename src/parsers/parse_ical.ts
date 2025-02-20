import {
  HumanFriendlyCalendar,
  HumanFriendlyCalendarEvent,
} from "../types/calendar.ts";
import { error, Maybe, success } from "../utils/maybe.ts";
import { convert_ical_date_to_iso, parse_rrule } from "./utils.ts";

/**
 * Parses an iCalendar (ICS) string into a human-friendly calendar object.
 *
 * This function processes an ICS string line by line and extracts both calendar-level
 * and event-level information. It handles the following:
 *
 * Calendar-level properties:
 * - VERSION: Calendar version
 * - PRODID: Product identifier
 * - TZID: Timezone identifier
 * - DTSTAMP: Last updated timestamp
 * - X-WR-CALNAME: Calendar name
 * - X-WR-CALDESC: Calendar description
 *
 * Event-level properties:
 * - UID: Unique identifier
 * - SUMMARY: Event title
 * - DTSTART: Start date/time
 * - DTEND: End date/time
 * - LOCATION: Event location
 * - DESCRIPTION: Event description
 * - CATEGORIES: Event categories (comma-separated)
 * - ORGANIZER: Event organizer
 * - ATTENDEE: Event attendees
 * - RRULE: Recurrence rule
 * - STATUS: Event status
 * - TZID: Event timezone
 *
 * The parser maintains state using an `in_event` flag to determine whether it's currently
 * processing an event block (between BEGIN:VEVENT and END:VEVENT). It accumulates event
 * data in a `current_event` object before adding completed events to the events array.
 *
 * @param ics - The iCalendar format string to parse
 * @returns A HumanFriendlyCalendar object containing the parsed calendar and event data
 *          with default values applied for missing required fields
 *
 * @example
 * const calendar = parse_ical('BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR');
 */
export const parse_ical = (ics: string): Maybe<HumanFriendlyCalendar> => {
  const lines = ics.split(/\r?\n/);
  const events: HumanFriendlyCalendarEvent[] = [];
  const calendar: Partial<HumanFriendlyCalendar> = {
    events: [],
  };
  let current_event: Partial<HumanFriendlyCalendarEvent> | null = null;
  let in_event = false;

  try {
    lines.forEach((line) => {
      if (line.startsWith("BEGIN:VEVENT")) {
        current_event = {};
        in_event = true;
      } else if (line.startsWith("END:VEVENT")) {
        if (current_event) {
          if (!current_event.categories) current_event.categories = [];
          if (!current_event.attendees) current_event.attendees = [];
          events.push(current_event as HumanFriendlyCalendarEvent);
          current_event = null;
        }
        in_event = false;
      } else if (in_event && current_event) {
        const [key, ...rest] = line.split(":");
        const value = rest.join(":");
        switch (key) {
          case "UID":
            current_event.uid = value;
            break;
          case "SUMMARY":
            current_event.title = value;
            break;
          case "DTSTART":
            current_event.start = convert_ical_date_to_iso(value);
            break;
          case "DTEND":
            current_event.end = convert_ical_date_to_iso(value);
            break;
          case "LOCATION":
            current_event.location = value;
            break;
          case "DESCRIPTION":
            current_event.description = value;
            break;
          case "CATEGORIES":
            current_event.categories = value.split(",").map((v) => v.trim());
            break;
          case "ORGANIZER":
            current_event.organizer = value;
            break;
          case "ATTENDEE":
            current_event.attendees = current_event.attendees ?? [];
            current_event.attendees.push(value);
            break;
          case "RRULE":
            current_event.recurrence = parse_rrule(value);
            break;
          case "STATUS":
            current_event.status = value;
            break;
          case "TZID":
            current_event.timezone = value;
            break;
          default:
            break;
        }
      } else {
        const [key, ...rest] = line.split(":");
        const value = rest.join(":");
        switch (key) {
          case "VERSION":
            calendar.version = value;
            break;
          case "PRODID":
            calendar.prodid = value;
            break;
          case "TZID":
            calendar.timezone = value;
            break;
          case "DTSTAMP":
            calendar.updated = convert_ical_date_to_iso(value);
            break;
          case "X-WR-CALNAME":
            calendar.name = value;
            break;
          case "X-WR-CALDESC":
            calendar.description = value;
            break;
          default:
            break;
        }
      }
    });

    return success({
      version: calendar.version ?? "2.0",
      prodid: calendar.prodid ?? "",
      timezone: calendar.timezone ?? "",
      updated: calendar.updated ?? "",
      name: calendar.name ?? "",
      description: calendar.description ?? "",
      events: events,
    });
  } catch (err) {
    return error(err);
  }
};
