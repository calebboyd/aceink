[**aceink**](../README.md)

***

[aceink](../globals.md) / QueueTaskOptions

# Interface: QueueTaskOptions

Defined in: [src/queue.ts:89](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L89)

Per-task queue execution options.

## Properties

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [src/queue.ts:94](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L94)

Abort queued or running work. Aborting a running task releases queue bookkeeping,
but does not force the underlying work to stop.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/queue.ts:98](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L98)

Maximum runtime in milliseconds once the task starts executing.
