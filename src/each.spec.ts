import { describe, it, expect } from 'vitest'
import { each } from './each.js'
import { delay } from './lang.js'

describe('each', () => {
  it('should iterate, concurrently', async () => {
    const list = [1, 2, 3, 4, 5, 6]
    const copiedValues: number[] = []
    const start = Date.now()

    await each(
      list,
      (value: number, i: number) => {
        expect(value).toEqual(list[i])
        copiedValues.push(value)
        return new Promise((r) => setTimeout(r, 100))
      },
      { concurrency: 2 },
    )

    expect(Date.now() - start).toBeGreaterThan(300)
    expect(Date.now() - start).toBeLessThan(400)
    expect(copiedValues).toEqual(list)
  })

  it('should preserve falsy context values', async () => {
    let context: number | undefined

    await each(
      [1],
      function (this: number | undefined) {
        context = this as number | undefined
      },
      { context: 0 },
    )

    expect(context).toBe(0)
  })

  it('should stop scheduling new work after the first error by default', async () => {
    const visited: number[] = []
    const delays = new Map([
      [1, 1],
      [2, 10],
      [3, 20],
      [4, 1],
    ])

    await expect(
      each(
        [1, 2, 3, 4],
        async (value: number) => {
          visited.push(value)
          await delay(delays.get(value))
          if (value === 2) throw new Error('boom')
        },
        { concurrency: 2 },
      ),
    ).rejects.toThrow('boom')

    expect(visited).toEqual([1, 2, 3])
  })

  it('should settle errors when requested', async () => {
    const visited: number[] = []

    await expect(
      each(
        [1, 2, 3, 4],
        async (value: number) => {
          visited.push(value)
          await delay(5)
          if (value === 2) throw new Error('boom')
        },
        { concurrency: 2, onError: 'settle' },
      ),
    ).resolves.toBeUndefined()

    expect(visited).toEqual([1, 2, 3, 4])
  })

  it('should close iterators when bailing after an error', async () => {
    let closed = false

    function* values() {
      try {
        yield 1
        yield 2
        yield 3
      } finally {
        closed = true
      }
    }

    await expect(
      each(
        values(),
        async (value: number) => {
          if (value === 2) throw new Error('boom')
          await delay(1)
        },
        { concurrency: 1 },
      ),
    ).rejects.toThrow('boom')

    expect(closed).toBe(true)
  })
})
