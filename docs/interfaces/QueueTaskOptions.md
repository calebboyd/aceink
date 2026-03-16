[**aceink**](../README.md)

***

[aceink](../globals.md) / QueueTaskOptions

# Interface: QueueTaskOptions

Defined in: [src/queue.ts:82](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L82)

Per-task queue execution options.

## Properties

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [src/queue.ts:87](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L87)

Abort queued or running work. Aborting a running task releases queue bookkeeping,
but does not force the underlying work to stop.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/queue.ts:91](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L91)

Maximum runtime in milliseconds once the task starts executing.
