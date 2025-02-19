import ansis, { AnsiColors } from "ansis";

export type LogLevel = "FATAL" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE";

export const logger = (module: string, default_level: LogLevel) => (message: any, level?: LogLevel) => {
  const time = new Date().toISOString();
  console.log(
    ansis[
      ((): AnsiColors => {
        switch (level ?? default_level) {
          case "FATAL":
          case "ERROR":
            return "red";
          case "WARN":
            return "yellow";
          case "INFO":
            return "green";
          case "DEBUG":
            return "blue";
          case "TRACE":
            return "gray";
        }
      })()
    ](`[${level}] [${time}] [${module}] ${message}`)
  );
};
