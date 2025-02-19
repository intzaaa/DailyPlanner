import { readFile } from "node:fs/promises";

export const get_ical = async (): Promise<string> => {
  const { config } = await import("../index.ts");

  if (config.subscription.startsWith("http")) {
    return await fetch(new URL(config.subscription)).then((res) => res.text());
  } else {
    return (await readFile(config.subscription)).toString();
  }
};
