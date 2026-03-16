import type { Func } from './lang.js'

interface ReadyReservation {
  active: boolean
}

interface QueuedTask {
  clear: () => void
  start: () => void
}

interface ReadyWaiter {
  cleanup?: () => void
  reject: (reason?: unknown) => void
  resolve: () => void
}

/**
 * @public
 * Extract the abort reason from a signal, wrapping bare DOMException AbortErrors.
 */
export const getAbortReason = (signal: AbortSignal): unknown => {
  if (typeof signal.reason === 'undefined') {
    return new AbortError()
  }

  if (
    typeof DOMException !== 'undefined' &&
    signal.reason instanceof DOMException &&
    signal.reason.name === 'AbortError'
  ) {
    return new AbortError(signal.reason.message)
  }

  return signal.reason
}

const assertValidTimeout = (timeout?: number): void => {
  if (typeof timeout === 'undefined') return
  if (Number.isFinite(timeout) && timeout > 0) return

  throw new TypeError(
    `Expected \`timeout\` to be a positive finite number, got \`${timeout}\` (${typeof timeout})`,
  )
}

export type QueueSettleMode = 'ordered' | 'completion'

/**
 * @public
 * Error raised when queued work exceeds its configured runtime limit.
 */
export class TimeoutError extends Error {
  public readonly timeout: number

  constructor(timeout: number, message = `Task timed out after ${timeout}ms`) {
    super(message)
    this.name = 'TimeoutError'
    this.timeout = timeout
  }
}

/**
 * @public
 * Error raised when queued work is aborted without a custom abort reason.
 */
export class AbortError extends Error {
  constructor(message = 'Task was aborted') {
    super(message)
    this.name = 'AbortError'
  }
}

/**
 * @public
 * Error raised when queued work is cleared before it starts.
 */
export class QueueClearedError extends Error {
  constructor(message = 'Task was cleared before it started') {
    super(message)
    this.name = 'QueueClearedError'
  }
}

/**
 * @public
 * Per-task queue execution options.
 */
export interface QueueTaskOptions {
  /**
   * Abort queued or running work. Aborting a running task releases queue bookkeeping,
   * but does not force the underlying work to stop.
   */
  signal?: AbortSignal
  /**
   * Maximum runtime in milliseconds once the task starts executing.
   */
  timeout?: number
}

/**
 * @public
 * Queue wait options.
 */
