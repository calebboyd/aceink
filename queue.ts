import { Semaphore } from './semaphore'
import { Func } from './lang'
/**
 * @public
 */
export function q(size: number): Queue {
  return new Queue(size)
}
/**
 * @public
 */
export class Queue {
  private lock = new Semaphore(this.concurrency)
  private last: Promise<any> = Promise.resolve()
  constructor(private concurrency: number) {}
  /**
   * Enqueue work
   * @param work
   */
  async do<T>(work: Func<Promise<T>>): Promise<T> {
    const last = this.last
    let done = () => {
      this.lock.release()
      done = () => void 0
    }
    return (this.last = this.lock
      .acquire()
      .then(work)
      .catch(done)
      .then((result) => {
        done()
        return last.then(() => result)
      }))
  }

  /**
   * Wait for the queue to have at least one empty slot
   */
  public async ready(): Promise<void> {
    await this.lock.acquire()
    this.lock.release()
  }
  /**
   * Wait for the queue to be empty
   */
  public async empty(): Promise<void> {
    let last
    while (last !== this.last) {
      last = this.last
      await this.last
    }
    return this.last
  }
}
