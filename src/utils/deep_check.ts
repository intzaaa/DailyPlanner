export const deep_check = (
  obj: object,
  parents: string[] = []
): {
  true: string[];
  false: string[];
} => {
  const true_paths: string[] = [];
  const false_paths: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object") {
      const sub = deep_check(value, [...parents, key]);
      true_paths.push(...sub.true);
      false_paths.push(...sub.false);
    } else {
      if (value === undefined || value === null) {
        false_paths.push([...parents, key].join("."));
      } else {
        true_paths.push([...parents, key].join("."));
      }
    }
  });

  return {
    true: true_paths,
    false: false_paths,
  };
};
