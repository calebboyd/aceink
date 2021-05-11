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
export type Func<T = any> = (...args: any[]) => T

/**
 * @public
 * delay a certain number of milliseconds returning a promise that resolves an argument
 */
export const delay = <T = undefined>(ms?: number, arg?: T): Promise<T> =>
  new Promise<T>((resolve) => setTimeout(resolve, ms, arg))

/**
 * @public
 * Execute {fn} one time and [after=noop] for every subsequent invocation
 */
export function once<T extends Func>(fn: T, after: Func = noop): T {
  const one = function (this: any, ...args: any[]) {
    const res = fn.call(this, ...args)
    fn = after as any
    return res
  }
  return one as T
}
/**
 * @public
 * Bound is a mutating decorator that will bind a function to the class instance
 */
export const bound: MethodDecorator = function bound<T>(
  target: any,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) {
  return {
    configurable: true,
    get(this: T) {
      const value = (descriptor.value as any).bind(this)
      Object.defineProperty(this, propertyKey, { value, configurable: true, writable: true })
      return value
    },
  }
}
