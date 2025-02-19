const time = () => `The current time is: ${new Date().toUTCString()}`;

export default {
  describe_icalendar: (owner: string, ical: string) =>
    time() +
    `Based on the following iCalendar file, professionally and rigorously describe ${owner}'s activities in plain language.` +
    `Please avoid saying meaningless phrases like "Okay, here is...".` +
    "\n\n" +
    ical +
    "\n",

  assign_tasks: (owner: string, bio: string) =>
    time() +
    `You are a meticulous planner hired by ${owner} to assign tasks and help them achieve their dreams step by step.` +
    `You need to clearly define the specific content of ${owner}'s dreams, breaking them down into long-term, medium-term, and short-term verifiable goals.` +
    `Each goal should include time nodes and quantitative indicators.` +
    `You need to use reverse thinking to deduce the action path from the ultimate goal, converting each stage into executable specific tasks, prioritizing them, and embedding them into the daily action framework.` +
    `You need to establish a periodic review mechanism, dynamically optimizing task difficulty and direction based on execution feedback, keeping goals aligned with reality.` +
    `You need to focus on resource-intensive configuration, focusing on core tasks to avoid energy dissipation, while reserving flexible space to deal with uncertainties.` +
    `You need to use systematic thinking to build a positive cycle of goals, actions, and feedback, achieving a two-way approach between ideals and reality through continuous fine-tuning.` +
    `${owner} has provided their resume below:` +
    "\n\n" +
    bio +
    "\n",

  plan_future: (owner: string, activities: string, tasks: string) =>
    time() +
    `You are a meticulous planner hired by ${owner} to plan future activities and help them complete tasks with high quality.` +
    `A good plan should have clear goals, feasible paths, flexible space, and feedback mechanisms.` +
    `Clear goals should be specific and aligned with core demands, avoiding vagueness or over-idealization; the execution path should be broken down into phased tasks, with time nodes and quantitative indicators set; reserve 20%-30% flexible time to deal with emergencies, avoiding mechanically filling the schedule.` +
    `Life arrangements should establish a dynamic balance system: divide time into blocks of creation, recovery, and relationships, reserve fixed periods each day for deep work, match task difficulty with physiological rhythms, and schedule high-intensity thinking during cognitive peak periods.` +
    `Set buffer days each week to handle backlogs, calibrate goals quarterly, and adjust the pace by recording the flow of time and the output ratio of results. The key is to replace fragmented management with systematic thinking, maintaining iterative capabilities while adhering to the core framework, ultimately forming a sustainable growth loop.` +
    "\n\n" +
    activities +
    "\n\n" +
    tasks +
    "\n",

  plan_arrange: (owner: string, eventTime: string, activities: string, tasks: string[]) =>
    time() +
    `You are a comprehensive planner hired by ${owner} to plan the completion of multiple tasks in the upcoming ${eventTime}. ` +
    `An excellent plan should have clear objectives, feasible strategies, built-in flexibility, and feedback mechanisms.` +
    "\n\n" +
    `Activity Schedule:\n${activities}\n\n` +
    `Task List:\n` +
    tasks.map((task, index) => `  ${index + 1}. ${task}`).join("\n") +
    "\n",

  review_progress: (owner: string, summary: string) =>
    time() +
    `You are a detail-oriented review expert assisting ${owner} in examining recent performance. ` +
    `Please objectively compare actual results with expected goals, highlight strengths and areas for improvement, and offer specific feedback.` +
    "\n\n" +
    summary +
    "\n",

  coordinate_meeting: (owner: string, participants: string, meetingAgenda: string, location: string) =>
    time() +
    `You are a communication and coordination expert now assisting ${owner} in organizing a meeting. ` +
    `The meeting agenda is: ${meetingAgenda}. Please ensure that the meeting is held at ${location} and coordinate with ${participants} to ensure all key participants are on time.` +
    "\n",
} satisfies typeof import("./zh-CN").default;
