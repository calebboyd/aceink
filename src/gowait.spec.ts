import { describe, it, expect } from 'vitest'
import { gowait } from './gowait.js'

describe('gowait', () => {
  it('should return the result of the function', async () => {
    const func = () => Promise.resolve('1234')
    const [_, result] = await gowait(func())
    expect(result).toEqual('1234')
    expect(_).toBeNull()
  })
  it('should return the error of the function', async () => {
    const func = () => Promise.reject('1234')
    const [error, result] = await gowait(func())
    expect(result).toBeUndefined()
    expect(error).toEqual('1234')
  })

  it('should execute a non-thenable function', async () => {
    const func = () => Promise.reject('1234')
    const [error, result] = await gowait(func)
    expect(result).toBeUndefined()
    expect(error).toEqual('1234')

    const resolved = Promise.resolve('abcd')
    func.then = resolved.then.bind(resolved)
    const [err, value] = await gowait(func)
    expect(value).toEqual('abcd')
    expect(err).toBeNull()
  })

  it('should catch syncronous errors and throw native ones asyncronously', async () => {
    const func = () => {
      new Function('%.(4)')()
      return Promise.resolve()
    }
    let caught = false
    await gowait(func).catch((e) => {
      caught = true
      expect(e).toBeInstanceOf(SyntaxError)
    })
    expect(caught).toBe(true)
  })
})
