import { expect } from 'chai'
import { Semaphore } from '..'

describe ('Semaphore', () => {
  it('should limit concurrency', async () => {
    const lock = new Semaphore(10)
    let tasks = 11
    const start = Date.now()
    const results: any[] = []
    while(tasks--) {
      const result = lock.acquire().then(x => {
        return new Promise(resolve => {
          setTimeout(() => {
            lock.release()
            resolve()
          }, 100)
        })
      })
      results.push(result)
    }
    await Promise.all(results)
    expect(Date.now() - start).to.be.within(200,300)
  })
})
