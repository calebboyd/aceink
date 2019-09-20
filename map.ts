import { each } from './each'

export function map<T> (this: any, list: Iterable<T>, iterator: Function, { context, concurrency }: { context?: any, concurrency: null | number } = { concurrency: null }) {
  const results: (Promise<T> | T)[] = []
  return each.call(this, list, (value: T, i: number) => {
    const result = iterator.call(context, value, i, list)
    results.push(result)
    return result
  }, { concurrency })
  .then(() => Promise.all(results))
}

export function mapSerial<T> (this: any, list: Iterable<T>, iterator: Function, { context }: { context?: any } = {}) {
  return map<T>(list, iterator, { context, concurrency: 1 })
}

