import type { ExplicitAny } from './lang.js'
import { Queue } from './queue.js'
/**
 * @public
 */
export type IteratorFunc<T, R = ExplicitAny> =
  | ((value: T, i: number, list: Iterable<T>) => R)
  | ((value: T) => R)
  | ((value: T, i: number) => R)

/**
 * @public
 * Iterate a list with optional concurrency
 */
export async function each<T, K = ExplicitAny>(
  this: K | void,
  list: Iterable<T>,
  iterator: IteratorFunc<T>,
  {
    context,
    concurrency,
  }: { context?: K | void; concurrency?: number; onError?: 'settle' | 'bail' } = {
    context: undefined,
    concurrency: 0,
  }
): Promise<void> {
  const queue = new Queue(concurrency || 1, false)
  const itr = (arg: { value: T; i: number; list: Iterable<T> }) =>
    iterator.call(context || this, arg.value, arg.i, arg.list)
  let i = 0
  for (const value of list) {
    queue.add(itr, { value, i: i++, list })
  }
  return queue.empty()
}
