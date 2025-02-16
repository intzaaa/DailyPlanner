export function e(strings: TemplateStringsArray, ...values: any[]): string {
  return values.some((v) => v == null) ? "" : String.raw({ raw: strings }, ...values);
}
