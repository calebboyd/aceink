import { Semaphore } from './semaphore'

describe('Semaphore', () => {
  it('should limit concurrency', async () => {
    const lock = new Semaphore(10)
    let tasks = 11
    const start = Date.now()
    const results: any[] = []
    while (tasks--) {
      const result = lock.acquire().then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            lock.release()
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
    const lock = new Semaphore<typeof value>(1)
    const finished = await lock.acquire(value).then((x) => {
      expect(x).toEqual(value)
      return true
    })
    expect(finished).toBeTruthy()
  })
})
