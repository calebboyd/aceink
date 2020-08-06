/**
 * @public
 */
export const noop = (): void => void 0
/**
 * @public
 */
export const identity = <T = any>(x: T): T => x
/**
 * @public
 */
export type Func<T = any> = (...args: any[]) => T

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
