import { cache } from "./cache.ts";
import { logger } from "../utils/logger.ts";

export default async () => {
  const log = await logger("test", "INFO");

  const get = async () =>
    await cache(async () => {
      log("INFO", "calc!");
      return "nice";
    });
  const a = await get();
  const b = await get();
  const c = await get();

  log("INFO", a, b, c);
};
