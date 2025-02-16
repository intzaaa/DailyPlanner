export const e = (strings: TemplateStringsArray, ...values: any[]): string => (values.some((v) => v == null) ? "" : String.raw({ raw: strings }, ...values));
