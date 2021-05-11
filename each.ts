import { Semaphore } from './semaphore'
import { noop } from './lang'
/**
 * @public
 */
export type IteratorFunc<T, R = any> =
  | ((value: T, i: number, list: Iterable<T>) => R)
  | ((value: T) => R)
  | ((value: T, i: number) => R)

/**
 * @public
 * Iterate a list with a set concurrency
 */
export function each<T, K = any>(
  this: K | void,
  list: Iterable<T>,
  iterator: IteratorFunc<T>,
  { context, concurrency }: { context?: K | void; concurrency?: number } = {
    context: undefined,
    concurrency: 0,
  }
): Promise<void> {
  const arrList = Array.from(list)
  context = context || this
  if (!concurrency) {
    concurrency = arrList.length
  }
  const lock = new Semaphore(concurrency),
    pending = [],
    release = lock.release,
    handler = (locks: number) => iterator.call(context, arrList[locks - 1], locks - 1, list)
  for (let i = 0; i < arrList.length; i++) {
    pending.push(lock.acquire().then(handler).then(release))
  }
  return Promise.all(pending).then(noop)
}
/**
 * @public
 * Iterate a list with a concurrency of 1
 */
export const eachSerial = function eachSerial<T, K = any>(
  this: K | void,
  list: Iterable<T>,
  iterator: IteratorFunc<T>,
  { context }: { context?: K | void } = {}
): Promise<void> {
  return each(list, iterator, { context, concurrency: 1 })
}
