import { expect } from 'chai'
import { Semaphore } from '..'
import { each, map } from '../each'

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

describe('each', () => {
  it('should iterate, concurrently', async () => {
    const list = [1, 2, 3, 4, 5, 6]
    const copiedValues: number[] = []
    const start = Date.now()
    
    await each(list as any, (value: number, i: number) => {
      expect(value).to.equal(list[i])
      copiedValues.push(value)
      return new Promise(r => setTimeout(r, 100))
    }, { concurrency: 2 })
    
    expect(Date.now() - start).to.be.within(300, 400)
    expect(copiedValues).to.eql(list)
  })
})

describe('map', () => {
  it('should iterate, mapping concurrently', async () => {
    const list = [1, 2, 3, 4, 5, 6]
    const mappedValues = list.map(x => x + 1)
    const start = Date.now()
    
    const result = await map(list as any, (value: number, i: number) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(value + 1)
        }, 100)
      })
    }, { concurrency: 2 })
    
    expect(Date.now() - start).to.be.within(300, 400)
    expect(mappedValues).to.eql(result)
  })
})
