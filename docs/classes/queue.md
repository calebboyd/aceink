[**aceink**](../README.md)

***

[aceink](../globals.md) / Queue

# Class: Queue

Defined in: [src/queue.ts:126](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L126)

Work queue abstraction with concurrency control

## Constructors

### Constructor

> **new Queue**(`concurrency`, `options?`): `Queue`

Defined in: [src/queue.ts:137](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L137)

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

Defined in: [src/queue.ts:158](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L158)

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/queue.ts:162](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L162)

##### Returns

`number`

## Methods

### add()

> **add**\<`T`\>(`work`, `arg?`, `options?`): `Promise`\<`Awaited`\<`ReturnType`\<`T`\>\>\>

Defined in: [src/queue.ts:189](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L189)

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

Defined in: [src/queue.ts:349](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L349)

Wait for all queued work to settle.

#### Returns

`Promise`\<`void`\>

***

### pause()

> **pause**(): `void`

Defined in: [src/queue.ts:169](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L169)

Pause starting queued work. Running tasks continue until they settle.

#### Returns

`void`

***

### ready()

> **ready**(`options?`): `Promise`\<`void`\>

Defined in: [src/queue.ts:316](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L316)

Wait for the queue to be able to start another task immediately.

#### Parameters

##### options?

[`QueueWaitOptions`](../interfaces/QueueWaitOptions.md) = `{}`

#### Returns

`Promise`\<`void`\>

***

### start()

> **start**(): `void`

Defined in: [src/queue.ts:176](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/queue.ts#L176)

Resume draining queued work.

#### Returns

`void`
