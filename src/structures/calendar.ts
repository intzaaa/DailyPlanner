export type Recurrence = {
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  interval: number | undefined;
  count: number | undefined;
  until: string | undefined;
  byDay: string[] | undefined;
  byMonthDay: number[] | undefined;
  byMonth: number[] | undefined;
};

export type CalendarEvent = {
  summary: string;
  description: string | undefined;
  start_time: string;
  end_time: string;
  recurrence: Recurrence | undefined;
  location: string | undefined;
};

export type Calendar = {
  name: string;
  description: string | undefined;
  timezone: string;
  events: CalendarEvent[];
};

export type PlannerCalendar = Calendar & {
  owner: string;
  bio: string;
  goals: string[];
};
