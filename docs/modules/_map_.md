[@calebboyd/async](../README.md) › [Globals](../globals.md) › ["map"](_map_.md)

# Module: "map"

## Index

### Functions

* [map](_map_.md#map)
* [mapSerial](_map_.md#mapserial)

## Functions

###  map

▸ **map**‹**T**, **R**, **K**›(`this`: K, `list`: Iterable‹T›, `iterator`: [IteratorFunc](_each_.md#iteratorfunc)‹T, R›, `__namedParameters`: object): *Promise‹R[]›*

*Defined in [map.ts:5](https://github.com/calebboyd/async/blob/a91dbbf/map.ts#L5)*

**Type parameters:**

▪ **T**

▪ **R**

▪ **K**

**Parameters:**

▪ **this**: *K*

▪ **list**: *Iterable‹T›*

▪ **iterator**: *[IteratorFunc](_each_.md#iteratorfunc)‹T, R›*

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type |
------ | ------ |
`concurrency` | undefined &#124; number |
`context` | undefined &#124; K |

**Returns:** *Promise‹R[]›*

___

###  mapSerial

▸ **mapSerial**‹**T**, **R**, **K**›(`this`: K, `list`: Iterable‹T›, `iterator`: [IteratorFunc](_each_.md#iteratorfunc)‹T, R›, `__namedParameters`: object): *any*

*Defined in [map.ts:25](https://github.com/calebboyd/async/blob/a91dbbf/map.ts#L25)*

**Type parameters:**

▪ **T**

▪ **R**

▪ **K**

**Parameters:**

▪ **this**: *K*

▪ **list**: *Iterable‹T›*

▪ **iterator**: *[IteratorFunc](_each_.md#iteratorfunc)‹T, R›*

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type |
------ | ------ |
`context` | undefined &#124; K |

**Returns:** *any*
