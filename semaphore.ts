import { bound } from './lang'
import { createDeferredFactory, Deferred, createDeferred } from './deferred'
/**
 * @public
 */
export function createLock(count: number, promise = Promise): Semaphore<number> {
  return new Semaphore(count, promise)
}
/**
 * @public
 */
export class Semaphore<T = number> {
  private waiting: Deferred<T>[] = []
  private locks = 0
  private requestedLockCount = 0
  private createDeferred =
    this.promise !== Promise ? createDeferredFactory(this.promise) : createDeferred

  constructor(public size: number = 1, private promise = Promise) {
    if (!size || size < 1) {
      throw new Error('Cannot create Semaphore with size of "' + size + '"')
    }
  }

  get count(): number {
    return this.locks
  }
  get pending(): number {
    return this.waiting.length
  }
  acquire(arg?: T): Promise<T> {
    ++this.requestedLockCount
    arg = (typeof arg !== 'undefined' ? arg : this.requestedLockCount) as T
    if (this.locks < this.size) {
      this.locks++
      return this.promise.resolve(arg)
    }
    const lock = this.createDeferred<T>()
    lock.value = arg
    this.waiting.push(lock)
    return lock.promise
  }

  @bound
  release(): void {
    const lock = this.waiting.shift()
    if (lock) {
      lock.resolve(lock.value)
    } else if (--this.locks < 0) {
      throw new Error('Nothing to release...')
    }
  }
}
