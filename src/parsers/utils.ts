import { RecurrenceRule } from "../types/calendar.ts";

export const parse_rrule = (rrule: string): RecurrenceRule => {
  const rule: RecurrenceRule = { freq: "weekly" };
  const parts = rrule.split(";");
  parts.forEach((part) => {
    const [key, value] = part.split("=") as [string, string];
    switch (key) {
      case "FREQ":
        rule.freq = value.toLowerCase() as RecurrenceRule["freq"];
        break;
      case "INTERVAL":
        rule.interval = parseInt(value, 10);
        break;
      case "BYDAY":
        rule.byday = value.split(",");
        break;
      case "BYMONTHDAY":
        rule.bymonthday = value.split(",").map((v) => parseInt(v, 10));
        break;
      case "COUNT":
        rule.count = parseInt(value, 10);
        break;
      case "UNTIL":
        rule.until = value;
        break;
      default:
        break;
    }
  });
  return rule;
};

export const serialize_rrule = (recurrence: RecurrenceRule): string => {
  const parts: string[] = [`FREQ=${recurrence.freq.toUpperCase()}`];
  if (recurrence.interval && recurrence.interval !== 1) {
    parts.push(`INTERVAL=${recurrence.interval}`);
  }
  if (recurrence.byday && recurrence.byday.length > 0) {
    parts.push(`BYDAY=${recurrence.byday.join(",")}`);
  }
  if (recurrence.bymonthday && recurrence.bymonthday.length > 0) {
    parts.push(`BYMONTHDAY=${recurrence.bymonthday.join(",")}`);
  }
  if (recurrence.count) {
    parts.push(`COUNT=${recurrence.count}`);
  }
  if (recurrence.until) {
    parts.push(`UNTIL=${recurrence.until.replace(/[-:]/g, "").split(".")[0]}`);
  }
  return parts.join(";");
};

export const convert_ical_date_to_iso_date = (ical_date: string): string => {
  const year = ical_date.substring(0, 4);
  const month = ical_date.substring(4, 6);
  const day = ical_date.substring(6, 8);

  const time = ical_date.substring(9, 15);
  const hours = time.substring(0, 2);
  const minutes = time.substring(2, 4);
  const seconds = time.substring(4, 6);
  const timezone = ical_date.substring(15);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;
};

export const convert_iso_date_to_ical_date = (iso_date: string): string => {
  return iso_date.replace(/-/g, "").replace(/:/g, "");
};
