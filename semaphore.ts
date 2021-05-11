import { bound } from './lang'
import { Deferred } from './deferred'
/**
 * @public
 * Basic counting semaphore/lock factory
 */
export function createLock<RefType = number>(
  count?: number,
  promise = Promise
): Semaphore<RefType> {
  return new Semaphore<RefType>(count, promise)
}
/**
 * @public
 * Basic counting semaphore/lock
 */
export class Semaphore<RefType = number> {
  public size: number
  private waiting: Deferred<RefType>[] = []
  private locks = 0
  private requestedLockCount = 0

  constructor(size = 1, private promise = Promise) {
    size = Number(size)
    if (!size || size < 1) {
      throw new Error('Cannot create Semaphore with size of "' + size + '"')
    }
    this.size = size
  }
  get count(): number {
    return this.locks
  }
  get pending(): number {
    return this.waiting.length
  }

  @bound
  /**
   * Acquire a slot
   */
  acquire(ref?: RefType): Promise<RefType> {
    ++this.requestedLockCount
    ref = (typeof ref === 'undefined' ? this.requestedLockCount : ref) as RefType
    if (this.locks < this.size) {
      this.locks++
      return this.promise.resolve(ref)
    }
    const lock = new Deferred(ref)
    this.waiting.push(lock)
    return lock.promise
  }

  @bound
  /**
   * Release a slot
   */
  release(): void {
    const lock = this.waiting.shift()
    if (lock) {
      lock.resolve(lock.value as RefType)
    } else if (--this.locks < 0) {
      throw new Error('Nothing to release...')
    }
  }
}
