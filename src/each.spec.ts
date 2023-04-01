import { describe, it, expect } from 'vitest'
import { each } from './each.js'

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
      { concurrency: 2 }
    )

    expect(Date.now() - start).toBeGreaterThan(300)
    expect(Date.now() - start).toBeLessThan(400)
    expect(copiedValues).toEqual(list)
  })
})
