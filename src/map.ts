import type { EachOptions, IteratorFunc } from './each.js'
import type { ExplicitAny } from './lang.js'
import { each } from './each.js'

/**
 * @public
 * map() configuration.
 */
export interface MapOptions<K = ExplicitAny> extends Pick<
  EachOptions<K>,
  'concurrency' | 'context' | 'signal' | 'timeout'
> {}
/**
 * @public
 * Map over a list with optional concurrency
 */
export function map<T, R, K = ExplicitAny>(
  this: K,
  list: Iterable<T>,
  iterator: IteratorFunc<T, R>,
  { context, concurrency, signal, timeout }: MapOptions<K> = {},
): Promise<Awaited<R>[]> {
  const results: Awaited<R>[] = []
  const thisArg = typeof context === 'undefined' ? this : context

  return each(
    list,
    function (this: K, value: T, i: number, iterable: Iterable<T>) {
      return Promise.resolve(iterator.call(thisArg, value, i, iterable)).then((result) => {
        results[i] = result
      })
    },
    { context: thisArg, concurrency, signal, timeout },
  ).then(() => results)
}
