const cache_map = new Map();

export const cache = async <R>(func: (...any: any[]) => R): Promise<R> => {
  const string = func.toString();

  if (cache_map.has(string)) {
    return cache_map.get(string);
  } else {
    const value = await func();
    cache_map.set(string, value);

    return value;
  }
};
