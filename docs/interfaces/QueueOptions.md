[**aceink**](../README.md)

***

[aceink](../globals.md) / QueueOptions

# Interface: QueueOptions

Defined in: [queue.ts:10](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L10)

Queue configuration

## Properties

### bound?

> `optional` **bound**: `boolean`

Defined in: [queue.ts:14](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L14)

Bind queue methods to the queue instance.

***

### settle?

> `optional` **settle**: [`QueueSettleMode`](../type-aliases/QueueSettleMode.md)

Defined in: [queue.ts:18](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L18)

Control whether returned task promises settle in queue order or completion order.
