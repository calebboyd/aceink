import type { IteratorFunc } from './each.js'
import type { ExplicitAny } from './lang.js'
import { Queue } from './queue.js'
/**
 * @public
 * Map over a list with optional concurrency
 */
export function map<T, R, K = ExplicitAny>(
  this: K,
  list: Iterable<T>,
  iterator: IteratorFunc<T, R>,
  { context, concurrency }: { context?: K; concurrency?: number } = {}
): Promise<R[]> {
  const q = new Queue(concurrency || 1, false)
  const itr = (arg: { value: T; i: number; list: Iterable<T> }) =>
    iterator.call(context || this, arg.value, arg.i, arg.list)
  return Promise.all(
    [...list].map((value, i) => {
      return q.add(itr, { value, i, list })
    })
  )
}
