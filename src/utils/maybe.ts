const Error:
  & symbol
  & {
    reason: string | undefined;
  } = Object.assign(Symbol("error"), { reason: undefined });

export type Error = typeof Error;

export type MaybeError = [Error, undefined];
export type MaybeSuccess<Success> = [undefined, Success];

export type Maybe<Success> = MaybeError | MaybeSuccess<Success>;

export type IsError<T> = T extends MaybeError ? true : false;
export type IsSuccess<T> = T extends MaybeSuccess<T> ? true : false;

export const success = <T>(
  value?: T,
): MaybeSuccess<T> => [undefined, value as any];

export const error = (description?: any): MaybeError => {
  Error.reason = description === undefined ? description : String(description);
  return [Error, undefined];
};

export const is_error = <T extends Maybe<any>>(value: T): IsError<T> =>
  (value[0] === Error) as any;

export const is_success = <T>(value: Maybe<T>): IsSuccess<T> =>
  !is_error(value) as any;
