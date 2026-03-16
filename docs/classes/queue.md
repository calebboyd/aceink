[**aceink**](../README.md)

***

[aceink](../globals.md) / Queue

# Class: Queue

Defined in: [queue.ts:32](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L32)

Work queue abstraction around a semaphore

## Constructors

### Constructor

> **new Queue**(`concurrency`, `options?`): `Queue`

Defined in: [queue.ts:37](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L37)

#### Parameters

##### concurrency

`number`

##### options?

[`QueueOptions`](../interfaces/QueueOptions.md) = `{}`

#### Returns

`Queue`

## Accessors

### pending

#### Get Signature

> **get** **pending**(): `number`

Defined in: [queue.ts:48](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L48)

##### Returns

`number`

## Methods

### add()

> **add**\<`T`\>(`work`, `arg?`): `Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

Defined in: [queue.ts:59](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L59)

Add work to the Queue. By default the returned promise settles in queue order.
Pass `settle: 'completion'` to settle each promise as soon as its work settles.

#### Type Parameters

##### T

`T` *extends* [`Func`](../type-aliases/Func.md)

#### Parameters

##### work

`T`

work function

##### arg?

`Parameters`\<`T`\>\[`0`\]

single argument that will be passed to the work function

#### Returns

`Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

***

### empty()

> **empty**(): `Promise`\<`void`\>

Defined in: [queue.ts:109](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L109)

Wait for all queued work to settle.

#### Returns

`Promise`\<`void`\>

***

### ready()

> **ready**(): `Promise`\<`void`\>

Defined in: [queue.ts:103](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/queue.ts#L103)

Wait for the queue to have at least one empty slot

#### Returns

`Promise`\<`void`\>
