[**aceink**](../README.md)

***

[aceink](../globals.md) / Queue

# Class: Queue

Defined in: [src/queue.ts:142](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L142)

Work queue abstraction with concurrency control

## Constructors

### Constructor

> **new Queue**(`concurrency`, `options?`): `Queue`

Defined in: [src/queue.ts:154](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L154)

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

Defined in: [src/queue.ts:177](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L177)

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/queue.ts:181](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L181)

##### Returns

`number`

## Methods

### add()

> **add**\<`T`\>(`work`, `arg?`, `options?`): `Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

Defined in: [src/queue.ts:224](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L224)

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

Defined in: [src/queue.ts:205](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L205)

Clear queued work that has not started yet.

#### Returns

`void`

***

### empty()

> **empty**(): `Promise`\<`void`\>

Defined in: [src/queue.ts:391](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L391)

Wait for all queued and running work to settle.

#### Returns

`Promise`\<`void`\>

***

### onEmpty()

> **onEmpty**(`options?`): `Promise`\<`void`\>

Defined in: [src/queue.ts:362](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L362)

Wait for queued work to be fully dequeued, even if running tasks are still settling.

#### Parameters

##### options?

[`QueueWaitOptions`](../interfaces/QueueWaitOptions.md) = `{}`

#### Returns

`Promise`\<`void`\>

***

### pause()

> **pause**(): `void`

Defined in: [src/queue.ts:188](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L188)

Pause starting queued work. Running tasks continue until they settle.

#### Returns

`void`

***

### ready()

> **ready**(`options?`): `Promise`\<`void`\>

Defined in: [src/queue.ts:377](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L377)

Wait for the queue to be able to start another task immediately.

#### Parameters

##### options?

[`QueueWaitOptions`](../interfaces/QueueWaitOptions.md) = `{}`

#### Returns

`Promise`\<`void`\>

***

### start()

> **start**(): `void`

Defined in: [src/queue.ts:195](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/queue.ts#L195)

Resume draining queued work.

#### Returns

`void`
