[**aceink**](../README.md)

***

[aceink](../globals.md) / each

# Function: each()

> **each**\<`T`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`void`\>

Defined in: [src/each.ts:34](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/each.ts#L34)

Iterate a list with optional concurrency

## Type Parameters

### T

`T`

### K

`K` = `any`

## Parameters

### this

`void` | `K`

### list

`Iterable`\<`T`\>

### iterator

`IteratorFunc`\<`T`\>

### \_\_namedParameters?

[`EachOptions`](../interfaces/EachOptions.md)\<`K`\> = `...`

## Returns

`Promise`\<`void`\>
