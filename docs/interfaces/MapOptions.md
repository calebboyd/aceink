[**aceink**](../README.md)

***

[aceink](../globals.md) / MapOptions

# Interface: MapOptions\<K\>

Defined in: [src/map.ts:9](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/map.ts#L9)

map() configuration.

## Extends

- `Pick`\<[`EachOptions`](EachOptions.md)\<`K`\>, `"concurrency"` \| `"context"` \| `"signal"` \| `"timeout"`\>

## Type Parameters

### K

`K` = `ExplicitAny`

## Properties

### concurrency?

> `optional` **concurrency**: `number`

Defined in: [src/each.ts:18](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/each.ts#L18)

#### Inherited from

`Pick.concurrency`

***

### context?

> `optional` **context**: `void` \| `K`

Defined in: [src/each.ts:17](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/each.ts#L17)

#### Inherited from

`Pick.context`

***

### signal?

> `optional` **signal**: `AbortSignal`

Defined in: [src/each.ts:20](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/each.ts#L20)

#### Inherited from

`Pick.signal`

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/each.ts:21](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/each.ts#L21)

#### Inherited from

`Pick.timeout`
