[**aceink**](../README.md)

***

[aceink](../globals.md) / QueueTaskOptions

# Interface: QueueTaskOptions

Defined in: [src/queue.ts:89](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L89)

Per-task queue execution options.

## Properties

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [src/queue.ts:94](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L94)

Abort queued or running work. Aborting a running task releases queue bookkeeping,
but does not force the underlying work to stop.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/queue.ts:98](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L98)

Maximum runtime in milliseconds once the task starts executing.
