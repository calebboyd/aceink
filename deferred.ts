export function createDeferredFactory (PromiseCtor = Promise) {
  return function deferred<T>() {
    const deferred: Deferred<T> = {} as any
    const promise = new PromiseCtor<T>((resolve, reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    })
    deferred.promise = promise as any
    return deferred
  }
}
export const createDeferred = createDeferredFactory()

export interface Deferred<T> {
  value: T
  promise: Promise<T>
  resolve(value?: T | undefined | PromiseLike<T>): void
  reject(reason: any): void
}
