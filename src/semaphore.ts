import { Deferred } from './deferred.js'
/**
 * @public
 * Basic counting semaphore/lock factory
 */
export function createLock<RefType = number>(count?: number, bound = true): Semaphore<RefType> {
  return new Semaphore<RefType>(count, bound)
}

/**
 * @public
 * Basic counting semaphore/lock
 */
export class Semaphore<RefType = number> {
  public readonly size: number
  private waiting: Deferred<RefType>[] = []
  private locks = 0
  private requestedLockCount = 0

  constructor(size = 1, bound = true) {
    size = Number(size)
    if (!size || size < 1) {
      throw new Error('Cannot create Semaphore with size of "' + size + '"')
    }
    this.size = size
    if (bound) {
      this.acquire = this.acquire.bind(this)
      this.release = this.release.bind(this)
    }
  }
  public get count(): number {
    return this.locks
  }
  public get pending(): number {
    return this.waiting.length
  }

  /**
   * Acquire a slot
   */
  acquire(ref?: RefType): Promise<RefType> {
    ++this.requestedLockCount
    ref = (typeof ref === 'undefined' ? this.requestedLockCount : ref) as RefType
    if (this.locks < this.size) {
      this.locks += 1
      return Promise.resolve(ref)
    }
    const lock = new Deferred(ref)
    this.waiting.push(lock)
    return lock.promise
  }

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
