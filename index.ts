import { bound } from './bound'

function createDeferredFactory<T> (PromiseCtor = Promise) {
  return function deferred() {
    const deferred: Deferred<T> = {} as any
    const promise = new PromiseCtor((resolve, reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    })
    deferred.promise = promise as any
    return deferred
  }
}

interface Deferred<T> {
  promise: Promise<T>
  resolve(value?: T | undefined | PromiseLike<T>): void
  reject(reason: any): void
}

export class Semaphore<T = any> {
  private pending: Deferred<void>[] = []
  private locks: number = 0
  private createDeferred = createDeferredFactory<void>(this.promise)
  
  constructor (public size: number = 1, private promise = Promise) {
    if (!size || size < 1) {
      throw new Error('Cannot create Semaphore with size of "' + size + '"')
    }
  }

  get count () { return this.locks }
  get blocked () { return this.pending.length }
  acquire () {
    if (this.locks < this.size) {
      this.locks++
      return this.promise.resolve()
    }
    const lock = this.createDeferred()
    this.pending.push(lock)
    return lock.promise
  }
  
  @bound
  release () {
    this.locks--
    const lock = this.pending.shift()
    if (lock) {
      this.locks++
      lock.resolve()
    }
    if (this.locks < 0) {
      throw new Error('Nothing to release...')
    }
  }
}
