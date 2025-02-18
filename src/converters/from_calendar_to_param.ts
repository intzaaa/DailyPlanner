import { PlannerCalendar } from "../structures/calendar";
import type { OpenAI as LLM } from "openai";
import { e } from "../utils/string_fallback";

export const from_calendar_to_param = (schedule: PlannerCalendar): LLM.Chat.Completions.ChatCompletionMessageParam => {
  return {
    role: "developer",
    content:
      `You are a thorough planner. Below you will get ${schedule.owner}'s schedule. ` +
      `In addition to the schedule marked as "FORCE", please help him arrange the available time for tomorrow in detail. ` +
      `${schedule.owner} hopes to complete these goals in the "remaining time": \n${schedule.goals
        .map((goal, idx) => `    ${idx + 1}. ${goal}`)
        .join("\n")}\n. ` +
      `Currently, ${schedule.owner} is in the ${schedule.timezone} timezone. ` +
      `Here is ${schedule.owner}'s bio:\n${schedule.bio}\n` +
      `Here is ${schedule.owner}'s schedule:\n` +
      schedule.events
        .map(
          (event, idx) =>
            `    ${idx + 1}. ${event.summary}:\n` +
            `        Start: ${event.start_time}\n` +
            `        End: ${event.end_time}\n` +
            e`        Description: ${event.description}\n` +
            e`        Recurrence: ${event.recurrence?.frequency}\n` +
            e`        Location: ${event.location}\n`
        )
        .join("\n") +
      `\n`,
  };
};
