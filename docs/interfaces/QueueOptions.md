[**aceink**](../README.md)

***

[aceink](../globals.md) / QueueOptions

# Interface: QueueOptions

Defined in: [src/queue.ts:116](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L116)

Queue configuration

## Properties

### bound?

> `optional` **bound**: `boolean`

Defined in: [src/queue.ts:120](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L120)

Bind queue methods to the queue instance.

***

### settle?

> `optional` **settle**: [`QueueSettleMode`](../type-aliases/QueueSettleMode.md)

Defined in: [src/queue.ts:124](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L124)

Control whether returned task promises settle in queue order or completion order.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/queue.ts:128](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L128)

Default per-task timeout in milliseconds once queued work begins executing.
