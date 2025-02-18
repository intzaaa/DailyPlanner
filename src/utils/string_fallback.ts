const base =
  <F>(fallback: F) =>
  (strings: TemplateStringsArray, ...values: any[]): string | F =>
    values.some((v) => v == null) ? fallback : String.raw({ raw: strings }, ...values);
export const n = base(undefined);
export const e = base("" as const);
