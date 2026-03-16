import type { Func } from './lang.js'

interface ReadyReservation {
  active: boolean
}

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
 * Work queue abstraction with concurrency control
 */
export class Queue {
  private readonly concurrency: number
  private queued: Array<() => void> = []
  private running = new Set<Promise<void>>()
  private readyWaiters: Array<() => void> = []
  private readyReservations: ReadyReservation[] = []
  private pendingCount = 0
  private last: Promise<void> = Promise.resolve()
  private readonly settle: QueueSettleMode
  constructor(concurrency: number, options: QueueOptions = {}) {
    const { bound = true, settle = 'ordered' } = options
    concurrency = Number(concurrency)
    if (!concurrency || concurrency < 1) {
      throw new Error('Cannot create Queue with size of "' + concurrency + '"')
    }

    this.concurrency = concurrency
    this.settle = settle
    if (bound) {
      this.add = this.add.bind(this)
      this.ready = this.ready.bind(this)
      this.empty = this.empty.bind(this)
    }
  }

  public get pending(): number {
    return this.pendingCount
  }

  public get size(): number {
    return this.queued.length
  }

  /**
   * Add work to the Queue. By default the returned promise settles in queue order.
   * Pass `settle: 'completion'` to settle each promise as soon as its work settles.
   * @param work work function
   * @param arg single argument that will be passed to the work function
   * @returns
   */
  public add<T extends Func>(work: T, arg?: Parameters<T>[0]): Promise<Awaited<ReturnType<T>>> {
    this.consumeReadyReservation()

    let resolveOperation!: (value: Awaited<ReturnType<T>>) => void
    let rejectOperation!: (reason?: unknown) => void
    const operation = new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      resolveOperation = resolve
      rejectOperation = reject
    })
    const result = this.createResult(operation)

    let tracked!: Promise<void>
    tracked = result.then(
      () => undefined,
      () => undefined,
    )
    tracked = tracked.finally(() => {
      this.running.delete(tracked)
    })

    this.running.add(tracked)

    this.queued.push(() => {
      this.pendingCount += 1

      Promise.resolve()
        .then(() => work(arg as Parameters<T>[0]))
        .then(resolveOperation, rejectOperation)
        .finally(() => {
          this.pendingCount -= 1
          queueMicrotask(() => {
            this.process()
            this.flushReadyWaiters()
          })
        })
    })

    this.process()
    this.flushReadyWaiters()

    return result
  }

  /**
   * Wait for the queue to be able to start another task immediately.
   */
  public ready(): Promise<void> {
    return new Promise((resolve) => {
      this.readyWaiters.push(resolve)
      this.flushReadyWaiters()
    })
  }
  /**
   * Wait for all queued work to settle.
   */
  public async empty(): Promise<void> {
    while (this.running.size) {
      await Promise.all(Array.from(this.running))
    }
  }

  private createResult<T>(operation: Promise<T>): Promise<T> {
    const result =
      this.settle === 'completion'
        ? operation
        : Promise.allSettled([this.last, operation]).then(([, current]) => {
            if (current.status === 'rejected') {
              throw current.reason
            }

            return current.value
          })

    if (this.settle === 'ordered') {
      this.last = result.then(
        () => undefined,
        () => undefined,
      )
    }

    return result
  }

  private process(): void {
    while (this.pendingCount < this.concurrency && this.queued.length) {
      this.queued.shift()?.()
    }
  }

  private flushReadyWaiters(): void {
    while (this.readyWaiters.length && this.canGrantReady()) {
      const reservation: ReadyReservation = { active: true }
      this.readyReservations.push(reservation)

      this.readyWaiters.shift()?.()

      queueMicrotask(() => {
        if (!reservation.active) return

        const index = this.readyReservations.indexOf(reservation)
        if (index === -1) return

        reservation.active = false
        this.readyReservations.splice(index, 1)
        this.flushReadyWaiters()
      })
    }
  }

  private canGrantReady(): boolean {
    return this.size === 0 && this.pendingCount + this.readyReservations.length < this.concurrency
  }

  private consumeReadyReservation(): void {
    const reservation = this.readyReservations.shift()
    if (reservation) {
      reservation.active = false
    }
  }
}
