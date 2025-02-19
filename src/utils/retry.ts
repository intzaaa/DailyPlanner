import { Error, Maybe } from "./maybe.ts";

export const retry = async <
  F extends (...any: any[]) => R,
  R extends Maybe<any>,
>(
  timeout: number,
  time: number,
  func: F,
): Promise<Maybe<Awaited<R>>> => {
  if (time <= 0) {
    return Error;
  }

  const symbol = Symbol("timeout");
  const result = await Promise.race([
    new Promise<typeof symbol>((resolve) =>
      setTimeout(() => resolve(symbol), timeout)
    ),
    func(),
  ]);

  if (result === symbol || result === Error) {
    return retry(timeout, time - 1, func);
  } else {
    return result;
  }
};
