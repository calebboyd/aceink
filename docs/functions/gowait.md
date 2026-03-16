[**aceink**](../README.md)

***

[aceink](../globals.md) / gowait

# Function: gowait()

## Call Signature

> **gowait**\<`E`, `T`\>(`promised`, ...`args`): `Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`ReturnType`\<`T`\>\>, `E`\>\>

Defined in: [gowait.ts:51](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/gowait.ts#L51)

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

Defined in: [gowait.ts:56](https://github.com/calebboyd/aceink/blob/eb54a3ee0f1bb74f7956e61b5d881bbc7b81ff38/src/gowait.ts#L56)

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
