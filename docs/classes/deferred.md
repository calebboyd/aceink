[@calebboyd/async](../README.md) / [Exports](../modules.md) / Deferred

# Class: Deferred<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](deferred.md#constructor)

### Properties

- [PromiseImpl](deferred.md#promiseimpl)
- [promise](deferred.md#promise)
- [reject](deferred.md#reject)
- [resolve](deferred.md#resolve)
- [value](deferred.md#value)

## Constructors

### constructor

\+ **new Deferred**<T\>(`value?`: T, `PromiseImpl?`: PromiseConstructorLike): [*Deferred*](deferred.md)<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | T |
| `PromiseImpl` | PromiseConstructorLike |

**Returns:** [*Deferred*](deferred.md)<T\>

Defined in: [deferred.ts:18](https://github.com/calebboyd/async/blob/3e68cc2/deferred.ts#L18)

## Properties

### PromiseImpl

• **PromiseImpl**: PromiseConstructorLike

___

### promise

• **promise**: *Promise*<T\>

The Promise instance

Defined in: [deferred.ts:18](https://github.com/calebboyd/async/blob/3e68cc2/deferred.ts#L18)

___

### reject

• **reject**: (`reason?`: *any*) => *void*

Reject the promise with some reason

#### Type declaration

▸ (`reason?`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | *any* |

**Returns:** *void*

Defined in: [deferred.ts:14](https://github.com/calebboyd/async/blob/3e68cc2/deferred.ts#L14)

Defined in: [deferred.ts:14](https://github.com/calebboyd/async/blob/3e68cc2/deferred.ts#L14)

___

### resolve

• **resolve**: (`value`: T \| *PromiseLike*<T\>) => *void*

resolve the Promise with the stored value

#### Type declaration

▸ (`value`: T \| *PromiseLike*<T\>): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | T \| *PromiseLike*<T\> |

**Returns:** *void*

Defined in: [deferred.ts:10](https://github.com/calebboyd/async/blob/3e68cc2/deferred.ts#L10)

Defined in: [deferred.ts:10](https://github.com/calebboyd/async/blob/3e68cc2/deferred.ts#L10)

___

### value

• `Optional` **value**: T
