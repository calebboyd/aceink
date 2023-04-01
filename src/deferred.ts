import type { ExplicitAny } from './lang.js'

/**
 * @public
 * Create a new Deferred instance
 * @param value
 * @returns
 */
export function createDeferred<T>(value?: T): Deferred<T> {
  return new Deferred(value)
}

/**
 * @public
 * A Basic Deferred class, exposing the promise, resolve and reject methods.
 * Use of a deferred is generally an anti-pattern, use with discretion.
 */
export class Deferred<T> {
  /**
   * resolve the Promise with the stored value
   */
  resolve!: (value: T | PromiseLike<T>) => void
  /**
   * Reject the promise with some reason
   */
  reject!: (reason?: ExplicitAny) => void
  /**
   * The Promise instance
   */
  promise!: Promise<T>
  constructor(
    /**
     * Convenience placeholder for a value to resolve the deferred with
     */
    public value?: T
  ) {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    }) as Promise<T>
  }
}
