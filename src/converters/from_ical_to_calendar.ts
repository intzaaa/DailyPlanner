import ical_js from "ical.js";
import { Calendar, CalendarEvent, Recurrence } from "../structures/calendar";

export const from_ical_to_calendar = (ical: string): Calendar => {
  const component = new ical_js.Component(ical_js.parse(ical));

  const calendarName = component.getFirstPropertyValue("x-wr-calname")?.toString() ?? "Untitled Calendar";

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const events = component.getAllSubcomponents("vevent").map((eventItem): CalendarEvent => {
    const event = new ical_js.Event(eventItem);

    // Not working at all!!!
    const rrule = (event as any).rrule;

    return {
      summary: event.summary || "Untitled Event",
      start_time: event.startDate.toJSDate().toISOString(),
      end_time: event.endDate.toJSDate().toISOString(),
      description: event.description || undefined,
      location: event.location || undefined,
      recurrence: rrule
        ? ({
            frequency: rrule.freq ? (rrule.freq.toUpperCase() as Recurrence["frequency"]) : "DAILY",
            interval: rrule.interval || 1,
            until: rrule.until ? rrule.until.toJSDate().toISOString() : undefined,
            count: rrule.count || undefined,
            by_day:
              rrule.freq && rrule.freq.toUpperCase() !== "DAILY" && Array.isArray(rrule.byday) && rrule.byday.length > 0
                ? rrule.byday.map((day: any) => day.toString())
                : undefined,
          } satisfies Recurrence)
        : undefined,
    } satisfies CalendarEvent;
    //
  });

  return {
    name: calendarName,
    timezone: timezone,
    events: events,
  };
};
