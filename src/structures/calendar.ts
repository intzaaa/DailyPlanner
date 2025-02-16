export type CalendarEvent = {
  summary: string;
  description?: string;
  start_time: string;
  end_time: string;
  recurrence?: {
    count?: number;
    until?: string;
    interval?: number;
  } & (
    | {
        frequency: "DAILY";
      }
    | {
        frequency: "WEEKLY";
        by_day: string[];
      }
    | {
        frequency: "MONTHLY";
        by_day: string[];
      }
    | {
        frequency: "YEARLY";
        by_day: string[];
      }
  );
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
