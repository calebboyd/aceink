import { describe, expect, it } from 'vitest'
import { createDeferred } from './deferred.js'
import { delay } from './lang.js'
import { AbortError, Queue, TimeoutError } from './queue.js'

describe('queue', () => {
  const range = (num: number) => Array.from(Array(num).keys())
  const flush = async (times = 5) => {
    while (times--) {
      await Promise.resolve()
    }
  }

  it('should process results concurrently', async () => {
    const q = new Queue(10),
      results: number[] = []
    range(100).forEach((x) =>
      q.add(() => delay(Math.random() * 100, x)).then((x) => results.push(x)),
    )
    await q.empty()
    expect(results).toHaveLength(100)
    expect([...results].sort((a, b) => a - b)).toEqual(range(100))
  }, 10000)

  it('should invoke work function if not thennable', async () => {
    const q = new Queue(10),
      values = range(100)

    let sum = 0
    async function work(i: number) {
      await delay(Math.random() * 100)
      sum += i
    }
    for await (const i of values) {
      await q.ready()
      q.add(work, i)
    }
    await q.empty()
    expect(sum).toEqual(4950)
  }, 10000)

  it('should remain usable after a task rejects', async () => {
    const q = new Queue(1)

    await expect(q.add(() => Promise.reject(new Error('boom')))).rejects.toThrow('boom')
    await expect(
      Promise.race([q.add(() => Promise.resolve('ok')), delay(25, 'timeout')]),
    ).resolves.toBe('ok')
    await expect(q.empty()).resolves.toBeUndefined()
  })

  it('should resolve each task in queue order by default', async () => {
    const q = new Queue(2)
    const order: string[] = []

    const slow = q.add(() => delay(20, 'slow')).then((value) => order.push(value))
    const fast = q.add(() => delay(5, 'fast')).then((value) => order.push(value))

    await Promise.all([slow, fast])

    expect(order).toEqual(['slow', 'fast'])
  })

  it('should resolve each task when that task completes when enabled', async () => {
    const q = new Queue(2, { settle: 'completion' })
    const order: string[] = []

    const slow = q.add(() => delay(20, 'slow')).then((value) => order.push(value))
    const fast = q.add(() => delay(5, 'fast')).then((value) => order.push(value))

    await Promise.all([slow, fast])

    expect(order).toEqual(['fast', 'slow'])
  })

  it('should allow disabling bound methods through options', async () => {
    expect(new Queue(1).add).not.toBe(Queue.prototype.add)
    expect(new Queue(1).pause).not.toBe(Queue.prototype.pause)
    expect(new Queue(1).start).not.toBe(Queue.prototype.start)
    expect(new Queue(1, { bound: false }).add).toBe(Queue.prototype.add)
    expect(new Queue(1, { bound: false }).pause).toBe(Queue.prototype.pause)
    expect(new Queue(1, { bound: false }).start).toBe(Queue.prototype.start)
  })

  it('should report running and queued work separately', async () => {
    const first = createDeferred<string>()
    const second = createDeferred<string>()
    const q = new Queue(1, { settle: 'completion' })

    const runFirst = q.add(() => first.promise)
    const runSecond = q.add(() => second.promise)

    expect(q.pending).toBe(1)
    expect(q.size).toBe(1)

    first.resolve('first')
    await flush()

    expect(q.pending).toBe(1)
    expect(q.size).toBe(0)

    second.resolve('second')
    await Promise.all([runFirst, runSecond])

    expect(q.pending).toBe(0)
    expect(q.size).toBe(0)
  })

  it('should only release one ready waiter per available slot', async () => {
    const first = createDeferred<void>()
    const second = createDeferred<void>()
    const third = createDeferred<void>()
    const q = new Queue(1, { settle: 'completion' })
    const ready: string[] = []

    const running = q.add(() => first.promise)
    let waiter1!: Promise<void>
    const ready1 = q.ready().then(() => {
      ready.push('waiter1')
      waiter1 = q.add(() => second.promise)
    })
    let waiter2!: Promise<void>
    const ready2 = q.ready().then(() => {
      ready.push('waiter2')
      waiter2 = q.add(() => third.promise)
    })

    expect(ready).toEqual([])

    first.resolve()
    await expect(Promise.race([ready1.then(() => 'ready'), delay(25, 'timeout')])).resolves.toBe(
      'ready',
    )

    expect(ready).toHaveLength(1)

    second.resolve()
    await expect(Promise.race([ready2.then(() => 'ready'), delay(25, 'timeout')])).resolves.toBe(
      'ready',
    )

    expect(ready).toEqual(['waiter1', 'waiter2'])

    third.resolve()
    await Promise.all([running, waiter1, waiter2])
  })

  it('should pause draining queued work until started', async () => {
    const first = createDeferred<void>()
    const q = new Queue(1, { settle: 'completion' })
    const ran: string[] = []

    const running = q.add(() =>
      first.promise.then(() => {
        ran.push('first')
      }),
    )

    q.pause()

    const queued = q.add(() => {
      ran.push('second')
    })

    expect(q.pending).toBe(1)
    expect(q.size).toBe(1)

    first.resolve()
    await expect(running).resolves.toBeUndefined()
    await flush()

    expect(q.pending).toBe(0)
    expect(q.size).toBe(1)
    expect(ran).toEqual(['first'])

    q.start()

    await expect(queued).resolves.toBeUndefined()
    expect(ran).toEqual(['first', 'second'])
  })

  it('should not start new work while paused', async () => {
    const q = new Queue(1, { settle: 'completion' })
    let started = false

    q.pause()

    const task = q.add(() => {
      started = true
    })

    await flush()

    expect(started).toBe(false)
    expect(q.pending).toBe(0)
    expect(q.size).toBe(1)

    q.start()

    await expect(task).resolves.toBeUndefined()
    expect(started).toBe(true)
  })

  it('should keep ready waiters blocked while paused', async () => {
    const q = new Queue(1, { settle: 'completion' })

    q.pause()

    const ready = q.ready()

    await expect(Promise.race([ready.then(() => 'ready'), delay(25, 'timeout')])).resolves.toBe(
      'timeout',
    )

    q.start()

    await expect(Promise.race([ready.then(() => 'ready'), delay(25, 'timeout')])).resolves.toBe(
      'ready',
    )
    await expect(ready).resolves.toBeUndefined()
  })

  it('should reject a running task when it exceeds the queue timeout', async () => {
    const q = new Queue(1, { timeout: 10, settle: 'completion' })

    await expect(q.add(() => delay(25))).rejects.toBeInstanceOf(TimeoutError)
    expect(q.pending).toBe(0)
    expect(q.size).toBe(0)
    await expect(q.empty()).resolves.toBeUndefined()
  })

  it('should allow per-task timeout overrides', async () => {
    const q = new Queue(1, { timeout: 50, settle: 'completion' })

    await expect(q.add(() => delay(25), undefined, { timeout: 10 })).rejects.toBeInstanceOf(
      TimeoutError,
    )
    await expect(q.add(() => delay(10), undefined, { timeout: 30 })).resolves.toBeUndefined()
  })

  it('should remove aborted queued work and continue draining the queue', async () => {
    const first = createDeferred<void>()
    const q = new Queue(1, { settle: 'completion' })
    const controller = new AbortController()
    const ran: string[] = []

    const running = q.add(() => first.promise)
    const aborted = q.add(
      () => {
        ran.push('aborted')
      },
      undefined,
      { signal: controller.signal },
    )
    const next = q.add(() => {
      ran.push('next')
      return 'next'
    })

    controller.abort()

    await expect(aborted).rejects.toBeInstanceOf(AbortError)
    expect(q.pending).toBe(1)
    expect(q.size).toBe(1)

    first.resolve()

    await expect(running).resolves.toBeUndefined()
    await expect(next).resolves.toBe('next')
    expect(ran).toEqual(['next'])
  })

  it('should reject a running task when its abort signal fires', async () => {
    const q = new Queue(1, { settle: 'completion' })
    const controller = new AbortController()
    const work = createDeferred<void>()

    const task = q.add(() => work.promise, undefined, { signal: controller.signal })

    controller.abort()

    await expect(task).rejects.toBeInstanceOf(AbortError)
    expect(q.pending).toBe(0)

    await expect(
      Promise.race([q.add(() => Promise.resolve('ok')), delay(25, 'timeout')]),
    ).resolves.toBe('ok')

    work.resolve()
  })

  it('should support aborting ready waiters', async () => {
    const q = new Queue(1, { settle: 'completion' })
    const work = createDeferred<void>()
    const controller = new AbortController()

    const running = q.add(() => work.promise)
    const ready = q.ready({ signal: controller.signal })

    controller.abort()

    await expect(ready).rejects.toBeInstanceOf(AbortError)

    work.resolve()
    await expect(running).resolves.toBeUndefined()
    await expect(q.ready()).resolves.toBeUndefined()
  })

  it('should reject immediately when adding with an already aborted signal', async () => {
    const q = new Queue(1, { settle: 'completion' })
    const controller = new AbortController()

    controller.abort()

    await expect(
      q.add(() => Promise.resolve('nope'), undefined, { signal: controller.signal }),
    ).rejects.toBeInstanceOf(AbortError)
    expect(q.pending).toBe(0)
    expect(q.size).toBe(0)
  })

  it('should validate queue timeouts', () => {
    expect(() => new Queue(1, { timeout: 0 })).toThrow(
      'Expected `timeout` to be a positive finite number',
    )
    const q = new Queue(1)
    expect(() => q.add(() => Promise.resolve(), undefined, { timeout: 0 })).toThrow(
      'Expected `timeout` to be a positive finite number',
    )
  })
})
