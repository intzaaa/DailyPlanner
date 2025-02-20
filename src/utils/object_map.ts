export const object_map = <T extends object, R>(
  mapper: (value: T[keyof T], key?: keyof T) => R,
  obj: T,
): Record<keyof T, R> =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [mapper(value, key as any)]),
  );
