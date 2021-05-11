[@calebboyd/async](../README.md) / [Exports](../modules.md) / Semaphore

# Class: Semaphore<RefType\>

## Type parameters

| Name | Default |
| :------ | :------ |
| `RefType` | *number* |

## Table of contents

### Constructors

- [constructor](semaphore.md#constructor)

### Properties

- [locks](semaphore.md#locks)
- [requestedLockCount](semaphore.md#requestedlockcount)
- [size](semaphore.md#size)
- [waiting](semaphore.md#waiting)

### Accessors

- [count](semaphore.md#count)
- [pending](semaphore.md#pending)

### Methods

- [acquire](semaphore.md#acquire)
- [release](semaphore.md#release)

## Constructors

### constructor

\+ **new Semaphore**<RefType\>(`size?`: *number*, `promise?`: PromiseConstructor): [*Semaphore*](semaphore.md)<RefType\>

#### Type parameters

| Name | Default |
| :------ | :------ |
| `RefType` | *number* |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `size` | *number* | 1 |
| `promise` | PromiseConstructor | - |

**Returns:** [*Semaphore*](semaphore.md)<RefType\>

Defined in: [semaphore.ts:21](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L21)

## Properties

### locks

• `Private` **locks**: *number*= 0

Defined in: [semaphore.ts:20](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L20)

___

### requestedLockCount

• `Private` **requestedLockCount**: *number*= 0

Defined in: [semaphore.ts:21](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L21)

___

### size

• **size**: *number*

Defined in: [semaphore.ts:18](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L18)

___

### waiting

• `Private` **waiting**: [*Deferred*](deferred.md)<RefType\>[]= []

Defined in: [semaphore.ts:19](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L19)

## Accessors

### count

• get **count**(): *number*

**Returns:** *number*

Defined in: [semaphore.ts:30](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L30)

___

### pending

• get **pending**(): *number*

**Returns:** *number*

Defined in: [semaphore.ts:33](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L33)

## Methods

### acquire

▸ **acquire**(`ref?`: RefType): *Promise*<RefType\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref?` | RefType |

**Returns:** *Promise*<RefType\>

Defined in: [semaphore.ts:41](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L41)

___

### release

▸ **release**(): *void*

**Returns:** *void*

Defined in: [semaphore.ts:57](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L57)
