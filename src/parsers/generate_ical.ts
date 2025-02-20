import { HumanFriendlyCalendar } from "../types/calendar.ts";
import {
  convert_ical_date_to_iso,
  convert_iso_to_ical_date,
  serialize_rrule,
} from "./utils.ts";

export const generate_ical = (calendar: HumanFriendlyCalendar): string => {
  const lines: string[] = [];
  lines.push("BEGIN:VCALENDAR");
  lines.push(`VERSION:${calendar.version}`);
  lines.push(`PRODID:${calendar.prodid}`);
  if (calendar.timezone) {
    lines.push(`TZID:${calendar.timezone}`);
  }
  lines.push(`DTSTAMP:${convert_iso_to_ical_date(calendar.updated)}`);
  lines.push(`X-WR-CALNAME:${calendar.name}`);
  lines.push(`X-WR-CALDESC:${calendar.description}`);

  calendar.events.forEach((event) => {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${event.uid}`);
    lines.push(`SUMMARY:${event.title}`);
    lines.push(`DTSTART:${convert_iso_to_ical_date(event.start)}`);
    lines.push(`DTEND:${convert_ical_date_to_iso(event.end)}`);
    lines.push(`LOCATION:${event.location}`);
    lines.push(`DESCRIPTION:${event.description}`);
    if (event.categories && event.categories.length > 0) {
      lines.push(`CATEGORIES:${event.categories.join(",")}`);
    }
    lines.push(`ORGANIZER:${event.organizer}`);
    event.attendees.forEach((attendee) => {
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
  return lines.join("\r\n");
};
