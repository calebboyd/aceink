[aceink](README.md) / Exports

# aceink

## Table of contents

### Classes

- [Deferred](classes/Deferred.md)
- [Queue](classes/Queue.md)
- [Semaphore](classes/Semaphore.md)

### Type Aliases

- [ErrorValue](modules.md#errorvalue)
- [Func](modules.md#func)

### Functions

- [createDeferred](modules.md#createdeferred)
- [createLock](modules.md#createlock)
- [delay](modules.md#delay)
- [each](modules.md#each)
- [gowait](modules.md#gowait)
- [identity](modules.md#identity)
- [map](modules.md#map)
- [noop](modules.md#noop)
- [once](modules.md#once)
- [q](modules.md#q)

## Type Aliases

### ErrorValue

Ƭ **ErrorValue**<`T`, `E`\>: [`E`, `undefined`] \| [``null``, `T`]

#### Type parameters

| Name |
| :--- |
| `T`  |
| `E`  |

#### Defined in

[gowait.ts:28](https://github.com/calebboyd/aceink/blob/5bc342e/src/gowait.ts#L28)

---

### Func

Ƭ **Func**<`Result`, `Args`\>: (...`args`: `Args`) => `Result`

#### Type parameters

| Name     | Type                                      |
| :------- | :---------------------------------------- |
| `Result` | `ExplicitAny`                             |
| `Args`   | extends `ExplicitAny`[] = `ExplicitAny`[] |

#### Type declaration

▸ (`...args`): `Result`

Anonymous Function definition

##### Parameters

| Name      | Type   |
| :-------- | :----- |
| `...args` | `Args` |

##### Returns

`Result`

#### Defined in

[lang.ts:16](https://github.com/calebboyd/aceink/blob/5bc342e/src/lang.ts#L16)

## Functions

### createDeferred

▸ **createDeferred**<`T`\>(`value?`): [`Deferred`](classes/Deferred.md)<`T`\>

Create a new Deferred instance

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `value?` | `T`  |

#### Returns

[`Deferred`](classes/Deferred.md)<`T`\>

#### Defined in

[deferred.ts:9](https://github.com/calebboyd/aceink/blob/5bc342e/src/deferred.ts#L9)

---

### createLock

▸ **createLock**<`RefType`\>(`count?`, `bound?`): [`Semaphore`](classes/Semaphore.md)<`RefType`\>

Basic counting semaphore/lock factory

#### Type parameters

| Name      | Type     |
| :-------- | :------- |
| `RefType` | `number` |

#### Parameters

| Name     | Type      | Default value |
| :------- | :-------- | :------------ |
| `count?` | `number`  | `undefined`   |
| `bound`  | `boolean` | `true`        |

#### Returns

[`Semaphore`](classes/Semaphore.md)<`RefType`\>

#### Defined in

[semaphore.ts:6](https://github.com/calebboyd/aceink/blob/5bc342e/src/semaphore.ts#L6)

---

### delay

▸ **delay**<`T`\>(`ms?`, `arg?`): `Promise`<`T`\>

delay a certain number of milliseconds returning a promise that resolves an argument

#### Type parameters

| Name | Type        |
| :--- | :---------- |
| `T`  | `undefined` |

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `ms?`  | `number` |
| `arg?` | `T`      |

#### Returns

`Promise`<`T`\>

#### Defined in

[lang.ts:24](https://github.com/calebboyd/aceink/blob/5bc342e/src/lang.ts#L24)

---

### each

▸ **each**<`T`, `K`\>(`this`, `list`, `iterator`, `«destructured»?`): `Promise`<`void`\>

Iterate a list with optional concurrency

#### Type parameters

| Name | Type  |
| :--- | :---- |
| `T`  | `T`   |
| `K`  | `any` |

#### Parameters

| Name             | Type                        |
| :--------------- | :-------------------------- |
| `this`           | `void` \| `K`               |
| `list`           | `Iterable`<`T`\>            |
| `iterator`       | `IteratorFunc`<`T`, `any`\> |
| `«destructured»` | `Object`                    |
| › `concurrency?` | `number`                    |
| › `context?`     | `void` \| `K`               |
| › `onError?`     | `"settle"` \| `"bail"`      |

#### Returns

`Promise`<`void`\>

#### Defined in

[each.ts:16](https://github.com/calebboyd/aceink/blob/5bc342e/src/each.ts#L16)

---

### gowait

▸ **gowait**<`E`, `T`\>(`promised`, `...args`): `Promise`<[`ErrorValue`](modules.md#errorvalue)<`Awaited`<`ReturnType`<`T`\>\>, `E`\>\>

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `E`  | `E`                                |
| `T`  | extends `PromiseReturningFunction` |

#### Parameters

| Name       | Type               |
| :--------- | :----------------- |
| `promised` | `T`                |
| `...args`  | `Parameters`<`T`\> |

#### Returns

`Promise`<[`ErrorValue`](modules.md#errorvalue)<`Awaited`<`ReturnType`<`T`\>\>, `E`\>\>

#### Defined in

[gowait.ts:51](https://github.com/calebboyd/aceink/blob/5bc342e/src/gowait.ts#L51)

▸ **gowait**<`E`, `T`\>(`promised`): `Promise`<[`ErrorValue`](modules.md#errorvalue)<`Awaited`<`T`\>, `E`\>\>

#### Type parameters

| Name | Type                      |
| :--- | :------------------------ |
| `E`  | `E`                       |
| `T`  | extends `Promise`<`any`\> |

#### Parameters

| Name       | Type |
| :--------- | :--- |
| `promised` | `T`  |

#### Returns

`Promise`<[`ErrorValue`](modules.md#errorvalue)<`Awaited`<`T`\>, `E`\>\>

#### Defined in

[gowait.ts:56](https://github.com/calebboyd/aceink/blob/5bc342e/src/gowait.ts#L56)

---

### identity

▸ **identity**<`T`\>(`x`): `T`

Basic identity function

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type |
| :--- | :--- |
| `x`  | `T`  |

#### Returns

`T`

#### Defined in

[lang.ts:10](https://github.com/calebboyd/aceink/blob/5bc342e/src/lang.ts#L10)

---

### map

▸ **map**<`T`, `R`, `K`\>(`this`, `list`, `iterator`, `«destructured»?`): `Promise`<`Awaited`<`R`\>[]\>

Map over a list with optional concurrency

#### Type parameters

| Name | Type  |
| :--- | :---- |
| `T`  | `T`   |
| `R`  | `R`   |
| `K`  | `any` |

#### Parameters

| Name             | Type                      |
| :--------------- | :------------------------ |
| `this`           | `K`                       |
| `list`           | `Iterable`<`T`\>          |
| `iterator`       | `IteratorFunc`<`T`, `R`\> |
| `«destructured»` | `Object`                  |
| › `concurrency?` | `number`                  |
| › `context?`     | `K`                       |

#### Returns

`Promise`<`Awaited`<`R`\>[]\>

#### Defined in

[map.ts:8](https://github.com/calebboyd/aceink/blob/5bc342e/src/map.ts#L8)

---

### noop

▸ **noop**(): `void`

Basic noop function

#### Returns

`void`

#### Defined in

[lang.ts:5](https://github.com/calebboyd/aceink/blob/5bc342e/src/lang.ts#L5)

---

### once

▸ **once**<`T`\>(`fn`, `after?`): `T`

Execute fn one time and [after=noop] for every subsequent invocation

#### Type parameters

| Name | Type                                               |
| :--- | :------------------------------------------------- |
| `T`  | extends [`Func`](modules.md#func)<`any`, `any`[]\> |

#### Parameters

| Name    | Type                                       | Default value |
| :------ | :----------------------------------------- | :------------ |
| `fn`    | `T`                                        | `undefined`   |
| `after` | [`Func`](modules.md#func)<`any`, `any`[]\> | `noop`        |

#### Returns

`T`

#### Defined in

[lang.ts:31](https://github.com/calebboyd/aceink/blob/5bc342e/src/lang.ts#L31)

---

### q

▸ **q**(`size`, `bound?`): [`Queue`](classes/Queue.md)

Create Queue with a specified size

#### Parameters

| Name    | Type      | Default value |
| :------ | :-------- | :------------ |
| `size`  | `number`  | `undefined`   |
| `bound` | `boolean` | `true`        |

#### Returns

[`Queue`](classes/Queue.md)

#### Defined in

[queue.ts:8](https://github.com/calebboyd/aceink/blob/5bc342e/src/queue.ts#L8)
