[@calebboyd/async](README.md) / Exports

# @calebboyd/async

## Table of contents

### Classes

- [Deferred](classes/deferred.md)
- [Queue](classes/queue.md)
- [Semaphore](classes/semaphore.md)

### Type aliases

- [ErrorValue](modules.md#errorvalue)
- [Func](modules.md#func)

### Functions

- [bound](modules.md#bound)
- [createLock](modules.md#createlock)
- [delay](modules.md#delay)
- [each](modules.md#each)
- [eachSerial](modules.md#eachserial)
- [gowait](modules.md#gowait)
- [identity](modules.md#identity)
- [map](modules.md#map)
- [mapSerial](modules.md#mapserial)
- [noop](modules.md#noop)
- [once](modules.md#once)
- [q](modules.md#q)

## Type aliases

### ErrorValue

Ƭ **ErrorValue**<T, E\>: [E, *undefined*] \| [``null``, T]

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

Defined in: [gowait.ts:30](https://github.com/calebboyd/async/blob/3e68cc2/gowait.ts#L30)

___

### Func

Ƭ **Func**<T\>: (...`args`: *any*[]) => T

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | *any* |

#### Type declaration

▸ (...`args`: *any*[]): T

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | *any*[] |

**Returns:** T

Defined in: [lang.ts:16](https://github.com/calebboyd/async/blob/3e68cc2/lang.ts#L16)

## Functions

### bound

▸ `Const` **bound**<T\>(`target`: Object, `propertyKey`: *string* \| *symbol*, `descriptor`: *TypedPropertyDescriptor*<T\>): *void* \| *TypedPropertyDescriptor*<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | Object |
| `propertyKey` | *string* \| *symbol* |
| `descriptor` | *TypedPropertyDescriptor*<T\> |

**Returns:** *void* \| *TypedPropertyDescriptor*<T\>

Defined in: [lang.ts:41](https://github.com/calebboyd/async/blob/3e68cc2/lang.ts#L41)

___

### createLock

▸ **createLock**<RefType\>(`count?`: *number*, `promise?`: PromiseConstructor): [*Semaphore*](classes/semaphore.md)<RefType\>

#### Type parameters

| Name | Default |
| :------ | :------ |
| `RefType` | *number* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `count?` | *number* |
| `promise` | PromiseConstructor |

**Returns:** [*Semaphore*](classes/semaphore.md)<RefType\>

Defined in: [semaphore.ts:7](https://github.com/calebboyd/async/blob/3e68cc2/semaphore.ts#L7)

___

### delay

▸ `Const` **delay**<T\>(`ms?`: *number*, `arg?`: T): *Promise*<T\>

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | *undefined* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms?` | *number* |
| `arg?` | T |

**Returns:** *Promise*<T\>

Defined in: [lang.ts:22](https://github.com/calebboyd/async/blob/3e68cc2/lang.ts#L22)

___

### each

▸ **each**<T, K\>(`list`: *Iterable*<T\>, `iterator`: *IteratorFunc*<T\>, `__namedParameters`: { `concurrency?`: *number* ; `context?`: K \| *void*  }): *Promise*<void\>

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | - |
| `K` | *any* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | *Iterable*<T\> |
| `iterator` | *IteratorFunc*<T\> |
| `__namedParameters` | *object* |
| `__namedParameters.concurrency?` | *number* |
| `__namedParameters.context?` | K \| *void* |

**Returns:** *Promise*<void\>

Defined in: [each.ts:15](https://github.com/calebboyd/async/blob/3e68cc2/each.ts#L15)

___

### eachSerial

▸ `Const` **eachSerial**<T, K\>(`list`: *Iterable*<T\>, `iterator`: *IteratorFunc*<T, any\>, `__namedParameters`: { `context?`: *void* \| K  }): *Promise*<void\>

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | - |
| `K` | *any* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | *Iterable*<T\> |
| `iterator` | *IteratorFunc*<T, any\> |
| `__namedParameters` | *object* |
| `__namedParameters.context?` | *void* \| K |

**Returns:** *Promise*<void\>

Defined in: [each.ts:42](https://github.com/calebboyd/async/blob/3e68cc2/each.ts#L42)

___

### gowait

▸ **gowait**<T, E\>(`promised`: *Promise*<T\> \| [*Func*](modules.md#func)<Promise<T\>\>): *Promise*<[*ErrorValue*](modules.md#errorvalue)<T, E\>\>

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | - |
| `E` | Error |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promised` | *Promise*<T\> \| [*Func*](modules.md#func)<Promise<T\>\> |

**Returns:** *Promise*<[*ErrorValue*](modules.md#errorvalue)<T, E\>\>

Defined in: [gowait.ts:45](https://github.com/calebboyd/async/blob/3e68cc2/gowait.ts#L45)

___

### identity

▸ `Const` **identity**<T\>(`x`: T): T

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | T |

**Returns:** T

Defined in: [lang.ts:10](https://github.com/calebboyd/async/blob/3e68cc2/lang.ts#L10)

___

### map

▸ **map**<T, R, K\>(`list`: *Iterable*<T\>, `iterator`: *IteratorFunc*<T, R\>, `__namedParameters`: { `concurrency?`: *number* ; `context?`: K  }): *Promise*<R[]\>

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | - |
| `R` | - |
| `K` | *any* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | *Iterable*<T\> |
| `iterator` | *IteratorFunc*<T, R\> |
| `__namedParameters` | *object* |
| `__namedParameters.concurrency?` | *number* |
| `__namedParameters.context?` | K |

**Returns:** *Promise*<R[]\>

Defined in: [map.ts:5](https://github.com/calebboyd/async/blob/3e68cc2/map.ts#L5)

___

### mapSerial

▸ **mapSerial**<T, R, K\>(`list`: *Iterable*<T\>, `iterator`: *IteratorFunc*<T, R\>, `__namedParameters`: { `context?`: K  }): *any*

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | - |
| `R` | - |
| `K` | *any* |

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | *Iterable*<T\> |
| `iterator` | *IteratorFunc*<T, R\> |
| `__namedParameters` | *object* |
| `__namedParameters.context?` | K |

**Returns:** *any*

Defined in: [map.ts:25](https://github.com/calebboyd/async/blob/3e68cc2/map.ts#L25)

___

### noop

▸ `Const` **noop**(): *void*

**Returns:** *void*

Defined in: [lang.ts:5](https://github.com/calebboyd/async/blob/3e68cc2/lang.ts#L5)

___

### once

▸ **once**<T\>(`fn`: T, `after?`: [*Func*](modules.md#func)): T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [*Func*](modules.md#func)<any\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | T |
| `after` | [*Func*](modules.md#func) |

**Returns:** T

Defined in: [lang.ts:29](https://github.com/calebboyd/async/blob/3e68cc2/lang.ts#L29)

___

### q

▸ **q**(`size`: *number*): [*Queue*](classes/queue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | *number* |

**Returns:** [*Queue*](classes/queue.md)

Defined in: [queue.ts:10](https://github.com/calebboyd/async/blob/3e68cc2/queue.ts#L10)
