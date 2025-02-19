export const deep_check = (obj: object, parents: string[] = []) =>
  Object.entries(obj).reduce<{ true: string[]; false: string[] }>(
    (acc, [key, value]) => {
      if (typeof value === "object") {
        const sub = deep_check(value, [...parents, key]);
        acc.true.push(...sub.true);
        acc.false.push(...sub.false);
      } else {
        (value === undefined || value === null ? acc.false : acc.true).push(
          [...parents, key].join("."),
        );
      }
      return acc;
    },
    { true: [], false: [] },
  );
