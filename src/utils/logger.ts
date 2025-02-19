import ansis, { Ansis } from "ansis";

const log_level = ["FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"] as const;

export type LogLevel = (typeof log_level)[number];

const p = (any: any) => (typeof any === "object" ? JSON.stringify(any, null, 2) : any);

export const logger =
  (module: string, default_level: LogLevel) =>
  (level: LogLevel, ...message: any[]) => {
    const time = new Date().toISOString();
    const color = ((): Ansis => {
      switch (level) {
        case "FATAL":
          return ansis.red.bgWhite;
        case "ERROR":
          return ansis.red;
        case "WARN":
          return ansis.yellow;
        case "INFO":
          return ansis.green;
        case "DEBUG":
          return ansis.blue;
        case "TRACE":
          return ansis.magenta;
      }
    })();
    const allowed = log_level.slice(0, log_level.indexOf(default_level) + 1);
    if (!allowed.includes(level)) return;

    console.log(color(`[${level}] [${time}] [${module}] ${message.map(p).join(" ")}`));
  };
