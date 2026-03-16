[aceink](../README.md) / [Exports](../modules.md) / Queue

# Class: Queue

Work queue abstraction around a semaphore

## Table of contents

### Constructors

- [constructor](Queue.md#constructor)

### Properties

- [lock](Queue.md#lock)
- [running](Queue.md#running)

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

| Name          | Type      | Default value |
| :------------ | :-------- | :------------ |
| `concurrency` | `number`  | `undefined`   |
| `bound`       | `boolean` | `true`        |

#### Defined in

[queue.ts:18](https://github.com/calebboyd/aceink/blob/5bc342e/src/queue.ts#L18)

## Properties

### lock

• `Private` **lock**: [`Semaphore`](Semaphore.md)<`number`\>

#### Defined in

[queue.ts:16](https://github.com/calebboyd/aceink/blob/5bc342e/src/queue.ts#L16)

---

### running

• `Private` **running**: `Set`<`Promise`<`void`\>\>

#### Defined in

[queue.ts:17](https://github.com/calebboyd/aceink/blob/5bc342e/src/queue.ts#L17)

## Accessors

### pending

• `get` **pending**(): `number`

#### Returns

`number`

#### Defined in

[queue.ts:27](https://github.com/calebboyd/aceink/blob/5bc342e/src/queue.ts#L27)

## Methods

### add

▸ **add**<`T`\>(`work`, `arg?`): `Promise`<`Awaited`<`ReturnType`<`T`\>\>\>

Add work to the Queue. The returned promise settles with the underlying work
as soon as that work settles.

#### Type parameters

| Name | Type                                 |
| :--- | :----------------------------------- |
| `T`  | extends [`Func`](../modules.md#func) |

#### Parameters

| Name   | Type                      | Description                                              |
| :----- | :------------------------ | :------------------------------------------------------- |
| `work` | `T`                       | work function                                            |
| `arg?` | `Parameters`<`T`\>[``0``] | single argument that will be passed to the work function |

#### Returns

`Promise`<`Awaited`<`ReturnType`<`T`\>\>\>

#### Defined in

[queue.ts:38](https://github.com/calebboyd/aceink/blob/5bc342e/src/queue.ts#L38)

---

### empty

▸ **empty**(): `Promise`<`void`\>

Wait for all queued work to settle.

#### Returns

`Promise`<`void`\>

#### Defined in

[queue.ts:70](https://github.com/calebboyd/aceink/blob/5bc342e/src/queue.ts#L70)

---

### ready

▸ **ready**(): `Promise`<`void`\>

Wait for the queue to have at least one empty slot

#### Returns

`Promise`<`void`\>

#### Defined in

[queue.ts:64](https://github.com/calebboyd/aceink/blob/5bc342e/src/queue.ts#L64)
