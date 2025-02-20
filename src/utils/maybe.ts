const Error:
  & symbol
  & {
    reason: string | undefined;
  } = Object.assign(Symbol("error"), { reason: undefined });

export type Error = typeof Error;

export type Maybe<T> = [Error, undefined] | [undefined, T];

export const success = <T>(value: T): Maybe<T> => [undefined, value];

export const error = <T>(description?: any): Maybe<T> => {
  Error.reason = description === undefined ? description : String(description);
  return [Error, undefined];
};

export const is_success = <T>(value: Maybe<T>): value is [undefined, T] =>
  value[1] !== undefined;

export const is_error = <T>(value: Maybe<T>): value is [Error, undefined] =>
  value[0] === Error;
