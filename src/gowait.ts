import type { ExplicitAny, Func } from './lang.js'

const nativeErrorTypes = [
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
].filter((x) => typeof x === 'function')

function rejectIfNativeError(error: ExplicitAny) {
  for (const NativeError of nativeErrorTypes) {
    if (error instanceof NativeError) return Promise.reject(error)
  }
}

function valueTuple<T>(arg: T): [null, T] {
  return [null, arg]
}
function errorTuple<E>(error: E): [E, undefined] | Promise<never> {
  const reject = rejectIfNativeError(error)
  return reject ? reject : [error, undefined]
}
/**
 * @public
 */
export type ErrorValue<T, E> = [E, undefined] | [null, T]

/**
 * @public
 * Kind of like nodes ErrBacks, but with the ease (and overhead) of promises.
 * It will only reject promises for native errors.
 * Syncronous errors are caught.
 * @example
 * const [err, value] = await gowait(doWorkThatMightErrorAsync())
 * if (err) {
 *   panic(err)
 * } else {
 *   success(value)
 * }
 *
 * @param promised
 */

export function gowait<E, T>(
  promised: Promise<T> | Func<Promise<T>>,
  ...args: ExplicitAny[]
): Promise<ErrorValue<T, E>> {
  if (typeof promised === 'function' && !('then' in promised)) {
    try {
      if (args.length) promised = promised(...args)
      else promised = promised()
    } catch (e: ExplicitAny) {
      return Promise.resolve(errorTuple(e))
    }
  }
  if (typeof promised.then === 'function') {
    return promised.then(valueTuple, errorTuple)
  }
  return Promise.reject(new TypeError(`${promised} is not a promise or promise returning function`))
}

/**
 * Helper to curry a function into a "gowait" function.
 * Accessing the result also requires the caller to provide an error type,
 * otherwise never is used.
 * @param promised
 * @returns
 */
export function wrap<T>(
  promised: Func<Promise<T>>
): <E = never>(
  ...args: Parameters<typeof promised>
) => E extends never ? never : Promise<ErrorValue<T, E>> {
  return (...args: Parameters<typeof promised>) => gowait(promised, ...args) as ExplicitAny
}
