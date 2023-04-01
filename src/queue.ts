import { Semaphore } from './semaphore.js'
import type { ExplicitAny, Func } from './lang.js'

/**
 * @public
 * Create Queue with a specified size
 */
export function q(size: number, bound = true): Queue {
  return new Queue(size, bound)
}
/**
 * @public
 * Work queue abstraction around a semaphore
 */
export class Queue {
  private lock: Semaphore
  private last: Promise<ExplicitAny> = Promise.resolve()
  constructor(concurrency: number, bound = true) {
    this.lock = new Semaphore(concurrency)
    if (bound) {
      this.add = this.add.bind(this)
      this.ready = this.ready.bind(this)
      this.empty = this.empty.bind(this)
    }
  }

  public get pending(): number {
    return this.lock.pending
  }

  /**
   * Add work to the Queue, The work function _can_ be async and should NOT throw
   * @param work work function
   * @param arg single argument that will be passed to the work function
   * @returns
   */
  public add<T extends Func>(work: T, arg?: Parameters<T>[0]): Promise<Awaited<ReturnType<T>>> {
    const { acquire, release } = this.lock,
      last = this.last
    return (this.last = acquire(arg)
      .then(work)
      .then((result) => {
        release()
        return last.then(() => result)
      }))
  }

  /**
   * Wait for the queue to have at least one empty slot
   */
  public ready(): Promise<void> {
    return this.lock.acquire().then(this.lock.release)
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
