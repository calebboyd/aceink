[**aceink**](../README.md)

---

[aceink](../globals.md) / gowait

# Function: gowait()

## Call Signature

> **gowait**\<`E`, `T`\>(`promised`, ...`args`): `Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`ReturnType`\<`T`\>\>, `E`\>\>

Defined in: [gowait.ts:51](https://github.com/calebboyd/aceink/blob/3fe197793f511a5c043f97803e108cc5b918f894/src/gowait.ts#L51)

### Type Parameters

#### E

`E`

#### T

`T` _extends_ `PromiseReturningFunction`

### Parameters

#### promised

`T`

#### args

...`Parameters`\<`T`\>

### Returns

`Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`ReturnType`\<`T`\>\>, `E`\>\>

## Call Signature

> **gowait**\<`E`, `T`\>(`promised`): `Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`T`\>, `E`\>\>

Defined in: [gowait.ts:56](https://github.com/calebboyd/aceink/blob/3fe197793f511a5c043f97803e108cc5b918f894/src/gowait.ts#L56)

### Type Parameters

#### E

`E`

#### T

`T` _extends_ `Promise`\<`any`\>

### Parameters

#### promised

`T`

### Returns

`Promise`\<[`ErrorValue`](../type-aliases/ErrorValue.md)\<`Awaited`\<`T`\>, `E`\>\>
