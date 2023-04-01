[aceink](../README.md) / [Exports](../modules.md) / Queue

# Class: Queue

Work queue abstraction around a semaphore

## Table of contents

### Constructors

- [constructor](Queue.md#constructor)

### Properties

- [last](Queue.md#last)
- [lock](Queue.md#lock)

### Accessors

- [pending](Queue.md#pending)

### Methods

- [add](Queue.md#add)
- [empty](Queue.md#empty)
- [ready](Queue.md#ready)

## Constructors

### constructor

• **new Queue**(`concurrency`, `bound?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `concurrency` | `number` | `undefined` |
| `bound` | `boolean` | `true` |

#### Defined in

[queue.ts:18](https://github.com/calebboyd/async/blob/6b3f238/src/queue.ts#L18)

## Properties

### last

• `Private` **last**: `Promise`<`any`\>

#### Defined in

[queue.ts:17](https://github.com/calebboyd/async/blob/6b3f238/src/queue.ts#L17)

___

### lock

• `Private` **lock**: [`Semaphore`](Semaphore.md)<`number`\>

#### Defined in

[queue.ts:16](https://github.com/calebboyd/async/blob/6b3f238/src/queue.ts#L16)

## Accessors

### pending

• `get` **pending**(): `number`

#### Returns

`number`

#### Defined in

[queue.ts:27](https://github.com/calebboyd/async/blob/6b3f238/src/queue.ts#L27)

## Methods

### add

▸ **add**<`T`\>(`work`, `arg?`): `Promise`<`Awaited`<`ReturnType`<`T`\>\>\>

Add work to the Queue, The work function _can_ be async and should NOT throw

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Func`](../modules.md#func) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `work` | `T` | work function |
| `arg?` | `Parameters`<`T`\>[``0``] | single argument that will be passed to the work function |

#### Returns

`Promise`<`Awaited`<`ReturnType`<`T`\>\>\>

#### Defined in

[queue.ts:37](https://github.com/calebboyd/async/blob/6b3f238/src/queue.ts#L37)

___

### empty

▸ **empty**(): `Promise`<`void`\>

Wait for the queue to be empty

#### Returns

`Promise`<`void`\>

#### Defined in

[queue.ts:57](https://github.com/calebboyd/async/blob/6b3f238/src/queue.ts#L57)

___

### ready

▸ **ready**(): `Promise`<`void`\>

Wait for the queue to have at least one empty slot

#### Returns

`Promise`<`void`\>

#### Defined in

[queue.ts:51](https://github.com/calebboyd/async/blob/6b3f238/src/queue.ts#L51)
