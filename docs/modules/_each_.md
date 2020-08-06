[@calebboyd/async](../README.md) › [Globals](../globals.md) › ["each"](_each_.md)

# Module: "each"

## Index

### Type aliases

* [IteratorFunc](_each_.md#iteratorfunc)

### Functions

* [each](_each_.md#each)
* [eachSerial](_each_.md#const-eachserial)

## Type aliases

###  IteratorFunc

Ƭ **IteratorFunc**: *function | function | function*

*Defined in [each.ts:6](https://github.com/calebboyd/async/blob/a91dbbf/each.ts#L6)*

## Functions

###  each

▸ **each**‹**T**, **K**›(`this`: K | void, `list`: Iterable‹T›, `iterator`: [IteratorFunc](_each_.md#iteratorfunc)‹T›, `__namedParameters`: object): *Promise‹void›*

*Defined in [each.ts:14](https://github.com/calebboyd/async/blob/a91dbbf/each.ts#L14)*

**Type parameters:**

▪ **T**

▪ **K**

**Parameters:**

▪ **this**: *K | void*

▪ **list**: *Iterable‹T›*

▪ **iterator**: *[IteratorFunc](_each_.md#iteratorfunc)‹T›*

▪`Default value`  **__namedParameters**: *object*= {
    context: undefined,
    concurrency: 0,
  }

Name | Type |
------ | ------ |
`concurrency` | undefined &#124; number |
`context` | undefined &#124; void &#124; K |

**Returns:** *Promise‹void›*

___

### `Const` eachSerial

▸ **eachSerial**‹**T**, **K**›(`this`: K | void, `list`: Iterable‹T›, `iterator`: [IteratorFunc](_each_.md#iteratorfunc)‹T›, `__namedParameters`: object): *Promise‹void›*

*Defined in [each.ts:40](https://github.com/calebboyd/async/blob/a91dbbf/each.ts#L40)*

**Type parameters:**

▪ **T**

▪ **K**

**Parameters:**

▪ **this**: *K | void*

▪ **list**: *Iterable‹T›*

▪ **iterator**: *[IteratorFunc](_each_.md#iteratorfunc)‹T›*

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type |
------ | ------ |
`context` | undefined &#124; void &#124; K |

**Returns:** *Promise‹void›*
