import ical_js from "ical.js";
import { Calendar, CalendarEvent } from "../structures/calendar.ts";

export const from_ical_to_calendar = (ical: string): Calendar => {
  const component = new ical_js.Component(ical_js.parse(ical));

  const name = component.getFirstPropertyValue("x-wr-calname")?.toString() ??
    "Untitled Calendar";

  const description =
    component.getFirstPropertyValue("x-wr-caldesc")?.toString() ?? undefined;

  const timezone =
    component.getFirstSubcomponent("vtimezone")?.getFirstPropertyValue("tzid")
      ?.toString() ??
      component.getFirstPropertyValue("x-wr-timezone")?.toString() ??
      "UTC";

  const events = component.getAllSubcomponents("vevent").map(
    (eventItem): CalendarEvent => {
      const event = new ical_js.Event(eventItem);
      const rrule = event.isRecurring()
        ? new ical_js.Recur(eventItem.getFirstPropertyValue("rrule") as any)
        : undefined;

      return {
        summary: event.summary ?? "Untitled Event",
        start_time: event.startDate.toJSDate().toISOString(),
        end_time: event.endDate.toJSDate().toISOString(),
        description: event.description ?? undefined,
        location: event.location ?? undefined,
        recurrence: rrule
          ? {
            frequency: rrule.freq as any,
            interval: rrule.interval,
            count: rrule.count === null ? undefined : rrule.count,
            until: rrule.until ? rrule.until.toString() : undefined,
            byDay: rrule.parts.BYDAY,
            byMonthDay: rrule.parts.BYMONTHDAY,
            byMonth: rrule.parts.BYMONTH,
          }
          : undefined,
      };
    },
  );

  return {
    name,
    description,
    timezone,
    events,
  } as const;
};
