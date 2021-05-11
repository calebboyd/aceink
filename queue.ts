import { Semaphore } from './semaphore'
import { bound, Func } from './lang'

type UnWrapPromise<T> = T extends PromiseLike<infer U> ? U : T

/**
 * @public
 * Create Queue with a specified size
 */
export function q(size: number): Queue {
  return new Queue(size)
}
/**
 * @public
 * Work queue abstraction around a semaphore
 */
export class Queue {
  private lock = new Semaphore<any>(this.concurrency)
  private last: Promise<any> = Promise.resolve()
  constructor(private concurrency: number) {}

  get pending(): number {
    return this.lock.pending
  }

  /**
   * Add work to the Queue, The work function _can_ be async and should NOT throw
   * @param work work function
   * @param arg single argument that will be passed to the work function
   * @returns
   */
  @bound
  add<T>(
    work: Func<T>,
    arg?: Parameters<typeof work>[0]
  ): Promise<UnWrapPromise<ReturnType<typeof work>>> {
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
  @bound
  public ready(): Promise<void> {
    return this.lock.acquire().then(this.lock.release)
  }
  /**
   * Wait for the queue to be empty
   */
  @bound
  public async empty(): Promise<void> {
    let last
    while (last !== this.last) {
      last = this.last
      await this.last
    }
    return this.last
  }
}
