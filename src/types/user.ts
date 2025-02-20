import { UUID } from "node:crypto";
import { z } from "zod";
import { object_map } from "../utils/object_map.ts";

export type User =
  & {
    id: UUID;
    name: string;
    bio: string;
    timezone: string;
  }
  & Partial<{
    email: string;
    phone: string;
    avatar: string;
  }>;

export const ZodUser = z.object({
  id: z.string().uuid(),
  name: z.string(),
  bio: z.string(),
  timezone: z.string(),

  ...object_map((value) => z.optional(value), {
    email: z.string().email(),
    phone: z.string(),
    avatar: z.string().url(),
  }),
});
