[**aceink**](../README.md)

---

[aceink](../globals.md) / QueueOptions

# Interface: QueueOptions

Defined in: [queue.ts:13](https://github.com/calebboyd/aceink/blob/3fe197793f511a5c043f97803e108cc5b918f894/src/queue.ts#L13)

Queue configuration

## Properties

### bound?

> `optional` **bound**: `boolean`

Defined in: [queue.ts:17](https://github.com/calebboyd/aceink/blob/3fe197793f511a5c043f97803e108cc5b918f894/src/queue.ts#L17)

Bind queue methods to the queue instance.

---

### settle?

> `optional` **settle**: [`QueueSettleMode`](../type-aliases/QueueSettleMode.md)

Defined in: [queue.ts:21](https://github.com/calebboyd/aceink/blob/3fe197793f511a5c043f97803e108cc5b918f894/src/queue.ts#L21)

Control whether returned task promises settle in queue order or completion order.
