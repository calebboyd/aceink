import { Semaphore } from './index'

export function each<T> (this: any, list: Iterable<T>, iterator: Function, { context, concurrency }: { context?: any, concurrency: null | number } = { concurrency: null }) {
  const arrList = Array.from(list)
  context = context || this
  if (concurrency === null) concurrency = arrList.length
  const lock = new Semaphore(concurrency)
  const pending = []
  const handler = function (locks: number) { return iterator.call(context, arrList[locks - 1], locks - 1, list) }
  for (let i = 0; i < arrList.length; i++) {
    pending.push(lock.acquire().then(handler).then(lock.release))
  }
  return Promise.all(pending).then(() => void 0)
}

export function map<T> (this: any, list: Iterable<T>, iterator: Function, { context, concurrency }: { context?: any, concurrency: null | number } = { concurrency: null }) {
  const results: (Promise<T> | T)[] = []
  return each.call(this, list, (value: T, i: number) => {
    const result = iterator.call(context, value, i, list)
    results.push(result)
    return result
  }, { concurrency })
  .then(() => Promise.all(results))
}

