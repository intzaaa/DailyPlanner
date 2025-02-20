import { zodResponseFormat } from "openai/helpers/zod";
import {
  HumanFriendlyCalendar,
  ZodHumanFriendlyCalendar,
} from "../structures/calendars.ts";
import { ZodTasks } from "../structures/tasks.ts";

const time = () => `现在的时间是：${new Date().toUTCString()}\n`;

export default {
  describe_icalendar: {
    request: (owner: string, ical: string) =>
      time() +
      `根据以下 iCalendar 文件，以专业且详细的语言风格介绍 ${owner} 的活动。` +
      "\n\n" +
      ical +
      "\n",
    response: zodResponseFormat(ZodHumanFriendlyCalendar, "describe_icalendar"),
  },
  assign_tasks: {
    request: (owner: string, bio: string) =>
      time() +
      `你是一个面面俱到的计划家，你受 ${owner} 的雇佣为 ${owner} 布置任务，帮助他一步一步地实现自己的理想。` +
      `你需要明确 ${owner} 理想的具体内涵，将其分解为长期、中期、短期可验证的阶段目标，每个目标需包含时间节点与量化指标。` +
      `你需要采用逆向思维从终极目标倒推行动路径，将每个阶段转化为可执行的具体任务，按优先级排序后嵌入日常行动框架。` +
      `你需要建立周期性复盘机制，根据执行反馈动态优化任务难度与方向，保持目标与现实的校准。` +
      `你需要你需要注重资源集约化配置，聚焦核心任务避免精力耗散，同时预留弹性空间应对不确定性。` +
      `你需要用系统化思维构建目标、行动、反馈的正向循环，通过持续微调实现理想与现实的双向逼近。` +
      `${owner} 在下面给出了自己的简历：` +
      "\n\n" +
      bio +
      "\n",
    response: zodResponseFormat(ZodTasks, "assign_tasks"),
  },
  plan_future: {
    request: (
      owner: string,
      activities: HumanFriendlyCalendar,
      tasks: string,
    ) =>
      time() +
      `你是一个面面俱到的计划家，你受 ${owner} 的雇佣为 ${owner} 计划未来的活动，帮助他高质量地完成任务。` +
      `一个好计划需具备明确目标、可行路径、弹性空间和反馈机制。` +
      `明确目标应具体且与核心诉求对齐，避免空泛或过度理想化；执行路径需拆解为阶段性任务，设置时间节点与量化指标；预留20%-30%弹性时间应对突发情况，避免机械式填满日程。` +
      `生活安排需建立动态平衡系统：将时间划分为创造、恢复、关系三类区块，每日保留固定时段处理深度工作，用生理节律匹配任务难度，高强度思考安排在认知峰值期。` +
      `每周设置缓冲日处理积压事务，每季度进行目标校准，通过记录时间流向与成果产出比调整节奏。关键是以系统思维替代碎片化管理，在坚持核心框架的同时保持迭代能力，最终形成可持续的成长闭环。` +
      `注意！你计划的活动不能与现有的活动冲突。` +
      "\n\n" +
      activities +
      "\n\n" +
      tasks +
      "\n",
  },
  plan_arrange: {
    request: (
      owner: string,
      eventTime: string,
      activities: string,
      tasks: string[],
    ) =>
      time() +
      `你是一个面面俱到的计划家，你受 ${owner} 的雇佣为 ${owner} 计划在未来的 ${eventTime} 完成多个任务。` +
      `一个好计划需具备明确目标、可行路径、弹性空间和反馈机制。` +
      "\n\n" +
      `活动安排：\n${activities}\n\n` +
      `任务清单：\n` +
      tasks.map((task, index) => `  ${index + 1}. ${task}`).join("\n") +
      "\n",
  },
  review_progress: {
    request: (owner: string, summary: string) =>
      time() +
      `你是一个注重细节的复盘专家，现协助 ${owner} 回顾近期的工作表现。` +
      `请客观地对比实际成果与预期目标，指出优点和改进空间，并给出具体的反馈建议。` +
      "\n\n" +
      summary +
      "\n",
  },
  //协作的远期预留（即此时可以考虑我们程序能达到与其它用户的协作），但似乎还存在隐私问题
  coordinate_meeting: {
    request: (
      owner: string,
      participants: string,
      meeting_agenda: string,
      location: string,
    ) =>
      time() +
      `你是一个沟通协调专家，现在帮助 ${owner} 安排一次会议。` +
      `会议议题为：${meeting_agenda}。请确保会议在 ${location} 举行，并与 ${participants} 协调时间，确保所有关键参与者能准时出席。` +
      "\n",
  },
} as const satisfies Record<
  string,
  {
    request: (...any: any[]) => string;
    response?: ReturnType<typeof zodResponseFormat> | undefined;
  }
>;
