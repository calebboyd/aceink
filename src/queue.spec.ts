import { describe, expect, it } from 'vitest'
import { delay } from './lang.js'
import { Queue } from './queue.js'

describe('queue', () => {
  const range = (num: number) => Array.from(Array(num).keys())
  it('should process results concurrently', async () => {
    const q = new Queue(10),
      results: number[] = []
    range(100).forEach((x) =>
      q.add(() => delay(Math.random() * 100, x)).then((x) => results.push(x))
    )
    await q.empty()
    expect(range(100)).toEqual(results)
  }, 10000)

  it('should invoke work function if not thennable', async () => {
    const q = new Queue(10),
      values = range(100)

    let sum = 0
    async function work(i: number) {
      await delay(Math.random() * 100)
      sum += i
    }
    for await (const i of values) {
      await q.ready()
      q.add(work, i)
    }
    await q.empty()
    expect(sum).toEqual(4950)
  }, 10000)
})
