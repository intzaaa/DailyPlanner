import i from "ical.js";
import { PlannerCalendar, CalendarEvent, Recurrence } from "../structures/calendar";

export function parseICalToCalendar(icalString: string): PlannerCalendar {
  if (!icalString?.trim()) {
    throw new Error("no data");
  }

  let parsedJCal;
  try {
    // 解析 
    parsedJCal = i.parse(icalString);
  } catch (err) {
    throw new Error(
      `Failed : ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
  // 创建一个 Component 对象
  const calComponent = new i.Component(parsedJCal);

  // 初始化一下
  const plannerCalendar: PlannerCalendar = {
    name: "Calendar ",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    events: [],
    owner: "owner",
    bio: "bio",
    goals: []
  };

  const eventItems = calComponent.getAllSubcomponents("vevent");
  plannerCalendar.events = eventItems.map((eventItem): CalendarEvent => {
    const calEvent = new i.Event(eventItem);

    // 定义基础事件对象
    const baseCalEvent: CalendarEvent = {
      summary: calEvent.summary || "Untitled Event",
      start_time: calEvent.startDate.toJSDate().toISOString(),
      end_time: calEvent.endDate.toJSDate().toISOString()
    };

    // 有就加入描述
    if (calEvent.description) {
      baseCalEvent.description = calEvent.description;
    }
    if (calEvent.location) {
      baseCalEvent.location = calEvent.location;
    }

    // 处理重复
    const rrule = (calEvent as any).rrule;
    if (rrule) {
      const recurrence: Partial<Recurrence> = {
        frequency: rrule.freq ? rrule.freq.toUpperCase() as Recurrence["frequency"] : "DAILY",
        interval: rrule.interval || 1
      };

      // 若重复规则中包含截止日期，则使用截止日期
      if (rrule.until) {
        recurrence.until = rrule.until.toJSDate().toISOString();
      } else if (rrule.count) {
        recurrence.count = rrule.count;
      }

      // 处理非每日重复的 byday 属性
      if (
        rrule.freq &&
        rrule.freq.toUpperCase() !== "DAILY" &&
        rrule.byday &&
        Array.isArray(rrule.byday) &&
        rrule.byday.length > 0
      ) {
        (recurrence as { by_day: string[] }).by_day = rrule.byday.map((day: any) => day.toString());
      }

      baseCalEvent.recurrence = recurrence as Recurrence;
    }

    return baseCalEvent;
  });

  return plannerCalendar;
}
