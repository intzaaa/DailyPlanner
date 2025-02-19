import { PlannerCalendar } from "../structures/calendar.ts";
import type { OpenAI as LLM } from "openai";
import { e } from "../utils/string_fallback.ts";

export const from_calendar_to_param = (
  schedule: PlannerCalendar,
): LLM.Chat.Completions.ChatCompletionMessageParam => {
  return {
    role: "developer",
    content:
      `You are a thorough planner. Below you will get ${schedule.owner}'s schedule. ` +
      `In addition to the schedule marked as "FORCE", please help him/her arrange the available time for tomorrow in detail. ` +
      `${schedule.owner} hopes to complete these goals in the "remaining time":\n` +
      schedule.goals.map((goal, idx) => `    ${idx + 1}. ${goal}`).join("\n") +
      "\n" +
      `Currently, ${schedule.owner} is in the ${schedule.timezone} timezone. ` +
      `Here is ${schedule.owner}'s bio:\n${schedule.bio.trim()}\n` +
      `Here is ${schedule.owner}'s schedule:\n` +
      schedule.events
        .map(
          (event, idx) =>
            `    ${idx + 1}. ${event.summary}:` +
            `        Start: ${event.start_time}` +
            `        End: ${event.end_time}` +
            e`        Description: ${event.description}` +
            e`        Recurrence: ${event.recurrence?.frequency}` +
            e`        Location: ${event.location}`,
        )
        .join("\n") +
      "\n",
  };
};
