import { describe, it, expect } from 'vitest'
import { map } from './map.js'

describe('map', () => {
  it('should iterate, mapping concurrently', async () => {
    const list = [1, 2, 3, 4, 5, 6],
      mappedValues = list.map((x) => x + 1),
      start = Date.now(),
      result = await map(
        list,
        (value: number) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(value + 1)
            }, 100)
          })
        },
        { concurrency: 2 },
      )

    expect(Date.now() - start).toBeGreaterThan(300)
    expect(Date.now() - start).toBeLessThan(400)
    expect(mappedValues).toEqual(result)
  })

  it('should preserve falsy context values', async () => {
    let context: number | undefined

    await map.call(
      0,
      [1],
      function (this: number) {
        context = this
        return 1
      },
      { context: 0 },
    )

    expect(context).toBe(0)
  })

  it('should support generator inputs without pre-consuming them', async () => {
    const seen: number[] = []
    function* values() {
      yield 1
      yield 2
      yield 3
    }

    const result = await map(
      values(),
      async (value: number) => {
        seen.push(value)
        return value + 1
      },
      { concurrency: 2 },
    )

    expect(seen).toEqual([1, 2, 3])
    expect(result).toEqual([2, 3, 4])
  })
})
