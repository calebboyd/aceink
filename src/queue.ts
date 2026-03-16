import { Semaphore } from './semaphore.js'
import type { Func } from './lang.js'

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
  private running = new Set<Promise<void>>()
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
   * Add work to the Queue. The returned promise settles with the underlying work
   * as soon as that work settles.
   * @param work work function
   * @param arg single argument that will be passed to the work function
   * @returns
   */
  public add<T extends Func>(work: T, arg?: Parameters<T>[0]): Promise<Awaited<ReturnType<T>>> {
    const run = this.lock.acquire(arg).then(async (value) => {
      try {
        return await work(value)
      } finally {
        this.lock.release()
      }
    })

    let tracked!: Promise<void>
    tracked = run.then(
      () => undefined,
      () => undefined,
    )
    tracked = tracked.finally(() => {
      this.running.delete(tracked)
    })

    this.running.add(tracked)

    return run
  }

  /**
   * Wait for the queue to have at least one empty slot
   */
  public ready(): Promise<void> {
    return this.lock.acquire().then(this.lock.release)
  }
  /**
   * Wait for all queued work to settle.
   */
  public async empty(): Promise<void> {
    while (this.running.size) {
      await Promise.all(this.running)
    }
  }
}
