[**aceink**](../README.md)

***

[aceink](../globals.md) / map

# Function: map()

> **map**\<`T`, `R`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`Awaited`\<`R`\>[]\>

Defined in: [src/map.ts:17](https://github.com/calebboyd/aceink/blob/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3/src/map.ts#L17)

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

[`MapOptions`](../interfaces/MapOptions.md)\<`K`\> = `{}`

## Returns

`Promise`\<`Awaited`\<`R`\>[]\>
