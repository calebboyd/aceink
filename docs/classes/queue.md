[**aceink**](../README.md)

***

[aceink](../globals.md) / Queue

# Class: Queue

Defined in: [queue.ts:35](https://github.com/calebboyd/aceink/blob/4ec8f3568f64aede2a4a837c4b806a8b46443a74/src/queue.ts#L35)

Work queue abstraction with concurrency control

## Constructors

### Constructor

> **new Queue**(`concurrency`, `options?`): `Queue`

Defined in: [queue.ts:44](https://github.com/calebboyd/aceink/blob/4ec8f3568f64aede2a4a837c4b806a8b46443a74/src/queue.ts#L44)

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

Defined in: [queue.ts:60](https://github.com/calebboyd/aceink/blob/4ec8f3568f64aede2a4a837c4b806a8b46443a74/src/queue.ts#L60)

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [queue.ts:64](https://github.com/calebboyd/aceink/blob/4ec8f3568f64aede2a4a837c4b806a8b46443a74/src/queue.ts#L64)

##### Returns

`number`

## Methods

### add()

> **add**\<`T`\>(`work`, `arg?`): `Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

Defined in: [queue.ts:75](https://github.com/calebboyd/aceink/blob/4ec8f3568f64aede2a4a837c4b806a8b46443a74/src/queue.ts#L75)

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

Defined in: [queue.ts:130](https://github.com/calebboyd/aceink/blob/4ec8f3568f64aede2a4a837c4b806a8b46443a74/src/queue.ts#L130)

Wait for all queued work to settle.

#### Returns

`Promise`\<`void`\>

***

### ready()

> **ready**(): `Promise`\<`void`\>

Defined in: [queue.ts:121](https://github.com/calebboyd/aceink/blob/4ec8f3568f64aede2a4a837c4b806a8b46443a74/src/queue.ts#L121)

Wait for the queue to be able to start another task immediately.

#### Returns

`Promise`\<`void`\>
