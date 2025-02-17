export const n = (strings: TemplateStringsArray, ...values: any[]): string | undefined =>
  values.some((v) => v == null) ? undefined : String.raw({ raw: strings }, ...values);
export const e = (strings: TemplateStringsArray, ...values: any[]): string => (values.some((v) => v == null) ? "" : String.raw({ raw: strings }, ...values));