export interface QueueWaitOptions {
  /**
   * Abort waiting for the queue to become ready.
   */
  signal?: AbortSignal
}

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
  /**
   * Default per-task timeout in milliseconds once queued work begins executing.
   */
  timeout?: number
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
  private paused = false
  private queued: QueuedTask[] = []
  private tasks = new Set<Promise<void>>()
  private readyWaiters: ReadyWaiter[] = []
  private readyReservations: ReadyReservation[] = []
  private pendingCount = 0
  private last: Promise<void> = Promise.resolve()
  private readonly settle: QueueSettleMode
  private readonly timeout?: number
  constructor(concurrency: number, options: QueueOptions = {}) {
    const { bound = true, settle = 'ordered', timeout } = options
    concurrency = Number(concurrency)
    if (!concurrency || concurrency < 1) {
      throw new Error('Cannot create Queue with size of "' + concurrency + '"')
    }

    assertValidTimeout(timeout)

    this.concurrency = concurrency
    this.settle = settle
    this.timeout = timeout
    if (bound) {
      this.add = this.add.bind(this)
      this.ready = this.ready.bind(this)
      this.empty = this.empty.bind(this)
      this.pause = this.pause.bind(this)
      this.start = this.start.bind(this)
      this.clear = this.clear.bind(this)
    }
  }

  public get pending(): number {
    return this.pendingCount
  }

  public get size(): number {
    return this.queued.length
  }

  /**
   * Pause starting queued work. Running tasks continue until they settle.
   */
  public pause(): void {
    this.paused = true
  }

  /**
   * Resume draining queued work.
   */
  public start(): void {
    this.paused = false
    this.process()
    this.flushReadyWaiters()
  }

  /**
   * Clear queued work that has not started yet.
   */
  public clear(): void {
    const queued = this.queued
    this.queued = []

    for (const task of queued) {
      task.clear()
    }

    this.flushReadyWaiters()
  }

  /**
   * Add work to the Queue. By default the returned promise settles in queue order.
   * Pass `settle: 'completion'` to settle each promise as soon as its work settles.
   * @param work work function
   * @param arg single argument that will be passed to the work function
   * @param options per-task options (signal, timeout)
   */
  public add<T extends Func>(
    work: T,
    arg?: Parameters<T>[0],
    options: QueueTaskOptions = {},
  ): Promise<Awaited<ReturnType<T>>> {
    this.consumeReadyReservation()

    const timeout = options.timeout ?? this.timeout

    assertValidTimeout(timeout)

    let resolveOperation!: (value: Awaited<ReturnType<T>>) => void
    let rejectOperation!: (reason?: unknown) => void
    const operation = new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      resolveOperation = resolve
      rejectOperation = reject
    })
    const result = this.createResult(operation)

    let resolveDone!: () => void
    const done = new Promise<void>((resolve) => {
      resolveDone = resolve
    })

    let lifecycle!: Promise<void>
    lifecycle = done.finally(() => {
      this.tasks.delete(lifecycle)
    })

    this.tasks.add(lifecycle)

    if (options.signal?.aborted) {
      rejectOperation(getAbortReason(options.signal))
      resolveDone()
      queueMicrotask(() => {
        this.flushReadyWaiters()
      })
      return result
    }

    let cleanupAbort = (): void => {}
    let started = false
    let settled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const finish = (settle: () => void) => {
      if (settled) return

      settled = true
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      cleanupAbort()
      settle()
      resolveDone()

      if (started) {
        this.pendingCount -= 1
      }

      queueMicrotask(() => {
        this.process()
        this.flushReadyWaiters()
      })
    }

    let task!: QueuedTask
    const start = () => {
      if (settled) return

      started = true
      this.pendingCount += 1

      if (typeof timeout !== 'undefined') {
        timeoutId = setTimeout(() => {
          finish(() => {
            rejectOperation(
              new TimeoutError(
                timeout,
                `Task timed out after ${timeout}ms (queue has ${this.pending} running, ${this.size} waiting)`,
              ),
            )
          })
        }, timeout)
      }

      Promise.resolve()
        .then(() => work(arg as Parameters<T>[0]))
        .then(
          (value) => {
            finish(() => resolveOperation(value))
          },
          (error: unknown) => {
            finish(() => rejectOperation(error))
          },
        )
    }

    if (options.signal) {
      const { signal } = options
      const onAbort = () => {
        if (!started) {
          const index = this.queued.indexOf(task)
          if (index !== -1) {
            this.queued.splice(index, 1)
          }
        }

        finish(() => rejectOperation(getAbortReason(signal)))
      }

      signal.addEventListener('abort', onAbort, { once: true })
      cleanupAbort = () => {
        signal.removeEventListener('abort', onAbort)
      }
    }

    task = {
      clear: () => {
        finish(() => rejectOperation(new QueueClearedError()))
      },
      start,
    }

    this.queued.push(task)
    this.process()
    this.flushReadyWaiters()

    return result
  }

  /**
   * Wait for the queue to be able to start another task immediately.
   */
  public ready(options: QueueWaitOptions = {}): Promise<void> {
    if (options.signal?.aborted) {
      return Promise.reject(getAbortReason(options.signal))
    }

    return new Promise((resolve, reject) => {
      const waiter: ReadyWaiter = { resolve, reject }

      if (options.signal) {
        const { signal } = options
        const onAbort = () => {
          const index = this.readyWaiters.indexOf(waiter)
          if (index === -1) return

          this.readyWaiters.splice(index, 1)
          waiter.cleanup?.()
          reject(getAbortReason(signal))
          this.flushReadyWaiters()
        }

        signal.addEventListener('abort', onAbort, { once: true })
        waiter.cleanup = () => {
          signal.removeEventListener('abort', onAbort)
        }
      }

      this.readyWaiters.push(waiter)
      this.flushReadyWaiters()
    })
  }
  /**
   * Wait for all queued work to settle.
   */
  public async empty(): Promise<void> {
    while (this.tasks.size) {
      await Promise.all(Array.from(this.tasks))
    }

    await this.last
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
    while (!this.paused && this.pendingCount < this.concurrency && this.queued.length) {
      this.queued.shift()?.start()
    }
  }

  private flushReadyWaiters(): void {
    while (this.readyWaiters.length && this.canGrantReady()) {
      const waiter = this.readyWaiters.shift()
      if (!waiter) return

      const reservation: ReadyReservation = { active: true }
      this.readyReservations.push(reservation)

      waiter.cleanup?.()
      waiter.resolve()

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
    return (
      !this.paused &&
      this.size === 0 &&
      this.pendingCount + this.readyReservations.length < this.concurrency
    )
  }

  private consumeReadyReservation(): void {
    const reservation = this.readyReservations.shift()
    if (reservation) {
      reservation.active = false
    }
  }
}
