import { describe, expect, it } from 'vitest'
import { delay } from './lang.js'
import { Queue } from './queue.js'

describe('queue', () => {
  const range = (num: number) => Array.from(Array(num).keys())
  it('should process results concurrently', async () => {
    const q = new Queue(10),
      results: number[] = []
    range(100).forEach((x) =>
      q.add(() => delay(Math.random() * 100, x)).then((x) => results.push(x)),
    )
    await q.empty()
    expect(results).toHaveLength(100)
    expect([...results].sort((a, b) => a - b)).toEqual(range(100))
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

  it('should remain usable after a task rejects', async () => {
    const q = new Queue(1)

    await expect(q.add(() => Promise.reject(new Error('boom')))).rejects.toThrow('boom')
    await expect(
      Promise.race([q.add(() => Promise.resolve('ok')), delay(25, 'timeout')]),
    ).resolves.toBe('ok')
    await expect(q.empty()).resolves.toBeUndefined()
  })

  it('should resolve each task when that task completes', async () => {
    const q = new Queue(2)
    const order: string[] = []

    const slow = q.add(() => delay(20, 'slow')).then((value) => order.push(value))
    const fast = q.add(() => delay(5, 'fast')).then((value) => order.push(value))

    await Promise.all([slow, fast])

    expect(order).toEqual(['fast', 'slow'])
  })
})
