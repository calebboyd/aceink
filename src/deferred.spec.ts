import { describe, expect, it } from 'vitest'
import { createDeferred, Deferred } from './deferred.js'

describe('createDeferred', () => {
  it('creates a Deferred instance', () => {
    expect(createDeferred()).toBeInstanceOf(Deferred)
  })

  it('stores the initial value', () => {
    const value = { data: 'test' }

    expect(createDeferred(value).value).toEqual(value)
  })

  it('resolves the promise', async () => {
    const deferred = createDeferred<string>()

    deferred.resolve('value')

    await expect(deferred.promise).resolves.toBe('value')
  })

  it('rejects the promise', async () => {
    const deferred = createDeferred<string>()

    deferred.reject('boom')

    await expect(deferred.promise).rejects.toBe('boom')
  })
})

describe('Deferred', () => {
  it('exposes promise, resolve, and reject', () => {
    const deferred = new Deferred<number>()

    expect(deferred.promise).toBeInstanceOf(Promise)
    expect(typeof deferred.resolve).toBe('function')
    expect(typeof deferred.reject).toBe('function')
  })

  it('stores an initial value for later resolution', async () => {
    const deferred = new Deferred('value')

    expect(deferred.value).toBe('value')

    deferred.resolve(deferred.value as string)

    await expect(deferred.promise).resolves.toBe('value')
  })

  it('adopts a resolved promise value', async () => {
    const deferred = new Deferred<string>()

    deferred.resolve(Promise.resolve('async'))

    await expect(deferred.promise).resolves.toBe('async')
  })

  it('rejects with the provided reason', async () => {
    const deferred = new Deferred<string>()
    const reason = new Error('boom')

    deferred.reject(reason)

    await expect(deferred.promise).rejects.toBe(reason)
  })

  it('keeps promise rejection reasons as-is', async () => {
    const deferred = new Deferred<string>()
    const reason = Promise.resolve('boom')

    deferred.reject(reason)

    await expect(deferred.promise).rejects.toBe(reason)
  })
})
