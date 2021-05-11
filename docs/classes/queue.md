[@calebboyd/async](../README.md) / [Exports](../modules.md) / Queue

# Class: Queue

## Table of contents

### Constructors

- [constructor](queue.md#constructor)

### Properties

- [last](queue.md#last)
- [lock](queue.md#lock)

### Accessors

- [pending](queue.md#pending)

### Methods

- [add](queue.md#add)
- [empty](queue.md#empty)
- [ready](queue.md#ready)

## Constructors

### constructor

\+ **new Queue**(`concurrency`: *number*): [*Queue*](queue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `concurrency` | *number* |

**Returns:** [*Queue*](queue.md)

Defined in: [queue.ts:19](https://github.com/calebboyd/async/blob/3e68cc2/queue.ts#L19)

## Properties

### last

• `Private` **last**: *Promise*<any\>

Defined in: [queue.ts:19](https://github.com/calebboyd/async/blob/3e68cc2/queue.ts#L19)

___

### lock

• `Private` **lock**: [*Semaphore*](semaphore.md)<any\>

Defined in: [queue.ts:18](https://github.com/calebboyd/async/blob/3e68cc2/queue.ts#L18)

## Accessors

### pending

• get **pending**(): *number*

**Returns:** *number*

Defined in: [queue.ts:22](https://github.com/calebboyd/async/blob/3e68cc2/queue.ts#L22)

## Methods

### add

▸ **add**<T\>(`work`: [*Func*](../modules.md#func)<T\>, `arg?`: *any*): *Promise*<UnWrapPromise<T\>\>

Add work to the Queue, The work function _can_ be async and should NOT throw

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `work` | [*Func*](../modules.md#func)<T\> | work function |
| `arg?` | *any* | single argument that will be passed to the work function |

**Returns:** *Promise*<UnWrapPromise<T\>\>

Defined in: [queue.ts:33](https://github.com/calebboyd/async/blob/3e68cc2/queue.ts#L33)

___

### empty

▸ **empty**(): *Promise*<void\>

Wait for the queue to be empty

**Returns:** *Promise*<void\>

Defined in: [queue.ts:58](https://github.com/calebboyd/async/blob/3e68cc2/queue.ts#L58)

___

### ready

▸ **ready**(): *Promise*<void\>

Wait for the queue to have at least one empty slot

**Returns:** *Promise*<void\>

Defined in: [queue.ts:51](https://github.com/calebboyd/async/blob/3e68cc2/queue.ts#L51)
