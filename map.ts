import { each, IteratorFunc } from './each'
/**
 * @public
 */
export function map<T, R, K = any>(
  this: K,
  list: Iterable<T>,
  iterator: IteratorFunc<T, R>,
  { context, concurrency }: { context?: K; concurrency?: number } = {}
): Promise<R[]> {
  const results: Promise<R>[] = []
  return each(
    list,
    (value: T, i: number) => {
      const result = iterator.call(context as any, value, i, list)
      results.push(result as any)
      return result
    },
    { context, concurrency }
  ).then(() => Promise.all(results))
}
/**
 * @public
 */
export function mapSerial<T, R, K = any>(
  this: K,
  list: Iterable<T>,
  iterator: IteratorFunc<T, R>,
  { context }: { context?: K } = {}
): any {
  return map<T, R>(list, iterator, { context, concurrency: 1 })
}
