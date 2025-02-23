import { z } from "zod";

export type Task<
  P extends "yearly" | "quarterly" | "monthly" | "weekly" | "daily" = any,
> = {
  summary: string;
  description: string;
  period: P;
  priorities: {
    urgent: boolean;
    important: boolean;
  };
  deadline:
    & {
      year: number;
    }
    & (
      P extends "quarterly" | "monthly" | "weekly" ? {
          month: number;
        }
        : void
    )
    & (
      P extends "daily" | "weekly" ? {
          day: number;
        }
        : void
    );
};

export const ZodTask = z.object({
  summary: z.string().min(1, "Summary required"),
  description: z.string(),
  period: z.enum(["yearly", "quarterly", "monthly", "weekly", "daily"]),
  priorities: z.object({
    urgent: z.boolean(),
    important: z.boolean(),
  }),
  deadline: z.object({
    year: z.number(),
    month: z.number().optional().describe(
      "If period is quarterly, monthly or weekly",
    ),
    day: z.number().optional().describe("If period is daily or weekly"),
  }),
});

export type Tasks = Task[];

export const ZodTasks = z.array(ZodTask);
