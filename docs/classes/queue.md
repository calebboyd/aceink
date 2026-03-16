[**aceink**](../README.md)

***

[aceink](../globals.md) / Queue

# Class: Queue

Defined in: [src/queue.ts:142](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L142)

Work queue abstraction with concurrency control

## Constructors

### Constructor

> **new Queue**(`concurrency`, `options?`): `Queue`

Defined in: [src/queue.ts:153](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L153)

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

Defined in: [src/queue.ts:175](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L175)

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/queue.ts:179](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L179)

##### Returns

`number`

## Methods

### add()

> **add**\<`T`\>(`work`, `arg?`, `options?`): `Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

Defined in: [src/queue.ts:220](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L220)

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

### clear()

> **clear**(): `void`

Defined in: [src/queue.ts:202](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L202)

Clear queued work that has not started yet.

#### Returns

`void`

***

### empty()

> **empty**(): `Promise`\<`void`\>

Defined in: [src/queue.ts:388](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L388)

Wait for all queued work to settle.

#### Returns

`Promise`\<`void`\>

***

### pause()

> **pause**(): `void`

Defined in: [src/queue.ts:186](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L186)

Pause starting queued work. Running tasks continue until they settle.

#### Returns

`void`

***

### ready()

> **ready**(`options?`): `Promise`\<`void`\>

Defined in: [src/queue.ts:355](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L355)

Wait for the queue to be able to start another task immediately.

#### Parameters

##### options?

[`QueueWaitOptions`](../interfaces/QueueWaitOptions.md) = `{}`

#### Returns

`Promise`\<`void`\>

***

### start()

> **start**(): `void`

Defined in: [src/queue.ts:193](https://github.com/calebboyd/aceink/blob/f698b0774dd849824fffedf1fa982747f796bca1/src/queue.ts#L193)

Resume draining queued work.

#### Returns

`void`
