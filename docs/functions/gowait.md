[**aceink**](../README.md)

***

[aceink](../globals.md) / gowait

# Function: gowait()

## Call Signature

> **gowait**\<`E`, `T`\>(`promised`, ...`args`): `Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`ReturnType`\<`T`\>\>, `E`\>\>

Defined in: [src/gowait.ts:51](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/gowait.ts#L51)

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

Defined in: [src/gowait.ts:56](https://github.com/calebboyd/aceink/blob/6619317f0c8308e5cdc387b8b8c411daf4194de4/src/gowait.ts#L56)

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
