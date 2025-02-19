import { curry3 } from "@typed/curry";
import ansis, { AnsiColors } from "ansis";

export type LogLevel = "FATAL" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE";

export const logger = curry3((level: LogLevel, module: string, message: any) => {
  const time = new Date().toISOString();
  console.log(
    ansis[
      ((): AnsiColors => {
        switch (level) {
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
});
