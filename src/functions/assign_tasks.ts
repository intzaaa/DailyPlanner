import { get_chat } from "../utils/get_chat.ts";
import { logger } from "../utils/logger.ts";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

export default async () => {
  const { config, llm } = await import("../index.ts");

  const log = logger("assign_task", config.log_level);

  const chats = await get_chat();

  const promise = llm.chat.completions.create({
    model: config.llm.model,
    messages: [
      {
        role: "system",
        content: chats.assign_tasks(config.info.owner, config.info.bio),
      },
    ],
    response_format: zodResponseFormat(
      z.object({
        core_objectives: z.array(z.string()).describe(
          "The main objectives or ideals of the plan.",
        ),

        reverse_engineering: z.object({
          ultimate_goals: z.array(
            z.object({
              description: z.string(),
              timeframe: z.string(),
              metrics: z.array(z.string()),
            }),
          ),
          intermediate_goals: z.array(
            z.object({
              description: z.string(),
              timeframe: z.string(),
              metrics: z.array(z.string()),
            }),
          ),
          immediate_goals: z.array(
            z.object({
              description: z.string(),
              timeframe: z.string(),
              metrics: z.array(z.string()),
            }),
          ),
        }),

        tasks: z.object({
          high_priority: z.array(
            z.object({
              task: z.string(),
              metrics: z.array(z.string()),
              timeframe: z.string(),
            }),
          ),
          medium_priority: z.array(
            z.object({
              task: z.string(),
              metrics: z.array(z.string()),
              timeframe: z.string(),
            }),
          ),
          low_priority: z.array(
            z.object({
              task: z.string(),
              metrics: z.array(z.string()),
              timeframe: z.string(),
            }),
          ),
        }),

        action_framework: z.object({
          daily: z.array(z.string()),
          weekly: z.array(z.string()),
          monthly: z.array(z.string()),
          periodic: z.array(z.string()).optional(),
        }),

        review_mechanism: z.object({
          weekly_review: z.string(),
          monthly_review: z.string(),
          quarterly_review: z.string(),
        }),

        resource_management: z.object({
          key_focus_areas: z.array(z.string()),
          resource_allocation: z.string(),
          flexibility_reserve: z.string(),
        }),

        continuous_adjustment: z.object({
          feedback_optimization: z.string(),
          goal_reality_alignment: z.string(),
          learning_and_adaption: z.string(),
        }),

        next_steps: z.array(z.string()),
      }),
      "assign_tasks",
    ),
  });

  const result = (await promise).choices[0]!.message.content!;

  log("INFO", result);

  return result;
};
