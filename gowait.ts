import { Func } from './lang'

const nativeErrorTypes = [
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
].filter((x) => typeof x === 'function')

type AnyError = any

function throwIfNativeError(error: AnyError) {
  for (const NativeError of nativeErrorTypes) {
    if (error instanceof NativeError) throw error
  }
}

function valueTuple<T>(arg: T): [null, T] {
  return [null, arg]
}
function errorTuple<E>(error: E): [E, undefined] {
  throwIfNativeError(error)
  return [error, undefined]
}
/**
 * @public
 */
export type ErrorValue<T, E> = [E, undefined] | [null, T]

/**
 * @public
 * Kind of like nodes ErrBacks, but with the ease (and overhead) of promises.
 *
 * const [err, value] = await gowait(doWorkThatMightErrorAsync())
 * if (err) {
 *   panic(err)
 * } else {
 *   success(value)
 * }
 *
 * @param promised
 */
export function gowait<T, E = Error>(
  promised: Promise<T> | Func<Promise<T>>
): Promise<ErrorValue<T, E>> {
  if (typeof promised === 'function' && !('then' in promised)) {
    promised = promised()
  }
  return promised.then(valueTuple, errorTuple)
}
