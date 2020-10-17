**[@calebboyd/async](../README.md)**

> [Globals](../globals.md) / "gowait"

# Module: "gowait"

## Index

### Type aliases

* [ErrorValue](_gowait_.md#errorvalue)

### Functions

* [gowait](_gowait_.md#gowait)

## Type aliases

### ErrorValue

Ƭ  **ErrorValue**\<T>: [Error, undefined] \| [null, T]

*Defined in [gowait.ts:29](https://github.com/calebboyd/async/blob/c145a52/gowait.ts#L29)*

#### Type parameters:

Name |
------ |
`T` |

## Functions

### gowait

▸ **gowait**\<T>(`promised`: Promise\<T>, `final`: (...args: any[]) => any): Promise\<[ErrorValue](_gowait_.md#errorvalue)\<T>>

*Defined in [gowait.ts:42](https://github.com/calebboyd/async/blob/c145a52/gowait.ts#L42)*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`promised` | Promise\<T> | - |   |
`final` | (...args: any[]) => any | noop | - |

**Returns:** Promise\<[ErrorValue](_gowait_.md#errorvalue)\<T>>
