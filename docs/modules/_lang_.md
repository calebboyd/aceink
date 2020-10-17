**[@calebboyd/async](../README.md)**

> [Globals](../globals.md) / "lang"

# Module: "lang"

## Index

### Type aliases

* [Func](_lang_.md#func)

### Functions

* [bound](_lang_.md#bound)
* [identity](_lang_.md#identity)
* [noop](_lang_.md#noop)
* [once](_lang_.md#once)

## Type aliases

### Func

Ƭ  **Func**\<T>: (...args: any[]) => T

*Defined in [lang.ts:12](https://github.com/calebboyd/async/blob/c145a52/lang.ts#L12)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | any |

## Functions

### bound

▸ `Const`**bound**\<T>(`target`: any, `propertyKey`: string \| symbol, `descriptor`: TypedPropertyDescriptor\<T>): object

*Defined in [lang.ts:29](https://github.com/calebboyd/async/blob/c145a52/lang.ts#L29)*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string \| symbol |
`descriptor` | TypedPropertyDescriptor\<T> |

**Returns:** object

Name | Type |
------ | ------ |
`configurable` | true |

___

### identity

▸ `Const`**identity**\<T>(`x`: T): T

*Defined in [lang.ts:8](https://github.com/calebboyd/async/blob/c145a52/lang.ts#L8)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | any |

#### Parameters:

Name | Type |
------ | ------ |
`x` | T |

**Returns:** T

___

### noop

▸ `Const`**noop**(): void

*Defined in [lang.ts:4](https://github.com/calebboyd/async/blob/c145a52/lang.ts#L4)*

**Returns:** void

___

### once

▸ **once**\<T>(`fn`: T, `after`: [Func](_lang_.md#func)): T

*Defined in [lang.ts:18](https://github.com/calebboyd/async/blob/c145a52/lang.ts#L18)*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [Func](_lang_.md#func) |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`fn` | T | - |
`after` | [Func](_lang_.md#func) | noop |

**Returns:** T
