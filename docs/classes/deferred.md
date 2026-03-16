[**aceink**](../README.md)

***

[aceink](../globals.md) / Deferred

# Class: Deferred\<T\>

Defined in: [src/deferred.ts:18](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/deferred.ts#L18)

A Basic Deferred class, exposing the promise, resolve and reject methods.
Use of a deferred is generally an anti-pattern, use with discretion.

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Deferred**\<`T`\>(`value?`): `Deferred`\<`T`\>

Defined in: [src/deferred.ts:31](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/deferred.ts#L31)

#### Parameters

##### value?

`T`

Convenience placeholder for a value to resolve the deferred with

#### Returns

`Deferred`\<`T`\>

## Properties

### promise

> **promise**: `Promise`\<`T`\>

Defined in: [src/deferred.ts:30](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/deferred.ts#L30)

The Promise instance

***

### reject()

> **reject**: (`reason?`) => `void`

Defined in: [src/deferred.ts:26](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/deferred.ts#L26)

Reject the promise with some reason

#### Parameters

##### reason?

`any`

#### Returns

`void`

***

### resolve()

> **resolve**: (`value`) => `void`

Defined in: [src/deferred.ts:22](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/deferred.ts#L22)

resolve the Promise with the stored value

#### Parameters

##### value

`T` | `PromiseLike`\<`T`\>

#### Returns

`void`

***

### value?

> `optional` **value**: `T`

Defined in: [src/deferred.ts:35](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/deferred.ts#L35)

Convenience placeholder for a value to resolve the deferred with
