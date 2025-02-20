import { error, Maybe } from "./maybe.ts";

export const retry = async <
  F extends (...any: any[]) => R,
  R extends Maybe<any>,
>(
  timeout: number,
  counts: number,
  func: F,
): Promise<Maybe<Awaited<R>>> => {
  if (counts <= 0) {
    return error("retry counts exhausted");
  }

  const symbol = Symbol("timeout");
  const result = await Promise.race([
    new Promise<typeof symbol>((resolve) =>
      setTimeout(() => resolve(symbol), timeout)
    ),
    func(),
  ]);

  if (result === symbol || result === Error) {
    return retry(timeout, counts - 1, func);
  } else {
    return result;
  }
};
