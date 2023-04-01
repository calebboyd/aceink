[aceink](../README.md) / [Exports](../modules.md) / Semaphore

# Class: Semaphore<RefType\>

Basic counting semaphore/lock

## Type parameters

| Name | Type |
| :------ | :------ |
| `RefType` | `number` |

## Table of contents

### Constructors

- [constructor](Semaphore.md#constructor)

### Properties

- [locks](Semaphore.md#locks)
- [requestedLockCount](Semaphore.md#requestedlockcount)
- [size](Semaphore.md#size)
- [waiting](Semaphore.md#waiting)

### Accessors

- [count](Semaphore.md#count)
- [pending](Semaphore.md#pending)

### Methods

- [acquire](Semaphore.md#acquire)
- [release](Semaphore.md#release)

## Constructors

### constructor

• **new Semaphore**<`RefType`\>(`size?`, `bound?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RefType` | `number` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `size` | `number` | `1` |
| `bound` | `boolean` | `true` |

#### Defined in

[semaphore.ts:20](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L20)

## Properties

### locks

• `Private` **locks**: `number` = `0`

#### Defined in

[semaphore.ts:17](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L17)

___

### requestedLockCount

• `Private` **requestedLockCount**: `number` = `0`

#### Defined in

[semaphore.ts:18](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L18)

___

### size

• `Readonly` **size**: `number`

#### Defined in

[semaphore.ts:15](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L15)

___

### waiting

• `Private` **waiting**: [`Deferred`](Deferred.md)<`RefType`\>[] = `[]`

#### Defined in

[semaphore.ts:16](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L16)

## Accessors

### count

• `get` **count**(): `number`

#### Returns

`number`

#### Defined in

[semaphore.ts:31](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L31)

___

### pending

• `get` **pending**(): `number`

#### Returns

`number`

#### Defined in

[semaphore.ts:34](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L34)

## Methods

### acquire

▸ **acquire**(`ref?`): `Promise`<`RefType`\>

Acquire a slot

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref?` | `RefType` |

#### Returns

`Promise`<`RefType`\>

#### Defined in

[semaphore.ts:41](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L41)

___

### release

▸ **release**(): `void`

Release a slot

#### Returns

`void`

#### Defined in

[semaphore.ts:56](https://github.com/calebboyd/aceink/blob/77a10f9/src/semaphore.ts#L56)
