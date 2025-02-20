import { HumanFriendlyCalendar } from "../types/calendar.ts";
import { error, Maybe, success } from "../utils/maybe.ts";
import {
  convert_ical_date_to_iso,
  convert_iso_to_ical_date,
  serialize_rrule,
} from "./utils.ts";

export const generate_ical = (
  calendar: HumanFriendlyCalendar,
): Maybe<string> => {
  const lines: string[] = [];

  try {
    lines.push("BEGIN:VCALENDAR");
    lines.push(`VERSION:${calendar.version}`);
    lines.push(`PRODID:${calendar.prodid}`);
    if (calendar.timezone) {
      lines.push(`TZID:${calendar.timezone}`);
    }
    calendar.updated &&
      lines.push(`DTSTAMP:${convert_iso_to_ical_date(calendar.updated)}`);
    lines.push(`X-WR-CALNAME:${calendar.name}`);
    lines.push(`X-WR-CALDESC:${calendar.description}`);

    calendar.events?.forEach((event) => {
      lines.push("BEGIN:VEVENT");
      lines.push(`UID:${event.uid}`);
      lines.push(`SUMMARY:${event.title}`);
      event.start &&
        lines.push(`DTSTART:${convert_iso_to_ical_date(event.start)}`);
      event.end && lines.push(`DTEND:${convert_ical_date_to_iso(event.end)}`);
      event.location && lines.push(`LOCATION:${event.location}`);
      event.description && lines.push(`DESCRIPTION:${event.description}`);
      if (event.categories && event.categories.length > 0) {
        lines.push(`CATEGORIES:${event.categories.join(",")}`);
      }
      event.organizer && lines.push(`ORGANIZER:${event.organizer}`);
      event.attendees?.forEach((attendee) => {
        lines.push(`ATTENDEE:${attendee}`);
      });
      if (event.recurrence) {
        lines.push(`RRULE:${serialize_rrule(event.recurrence)}`);
      }
      lines.push(`STATUS:${event.status}`);
      if (event.timezone) {
        lines.push(`TZID:${event.timezone}`);
      }
      lines.push("END:VEVENT");
    });

    lines.push("END:VCALENDAR");
    return success(lines.join("\r\n"));
  } catch (err) {
    return error(err);
  }
};
