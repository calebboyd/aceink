[@calebboyd/async](../README.md) › [Globals](../globals.md) › ["gowait"](_gowait_.md)

# Module: "gowait"

## Index

### Type aliases

* [ErrorValue](_gowait_.md#errorvalue)

### Functions

* [gowait](_gowait_.md#gowait)

## Type aliases

###  ErrorValue

Ƭ **ErrorValue**: *[Error, undefined] | [null, T]*

*Defined in [gowait.ts:29](https://github.com/calebboyd/async/blob/a91dbbf/gowait.ts#L29)*

## Functions

###  gowait

▸ **gowait**‹**T**›(`promised`: Promise‹T›, `final`: function): *Promise‹[ErrorValue](_gowait_.md#errorvalue)‹T››*

*Defined in [gowait.ts:42](https://github.com/calebboyd/async/blob/a91dbbf/gowait.ts#L42)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **promised**: *Promise‹T›*

▪`Default value`  **final**: *function*= noop

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *Promise‹[ErrorValue](_gowait_.md#errorvalue)‹T››*
