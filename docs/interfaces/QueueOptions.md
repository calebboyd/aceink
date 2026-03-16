[**aceink**](../README.md)

***

[aceink](../globals.md) / QueueOptions

# Interface: QueueOptions

Defined in: [src/queue.ts:100](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/queue.ts#L100)

Queue configuration

## Properties

### bound?

> `optional` **bound**: `boolean`

Defined in: [src/queue.ts:104](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/queue.ts#L104)

Bind queue methods to the queue instance.

***

### settle?

> `optional` **settle**: [`QueueSettleMode`](../type-aliases/QueueSettleMode.md)

Defined in: [src/queue.ts:108](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/queue.ts#L108)

Control whether returned task promises settle in queue order or completion order.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/queue.ts:112](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/queue.ts#L112)

Default per-task timeout in milliseconds once queued work begins executing.
