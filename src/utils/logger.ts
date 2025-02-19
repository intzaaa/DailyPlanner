import chalk, { type ChalkInstance } from "chalk";

const log_level = ["FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"] as const;

export type LogLevel = (typeof log_level)[number];

const p = (
  any: any,
) => (typeof any === "object" ? "\n" + JSON.stringify(any, null, 2) : any);

export const logger = async (module: string, default_level?: LogLevel) => {
  default_level = default_level ??
    (await import("../index.ts")).config.log_level;

  return (level: LogLevel, ...message: any[]) => {
    const time = new Date().toISOString();
    const color = ((): ChalkInstance => {
      switch (level) {
        case "FATAL":
          return chalk.whiteBright.bgRed;
        case "ERROR":
          return chalk.red;
        case "WARN":
          return chalk.yellow;
        case "INFO":
          return chalk.green;
        case "DEBUG":
          return chalk.blue;
        case "TRACE":
          return chalk.magenta;
      }
    })();
    const allowed_levels = log_level.slice(
      0,
      log_level.indexOf(default_level) + 1,
    );
    if (!allowed_levels.includes(level)) return;

    console.log(
      color(`[${level}] [${time}] [${module}] ${message.map(p).join(" ")}`),
    );
  };
};
