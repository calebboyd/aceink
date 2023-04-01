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
        { concurrency: 2 }
      )

    expect(Date.now() - start).toBeGreaterThan(300)
    expect(Date.now() - start).toBeLessThan(400)
    expect(mappedValues).toEqual(result)
  })
})
