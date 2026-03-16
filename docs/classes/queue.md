[**aceink**](../README.md)

***

[aceink](../globals.md) / Queue

# Class: Queue

Defined in: [src/queue.ts:126](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L126)

Work queue abstraction with concurrency control

## Constructors

### Constructor

> **new Queue**(`concurrency`, `options?`): `Queue`

Defined in: [src/queue.ts:136](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L136)

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

Defined in: [src/queue.ts:155](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L155)

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/queue.ts:159](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L159)

##### Returns

`number`

## Methods

### add()

> **add**\<`T`\>(`work`, `arg?`, `options?`): `Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

Defined in: [src/queue.ts:170](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L170)

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

##### options?

[`QueueTaskOptions`](../interfaces/QueueTaskOptions.md) = `{}`

per-task options (signal, timeout)

#### Returns

`Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

***

### empty()

> **empty**(): `Promise`\<`void`\>

Defined in: [src/queue.ts:330](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L330)

Wait for all queued work to settle.

#### Returns

`Promise`\<`void`\>

***

### ready()

> **ready**(`options?`): `Promise`\<`void`\>

Defined in: [src/queue.ts:297](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/queue.ts#L297)

Wait for the queue to be able to start another task immediately.

#### Parameters

##### options?

[`QueueWaitOptions`](../interfaces/QueueWaitOptions.md) = `{}`

#### Returns

`Promise`\<`void`\>
