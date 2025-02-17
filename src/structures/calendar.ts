export type RecurrenceBase = {
  count?: number;
  until?: string;
  interval?: number;
};

export type Recurrence = RecurrenceBase & (
  | { frequency: "DAILY" }
  | { frequency: "WEEKLY" | "MONTHLY" | "YEARLY"; by_day: string[] }
);

export type CalendarEvent = {
  summary: string;
  description?: string;
  start_time: string;
  end_time: string;
  recurrence?: Recurrence;
  location?: string;
};

export type Calendar = {
  name: string;
  description?: string;
  timezone: string;
  events: CalendarEvent[];
};

export type PlannerCalendar = Calendar & {
  owner: string;
  bio: string;
  goals: string[];
};
