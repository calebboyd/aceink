**[@calebboyd/async](../README.md)**

> [Globals](../globals.md) / "map"

# Module: "map"

## Index

### Functions

* [map](_map_.md#map)
* [mapSerial](_map_.md#mapserial)

## Functions

### map

▸ **map**\<T, R, K>(`this`: K, `list`: Iterable\<T>, `iterator`: [IteratorFunc](_each_.md#iteratorfunc)\<T, R>, `__namedParameters`: { concurrency: undefined \| number ; context: undefined \| K  }): Promise\<R[]>

*Defined in [map.ts:5](https://github.com/calebboyd/async/blob/c145a52/map.ts#L5)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | - |
`R` | - |
`K` | any |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`this` | K | - |
`list` | Iterable\<T> | - |
`iterator` | [IteratorFunc](_each_.md#iteratorfunc)\<T, R> | - |
`__namedParameters` | { concurrency: undefined \| number ; context: undefined \| K  } | {} |

**Returns:** Promise\<R[]>

___

### mapSerial

▸ **mapSerial**\<T, R, K>(`this`: K, `list`: Iterable\<T>, `iterator`: [IteratorFunc](_each_.md#iteratorfunc)\<T, R>, `__namedParameters`: { context: undefined \| K  }): any

*Defined in [map.ts:25](https://github.com/calebboyd/async/blob/c145a52/map.ts#L25)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | - |
`R` | - |
`K` | any |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`this` | K | - |
`list` | Iterable\<T> | - |
`iterator` | [IteratorFunc](_each_.md#iteratorfunc)\<T, R> | - |
`__namedParameters` | { context: undefined \| K  } | {} |

**Returns:** any
