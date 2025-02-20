import { z } from "zod";

export type RecurrenceRule = {
  freq: "daily" | "weekly" | "monthly" | "yearly";
  interval?: number;
  byday?: string[];
  bymonthday?: number[];
  count?: number;
  until?: string;
};

export const ZodRecurrenceRule = z.object({
  freq: z.string(),
  interval: z.optional(z.number()),
  byday: z.optional(z.array(z.string())),
  bymonthday: z.optional(z.array(z.number())),
  count: z.optional(z.number()),
  until: z.optional(z.string()),
});

export type HumanFriendlyCalendarEvent = {
  uid: string;
  title: string;
  start: string; // ISO 8601
  end: string; // ISO 8601
  location: string;
  description: string;
  categories: string[];
  organizer: string;
  attendees: string[];
  recurrence?: RecurrenceRule;
  status: string;
  timezone?: string;
};

export const ZodHumanFriendlyCalendarEvent = z.object({
  uid: z.string(),
  title: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  organizer: z.string(),
  attendees: z.array(z.string()),
  recurrence: z.optional(ZodRecurrenceRule),
  status: z.string(),
  timezone: z.optional(z.string()).describe("TimezoneID, e.g. Asia/Shanghai"),
});

export type HumanFriendlyCalendar = {
  version: string;
  prodid: string;
  timezone: string;
  updated: string;
  name: string;
  description: string;
  events: HumanFriendlyCalendarEvent[];
};

export const ZodHumanFriendlyCalendar = z.object({
  version: z.string(),
  prodid: z.string(),
  timezone: z.string(),
  updated: z.string(),
  name: z.string(),
  description: z.string(),
  events: z.array(ZodHumanFriendlyCalendarEvent),
});
