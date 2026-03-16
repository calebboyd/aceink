[aceink](../README.md) / [Exports](../modules.md) / Semaphore

# Class: Semaphore<RefType\>

Basic counting semaphore/lock

## Type parameters

| Name      | Type     |
| :-------- | :------- |
| `RefType` | `number` |

## Table of contents

### Constructors

- [constructor](Semaphore.md#constructor)

### Properties

- [locks](Semaphore.md#locks)
- [requestedLockCount](Semaphore.md#requestedlockcount)
- [size](Semaphore.md#size)
- [waiting](Semaphore.md#waiting)
- [waitingIndex](Semaphore.md#waitingindex)

### Accessors

- [count](Semaphore.md#count)
- [pending](Semaphore.md#pending)

### Methods

- [acquire](Semaphore.md#acquire)
- [release](Semaphore.md#release)
- [shiftWaiting](Semaphore.md#shiftwaiting)

## Constructors

### constructor

• **new Semaphore**<`RefType`\>(`size?`, `bound?`)

#### Type parameters

| Name      | Type     |
| :-------- | :------- |
| `RefType` | `number` |

#### Parameters

| Name    | Type      | Default value |
| :------ | :-------- | :------------ |
| `size`  | `number`  | `1`           |
| `bound` | `boolean` | `true`        |

#### Defined in

[semaphore.ts:21](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L21)

## Properties

### locks

• `Private` **locks**: `number` = `0`

#### Defined in

[semaphore.ts:18](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L18)

---

### requestedLockCount

• `Private` **requestedLockCount**: `number` = `0`

#### Defined in

[semaphore.ts:19](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L19)

---

### size

• `Readonly` **size**: `number`

#### Defined in

[semaphore.ts:15](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L15)

---

### waiting

• `Private` **waiting**: [`Deferred`](Deferred.md)<`RefType`\>[] = `[]`

#### Defined in

[semaphore.ts:16](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L16)

---

### waitingIndex

• `Private` **waitingIndex**: `number` = `0`

#### Defined in

[semaphore.ts:17](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L17)

## Accessors

### count

• `get` **count**(): `number`

#### Returns

`number`

#### Defined in

[semaphore.ts:32](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L32)

---

### pending

• `get` **pending**(): `number`

#### Returns

`number`

#### Defined in

[semaphore.ts:35](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L35)

## Methods

### acquire

▸ **acquire**(`ref?`): `Promise`<`RefType`\>

Acquire a slot

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `ref?` | `RefType` |

#### Returns

`Promise`<`RefType`\>

#### Defined in

[semaphore.ts:42](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L42)

---

### release

▸ **release**(): `void`

Release a slot

#### Returns

`void`

#### Defined in

[semaphore.ts:57](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L57)

---

### shiftWaiting

▸ `Private` **shiftWaiting**(): `undefined` \| [`Deferred`](Deferred.md)<`RefType`\>

#### Returns

`undefined` \| [`Deferred`](Deferred.md)<`RefType`\>

#### Defined in

[semaphore.ts:68](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L68)
