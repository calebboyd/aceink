[**aceink**](../README.md)

***

[aceink](../globals.md) / map

# Function: map()

> **map**\<`T`, `R`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`Awaited`\<`R`\>[]\>

Defined in: [map.ts:8](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/map.ts#L8)

Map over a list with optional concurrency

## Type Parameters

### T

`T`

### R

`R`

### K

`K` = `any`

## Parameters

### this

`K`

### list

`Iterable`\<`T`\>

### iterator

`IteratorFunc`\<`T`, `R`\>

### \_\_namedParameters?

#### concurrency?

`number`

#### context?

`K`

## Returns

`Promise`\<`Awaited`\<`R`\>[]\>
