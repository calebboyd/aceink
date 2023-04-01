/**
 * @public
 * Basic noop function
 */
export const noop = (): void => void 0
/**
 * @public
 * Basic identity function
 */
export const identity = <T>(x: T): T => x

/**
 * @public
 * Anonymous Function definition
 */
export type Func<Result = ExplicitAny, Args extends Array<ExplicitAny> = ExplicitAny[]> = (
  ...args: Args
) => Result

/**
 * @public
 * delay a certain number of milliseconds returning a promise that resolves an argument
 */
export const delay = <T = undefined>(ms?: number, arg?: T): Promise<T> =>
  new Promise<T>((resolve) => setTimeout(resolve, ms, arg))

/**
 * @public
 * Execute fn one time and [after=noop] for every subsequent invocation
 */
export function once<T extends Func>(fn: T, after: Func = noop): T {
  const one = function (this: ExplicitAny, ...args: ExplicitAny[]) {
    const res = fn.call(this, ...args)
    fn = after as ExplicitAny
    return res
  }
  return one as T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExplicitAny = any

export function isPromiseLike<T>(obj: T | PromiseLike<T>): obj is PromiseLike<T> {
  //check if obj is an object and has a then function
  return obj && typeof obj === 'object' && typeof (obj as PromiseLike<T>).then === 'function'
}
