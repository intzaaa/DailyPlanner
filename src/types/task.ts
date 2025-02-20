import { z } from "zod";

export type Task = {
  summary: string;
  description: string;
  deadline: string; // ISO 8601
  status: "pending" | "in_progress" | "completed";
};

export const ZodTask = z.object({
  summary: z.string().min(1, "Summary required"),
  description: z.string(),
  deadline: z.string().regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    "Invalid datetime",
  ),
  status: z.enum(["pending", "in_progress", "completed"]),
});

export type Tasks = {
  short_term: Task[];
  middle_term: Task[];
  long_term: Task[];
};

export const ZodTasks = z.object({
  short_term: z.array(ZodTask).default([]),
  middle_term: z.array(ZodTask).default([]),
  long_term: z.array(ZodTask).default([]),
});
