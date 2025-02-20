import { z } from "zod";

export type Task = {
  summary: string;
  description: string;
  deadline: string; // ISO 8601
  status: "pending" | "in_progress" | "completed";
};

export const ZodTask = z.object({
  summary: z.string(),
  description: z.string(),
  deadline: z.string(),
  status: z.union([
    z.literal("pending"),
    z.literal("in_progress"),
    z.literal("completed"),
  ]),
});

export type Tasks = {
  short_term: Task[];
  middle_term: Task[];
  long_term: Task[];
};

export const ZodTasks = z.object({
  short_term: z.array(ZodTask),
  middle_term: z.array(ZodTask),
  long_term: z.array(ZodTask),
});
