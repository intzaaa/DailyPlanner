import i from "ical.js";

export const from_ical_to_calendar = (ical: string): PlannerCalendar => {
  const parsed = i.parse(ical); // ical to jcal

  return {};
};
