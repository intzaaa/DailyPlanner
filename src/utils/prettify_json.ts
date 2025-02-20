export const prettify_json = (raw: string | object) =>
  JSON.stringify(typeof raw === "string" ? JSON.parse(raw) : raw, null, 2);
