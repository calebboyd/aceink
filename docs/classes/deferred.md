[aceink](../README.md) / [Exports](../modules.md) / Deferred

# Class: Deferred<T\>

A Basic Deferred class, exposing the promise, resolve and reject methods.
Use of a deferred is generally an anti-pattern, use with discretion.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](Deferred.md#constructor)

### Properties

- [promise](Deferred.md#promise)
- [reject](Deferred.md#reject)
- [resolve](Deferred.md#resolve)
- [value](Deferred.md#value)

## Constructors

### constructor

• **new Deferred**<`T`\>(`value?`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value?` | `T` | Convenience placeholder for a value to resolve the deferred with |

#### Defined in

[deferred.ts:31](https://github.com/calebboyd/async/blob/ce8a509/src/deferred.ts#L31)

## Properties

### promise

• **promise**: `Promise`<`T`\>

The Promise instance

#### Defined in

[deferred.ts:30](https://github.com/calebboyd/async/blob/ce8a509/src/deferred.ts#L30)

___

### reject

• **reject**: (`reason?`: `any`) => `void`

#### Type declaration

▸ (`reason?`): `void`

Reject the promise with some reason

##### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `any` |

##### Returns

`void`

#### Defined in

[deferred.ts:26](https://github.com/calebboyd/async/blob/ce8a509/src/deferred.ts#L26)

___

### resolve

• **resolve**: (`value`: `T` \| `PromiseLike`<`T`\>) => `void`

#### Type declaration

▸ (`value`): `void`

resolve the Promise with the stored value

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` \| `PromiseLike`<`T`\> |

##### Returns

`void`

#### Defined in

[deferred.ts:22](https://github.com/calebboyd/async/blob/ce8a509/src/deferred.ts#L22)

___

### value

• `Optional` **value**: `T`

Convenience placeholder for a value to resolve the deferred with

#### Defined in

[deferred.ts:35](https://github.com/calebboyd/async/blob/ce8a509/src/deferred.ts#L35)
