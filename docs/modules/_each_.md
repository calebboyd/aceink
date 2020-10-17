**[@calebboyd/async](../README.md)**

> [Globals](../globals.md) / "each"

# Module: "each"

## Index

### Type aliases

* [IteratorFunc](_each_.md#iteratorfunc)

### Functions

* [each](_each_.md#each)
* [eachSerial](_each_.md#eachserial)

## Type aliases

### IteratorFunc

Ƭ  **IteratorFunc**\<T, R>: (value: T, i: number, list: Iterable\<T>) => R \| (value: T) => R \| (value: T, i: number) => R

*Defined in [each.ts:6](https://github.com/calebboyd/async/blob/c145a52/each.ts#L6)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | - |
`R` | any |

## Functions

### each

▸ **each**\<T, K>(`this`: K \| void, `list`: Iterable\<T>, `iterator`: [IteratorFunc](_each_.md#iteratorfunc)\<T>, `__namedParameters`: { concurrency: undefined \| number ; context: undefined \| void \| K  }): Promise\<void>

*Defined in [each.ts:14](https://github.com/calebboyd/async/blob/c145a52/each.ts#L14)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | - |
`K` | any |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`this` | K \| void | - |
`list` | Iterable\<T> | - |
`iterator` | [IteratorFunc](_each_.md#iteratorfunc)\<T> | - |
`__namedParameters` | { concurrency: undefined \| number ; context: undefined \| void \| K  } | {
    context: undefined,
    concurrency: 0,
  } |

**Returns:** Promise\<void>

___

### eachSerial

▸ `Const`**eachSerial**\<T, K>(`this`: K \| void, `list`: Iterable\<T>, `iterator`: [IteratorFunc](_each_.md#iteratorfunc)\<T>, `__namedParameters`: { context: undefined \| void \| K  }): Promise\<void>

*Defined in [each.ts:40](https://github.com/calebboyd/async/blob/c145a52/each.ts#L40)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | - |
`K` | any |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`this` | K \| void | - |
`list` | Iterable\<T> | - |
`iterator` | [IteratorFunc](_each_.md#iteratorfunc)\<T> | - |
`__namedParameters` | { context: undefined \| void \| K  } | {} |

**Returns:** Promise\<void>
