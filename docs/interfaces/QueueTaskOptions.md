[**aceink**](../README.md)

***

[aceink](../globals.md) / QueueTaskOptions

# Interface: QueueTaskOptions

Defined in: [src/queue.ts:73](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L73)

Per-task queue execution options.

## Properties

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [src/queue.ts:78](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L78)

Abort queued or running work. Aborting a running task releases queue bookkeeping,
but does not force the underlying work to stop.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/queue.ts:82](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L82)

Maximum runtime in milliseconds once the task starts executing.
