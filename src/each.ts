import type { ExplicitAny } from './lang.js'
import { noop } from './lang.js'
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
    onError = 'bail',
  }: { context?: K | void; concurrency?: number; onError?: 'settle' | 'bail' } = {
    context: undefined,
    concurrency: 0,
  },
): Promise<void> {
  const limit = concurrency || 1
  const queue = new Queue(limit, false)
  const thisArg = typeof context === 'undefined' ? this : context
  const values = list[Symbol.iterator]()
  const itr = (arg: { value: T; i: number; list: Iterable<T> }) =>
    iterator.call(thisArg, arg.value, arg.i, arg.list)
  const run = async (arg: { value: T; i: number; list: Iterable<T> }) => {
    try {
      return await itr(arg)
    } catch (error: unknown) {
      if (typeof firstError === 'undefined') {
        firstError = error
      }
      throw error
    }
  }
  let i = 0
  let firstError: unknown

  try {
    while (true) {
      if (i >= limit) {
        await queue.ready()
        if (onError === 'bail' && typeof firstError !== 'undefined') break
      }

      const next = values.next()
      if (next.done) break
      const value = next.value

      queue.add(run, { value, i: i++, list }).catch(noop)
    }
  } catch (error: unknown) {
    firstError = typeof firstError === 'undefined' ? error : firstError
  }

  await queue.empty()

  if (onError === 'bail' && typeof firstError !== 'undefined') {
    throw firstError
  }
}
