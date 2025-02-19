export const Error = Symbol("error");
export type Error = typeof Error;
export type Maybe<T> = T | Error;

export const is_error = <T>(value: Maybe<T>): value is Error => value === Error;
