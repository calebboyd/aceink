[**aceink**](../README.md)

***

[aceink](../globals.md) / map

# Function: map()

> **map**\<`T`, `R`, `K`\>(`this`, `list`, `iterator`, `__namedParameters?`): `Promise`\<`Awaited`\<`R`\>[]\>

Defined in: [map.ts:8](https://github.com/calebboyd/aceink/blob/4ec8f3568f64aede2a4a837c4b806a8b46443a74/src/map.ts#L8)

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
