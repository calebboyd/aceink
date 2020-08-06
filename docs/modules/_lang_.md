[@calebboyd/async](../README.md) › [Globals](../globals.md) › ["lang"](_lang_.md)

# Module: "lang"

## Index

### Type aliases

* [Func](_lang_.md#func)

### Functions

* [bound](_lang_.md#const-bound)
* [identity](_lang_.md#const-identity)
* [noop](_lang_.md#const-noop)
* [once](_lang_.md#once)

## Type aliases

###  Func

Ƭ **Func**: *function*

*Defined in [lang.ts:12](https://github.com/calebboyd/async/blob/a91dbbf/lang.ts#L12)*

#### Type declaration:

▸ (...`args`: any[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

## Functions

### `Const` bound

▸ **bound**‹**T**›(`target`: any, `propertyKey`: string | symbol, `descriptor`: TypedPropertyDescriptor‹T›): *object*

*Defined in [lang.ts:29](https://github.com/calebboyd/async/blob/a91dbbf/lang.ts#L29)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string &#124; symbol |
`descriptor` | TypedPropertyDescriptor‹T› |

**Returns:** *object*

* **configurable**: *true* = true

___

### `Const` identity

▸ **identity**‹**T**›(`x`: T): *T*

*Defined in [lang.ts:8](https://github.com/calebboyd/async/blob/a91dbbf/lang.ts#L8)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`x` | T |

**Returns:** *T*

___

### `Const` noop

▸ **noop**(): *void*

*Defined in [lang.ts:4](https://github.com/calebboyd/async/blob/a91dbbf/lang.ts#L4)*

**Returns:** *void*

___

###  once

▸ **once**‹**T**›(`fn`: T, `after`: [Func](_lang_.md#func)): *T*

*Defined in [lang.ts:18](https://github.com/calebboyd/async/blob/a91dbbf/lang.ts#L18)*

**Type parameters:**

▪ **T**: *[Func](_lang_.md#func)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fn` | T | - |
`after` | [Func](_lang_.md#func) | noop |

**Returns:** *T*
