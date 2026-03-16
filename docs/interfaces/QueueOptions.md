[**aceink**](../README.md)

***

[aceink](../globals.md) / QueueOptions

# Interface: QueueOptions

Defined in: [src/queue.ts:109](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L109)

Queue configuration

## Properties

### bound?

> `optional` **bound**: `boolean`

Defined in: [src/queue.ts:113](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L113)

Bind queue methods to the queue instance.

***

### settle?

> `optional` **settle**: [`QueueSettleMode`](../type-aliases/QueueSettleMode.md)

Defined in: [src/queue.ts:117](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L117)

Control whether returned task promises settle in queue order or completion order.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/queue.ts:121](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L121)

Default per-task timeout in milliseconds once queued work begins executing.
