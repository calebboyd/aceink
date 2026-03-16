[**aceink**](../README.md)

***

[aceink](../globals.md) / gowait

# Function: gowait()

## Call Signature

> **gowait**\<`E`, `T`\>(`promised`, ...`args`): `Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`ReturnType`\<`T`\>\>, `E`\>\>

Defined in: [src/gowait.ts:51](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/gowait.ts#L51)

### Type Parameters

#### E

`E`

#### T

`T` *extends* `PromiseReturningFunction`

### Parameters

#### promised

`T`

#### args

...`Parameters`\<`T`\>

### Returns

`Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`ReturnType`\<`T`\>\>, `E`\>\>

## Call Signature

> **gowait**\<`E`, `T`\>(`promised`): `Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`T`\>, `E`\>\>

Defined in: [src/gowait.ts:56](https://github.com/calebboyd/aceink/blob/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a/src/gowait.ts#L56)

### Type Parameters

#### E

`E`

#### T

`T` *extends* `Promise`\<`any`\>

### Parameters

#### promised

`T`

### Returns

`Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`T`\>, `E`\>\>
