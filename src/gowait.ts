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
 * Synchronous errors are caught.
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

type GoWaitResult<T, E> = T extends Func
  ? Promise<ErrorValue<Awaited<ReturnType<T>>, E>>
  : Promise<ErrorValue<Awaited<T>, E>>
type PromiseReturningFunction = Func<Promise<ExplicitAny>, ExplicitAny>

export function gowait<E, T extends PromiseReturningFunction>(
  promised: T,
  ...args: Parameters<T>
): Promise<ErrorValue<Awaited<ReturnType<T>>, E>>

export function gowait<E, T extends Promise<ExplicitAny>>(
  promised: T
): Promise<ErrorValue<Awaited<T>, E>>

export function gowait<E, T extends Promise<ExplicitAny> | PromiseReturningFunction>(
  promised: T,
  ...args: ExplicitAny[]
): GoWaitResult<T, E> {
  if (typeof promised === 'function' && !('then' in promised)) {
    try {
      promised = promised(...args) as T
    } catch (e: ExplicitAny) {
      return Promise.resolve(errorTuple<E>(e)) as GoWaitResult<T, E>
    }
  }
  const promise = promised as Promise<T>

  if (typeof promise.then === 'function') {
    return promise.then(valueTuple, errorTuple<E>) as GoWaitResult<T, E>
  }

  return Promise.reject(
    new TypeError(`${promised} is not a promise or promise returning function`)
  ) as ExplicitAny
}

/**
 * Helper to curry a function's type into a "gowait" function.
 * Accessing the result in typescript also requires the caller to provide an error type,
 * otherwise never is used.
 * @param promised
 * @returns
 */
export function wrap<T extends Func<Promise<ExplicitAny>, ExplicitAny>>(
  promised: T
): <E = never>(
  ...args: Parameters<T>
) => E extends never ? never : Promise<ErrorValue<ReturnType<T>, E>> {
  return (...args: Parameters<T>) => gowait(promised, ...args) as ExplicitAny
}
