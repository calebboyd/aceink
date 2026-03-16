[**aceink**](../README.md)

***

[aceink](../globals.md) / map

# Function: map()

> **map**\<`T`, `R`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`Awaited`\<`R`\>[]\>

Defined in: [src/map.ts:17](https://github.com/calebboyd/aceink/blob/3007a4f3edd9e5494f51c1dd28a108b89b517f8e/src/map.ts#L17)

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
