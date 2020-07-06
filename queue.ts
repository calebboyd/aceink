import { Semaphore } from './semaphore'
import { Func } from './lang'

export function q(size: number): Queue {
  return new Queue(size)
}

export class Queue {
  private lock = new Semaphore(this.concurrency)
  private last: Promise<any> = Promise.resolve()
  constructor(private concurrency: number) {}
  async do<T>(work: Func<Promise<T>>): Promise<T> {
    const last = this.last
    return (this.last = this.lock
      .acquire()
      .then(work)
      .then((result) => {
        this.lock.release()
        return last.then(() => result)
      }))
  }

  async ready(): Promise<void> {
    await this.lock.acquire()
    this.lock.release()
  }

  async empty(): Promise<void> {
    let last
    while (last !== this.last) {
      last = this.last
      await this.last
    }
    return this.last
  }
}
