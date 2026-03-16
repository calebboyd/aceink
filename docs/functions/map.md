[**aceink**](../README.md)

***

[aceink](../globals.md) / map

# Function: map()

> **map**\<`T`, `R`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`Awaited`\<`R`\>[]\>

Defined in: [src/map.ts:17](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/map.ts#L17)

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
