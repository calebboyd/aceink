[**aceink**](../README.md)

***

[aceink](../globals.md) / each

# Function: each()

> **each**\<`T`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`void`\>

Defined in: [src/each.ts:50](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/each.ts#L50)

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
