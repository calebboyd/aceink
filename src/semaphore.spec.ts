import { describe, it, expect } from 'vitest'
import { Semaphore, createLock } from './semaphore.js'

describe('Semaphore', () => {
  it('should limit concurrency', async () => {
    const { acquire, release } = new Semaphore(10)
    let tasks = 11
    const start = Date.now()
    const results: Array<Promise<void>> = []
    while (tasks--) {
      const result = acquire().then(() => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            release()
            resolve()
          }, 100)
        })
      })
      results.push(result)
    }
    await Promise.all(results)
    const end = Date.now() - start
    expect(end).toBeGreaterThanOrEqual(200)
    expect(end).toBeLessThan(250)
  })

  it('should pass values', async () => {
    const value = { some: 'thing' }
    const lock = createLock<typeof value>()
    const finished = await lock.acquire(value).then((x) => {
      expect(x).toEqual(value)
      return true
    })
    expect(finished).toBeTruthy()
  })

  it('should error when there is nothing to release', async () => {
    const lock = createLock()
    expect(lock.release).toThrow('Nothing to release...')
  })
})
