import { RecurrenceRule } from "../structures/calendars.ts";

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
    parts.push(`UNTIL=${recurrence.until.replace(/[-:]/g, "").split(".")[0]}`); // 格式化日期
  }
  return parts.join(";");
};

export const convert_ical_date_to_iso = (icalDate: string): string => {
  const match = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/.exec(
    icalDate,
  );
  if (match) {
    const [_, year, month, day, hour, minute, second] = match;
    return `${year}-${month}-${day}T${hour}:${minute}:${second}${
      icalDate.endsWith("Z") ? "Z" : ""
    }`;
  }
  return icalDate;
};

export const convert_iso_to_ical_date = (iso_date: string): string => {
  return iso_date.replace(/[-:]/g, "").replace(/\.\d+/, "").replace("T", "T") +
    (iso_date.endsWith("Z") ? "Z" : "");
};
