[**aceink**](../README.md)

***

[aceink](../globals.md) / each

# Function: each()

> **each**\<`T`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`void`\>

Defined in: [each.ts:16](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/each.ts#L16)

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

#### concurrency?

`number`

#### context?

`void` \| `K`

#### onError?

`"settle"` \| `"bail"` = `'bail'`

## Returns

`Promise`\<`void`\>
