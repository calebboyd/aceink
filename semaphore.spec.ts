import { Semaphore, createLock } from './semaphore'

describe('Semaphore', () => {
  it('should limit concurrency', async () => {
    const { acquire, release } = new Semaphore(10)
    let tasks = 11
    const start = Date.now()
    const results: any[] = []
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
    expect(Date.now() - start).toBeGreaterThan(200)
    expect(Date.now() - start).toBeLessThan(300)
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
