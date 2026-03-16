import type { ExplicitAny } from './lang.js'
import { noop } from './lang.js'
import { AbortError, Queue } from './queue.js'
/**
 * @public
 */
export type IteratorFunc<T, R = ExplicitAny> =
  | ((value: T, i: number, list: Iterable<T>) => R)
  | ((value: T) => R)
  | ((value: T, i: number) => R)

/**
 * @public
 * each() configuration.
 */
export interface EachOptions<K = ExplicitAny> {
  context?: K | void
  concurrency?: number
  onError?: 'settle' | 'bail'
  signal?: AbortSignal
  timeout?: number
}

const getAbortReason = (signal: AbortSignal): unknown => {
  if (typeof signal.reason === 'undefined') {
    return new AbortError()
  }

  if (
    typeof DOMException !== 'undefined' &&
    signal.reason instanceof DOMException &&
    signal.reason.name === 'AbortError'
  ) {
    return new AbortError(signal.reason.message)
  }

  return signal.reason
}

const throwIfAborted = (signal?: AbortSignal): void => {
  if (signal?.aborted) {
    throw getAbortReason(signal)
  }
}

/**
 * @public
 * Iterate a list with optional concurrency
 */
export async function each<T, K = ExplicitAny>(
  this: K | void,
  list: Iterable<T>,
  iterator: IteratorFunc<T>,
  { context, concurrency, onError = 'bail', signal, timeout }: EachOptions<K> = {
    context: undefined,
    concurrency: 0,
  },
): Promise<void> {
  const limit = concurrency || 1
  const queue = new Queue(limit, { bound: false, timeout })
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
  let aborted: unknown
  let firstError: unknown

  try {
    while (true) {
      throwIfAborted(signal)

      if (i >= limit) {
        await queue.ready({ signal })
        if (onError === 'bail' && typeof firstError !== 'undefined') break
      }

      const next = values.next()
      if (next.done) break
      const value = next.value

      queue.add(run, { value, i: i++, list }, { signal }).catch((error: unknown) => {
        if (signal?.aborted && typeof aborted === 'undefined') {
          aborted = error
        }

        if (onError === 'bail' && typeof firstError === 'undefined') {
          firstError = error
        }

        noop()
      })
    }
  } catch (error: unknown) {
    if (signal?.aborted && typeof aborted === 'undefined') {
      aborted = error
    }

    if (typeof firstError === 'undefined') {
      firstError = error
    }
  } finally {
    if (
      typeof aborted !== 'undefined' ||
      (onError === 'bail' && typeof firstError !== 'undefined')
    ) {
      values.return?.()
    }
  }

  await queue.empty()

  if (typeof aborted !== 'undefined') {
    throw aborted
  }

  if (onError === 'bail' && typeof firstError !== 'undefined') {
    throw firstError
  }
}
