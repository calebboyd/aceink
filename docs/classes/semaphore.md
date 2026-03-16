[**aceink**](../README.md)

***

[aceink](../globals.md) / Semaphore

# Class: Semaphore\<RefType\>

Defined in: [src/semaphore.ts:14](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/semaphore.ts#L14)

Basic counting semaphore/lock

## Type Parameters

### RefType

`RefType` = `number`

## Constructors

### Constructor

> **new Semaphore**\<`RefType`\>(`size?`, `bound?`): `Semaphore`\<`RefType`\>

Defined in: [src/semaphore.ts:21](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/semaphore.ts#L21)

#### Parameters

##### size?

`number` = `1`

##### bound?

`boolean` = `true`

#### Returns

`Semaphore`\<`RefType`\>

## Properties

### size

> `readonly` **size**: `number`

Defined in: [src/semaphore.ts:15](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/semaphore.ts#L15)

## Accessors

### count

#### Get Signature

> **get** **count**(): `number`

Defined in: [src/semaphore.ts:32](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/semaphore.ts#L32)

##### Returns

`number`

***

### pending

#### Get Signature

> **get** **pending**(): `number`

Defined in: [src/semaphore.ts:35](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/semaphore.ts#L35)

##### Returns

`number`

## Methods

### acquire()

> **acquire**(`ref?`): `Promise`\<`RefType`\>

Defined in: [src/semaphore.ts:42](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/semaphore.ts#L42)

Acquire a slot

#### Parameters

##### ref?

`RefType`

#### Returns

`Promise`\<`RefType`\>

***

### release()

> **release**(): `void`

Defined in: [src/semaphore.ts:57](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/semaphore.ts#L57)

Release a slot

#### Returns

`void`
