import { z } from "zod";
import { object_map } from "../utils/object_map.ts";

export const ISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

export type RecurrenceRule = {
  freq: "daily" | "weekly" | "monthly" | "yearly";
  interval?: number;
  byday?: string[];
  bymonthday?: number[];
  count?: number;
  until?: string;
};

export const ZodRecurrenceRule = z.object({
  freq: z.enum(["daily", "weekly", "monthly", "yearly"]),

  ...object_map((value) => z.optional(value), {
    interval: z.number().positive(),
    byday: z.array(z.string().regex(/^(MO|TU|WE|TH|FR|SA|SU)$/)),
    bymonthday: z.array(z.number().min(1).max(31)),
    count: z.number().positive(),
    until: z.string().regex(ISO8601),
  }),
});

export type HumanFriendlyCalendarEvent =
  & {
    uid: string;
    title: string;
  }
  & Partial<{
    start: string;
    end: string;
    location: string;
    description: string;
    categories: string[];
    organizer: string;
    attendees: string[];
    status: string;
    recurrence: RecurrenceRule;
    timezone: string;
  }>;

export const ZodHumanFriendlyCalendarEvent = z.object({
  uid: z.string().uuid(),
  title: z.string().min(1),

  ...object_map((value) => z.optional(value), {
    start: z.string().regex(ISO8601),
    end: z.string().regex(ISO8601),
    location: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    organizer: z.string().email(),
    attendees: z.array(z.string().email()),
    recurrence: ZodRecurrenceRule,
    status: z.enum(["confirmed", "tentative", "cancelled"]),
    timezone: z.string(),
  }),
});

export type HumanFriendlyCalendar = Partial<{
  version: string;
  prodid: string;
  timezone: string;
  updated: string;
  name: string;
  description: string;
  events: HumanFriendlyCalendarEvent[];
}>;

export const ZodHumanFriendlyCalendar = z.object(
  object_map((value) => z.optional(value), {
    version: z.string(),
    prodid: z.string(),
    timezone: z.string(),
    updated: z.string().regex(ISO8601),
    name: z.string().min(1, "Calendar name cannot be empty"),
    description: z.string(),
    events: z.array(ZodHumanFriendlyCalendarEvent).default([]),
  }),
);
