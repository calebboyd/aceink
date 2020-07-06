import { describe, it, expect } from '@jest/globals'
import { Queue } from './queue'

describe('queue', () => {
  const delay = <T>(ms: number, res: T) =>
      new Promise<T>((resolve) => setTimeout(() => resolve(res), ms)),
    range = (num: number) => Array.from(Array(num).keys())
  it('should process results concurrently', async () => {
    const q = new Queue(10),
      results: number[] = []
    range(100).forEach((x) =>
      q.do(() => delay(Math.random() * 100, x)).then((x) => results.push(x))
    )
    await q.empty()
    expect(range(100)).toEqual(results)
  }, 1000)
})
