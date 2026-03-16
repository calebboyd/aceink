[**aceink**](../README.md)

***

[aceink](../globals.md) / Queue

# Class: Queue

Defined in: [src/queue.ts:135](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L135)

Work queue abstraction with concurrency control

## Constructors

### Constructor

> **new Queue**(`concurrency`, `options?`): `Queue`

Defined in: [src/queue.ts:145](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L145)

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

Defined in: [src/queue.ts:164](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L164)

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/queue.ts:168](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L168)

##### Returns

`number`

## Methods

### add()

#### Call Signature

> **add**\<`T`\>(`work`, `options?`): `Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

Defined in: [src/queue.ts:179](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L179)

Add work to the Queue. By default the returned promise settles in queue order.
Pass `settle: 'completion'` to settle each promise as soon as its work settles.

##### Type Parameters

###### T

`T` *extends* () => `unknown`

##### Parameters

###### work

`T`

work function

###### options?

[`QueueTaskOptions`](../interfaces/QueueTaskOptions.md)

##### Returns

`Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

#### Call Signature

> **add**\<`T`\>(`work`, `arg?`, `options?`): `Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

Defined in: [src/queue.ts:183](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L183)

Add work to the Queue. By default the returned promise settles in queue order.
Pass `settle: 'completion'` to settle each promise as soon as its work settles.

##### Type Parameters

###### T

`T` *extends* [`Func`](../type-aliases/Func.md)

##### Parameters

###### work

`T`

work function

###### arg?

`Parameters`\<`T`\>\[`0`\]

single argument that will be passed to the work function

###### options?

[`QueueTaskOptions`](../interfaces/QueueTaskOptions.md)

##### Returns

`Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

***

### empty()

> **empty**(): `Promise`\<`void`\>

Defined in: [src/queue.ts:349](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L349)

Wait for all queued work to settle.

#### Returns

`Promise`\<`void`\>

***

### ready()

> **ready**(`options?`): `Promise`\<`void`\>

Defined in: [src/queue.ts:316](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/queue.ts#L316)

Wait for the queue to be able to start another task immediately.

#### Parameters

##### options?

[`QueueWaitOptions`](../interfaces/QueueWaitOptions.md) = `{}`

#### Returns

`Promise`\<`void`\>
