**[@calebboyd/async](../README.md)**

> [Globals](../globals.md) / ["queue"](../modules/_queue_.md) / Queue

# Class: Queue

## Hierarchy

* **Queue**

## Index

### Methods

* [do](_queue_.queue.md#do)
* [empty](_queue_.queue.md#empty)
* [ready](_queue_.queue.md#ready)

## Methods

### do

▸ **do**\<T>(`work`: [Func](../modules/_lang_.md#func)\<Promise\<T>>): Promise\<T>

*Defined in [queue.ts:20](https://github.com/calebboyd/async/blob/c145a52/queue.ts#L20)*

Enqueue work

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`work` | [Func](../modules/_lang_.md#func)\<Promise\<T>> |   |

**Returns:** Promise\<T>

___

### empty

▸ **empty**(): Promise\<void>

*Defined in [queue.ts:46](https://github.com/calebboyd/async/blob/c145a52/queue.ts#L46)*

Wait for the queue to be empty

**Returns:** Promise\<void>

___

### ready

▸ **ready**(): Promise\<void>

*Defined in [queue.ts:39](https://github.com/calebboyd/async/blob/c145a52/queue.ts#L39)*

Wait for the queue to have at least one empty slot

**Returns:** Promise\<void>
