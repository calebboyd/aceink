import { Semaphore } from './semaphore.js'
import type { Func } from './lang.js'

export type QueueSettleMode = 'ordered' | 'completion'

/**
 * @public
 * Queue configuration
 */
export interface QueueOptions {
  /**
   * Bind queue methods to the queue instance.
   */
  bound?: boolean
  /**
   * Control whether returned task promises settle in queue order or completion order.
   */
  settle?: QueueSettleMode
}

/**
 * @public
 * Create Queue with a specified size
 */
export function q(size: number, options: QueueOptions = {}): Queue {
  return new Queue(size, options)
}
/**
 * @public
 * Work queue abstraction around a semaphore
 */
export class Queue {
  private lock: Semaphore
  private running = new Set<Promise<void>>()
  private last: Promise<void> = Promise.resolve()
  private readonly settle: QueueSettleMode
  constructor(concurrency: number, options: QueueOptions = {}) {
    const { bound = true, settle = 'ordered' } = options
    this.lock = new Semaphore(concurrency)
    this.settle = settle
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
   * Add work to the Queue. By default the returned promise settles in queue order.
   * Pass `settle: 'completion'` to settle each promise as soon as its work settles.
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

    const result =
      this.settle === 'completion'
        ? run
        : Promise.allSettled([this.last, run]).then(([, current]) => {
            if (current.status === 'rejected') {
              throw current.reason
            }

            return current.value as Awaited<ReturnType<T>>
          })

    if (this.settle === 'ordered') {
      this.last = result.then(
        () => undefined,
        () => undefined,
      )
    }

    let tracked!: Promise<void>
    tracked = result.then(
      () => undefined,
      () => undefined,
    )
    tracked = tracked.finally(() => {
      this.running.delete(tracked)
    })

    this.running.add(tracked)

    return result
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
