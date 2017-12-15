import { bound } from './bound'
import { createDeferredFactory, Deferred, createDeferred } from './deferred'

export function createLock (count: number, promise = Promise) {
  return new Semaphore(count, promise)
}

export class Semaphore {
  private waiting: Deferred<number>[] = []
  private locks: number = 0
  private requestedLockCount: number = 0
  private createDeferred = this.promise !== Promise 
    ? createDeferredFactory<number>(this.promise)
    : createDeferred
  
  constructor (public size: number = 1, private promise = Promise) {
    if (!size || size < 1) {
      throw new Error('Cannot create Semaphore with size of "' + size + '"')
    }
  }

  get count () { return this.locks }
  get pending () { return this.waiting.length }
  acquire () {
    this.requestedLockCount++
    if (this.locks < this.size) {
      this.locks++
      return this.promise.resolve(this.requestedLockCount)
    }
    const lock = this.createDeferred()
    lock.value = this.requestedLockCount
    this.waiting.push(lock)
    return lock.promise
  }
  
  @bound
  release () {    
    const lock = this.waiting.shift()
    if (lock) {
      lock.resolve(lock.value)
    } else if (--this.locks < 0) {
      throw new Error('Nothing to release...')
    }
  }
}
