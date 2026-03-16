[**aceink**](../README.md)

***

[aceink](../globals.md) / each

# Function: each()

> **each**\<`T`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`void`\>

Defined in: [src/each.ts:34](https://github.com/calebboyd/aceink/blob/42a74d970a04ce9c8fa0a039da404dafccda8cf7/src/each.ts#L34)

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
